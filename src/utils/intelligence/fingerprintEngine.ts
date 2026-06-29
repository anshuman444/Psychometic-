/**
 * Intelligence Fingerprint Engine
 * 
 * Generates the unique 22-Dimension Signature Hash and Visual DNA Profile.
 * This acts as the shareable, core identity of the student on the platform.
 */

import type { NormalizedDimension } from './normalizationEngine';

export interface IntelligenceFingerprint {
  hash: string;
  visualDataPoints: number[];
  baseColorHex: string;
}

/**
 * Generates a deterministic hash representing the student's unique 22-dimension profile.
 * We use a simple bucketing approach combined with a checksum to create a readable hash.
 */
export function generateFingerprintHash(dimensions: NormalizedDimension[]): string {
  // Ensure we sort deterministically by dimensionId
  const sorted = [...dimensions].sort((a, b) => a.dimensionId.localeCompare(b.dimensionId));
  
  let hashStr = '';
  let checksum = 0;

  for (const dim of sorted) {
    // Map 0-100 to a 0-9 bucket
    const bucket = Math.floor(dim.normalizedScore / 10);
    // Ensure bucket is max 9 (if score is exactly 100)
    const normalizedBucket = Math.min(bucket, 9);
    
    hashStr += normalizedBucket.toString();
    checksum += normalizedBucket;
  }

  // Create a base36 string for a sleeker look (e.g., "VL-A4X9-...")
  const hexHash = BigInt('1' + hashStr).toString(36).toUpperCase();
  const checksumHex = checksum.toString(16).toUpperCase().padStart(2, '0');

  return `VL-${hexHash}-${checksumHex}`;
}

/**
 * Calculates a base color for the UI profile based on the primary category strength.
 */
export function generateVisualProfileData(dimensions: NormalizedDimension[]): IntelligenceFingerprint {
  
  const sorted = [...dimensions].sort((a, b) => a.dimensionId.localeCompare(b.dimensionId));
  
  // Create an array of exactly 22 data points for a complex polar visualization
  const visualDataPoints = sorted.map(d => d.normalizedScore);

  // Determine dominant category for base color
  let pSum = 0, lSum = 0, sSum = 0, cSum = 0;
  
  for (const d of dimensions) {
    if (d.dimensionId.includes('PERS')) pSum += d.normalizedScore;
    if (d.dimensionId.includes('LEARN')) lSum += d.normalizedScore;
    if (d.dimensionId.includes('SKILL')) sSum += d.normalizedScore;
    if (d.dimensionId.includes('CAREER')) cSum += d.normalizedScore;
  }

  const max = Math.max(pSum, lSum, sSum, cSum);
  let baseColorHex = '#2DA8FF'; // Default Primary

  if (max === pSum) baseColorHex = '#FF6B6B'; // Personality dominant
  if (max === lSum) baseColorHex = '#4ECDC4'; // Learning dominant
  if (max === sSum) baseColorHex = '#FFE66D'; // Skills dominant
  if (max === cSum) baseColorHex = '#2DA8FF'; // Career dominant (VidyaLoop Blue)

  return {
    hash: generateFingerprintHash(dimensions),
    visualDataPoints,
    baseColorHex
  };
}
