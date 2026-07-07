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
 * Pre-calculates the theoretical maximum weight sum for a specific group of dimensions,
 * for EACH department. This completely removes the structural bias where departments
 * with fewer mapped dimensions could never reach a 100% fit score.
 */
function getTheoreticalMaxWeights(dimGroup: string[]): Map<string, number> {
  const maxWeights = new Map<string, number>();
  const dimMappings = dimensionToDepartmentMappings as unknown as Record<string, Record<string, number | string>>;

  for (const dimId of dimGroup) {
    const mapping = dimMappings[dimId];
    if (!mapping) continue;

    for (const [deptId, weight] of Object.entries(mapping)) {
      if (deptId.startsWith('_')) continue;
      if (typeof weight !== 'number') continue;

      const current = maxWeights.get(deptId) || 0;
      maxWeights.set(deptId, current + weight);
    }
  }

  return maxWeights;
}

/** Dimension groups for the 4 career scoring signals */
const INTEREST_DIMS = ['DIM_INT_01', 'DIM_INT_02', 'DIM_INT_03', 'DIM_MOT_01', 'DIM_MOT_02', 'DIM_MOT_03'];
const SKILLS_DIMS = ['DIM_COG_01', 'DIM_COG_02', 'DIM_COG_03', 'DIM_COG_04', 'DIM_WRK_01', 'DIM_WRK_02', 'DIM_WRK_03'];
const LEARNING_DIMS = ['DIM_LRN_01', 'DIM_LRN_02', 'DIM_LRN_03', 'DIM_LRN_04'];

/** Pre-computed max weights per department for normalization */
const MAX_WEIGHTS_INTEREST = getTheoreticalMaxWeights(INTEREST_DIMS);
const MAX_WEIGHTS_SKILLS = getTheoreticalMaxWeights(SKILLS_DIMS);
const MAX_WEIGHTS_LEARNING = getTheoreticalMaxWeights(LEARNING_DIMS);

/** BASE signal weight allocation */
const BASE_THEME_WEIGHT = 40;
const BASE_INTEREST_WEIGHT = 25;
const BASE_SKILLS_WEIGHT = 20;
const BASE_LEARNING_WEIGHT = 15;

export class CareerFitEngine {

  static calculateFit(
    topThemes: ThemeScore[],
    _readinessScore: number,
    _successIndex: number,
    dimensionScores: Record<string, number>
  ): DepartmentFitResult[] {

    // ════════════════════════════════════════════
    // SIGNAL 1: Theme Match (40%)
    // ════════════════════════════════════════════
    const themeDeptMap = new Map<string, number>();
    const themeMaxWeights = new Map<string, number>();

    topThemes.forEach((theme, index) => {
      const positionWeight = index === 0 ? 1.0 : index === 1 ? 0.6 : 0.3;
      const mappings = (themeToDepartmentMappings as Record<string, { departmentId: string; weight: number }[]>)[theme.themeId] || [];

      mappings.forEach(({ departmentId, weight }) => {
        // Track the raw score
        const currentScore = themeDeptMap.get(departmentId) || 0;
        themeDeptMap.set(departmentId, currentScore + (theme.normalizedScore * positionWeight * weight));
        
        // Track the max theoretical weight for this department
        const currentMax = themeMaxWeights.get(departmentId) || 0;
        themeMaxWeights.set(departmentId, currentMax + (positionWeight * weight));
      });
    });

    // ════════════════════════════════════════════
    // SIGNALS 2-4: Calculate raw scores
    // ════════════════════════════════════════════
    const interestDeptMap = this.calculateDimensionSignal(dimensionScores, INTEREST_DIMS);
    const skillsDeptMap = this.calculateDimensionSignal(dimensionScores, SKILLS_DIMS);
    const learningDeptMap = this.calculateDimensionSignal(dimensionScores, LEARNING_DIMS);

    // ════════════════════════════════════════════
    // COMBINE ALL 4 SIGNALS (With Dynamic Redistribution)
    // ════════════════════════════════════════════
    const allDeptIds = new Set<string>();
    for (const dept of careerLibrary.departments) {
      allDeptIds.add(dept.id);
    }

    const results: DepartmentFitResult[] = [];

    allDeptIds.forEach(departmentId => {
      // Determine valid signals for this specific department
      const themeMaxWeight = themeMaxWeights.get(departmentId) || 0;
      const interestMaxWeight = MAX_WEIGHTS_INTEREST.get(departmentId) || 0;
      const skillsMaxWeight = MAX_WEIGHTS_SKILLS.get(departmentId) || 0;
      const learningMaxWeight = MAX_WEIGHTS_LEARNING.get(departmentId) || 0;

      // Calculate total available base weight based on valid signals
      let validBaseWeight = 0;
      if (themeMaxWeight > 0) validBaseWeight += BASE_THEME_WEIGHT;
      if (interestMaxWeight > 0) validBaseWeight += BASE_INTEREST_WEIGHT;
      if (skillsMaxWeight > 0) validBaseWeight += BASE_SKILLS_WEIGHT;
      if (learningMaxWeight > 0) validBaseWeight += BASE_LEARNING_WEIGHT;

      // Fallback if department has completely empty mappings in JSON (should never happen)
      if (validBaseWeight === 0) validBaseWeight = 100;

      // Calculate dynamic distributed weights (forces total to 100)
      const dynamicThemeWeight = (BASE_THEME_WEIGHT / validBaseWeight) * 100;
      const dynamicInterestWeight = (BASE_INTEREST_WEIGHT / validBaseWeight) * 100;
      const dynamicSkillsWeight = (BASE_SKILLS_WEIGHT / validBaseWeight) * 100;
      const dynamicLearningWeight = (BASE_LEARNING_WEIGHT / validBaseWeight) * 100;

      // Calculate final scaled scores
      let finalFit = 0;

      if (themeMaxWeight > 0) {
        const themeRaw = themeDeptMap.get(departmentId) || 0;
        finalFit += (themeRaw / (themeMaxWeight * 100)) * dynamicThemeWeight;
      }

      if (interestMaxWeight > 0) {
        const interestRaw = interestDeptMap.get(departmentId) || 0;
        finalFit += (interestRaw / (interestMaxWeight * 100)) * dynamicInterestWeight;
      }

      if (skillsMaxWeight > 0) {
        const skillsRaw = skillsDeptMap.get(departmentId) || 0;
        finalFit += (skillsRaw / (skillsMaxWeight * 100)) * dynamicSkillsWeight;
      }

      if (learningMaxWeight > 0) {
        const learningRaw = learningDeptMap.get(departmentId) || 0;
        finalFit += (learningRaw / (learningMaxWeight * 100)) * dynamicLearningWeight;
      }

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
   * Calculates raw dimension-to-department scores for a specific group of dimensions.
   */
  private static calculateDimensionSignal(
    dimensionScores: Record<string, number>,
    dimGroup: string[]
  ): Map<string, number> {
    const deptMap = new Map<string, number>();
    const dimMappings = dimensionToDepartmentMappings as unknown as Record<string, Record<string, number | string>>;

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

    return deptMap;
  }
}
