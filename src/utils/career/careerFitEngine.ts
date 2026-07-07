import themeToDepartmentMappings from '../../data/career/themeToDepartmentMappings.json';
import dimensionToDepartmentMappings from '../../data/career/dimensionToDepartmentMappings.json';
import careerLibrary from '../../data/career/careerLibrary.json';
import type { ThemeScore } from '../intelligence/themeCalculation';

export interface DepartmentFitResult {
  departmentId: string;
  departmentName: string;
  fitScore: number;
  /** Top category names within this department, ranked by relevance */
  topCategories: string[];
}

/**
 * Maps department IDs to human-readable names from the career library.
 */
const deptNameMap: Record<string, string> = {};
for (const dept of careerLibrary.departments) {
  deptNameMap[dept.id] = dept.name;
}

/**
 * CareerFitEngine v4 — Blueprint-Compliant 4-Signal Architecture
 *
 * From the psychometric blueprint (RULE 5: CALCULATE CAREER MATCH):
 *
 *   Career Fit Score = Theme Match (40%)
 *                    + Career Interest Match (25%)
 *                    + Skills & Abilities Match (20%)
 *                    + Learning Style Match (15%)
 *
 * Each signal is independently calculated per department, then combined.
 *
 * SIGNAL BREAKDOWN:
 *
 *   1. Theme Match (40%):
 *      Top 3 themes → department weights (via themeToDepartmentMappings.json)
 *      Position-weighted: #1=1.0, #2=0.6, #3=0.3
 *
 *   2. Career Interest Match (25%):
 *      DIM_INT_01 (Technical), DIM_INT_02 (Scientific), DIM_INT_03 (Creative)
 *      + DIM_MOT_01 (Intrinsic), DIM_MOT_02 (Extrinsic), DIM_MOT_03 (Purpose)
 *      → department weights (via dimensionToDepartmentMappings.json)
 *
 *   3. Skills & Abilities Match (20%):
 *      DIM_COG_01 (Abstract), DIM_COG_02 (Analytical), DIM_COG_03 (Strategic),
 *      DIM_COG_04 (Creative PS), DIM_WRK_01 (Execution), DIM_WRK_02 (Quality),
 *      DIM_WRK_03 (Autonomy)
 *      → department weights (via dimensionToDepartmentMappings.json)
 *
 *   4. Learning Style Match (15%):
 *      DIM_LRN_01 (Self-Directed), DIM_LRN_02 (Hands-on),
 *      DIM_LRN_03 (Collaborative), DIM_LRN_04 (Structured)
 *      → department weights (via dimensionToDepartmentMappings.json)
 *
 * Personality dimensions (DIM_PERS_01 through DIM_PERS_05) are NOT directly
 * used in career scoring — they influence scoring INDIRECTLY through the
 * Theme Match layer, where they are the primary inputs to theme calculation.
 */

/** Dimension groups for the 4 career scoring signals */
const INTEREST_DIMS = ['DIM_INT_01', 'DIM_INT_02', 'DIM_INT_03', 'DIM_MOT_01', 'DIM_MOT_02', 'DIM_MOT_03'];
const SKILLS_DIMS = ['DIM_COG_01', 'DIM_COG_02', 'DIM_COG_03', 'DIM_COG_04', 'DIM_WRK_01', 'DIM_WRK_02', 'DIM_WRK_03'];
const LEARNING_DIMS = ['DIM_LRN_01', 'DIM_LRN_02', 'DIM_LRN_03', 'DIM_LRN_04'];

/** Signal weight allocation (must sum to 100) */
const THEME_WEIGHT = 40;
const INTEREST_WEIGHT = 25;
const SKILLS_WEIGHT = 20;
const LEARNING_WEIGHT = 15;

export class CareerFitEngine {

