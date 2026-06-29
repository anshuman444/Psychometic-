import careerDatabase from '../../data/career/careerDatabase.json';
import subjectMappings from '../../data/career/subjectMappings.json';
import skillRecommendations from '../../data/career/skillRecommendations.json';
import experienceRecommendations from '../../data/career/experienceRecommendations.json';

export class CareerRecommendationEngine {
  /**
   * Generates deep recommendations (Subjects, Skills, Experiences, Specific Careers)
   * based on the student's top matched Career Clusters.
   */
  static generateRecommendations(topClusters: { clusterId: string; fitScore: number }[]) {
    const primaryClusterId = topClusters[0]?.clusterId;
    
    if (!primaryClusterId) return null;

    // 1. Extract Specific Careers
    const specificCareers = careerDatabase.filter(c => c.clusterId === primaryClusterId);

    // 2. Extract Academic Subjects
    const subjects = (subjectMappings as any)[primaryClusterId] || [];

    // 3. Extract Skills
    const skills = (skillRecommendations as any)[primaryClusterId] || [];

    // 4. Extract Experiences
    const experiences = (experienceRecommendations as any)[primaryClusterId] || [];

    return {
      primaryClusterId,
      recommendedCareers: specificCareers,
      recommendedSubjects: subjects,
      recommendedSkills: skills,
      recommendedExperiences: experiences
    };
  }
}
