export class StrengthEngine {
  /**
   * Identifies the student's top core strengths from the 22 dimensions.
   * Returns dimensions scoring >= 75, sorted highest to lowest.
   */
  static extractTopStrengths(dimensionScores: Record<string, number>): { id: string; score: number }[] {
    const strengths = Object.entries(dimensionScores)
      .filter(([_id, score]) => score >= 75)
      .map(([id, score]) => ({ id, score }))
      .sort((a, b) => b.score - a.score);
    
    // Return top 5 maximum to avoid overwhelming the student
    return strengths.slice(0, 5);
  }
}
