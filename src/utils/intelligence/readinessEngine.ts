export class ReadinessEngine {
  /**
   * Calculates the Future Readiness Score.
   * Based on core resilience, adaptability, and execution dimensions.
   */
  static calculate(dimensionScores: Record<string, number>): number {
    const weights = {
      DIM_PERS_04: 0.30, // Resilience
      DIM_COG_04: 0.25,  // Creative Problem Solving (Adaptability)
      DIM_LRN_01: 0.25,  // Self-Directed Learning
      DIM_WRK_01: 0.20   // Execution Focus
    };

    let score = 0;
    for (const [dimId, weight] of Object.entries(weights)) {
      score += (dimensionScores[dimId] || 0) * weight;
    }

    return parseFloat(score.toFixed(2));
  }
}
