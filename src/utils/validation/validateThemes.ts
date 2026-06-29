import themes from '../../data/intelligence/themes.json';
import themeWeights from '../../data/intelligence/themeWeights.json';

export class ThemeValidator {
  static validate() {
    const totalThemes = themes.length;
    const hasAllWeights = themes.every(t => (themeWeights as any)[t.id]);
    
    // Check if every weight matrix sums exactly to 1.0
    const invalidWeights = Object.entries(themeWeights).filter(([_id, matrix]) => {
      const sum = Object.values(matrix).reduce((acc: number, val: any) => acc + val, 0);
      return Math.abs(sum - 1.0) > 0.01;
    });

    return {
      isValid: totalThemes === 12 && hasAllWeights && invalidWeights.length === 0,
      metrics: {
        totalThemes,
        totalMatrices: Object.keys(themeWeights).length
      },
      errors: [
        totalThemes !== 12 && `Expected 12 themes, got ${totalThemes}`,
        !hasAllWeights && `Missing weight matrices for some themes`,
        invalidWeights.length > 0 && `Weight matrices do not sum to 1.0 for: ${invalidWeights.map(w => w[0]).join(', ')}`
      ].filter(Boolean)
    };
  }
}
