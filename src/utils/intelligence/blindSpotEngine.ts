export class BlindSpotEngine {
  /**
   * Identifies dimensions with dangerously low scores (e.g., < 30) that might act 
   * as critical roadblocks or "blind spots" for the student.
   */
  static extractBlindSpots(dimensionScores: Record<string, number>): { id: string; score: number }[] {
    const blindSpots = Object.entries(dimensionScores)
      .filter(([_id, score]) => score < 30)
      .map(([id, score]) => ({ id, score }))
      .sort((a, b) => a.score - b.score); // Lowest first
    
    return blindSpots.slice(0, 3); // Top 3 most critical blind spots
  }
}