  static calculateFit(
    topThemes: ThemeScore[],
    readinessScore: number,
    successIndex: number,
    dimensionScores: Record<string, number>
  ): DepartmentFitResult[] {

    // ════════════════════════════════════════════
    // SIGNAL 1: Theme Match (40%)
    // ════════════════════════════════════════════
    const themeDeptMap = new Map<string, number>();

    topThemes.forEach((theme, index) => {
      const positionWeight = index === 0 ? 1.0 : index === 1 ? 0.6 : 0.3;
      const mappings = (themeToDepartmentMappings as Record<string, { departmentId: string; weight: number }[]>)[theme.themeId] || [];

      mappings.forEach(({ departmentId, weight }) => {
        const current = themeDeptMap.get(departmentId) || 0;
        themeDeptMap.set(departmentId, current + (theme.normalizedScore * positionWeight * weight));
      });
    });

    // Normalize: max theoretical = 100 * 1.0 * 0.50 + 100 * 0.6 * 0.50 + 100 * 0.3 * 0.50 = 95
    const MAX_THEME_RAW = 95;

    // ════════════════════════════════════════════
    // SIGNAL 2: Career Interest Match (25%)
    // ════════════════════════════════════════════
    const interestDeptMap = this.calculateDimensionSignal(dimensionScores, INTEREST_DIMS);

    // ════════════════════════════════════════════
    // SIGNAL 3: Skills & Abilities Match (20%)
    // ════════════════════════════════════════════
    const skillsDeptMap = this.calculateDimensionSignal(dimensionScores, SKILLS_DIMS);

    // ════════════════════════════════════════════
    // SIGNAL 4: Learning Style Match (15%)
    // ════════════════════════════════════════════
    const learningDeptMap = this.calculateDimensionSignal(dimensionScores, LEARNING_DIMS);

    // ════════════════════════════════════════════
    // COMBINE ALL 4 SIGNALS
    // ════════════════════════════════════════════
    const allDeptIds = new Set<string>();
    themeDeptMap.forEach((_, id) => allDeptIds.add(id));
    interestDeptMap.scores.forEach((_, id) => allDeptIds.add(id));
    skillsDeptMap.scores.forEach((_, id) => allDeptIds.add(id));
    learningDeptMap.scores.forEach((_, id) => allDeptIds.add(id));

    const results: DepartmentFitResult[] = [];

    allDeptIds.forEach(departmentId => {
      // Signal 1: Theme (0-40)
      const themeRaw = themeDeptMap.get(departmentId) || 0;
      const themeScore = (themeRaw / MAX_THEME_RAW) * THEME_WEIGHT;

      // Signal 2: Interest (0-25) — normalize relative to max across all departments
      const interestRaw = interestDeptMap.scores.get(departmentId) || 0;
      const interestScore = interestDeptMap.max > 0
        ? (interestRaw / interestDeptMap.max) * INTEREST_WEIGHT
        : 0;

      // Signal 3: Skills (0-20)
      const skillsRaw = skillsDeptMap.scores.get(departmentId) || 0;
      const skillsScore = skillsDeptMap.max > 0
        ? (skillsRaw / skillsDeptMap.max) * SKILLS_WEIGHT
        : 0;

      // Signal 4: Learning (0-15)
      const learningRaw = learningDeptMap.scores.get(departmentId) || 0;
      const learningScore = learningDeptMap.max > 0
        ? (learningRaw / learningDeptMap.max) * LEARNING_WEIGHT
        : 0;

      let finalFit = themeScore + interestScore + skillsScore + learningScore;
      if (finalFit > 99) finalFit = 99;

      // Find department categories
      const dept = careerLibrary.departments.find(d => d.id === departmentId);
      const topCategories = dept
        ? [...dept.categories]
            .sort((a, b) => b.professions.length - a.professions.length)
            .slice(0, 5)
            .map(c => c.name)
        : [];

      results.push({
        departmentId,
        departmentName: deptNameMap[departmentId] || departmentId,
        fitScore: parseFloat(finalFit.toFixed(1)),
        topCategories,
      });
    });

    return results.sort((a, b) => b.fitScore - a.fitScore);
  }

  /**
   * Calculates dimension-to-department scores for a specific group of dimensions.
   * Returns the raw score per department AND the maximum raw score for normalization.
   */
  private static calculateDimensionSignal(
    dimensionScores: Record<string, number>,
    dimGroup: string[]
  ): { scores: Map<string, number>; max: number } {
    const deptMap = new Map<string, number>();
    const dimMappings = dimensionToDepartmentMappings as Record<string, Record<string, number | string>>;

    for (const dimId of dimGroup) {
      const dimScore = dimensionScores[dimId];
      if (dimScore === undefined) continue;

      const mapping = dimMappings[dimId];
      if (!mapping) continue;

      for (const [deptId, weight] of Object.entries(mapping)) {
        if (deptId.startsWith('_')) continue;
        if (typeof weight !== 'number') continue;

        const current = deptMap.get(deptId) || 0;
        deptMap.set(deptId, current + (dimScore * weight));
      }
    }

    let maxScore = 0;
    deptMap.forEach(score => { if (score > maxScore) maxScore = score; });

    return { scores: deptMap, max: maxScore };
  }
}
