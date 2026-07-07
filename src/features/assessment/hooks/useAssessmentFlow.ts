/**
 * useAssessmentFlow — State management hook for the 132-question assessment.
 * 
 * Features:
 * - Tracks current question index, all responses, and timing
 * - localStorage persistence every 5 questions (crash recovery)
 * - Orchestrator integration on completion
 * - Flow state machine: intro → active → calculating → completed
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import questionsData from '../../../data/questions_master.json';
import type { RawAnswer } from '../../../services/assessmentOrchestrator';
import { runAssessmentPipeline, type OrchestratorResult } from '../../../services/assessmentOrchestrator';

const STORAGE_KEY = 'vidyaloop_assessment_progress';
const PERSIST_INTERVAL = 5; // Save every 5 questions

export type FlowPhase = 'intro' | 'active' | 'calculating' | 'completed' | 'error';

interface PersistedState {
  currentIndex: number;
  responses: Record<string, RawAnswer>;
  startTime: number;
}

export interface AssessmentFlowState {
  phase: FlowPhase;
  currentIndex: number;
  totalQuestions: number;
  currentQuestion: typeof questionsData[0] | null;
  progress: number; // 0-100
  responses: Record<string, RawAnswer>;
  result: OrchestratorResult | null;
  error: string | null;
  /** Current dimension name for the active question */
  currentDimensionName: string;
  /** Estimated minutes remaining */
  estimatedMinutesLeft: number;
}

export interface AssessmentFlowActions {
  startAssessment: () => void;
  answerQuestion: (rawValue: number) => void;
  goBack: () => void;
  resetAssessment: () => void;
}

export function useAssessmentFlow(userId: string): [AssessmentFlowState, AssessmentFlowActions] {
  const [phase, setPhase] = useState<FlowPhase>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, RawAnswer>>({});
  const [result, setResult] = useState<OrchestratorResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const questionStartTime = useRef<number>(Date.now());
  const sessionStartTime = useRef<number>(Date.now());

  const totalQuestions = questionsData.length;
  const currentQuestion = phase === 'active' ? questionsData[currentIndex] || null : null;
  const progress = totalQuestions > 0 ? Math.round((Object.keys(responses).length / totalQuestions) * 100) : 0;

  // Dimension name lookup — must match dimensionDefinitions.json exactly
  const dimensionNameMap: Record<string, string> = {
    DIM_PERS_01: 'Openness', DIM_PERS_02: 'Conscientiousness', DIM_PERS_03: 'Social Energy',
    DIM_PERS_04: 'Resilience', DIM_PERS_05: 'Empathy',
    DIM_COG_01: 'Abstract Reasoning', DIM_COG_02: 'Analytical Thinking',
    DIM_COG_03: 'Strategic Thinking', DIM_COG_04: 'Creative Problem Solving',
    DIM_LRN_01: 'Self-Directed Learning', DIM_LRN_02: 'Hands-on Application',
    DIM_LRN_03: 'Collaborative Learning', DIM_LRN_04: 'Structured Learning',
    DIM_MOT_01: 'Intrinsic Drive', DIM_MOT_02: 'Extrinsic Ambition', DIM_MOT_03: 'Purpose Orientation',
    DIM_WRK_01: 'Execution Focus', DIM_WRK_02: 'Quality Focus', DIM_WRK_03: 'Autonomy Preference',
    DIM_INT_01: 'Technical Interest', DIM_INT_02: 'Scientific Interest', DIM_INT_03: 'Creative Interest',
  };

  const currentDimensionName = currentQuestion
    ? dimensionNameMap[currentQuestion.dimensionId] || currentQuestion.dimensionId
    : '';

  const answeredCount = Object.keys(responses).length;
  const remainingQuestions = totalQuestions - answeredCount;
  const estimatedMinutesLeft = Math.ceil((remainingQuestions * 9) / 60); // ~9s avg per question

  // ─── Restore from localStorage on mount ───
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: PersistedState = JSON.parse(saved);
        if (Object.keys(parsed.responses).length > 0) {
          setResponses(parsed.responses);
          setCurrentIndex(parsed.currentIndex);
          setPhase('active');
          sessionStartTime.current = parsed.startTime;
        }
      }
    } catch {
      // Silently ignore corrupted localStorage
    }
  }, []);

  // ─── Actions ───

  const startAssessment = useCallback(() => {
    setPhase('active');
    setCurrentIndex(0);
    setResponses({});
    setResult(null);
    setError(null);
    sessionStartTime.current = Date.now();
    questionStartTime.current = Date.now();
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const answerQuestion = useCallback((rawValue: number) => {
    if (!currentQuestion) return;

    const timeToAnswer = (Date.now() - questionStartTime.current) / 1000;

    const answer: RawAnswer = {
      questionId: currentQuestion.id,
      rawValue,
      timeToAnswerSec: parseFloat(timeToAnswer.toFixed(2)),
    };

    const newResponses = { ...responses, [currentQuestion.id]: answer };
    setResponses(newResponses);

    const newIndex = currentIndex + 1;

    // Persist every N questions
    if (newIndex % PERSIST_INTERVAL === 0) {
      const state: PersistedState = {
        currentIndex: newIndex,
        responses: newResponses,
        startTime: sessionStartTime.current,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    // Check if assessment is complete
    if (newIndex >= totalQuestions) {
      setPhase('calculating');
      localStorage.removeItem(STORAGE_KEY);

      // Run the full pipeline
      const allAnswers = Object.values(newResponses);
      runAssessmentPipeline(userId, allAnswers)
        .then((pipelineResult) => {
          setResult(pipelineResult);
          setPhase('completed');
        })
        .catch((err) => {
          console.error('[AssessmentFlow] Pipeline error:', err);
          setError(err instanceof Error ? err.message : 'Assessment processing failed');
          setPhase('error');
        });
    } else {
      setCurrentIndex(newIndex);
      questionStartTime.current = Date.now();
    }
  }, [currentQuestion, currentIndex, responses, totalQuestions, userId]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      questionStartTime.current = Date.now();
    }
  }, [currentIndex]);

  const resetAssessment = useCallback(() => {
    setPhase('intro');
    setCurrentIndex(0);
    setResponses({});
    setResult(null);
    setError(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const state: AssessmentFlowState = {
    phase,
    currentIndex,
    totalQuestions,
    currentQuestion,
    progress,
    responses,
    result,
    error,
    currentDimensionName,
    estimatedMinutesLeft,
  };

  const actions: AssessmentFlowActions = {
    startAssessment,
    answerQuestion,
    goBack,
    resetAssessment,
  };

  return [state, actions];
}
