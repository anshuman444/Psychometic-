/**
 * Normalization Engine
 * 
 * Converts raw dimension scores into a standard 0-100 percentage scale
 * for cross-dimension comparability and dashboard rendering.
 * 
 * Supports TWO score types:
 *   - Likert dimensions: raw range 6-30 (6 questions × 1-5 scale)
 *   - MCQ dimensions:    raw range 0-6  (6 questions × 0/1 correct)
 */

const LIKERT_MIN = 6;
const LIKERT_MAX = 30;
const MCQ_MIN = 0;
const MCQ_MAX = 6;

/** MCQ dimension IDs — these score 0-6 instead of 6-30 */
const MCQ_DIMENSIONS = new Set([
  'DIM_LRN_02',  // Hands-on Application
  'DIM_LRN_03',  // Collaborative Learning
  'DIM_LRN_04',  // Structured Learning
  'DIM_MOT_02',  // Extrinsic Ambition
]);

export interface NormalizedDimension {
  dimensionId: string;
  rawScore: number;
  normalizedScore: number;
  tier: 'low' | 'medium' | 'high';
}

/**
 * Normalizes a single raw score to a 0-100 scale.
 * Automatically detects MCQ vs Likert dimensions and applies the correct range.
 * 
 * Formula: ((raw - min) / (max - min)) * 100
 */
export function normalizeScore(rawScore: number, dimensionId?: string): number {
  const isMcq = dimensionId ? MCQ_DIMENSIONS.has(dimensionId) : false;
  
  const min = isMcq ? MCQ_MIN : LIKERT_MIN;
  const max = isMcq ? MCQ_MAX : LIKERT_MAX;

  // Clamp to bounds instead of throwing — prevents crashes from edge cases
  const clamped = Math.max(min, Math.min(max, rawScore));
  
  const normalized = ((clamped - min) / (max - min)) * 100;
  
  // Return rounded to 2 decimal places
  return Math.round(normalized * 100) / 100;
}

/**
 * Determines the tier for a dimension based on its raw score.
 */
function determineTier(rawScore: number, dimensionId: string): 'low' | 'medium' | 'high' {
  if (MCQ_DIMENSIONS.has(dimensionId)) {
    // MCQ: 0-2 low, 3-4 medium, 5-6 high
    if (rawScore <= 2) return 'low';
    if (rawScore <= 4) return 'medium';
    return 'high';
  } else {
    // Likert: 6-13 low, 14-22 medium, 23-30 high
    if (rawScore <= 13) return 'low';
    if (rawScore <= 22) return 'medium';
    return 'high';
  }
}

/**
 * Processes a batch of raw dimension scores.
 */
export function processNormalizedDimensions(
  rawScores: { dimensionId: string; score: number }[]
): NormalizedDimension[] {
  return rawScores.map(d => ({
    dimensionId: d.dimensionId,
    rawScore: d.score,
    normalizedScore: normalizeScore(d.score, d.dimensionId),
    tier: determineTier(d.score, d.dimensionId),
  }));
}
