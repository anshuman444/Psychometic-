/**
 * Assessment Orchestrator
 * 
 * The master pipeline that wires ALL existing intelligence engines together
 * in a single end-to-end execution flow.
 * 
 * Pipeline:
 * 1. Validate & structure raw responses
 * 2. Quality control checks (straight-lining, speed completion)
 * 3. Calculate 22 dimension scores (6-30 raw → 0-100 normalized)
 * 4. Calculate 12 Future Potential Themes
 * 5. Calculate Future Readiness Score + Future Success Index
 * 6. Extract Strengths, Blind Spots, Hidden Strengths
 * 7. Determine Motivation Profile
 * 8. Calculate Career Fit Scores + Recommendations
 * 9. Generate 365-Day Growth Roadmap
 * 10. Generate Intelligence Fingerprint Hash
 * 11. Assemble complete result payload
 * 12. Persist to Supabase
 */

import questionsData from '../data/questions_master.json';

// Engine imports
import { calculateDimensionScore, detectStraightLining } from '../utils/scoringEngine';
import { processNormalizedDimensions, type NormalizedDimension } from '../utils/intelligence/normalizationEngine';
import { calculateThemes } from '../utils/intelligence/themeEngine';
import { ReadinessEngine } from '../utils/intelligence/readinessEngine';
import { SuccessEngine } from '../utils/intelligence/successEngine';
import { StrengthEngine } from '../utils/intelligence/strengthEngine';
import { BlindSpotEngine } from '../utils/intelligence/blindSpotEngine';
import { HiddenStrengthEngine } from '../utils/intelligence/hiddenStrengthEngine';
import { MotivationEngine } from '../utils/intelligence/motivationEngine';
import { generateVisualProfileData } from '../utils/intelligence/fingerprintEngine';
import { CareerFitEngine, type DepartmentFitResult } from '../utils/career/careerFitEngine';
import { CareerRecommendationEngine, type CareerRecommendation } from '../utils/career/careerRecommendationEngine';
import { GrowthRoadmapEngine } from '../utils/roadmap/growthRoadmapEngine';
import { ThemeCalculationEngine, type ThemeScore } from '../utils/intelligence/themeCalculation';

// Services
import { saveAssessmentResult } from './supabaseService';

// Types
import type { Question, Response, DimensionScore } from '../types/assessment';

// =============================================
// Input / Output Types
// =============================================

export interface RawAnswer {
  questionId: string;
  rawValue: number;       // 1-5 Likert scale
  timeToAnswerSec: number;
}

export interface OrchestratorResult {
  /** Unique ID from Supabase (or mock) */
  resultId: string;

  /** Quality Metrics */
  qualityMetrics: {
    isStraightLined: boolean;
    isSpeedCompleted: boolean;
    totalTimeSec: number;
    averageTimePerQuestion: number;
  };

  /** 22 Dimension Scores (normalized 0-100) */
  dimensions: NormalizedDimension[];

  /** 12 Future Potential Themes (ranked) */
  themes: ReturnType<typeof calculateThemes>;

  /** High-Level Scores */
  readinessScore: number;
  successIndex: number;

  /** Strengths & Growth */
  topStrengths: { id: string; score: number }[];
  blindSpots: { id: string; score: number }[];
  hiddenStrengths: { id: string; score: number }[];

  /** Motivation */
  motivationProfile: { primary: string; secondary: string };

  /** Career Fit — Department-based */
  careerScores: { clusterId: string; fitScore: number }[]; // backward compat
  careerDepartments: DepartmentFitResult[];
  careerRecommendations: CareerRecommendation | null;

  /** Growth Roadmap */
  roadmap: ReturnType<typeof GrowthRoadmapEngine.generateRoadmap>;

  /** Intelligence Fingerprint */
  fingerprint: ReturnType<typeof generateVisualProfileData>;
}

// =============================================
// Build Questions Lookup Map
// =============================================

const questionsMap = new Map<string, Question>();
for (const q of questionsData) {
  questionsMap.set(q.id, {
    id: q.id,
    dimensionId: q.dimensionId,
    text: q.text,
    isReverseScored: q.isReverseScored,
    expectedCompletionTimeSec: q.expectedCompletionTimeSec || 10,
    // CRITICAL: Must pass type + correctAnswer so scoringEngine correctly handles MCQ dimensions
    type: (q as any).type,
    correctAnswer: (q as any).correctAnswer,
    options: (q as any).options,
  });
}

/** Get all unique dimension IDs from the question bank */
const allDimensionIds = [...new Set(questionsData.map(q => q.dimensionId))];

// =============================================
// Main Orchestrator
// =============================================

