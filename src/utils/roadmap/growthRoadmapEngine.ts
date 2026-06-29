import roadmapTemplates from '../../data/roadmap/roadmapTemplates.json';
import habitRecommendations from '../../data/roadmap/habitRecommendations.json';
import dimensionsData from '../../data/dimensions_part1.json';

const dimLookup = new Map(dimensionsData.map((d: any) => [d.id, d.name]));

export class GrowthRoadmapEngine {
  /**
   * Generates a highly personalized, detailed 365-day roadmap based on top career clusters, 
   * strengths, and blind spots.
   */
  static generateRoadmap(
    targetClusterId: string, 
    blindSpots: { id: string; score: number }[],
    strengths: { id: string; score: number }[]
  ) {
    const roadmap: Record<string, any> = {};

    // Helper to get dimension names nicely
    const getDimName = (id: string) => dimLookup.get(id) || id.replace('DIM_', '').replace('_', ' ');

    const topStrength = strengths.length > 0 ? getDimName(strengths[0].id) : 'Analytical Thinking';
    const topBlindSpot = blindSpots.length > 0 ? getDimName(blindSpots[0].id) : 'Structured Learning';

    // Format cluster name nicely
    const formattedCluster = targetClusterId
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());

    roadmapTemplates.forEach(template => {
      const milestones: string[] = [];

      if (template.timeframe === '30_DAYS') {
        milestones.push(`Conduct a 'Strength Audit': Spend one week noting exactly when you naturally use your ${topStrength} to solve problems.`);
        
        // Add a targeted habit if there's a matching blind spot in the data
        if (blindSpots.length > 0) {
          const habitMatch = habitRecommendations.find(h => h.targetDimension === blindSpots[0].id && h.condition === 'low');
          if (habitMatch) {
            milestones.push(`Daily Habit: ${habitMatch.habit}`);
          } else {
            milestones.push(`Begin mitigating your blind spot in ${topBlindSpot} by setting one tiny, achievable goal related to it each morning.`);
          }
        }
        
        milestones.push(`Research 3 entry-level roles or degree paths within the ${formattedCluster} cluster and write down their core skill requirements.`);
      }

      if (template.timeframe === '90_DAYS') {
        milestones.push(`Complete a short online course, bootcamp, or independent project directly related to ${formattedCluster}.`);
        milestones.push(`Find a peer or mentor who excels in ${topBlindSpot} and ask them for strategies on how they manage complex tasks.`);
        milestones.push(`Apply your core strength of ${topStrength} to a completely new context outside of your normal academic routine.`);
      }

      if (template.timeframe === '180_DAYS') {
        milestones.push(`Secure a practical opportunity (internship, club leadership, or freelance gig) within the ${formattedCluster} field.`);
        milestones.push(`Review the goals you set 6 months ago. Note how your approach to ${topBlindSpot} has shifted from a weakness to a managed skill.`);
        milestones.push(`Build a "Proof of Work" portfolio piece that physically or digitally demonstrates your abilities to future employers or colleges.`);
      }

      if (template.timeframe === '365_DAYS') {
        milestones.push(`Establish yourself as a knowledgeable contributor in ${formattedCluster} by joining a professional association, publishing a project, or leading a school initiative.`);
        milestones.push(`Take the psychometric assessment again to measure how your Intelligence Fingerprint has evolved over the past year.`);
        milestones.push(`Mentor someone else using the insights you've gained about leveraging ${topStrength} effectively.`);
      }

      roadmap[template.timeframe] = {
        focus: template.focus,
        description: template.description,
        milestones: milestones
      };
    });

    return roadmap;
  }
}
