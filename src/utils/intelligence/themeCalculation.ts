import themeWeights from '../../data/intelligence/themeWeights.json';

export interface ThemeScore {
  themeId: string;
  rawScore: number;
  normalizedScore: number;
}

export class ThemeCalculationEngine {
  /**
   * Calculates scores for all 12 themes based on the 22 dimension scores.
   * Uses the exact psychometric blueprint formulas from themeWeights.json.
   * 
   * @param dimensionScores Map of dimensionId to its normalized score (0-100)
   */
  static calculateThemes(dimensionScores: Record<string, number>): ThemeScore[] {
    const themeScores: ThemeScore[] = [];

    for (const [themeId, weights] of Object.entries(themeWeights)) {
      let rawScore = 0;
      let totalWeight = 0;

      for (const [dimId, weight] of Object.entries(weights)) {
        if (dimensionScores[dimId] !== undefined) {
          rawScore += dimensionScores[dimId] * weight;
          totalWeight += weight;
        } else {
          console.warn(`Missing dimension score for ${dimId} when calculating ${themeId}`);
        }
      }

      // Ensure the score is properly scaled if any weights were missing, 
      // though in a perfect execution totalWeight should always equal 1.0.
      const normalizedScore = totalWeight > 0 ? (rawScore / totalWeight) : 0;

      themeScores.push({
        themeId,
        rawScore: parseFloat(rawScore.toFixed(2)),
        normalizedScore: parseFloat(normalizedScore.toFixed(2))
      });
    }

    // Return themes sorted by highest score first
    return themeScores.sort((a, b) => b.normalizedScore - a.normalizedScore);
  }
}