export async function runAssessmentPipeline(
  userId: string,
  rawAnswers: RawAnswer[]
): Promise<OrchestratorResult> {

  // ─────────────────────────────────────────
  // Step 1: Structure raw responses
  // ─────────────────────────────────────────
  const responses: Response[] = rawAnswers.map(a => {
    const question = questionsMap.get(a.questionId);
    if (!question) {
      throw new Error(`Unknown question ID: ${a.questionId}`);
    }
    return {
      questionId: a.questionId,
      dimensionId: question.dimensionId,
      rawValue: a.rawValue,
      calculatedValue: 0, // Will be set by scoring engine
      timeToAnswerSec: a.timeToAnswerSec,
    };
  });

  // ─────────────────────────────────────────
  // Step 2: Quality control
  // ─────────────────────────────────────────
  const isStraightLined = detectStraightLining(responses);
  const totalTimeSec = responses.reduce((sum, r) => sum + r.timeToAnswerSec, 0);
  const averageTimePerQuestion = totalTimeSec / responses.length;
  const isSpeedCompleted = averageTimePerQuestion < 2; // Less than 2s per question

  const qualityMetrics = {
    isStraightLined,
    isSpeedCompleted,
    totalTimeSec: Math.round(totalTimeSec),
    averageTimePerQuestion: parseFloat(averageTimePerQuestion.toFixed(2)),
  };

  // ─────────────────────────────────────────
  // Step 3: Calculate 22 Dimension Scores (raw 6-30)
  // ─────────────────────────────────────────
  const rawDimensionScores: DimensionScore[] = allDimensionIds.map(dimId =>
    calculateDimensionScore(dimId, responses, questionsMap)
  );

  // ─────────────────────────────────────────
  // Step 4: Normalize to 0-100 scale
  // ─────────────────────────────────────────
  const normalizedDimensions = processNormalizedDimensions(
    rawDimensionScores.map(d => ({ dimensionId: d.dimensionId, score: d.score }))
  );

  // Build a lookup map of dimensionId → normalizedScore for downstream engines
  const dimScoreMap: Record<string, number> = {};
  for (const d of normalizedDimensions) {
    dimScoreMap[d.dimensionId] = d.normalizedScore;
  }

  // ─────────────────────────────────────────
  // Step 5: Calculate 12 Future Potential Themes
  // ─────────────────────────────────────────
  const themes = calculateThemes(normalizedDimensions);

  // Also calculate via the ThemeCalculationEngine for career fit compatibility
  const themeCalcScores: ThemeScore[] = ThemeCalculationEngine.calculateThemes(dimScoreMap);

  // ─────────────────────────────────────────
  // Step 6: Readiness Score + Success Index
  // ─────────────────────────────────────────
  const readinessScore = ReadinessEngine.calculate(dimScoreMap);
  const successIndex = SuccessEngine.calculate(dimScoreMap);

  // ─────────────────────────────────────────
  // Step 7: Strengths, Blind Spots, Hidden Strengths
  // ─────────────────────────────────────────
  const topStrengths = StrengthEngine.extractTopStrengths(dimScoreMap);
  const blindSpots = BlindSpotEngine.extractBlindSpots(dimScoreMap);
  const hiddenStrengths = HiddenStrengthEngine.extractHiddenStrengths(dimScoreMap, topStrengths);

  // ─────────────────────────────────────────
  // Step 8: Motivation Profile
  // ─────────────────────────────────────────
  const motivationProfile = MotivationEngine.determineMotivationProfile(dimScoreMap);

  // ─────────────────────────────────────────
  // Step 9: Career Fit Scores + Recommendations (Department-based)
  // ─────────────────────────────────────────
  const top3Themes = themeCalcScores.slice(0, 3);
  const careerDepartments = CareerFitEngine.calculateFit(top3Themes, readinessScore, successIndex, dimScoreMap);
  const careerRecommendations = CareerRecommendationEngine.generateRecommendations(careerDepartments);

  // Backward-compatible careerScores (maps departments to the old { clusterId, fitScore } shape)
  const careerScores = careerDepartments.map(d => ({
    clusterId: d.departmentId,
    fitScore: d.fitScore,
  }));

  // ─────────────────────────────────────────
  // Step 10: Growth Roadmap
  // ─────────────────────────────────────────
  const primaryCareerCluster = careerDepartments[0]?.departmentId || 'GENERAL';
  const roadmap = GrowthRoadmapEngine.generateRoadmap(primaryCareerCluster, blindSpots, topStrengths);

  // ─────────────────────────────────────────
  // Step 11: Intelligence Fingerprint
  // ─────────────────────────────────────────
  const fingerprint = generateVisualProfileData(normalizedDimensions);

  // ─────────────────────────────────────────
  // Step 12: Persist to Supabase
  // ─────────────────────────────────────────
  const dbResult = await saveAssessmentResult(userId, {
    assessment_version: '1.0.0',
    status: isStraightLined || isSpeedCompleted ? 'flagged' : 'completed',
    readiness_score: readinessScore,
    success_score: successIndex,
    fingerprint_hash: fingerprint.hash,
    dimension_scores: {
      version: '1.0',
      dimensions: normalizedDimensions.map(d => ({
        id: d.dimensionId,
        rawScore: d.rawScore,
        normalizedScore: d.normalizedScore,
        tier: d.tier,
      })),
    },
    theme_scores: {
      version: '1.0',
      themes: themes.map(t => ({
        id: t.themeId,
        name: t.name,
        score: t.score,
        rankPosition: t.rankPosition,
      })),
    },
    career_scores: {
      version: '2.0',
      departments: careerDepartments.map(d => ({
        departmentId: d.departmentId,
        departmentName: d.departmentName,
        fitScore: d.fitScore,
        topCategories: d.topCategories,
      })),
    },
    strengths: topStrengths,
    hidden_strengths: hiddenStrengths,
    blind_spots: blindSpots,
    motivation_profile: motivationProfile,
    roadmap,
    raw_responses: rawAnswers,
    quality_metrics: qualityMetrics,
  });

  return {
    resultId: dbResult?.id || 'local-' + Date.now(),
    qualityMetrics,
    dimensions: normalizedDimensions,
    themes,
    readinessScore,
    successIndex,
    topStrengths,
    blindSpots,
    hiddenStrengths,
    motivationProfile,
    careerScores,
    careerDepartments,
    careerRecommendations,
    roadmap,
    fingerprint,
  };
}
