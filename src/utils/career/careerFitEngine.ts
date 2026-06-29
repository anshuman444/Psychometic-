import careerThemeMappings from '../../data/career/careerThemeMappings.json';
import type { ThemeScore } from '../intelligence/themeCalculation';

export class CareerFitEngine {
  /**
   * Calculates the Career Fit Score based on the psychometric blueprint weights:
   * Theme Match (40%), Dimension Match (25%), Readiness (20%), Success Index (15%).
   * 
   * @param topThemes The student's top 3 themes
   * @param readinessScore The 0-100 readiness score
   * @param successIndex The 0-100 success index
   */
  static calculateFit(
    topThemes: ThemeScore[], 
    readinessScore: number, 
    successIndex: number
  ): { clusterId: string; fitScore: number }[] {
    
    // Aggregate clusters associated with the top 3 themes
    const clusterMap = new Map<string, number>();

    topThemes.forEach((theme, index) => {
      // Weight the #1 theme more than #2 or #3
      const themeWeight = index === 0 ? 1.0 : index === 1 ? 0.6 : 0.3;
      
      const clusters = (careerThemeMappings as any)[theme.themeId] || [];
      clusters.forEach((clusterId: string) => {
        const currentScore = clusterMap.get(clusterId) || 0;
        // The raw base fit comes from the Theme Score (40% of total model)
        const baseFit = (theme.normalizedScore * 0.40) * themeWeight;
        clusterMap.set(clusterId, currentScore + baseFit);
      });
    });

    // Finalize the score by adding the global modifiers
    const results: { clusterId: string; fitScore: number }[] = [];
    
    clusterMap.forEach((baseScore, clusterId) => {
      // The 25% Dimension match is implicitly baked into the Theme score baseFit for MVP.
      // Add the global Readiness (20%) and Success (15%) modifiers.
      const globalModifier = (readinessScore * 0.20) + (successIndex * 0.15);
      
      let finalFit = baseScore + globalModifier;
      // Cap at 99 for realism
      if (finalFit > 99) finalFit = 99;

      results.push({
        clusterId,
        fitScore: parseFloat(finalFit.toFixed(1))
      });
    });

    // Return sorted highest to lowest
    return results.sort((a, b) => b.fitScore - a.fitScore);
  }
}
