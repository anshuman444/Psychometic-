/**
 * useAssessmentResults — Hook to fetch/receive assessment results.
 * 
 * Can receive results via:
 * 1. React Router location state (immediate after assessment completion)
 * 2. Supabase fetch (returning user viewing past results)
 */

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCurrentUser } from '../../../lib/PlatformContext';
import { getLatestAssessmentResult } from '../../../services/supabaseService';
import dimensionDefs from '../../../data/intelligence/dimensionDefinitions.json';
import themesData from '../../../data/intelligence/themes.json';
import type { OrchestratorResult } from '../../../services/assessmentOrchestrator';
import type { CareerRecommendation } from '../../../utils/career/careerRecommendationEngine';

export interface ResolvedResults {
  /** Whether data is still loading */
  loading: boolean;
  /** The raw orchestrator result (if available from pipeline) */
  pipelineResult: OrchestratorResult | null;
  /** Resolved display-ready data */
  displayData: DisplayData | null;
  /** Error message */
  error: string | null;
  /** Whether user has completed an assessment */
  hasResults: boolean;
}

export interface DisplayData {
  readinessScore: number;
  successIndex: number;
  fingerprintHash: string;
  dimensions: {
    id: string;
    name: string;
    category: string;
    description: string;
    normalizedScore: number;
    rawScore: number;
    tier: 'low' | 'medium' | 'high';
  }[];
  themes: {
    id: string;
    name: string;
    description: string;
    score: number;
    rank: number;
    coreStrengths: string[];
    learningStyle: string;
  }[];
  topStrengths: { id: string; name: string; score: number }[];
  blindSpots: { id: string; name: string; score: number }[];
  hiddenStrengths: { id: string; name: string; score: number }[];
  motivationProfile: { primary: string; secondary: string };
  careerScores: { clusterId: string; fitScore: number }[];
  careerRecommendations: CareerRecommendation | null;
  roadmap: Record<string, any>;
}

/** Map dimension ID to display info */
const dimLookup = new Map(dimensionDefs.map(d => [d.id, d]));

/** Map theme ID to display info */
const themeLookup = new Map((themesData as any[]).map(t => [t.id, t]));

function resolveDimensionName(dimId: string): string {
  return dimLookup.get(dimId)?.name || dimId;
}

function buildDisplayData(result: OrchestratorResult): DisplayData {
  return {
    readinessScore: result.readinessScore,
    successIndex: result.successIndex,
    fingerprintHash: result.fingerprint.hash,
    dimensions: result.dimensions.map(d => {
      const def = dimLookup.get(d.dimensionId);
      return {
        id: d.dimensionId,
        name: def?.name || d.dimensionId,
        category: def?.category || 'Unknown',
        description: def?.description || '',
        normalizedScore: d.normalizedScore,
        rawScore: d.rawScore,
        tier: d.tier,
      };
    }),
    themes: result.themes.map(t => {
      const def = themeLookup.get(t.themeId);
      return {
        id: t.themeId,
        name: t.name || def?.name || t.themeId,
        description: def?.description || '',
        score: t.score,
        rank: t.rankPosition,
        coreStrengths: def?.coreStrengths || [],
        learningStyle: def?.learningStyle || '',
      };
    }),
    topStrengths: result.topStrengths.map(s => ({
      id: s.id,
      name: resolveDimensionName(s.id),
      score: s.score,
    })),
    blindSpots: result.blindSpots.map(b => ({
      id: b.id,
      name: resolveDimensionName(b.id),
      score: b.score,
    })),
    hiddenStrengths: result.hiddenStrengths.map(h => ({
      id: h.id,
      name: resolveDimensionName(h.id),
      score: h.score,
    })),
    motivationProfile: result.motivationProfile,
    careerScores: result.careerScores,
    careerRecommendations: result.careerRecommendations,
    roadmap: result.roadmap,
  };
}

export function useAssessmentResults(): ResolvedResults {
  const location = useLocation();
  const { user } = useCurrentUser();
  const [loading, setLoading] = useState(true);
  const [pipelineResult, setPipelineResult] = useState<OrchestratorResult | null>(null);
  const [displayData, setDisplayData] = useState<DisplayData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if results were passed via router state (fresh assessment)
    const routerState = location.state as { result?: OrchestratorResult } | null;
    if (routerState?.result) {
      setPipelineResult(routerState.result);
      setDisplayData(buildDisplayData(routerState.result));
      setLoading(false);
      return;
    }

    // Otherwise, fetch from Supabase
    getLatestAssessmentResult(user.userId)
      .then((row) => {
        if (row) {
          // Reconstruct a minimal display-ready object from the DB row
          const dbDisplayData: DisplayData = {
            readinessScore: row.readiness_score,
            successIndex: row.success_score,
            fingerprintHash: row.fingerprint_hash || '',
            dimensions: (row.dimension_scores?.dimensions || []).map((d: any) => {
              const def = dimLookup.get(d.id);
              return {
                id: d.id,
                name: def?.name || d.id,
                category: def?.category || 'Unknown',
                description: def?.description || '',
                normalizedScore: d.normalizedScore,
                rawScore: d.rawScore,
                tier: d.tier,
              };
            }),
            themes: (row.theme_scores?.themes || []).map((t: any) => {
              const def = themeLookup.get(t.id);
              return {
                id: t.id,
                name: t.name || def?.name || t.id,
                description: def?.description || '',
                score: t.score,
                rank: t.rankPosition,
                coreStrengths: def?.coreStrengths || [],
                learningStyle: def?.learningStyle || '',
              };
            }),
            topStrengths: (row.strengths || []).map((s: any) => ({
              id: s.id, name: resolveDimensionName(s.id), score: s.score,
            })),
            blindSpots: (row.blind_spots || []).map((b: any) => ({
              id: b.id, name: resolveDimensionName(b.id), score: b.score,
            })),
            hiddenStrengths: (row.hidden_strengths || []).map((h: any) => ({
              id: h.id, name: resolveDimensionName(h.id), score: h.score,
            })),
            motivationProfile: row.motivation_profile || { primary: '', secondary: '' },
            careerScores: row.career_scores?.departments?.map((d: any) => ({
              clusterId: d.departmentId, fitScore: d.fitScore,
            })) || row.career_scores?.clusters || [],
            careerRecommendations: row.career_scores?.departments ? {
              primaryDepartmentId: row.career_scores.departments[0]?.departmentId || '',
              topDepartments: (row.career_scores.departments || []).slice(0, 3).map((d: any) => ({
                departmentId: d.departmentId,
                departmentName: d.departmentName,
                fitScore: d.fitScore,
                topCategories: d.topCategories || [],
              })),
              recommendedSubjects: [],
              recommendedSkills: [],
              recommendedExperiences: [],
            } : null,
            roadmap: row.roadmap || {},
          };
          setDisplayData(dbDisplayData);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load results');
        setLoading(false);
      });
  }, [location.state, user.userId]);

  return {
    loading,
    pipelineResult,
    displayData,
    error,
    hasResults: displayData !== null,
  };
}
