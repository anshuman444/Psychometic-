/**
 * Theme Engine
 * 
 * Calculates the scores for the 12 Future Potential Themes using the normalized
 * dimension scores and the configurable weight matrix in themes.json.
 */

import themesConfig from '../../data/intelligence/themes.json';
import themeWeightsConfig from '../../data/intelligence/themeWeights.json';
import type { NormalizedDimension } from './normalizationEngine';

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
}

export interface CalculatedTheme {
  themeId: string;
  name: string;
  score: number; // 0-100
  rankPosition: number;
}

/**
 * Calculates all 12 themes for a student and ranks them.
 */
export function calculateThemes(normalizedDimensions: NormalizedDimension[]): CalculatedTheme[] {
  // Convert dimensions array to a fast lookup map
  const dimMap = new Map<string, number>();
  for (const d of normalizedDimensions) {
    dimMap.set(d.dimensionId, d.normalizedScore);
  }

  const calculatedThemes: CalculatedTheme[] = [];

  // Type assert the imported JSON
  const themes = themesConfig as ThemeConfig[];
  const weights = themeWeightsConfig as Record<string, Record<string, number>>;

  for (const theme of themes) {
    let themeScore = 0;
    let totalWeight = 0;
    const themeWeights = weights[theme.id];

    if (!themeWeights) {
      console.warn(`No weights defined for theme ${theme.id}`);
      continue;
    }

    // Calculate weighted sum
    for (const [dimId, weight] of Object.entries(themeWeights)) {
      const dimScore = dimMap.get(dimId);
      
      if (dimScore === undefined) {
        console.warn(`Dimension ${dimId} required for Theme ${theme.name} is missing.`);
        continue;
      }

      themeScore += dimScore * weight;
      totalWeight += weight;
    }

    // Normalize back to 100 if weights don't perfectly sum to 1.0 due to missing data or config error
    if (totalWeight > 0) {
      themeScore = themeScore / totalWeight;
    }

    calculatedThemes.push({
      themeId: theme.id,
      name: theme.name,
      score: Math.round(themeScore * 100) / 100,
      rankPosition: 0 // Will be set after sorting
    });
  }

  // Rank themes descending by score
  calculatedThemes.sort((a, b) => b.score - a.score);

  // Assign rank positions
  calculatedThemes.forEach((theme, index) => {
    theme.rankPosition = index + 1;
  });

  return calculatedThemes;
}

/**
 * Helper to get the top N themes for a student.
 */
export function getTopThemes(themes: CalculatedTheme[], count: number = 3): CalculatedTheme[] {
  return themes.slice(0, count);
}
