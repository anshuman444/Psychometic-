/**
 * Normalization Engine
 * 
 * Converts raw dimension scores (ranging from 6 to 30) into a standard
 * 0-100 percentage scale for cross-dimension comparability and dashboard rendering.
 */

const RAW_MIN = 6;
const RAW_MAX = 30;

export interface NormalizedDimension {
  dimensionId: string;
  rawScore: number;
  normalizedScore: number;
  tier: 'low' | 'medium' | 'high';
}

/**
 * Normalizes a single raw score (6-30) to a 0-100 scale.
 * 
 * Formula: ((raw - min) / (max - min)) * 100
 */
export function normalizeScore(rawScore: number): number {
  if (rawScore < RAW_MIN || rawScore > RAW_MAX) {
    throw new Error(`Raw score ${rawScore} is out of expected bounds (${RAW_MIN}-${RAW_MAX})`);
  }
  
  const normalized = ((rawScore - RAW_MIN) / (RAW_MAX - RAW_MIN)) * 100;
  
  // Return rounded to 2 decimal places
  return Math.round(normalized * 100) / 100;
}

/**
 * Processes a batch of raw dimension scores.
 */
export function processNormalizedDimensions(
  rawScores: { dimensionId: string; score: number }[]
): NormalizedDimension[] {
  return rawScores.map(d => {
    let tier: 'low' | 'medium' | 'high';
    if (d.score >= 6 && d.score <= 13) tier = 'low';
    else if (d.score >= 14 && d.score <= 22) tier = 'medium';
    else tier = 'high';

    return {
      dimensionId: d.dimensionId,
      rawScore: d.score,
      normalizedScore: normalizeScore(d.score),
      tier
    };
  });
}
