export class MotivationEngine {
  /**
   * Evaluates the 3 motivation dimensions to determine the student's primary driving force.
   */
  static determineMotivationProfile(dimensionScores: Record<string, number>): { primary: string; secondary: string } {
    const motivations = [
      { id: 'DIM_MOT_01', score: dimensionScores['DIM_MOT_01'] || 0, label: 'Intrinsic Mastery' },
      { id: 'DIM_MOT_02', score: dimensionScores['DIM_MOT_02'] || 0, label: 'Extrinsic Achievement' },
      { id: 'DIM_MOT_03', score: dimensionScores['DIM_MOT_03'] || 0, label: 'Purpose & Impact' }
    ].sort((a, b) => b.score - a.score);

    return {
      primary: motivations[0].label,
      secondary: motivations[1].label
    };
  }
}
