/**
 * VidyaLoop Psychometric Engine Schemas
 */

export type DimensionCategory = 
  | 'Personality' 
  | 'LearningStyle' 
  | 'SkillsAndAbilities' 
  | 'CareerInterest';

export interface Question {
  id: string;
  dimensionId: string;
  text: string;
  isReverseScored: boolean;
  // Metadata for quality control and analytics
  expectedCompletionTimeSec: number;
}

export interface DimensionNarrative {
  summary: string;
  keyStrengths: string[];
  potentialChallenges: string[];
  idealLearningEnvironment: string;
  whatThisMeansForYou: string;
}

export interface DimensionDefinition {
  id: string;
  name: string;
  category: DimensionCategory;
  purpose: string;
  whatThisMeasures: string;
  whyItMatters: string;
  
  // Traits mapping based on score ranges
  traits: {
    low: string[];     // 6-13
    medium: string[];  // 14-22
    high: string[];    // 23-30
  };

  // Pre-calculated narrative logic depending on final score tier
  narrativeLogic: {
    low: DimensionNarrative;
    medium: DimensionNarrative;
    high: DimensionNarrative;
  };
}

export interface Response {
  questionId: string;
  dimensionId: string;
  rawValue: number; // 1-5 (Strongly Disagree to Strongly Agree)
  calculatedValue: number; // Post reverse-scoring
  timeToAnswerSec: number; // For speed completion detection
}

export interface AssessmentSession {
  sessionId: string;
  studentId: string;
  startTime: string;
  endTime?: string;
  status: 'in_progress' | 'completed' | 'flagged';
  responses: Record<string, Response>;
  qualityMetrics: {
    isStraightLined: boolean;
    isSpeedCompleted: boolean;
    consistencyScore: number; // 0-100
  };
}

export interface DimensionScore {
  dimensionId: string;
  score: number; // 6-30
  tier: 'low' | 'medium' | 'high';
}

export interface Theme {
  id: string;
  name: string; // e.g., "Innovator", "Strategist"
  requiredDimensions: { dimensionId: string; minScore: number }[];
  description: string;
}
