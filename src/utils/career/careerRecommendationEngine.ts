import subjectMappings from '../../data/career/subjectMappings.json';
import skillRecommendations from '../../data/career/skillRecommendations.json';
import experienceRecommendations from '../../data/career/experienceRecommendations.json';
import type { DepartmentFitResult } from './careerFitEngine';

export interface CareerRecommendation {
  /** The primary (top) department ID */
  primaryDepartmentId: string;
  /** Top 3 departments with scores and categories */
  topDepartments: {
    departmentId: string;
    departmentName: string;
    fitScore: number;
    topCategories: string[];
  }[];
  /** Recommended academic subjects (from primary department) */
  recommendedSubjects: string[];
  /** Recommended skills to build (from primary department) */
  recommendedSkills: string[];
  /** Recommended experiences (from primary department) */
  recommendedExperiences: string[];
}

export class CareerRecommendationEngine {
  /**
   * Generates career recommendations based on the student's top matched departments.
   * Returns: Top 3 departments with categories, plus subjects/skills/experiences.
   *
   * NOTE: No specific professions are included in the recommendation output.
   * Professions are dynamic and are browsed via the Career Library page.
   */
  static generateRecommendations(
    topDepartments: DepartmentFitResult[]
  ): CareerRecommendation | null {

    const primaryDept = topDepartments[0];
    if (!primaryDept) return null;

    // Pass ALL departments — ranked by fit score — so the UI can display everything
    const allDepts = topDepartments.map(d => ({
      departmentId: d.departmentId,
      departmentName: d.departmentName,
      fitScore: d.fitScore,
      topCategories: d.topCategories,
    }));

    // Extract recommendations keyed by department ID
    const subjects = (subjectMappings as Record<string, string[]>)[primaryDept.departmentId] || [];
    const skills = (skillRecommendations as Record<string, string[]>)[primaryDept.departmentId] || [];
    const experiences = (experienceRecommendations as Record<string, string[]>)[primaryDept.departmentId] || [];

    return {
      primaryDepartmentId: primaryDept.departmentId,
      topDepartments: allDepts,
      recommendedSubjects: subjects,
      recommendedSkills: skills,
      recommendedExperiences: experiences,
    };
  }
}
