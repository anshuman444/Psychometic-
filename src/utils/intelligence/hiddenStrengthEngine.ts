export class HiddenStrengthEngine {
  /**
   * Identifies hidden strengths. These are dimensions where the score is unexpectedly high 
   * (e.g., >= 70) relative to their overall average, but perhaps not in their top 5.
   * Or, specific combinations of traits that form a unique 'hidden' capability.
   */
  static extractHiddenStrengths(dimensionScores: Record<string, number>, topStrengths: {id: string}[]): { id: string; score: number }[] {
    const topIds = topStrengths.map(s => s.id);
    
    // Find scores > 65 that are NOT in the top strengths
    const hidden = Object.entries(dimensionScores)
      .filter(([id, score]) => score >= 65 && !topIds.includes(id))
      .map(([id, score]) => ({ id, score }))
      .sort((a, b) => b.score - a.score);
    
    return hidden.slice(0, 3);
  }
}
