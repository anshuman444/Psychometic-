import careerClusters from '../../data/career/careerClusters.json';
import careerThemeMappings from '../../data/career/careerThemeMappings.json';
import careerDatabase from '../../data/career/careerDatabase.json';

export class CareerValidator {
  static validate() {
    const clusterIds = careerClusters.map(c => c.id);
    
    // Check if every theme maps to valid clusters
    const invalidMappings = Object.entries(careerThemeMappings).filter(([_themeId, clusters]) => {
      return !clusters.every(c => clusterIds.includes(c));
    });

    // Check if all careers belong to a valid cluster
    const invalidCareers = careerDatabase.filter(c => !clusterIds.includes(c.clusterId));

    return {
      isValid: invalidMappings.length === 0 && invalidCareers.length === 0,
      metrics: {
        totalClusters: clusterIds.length,
        totalCareers: careerDatabase.length
      },
      errors: [
        invalidMappings.length > 0 && `Invalid clusters found in theme mappings`,
        invalidCareers.length > 0 && `Careers assigned to non-existent clusters`
      ].filter(Boolean)
    };
  }
}
