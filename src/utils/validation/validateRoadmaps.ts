import roadmapTemplates from '../../data/roadmap/roadmapTemplates.json';
import habitRecommendations from '../../data/roadmap/habitRecommendations.json';

export class RoadmapValidator {
  static validate() {
    const requiredTimeframes = ['30_DAYS', '90_DAYS', '180_DAYS', '365_DAYS'];
    const actualTimeframes = roadmapTemplates.map(t => t.timeframe);
    
    const hasAllTimeframes = requiredTimeframes.every(t => actualTimeframes.includes(t));
    const hasHabits = habitRecommendations.length > 0;

    return {
      isValid: hasAllTimeframes && hasHabits,
      metrics: {
        totalTemplates: roadmapTemplates.length,
        totalHabits: habitRecommendations.length
      },
      errors: [
        !hasAllTimeframes && `Missing required timeframes (30/90/180/365)`,
        !hasHabits && `No habit recommendations found`
      ].filter(Boolean)
    };
  }
}
