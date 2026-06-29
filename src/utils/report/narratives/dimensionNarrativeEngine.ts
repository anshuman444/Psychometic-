/**
 * Dimension Deep-Dive Narrative Engine
 * 
 * A brand-new engine dedicated to generating the per-dimension detail pages
 * (pages 5-26 of the 30-page report). For each of the 22 dimensions, this engine 
 * produces comprehensive, multi-section narratives that form the bulk of the 
 * report's reading content.
 * 
 * Each dimension deep-dive includes:
 * - Score interpretation with plain-language context
 * - Rich multi-paragraph analysis from dimension data
 * - Behavioral indicators section
 * - Academic implications section
 * - Social dynamics analysis
 * - Career connection analysis
 * - Growth strategies with actionable steps
 * - "Did You Know?" engagement section
 * - Famous exemplars for relatability
 * - Daily life examples for recognition
 */

import type { DimensionDefinition, DimensionScore } from '../../../types/assessment';

export interface DimensionDeepDive {
  dimensionId: string;
  dimensionName: string;
  category: string;
  score: number;
  normalizedScore: number;
  tier: 'low' | 'medium' | 'high';
  
  // Generated narrative sections
  scoreInterpretation: string;
  detailedAnalysis: string;
  behavioralIndicators: string[];
  academicImplications: string;
  socialDynamics: string;
  careerConnections: string;
  growthStrategies: string[];
  didYouKnow: string;
  famousExemplars: string[];
  dailyLifeExamples: string[];
  parentInsights: string;
  counselorNotes: string;

  // Metadata
  strengths: string[];
  challenges: string[];
  traits: string[];
  idealEnvironment: string;
}

export class DimensionNarrativeEngine {

  /**
   * Generates a complete deep-dive narrative for a single dimension.
   * This is the primary entry point — it assembles all sections into a 
   * comprehensive DimensionDeepDive object.
   */
  static generateDimensionDeepDive(
    dimensionDef: DimensionDefinition,
    score: DimensionScore,
    normalizedScore: number,
    studentName: string
  ): DimensionDeepDive {
    const tier = score.tier;
    const narrativeData = dimensionDef.narrativeLogic[tier];
    const tierTraits = dimensionDef.traits[tier];

    // Extract enriched fields from narrative data (with fallbacks for dimensions
    // that haven't been expanded yet)
    const enrichedNarrative = narrativeData as any;

    return {
      dimensionId: dimensionDef.id,
      dimensionName: dimensionDef.name,
      category: dimensionDef.category,
      score: score.score,
      normalizedScore,
      tier,

      scoreInterpretation: this.generateScoreInterpretation(
        dimensionDef, score, normalizedScore, studentName
      ),

      detailedAnalysis: enrichedNarrative.detailedAnalysis 
        || this.generateFallbackAnalysis(dimensionDef, tier, studentName),

      behavioralIndicators: enrichedNarrative.behavioralIndicators 
        || this.generateFallbackBehaviors(dimensionDef, tier),

      academicImplications: enrichedNarrative.academicImplications 
        || this.generateFallbackAcademics(dimensionDef, tier),

      socialDynamics: enrichedNarrative.socialDynamics 
        || this.generateFallbackSocial(dimensionDef, tier),

      careerConnections: enrichedNarrative.careerConnections 
        || this.generateFallbackCareer(dimensionDef, tier),

      growthStrategies: enrichedNarrative.growthStrategies 
        || this.generateFallbackGrowth(dimensionDef, tier),

      didYouKnow: this.generateDidYouKnow(dimensionDef, tier),

      famousExemplars: enrichedNarrative.famousExemplars || [],

      dailyLifeExamples: enrichedNarrative.dailyLifeExamples || [],

      parentInsights: enrichedNarrative.parentInsights 
        || `Support your child's ${dimensionDef.name} development by understanding their ${tier}-scoring profile and providing appropriate encouragement and resources.`,

      counselorNotes: enrichedNarrative.counselorNotes 
        || `Student scores ${tier} on ${dimensionDef.name}. Review dimension-specific interventions and adjust counseling approach accordingly.`,

      strengths: narrativeData.keyStrengths,
      challenges: narrativeData.potentialChallenges,
      traits: tierTraits,
      idealEnvironment: narrativeData.idealLearningEnvironment
    };
  }

  /**
   * Generates a plain-language score interpretation that explains
   * what a specific raw score (e.g., 18/30) actually means.
   */
  static generateScoreInterpretation(
    dimensionDef: DimensionDefinition,
    score: DimensionScore,
    normalizedScore: number,
    studentName: string
  ): string {
    const raw = score.score;
    const tier = score.tier;
    const dimName = dimensionDef.name;

    let tierLabel = '';
    let tierContext = '';
    let scorePosition = '';

    switch (tier) {
      case 'low':
        tierLabel = 'Lower Range';
        tierContext = 'This means you scored below the midpoint on this dimension. Remember: "lower" does not mean "worse" — every position on this scale has genuine strengths and advantages.';
        if (raw <= 8) {
          scorePosition = 'in the very low end of this range, indicating a very strong preference in this direction';
        } else if (raw <= 10) {
          scorePosition = 'in the lower portion of this range';
        } else {
          scorePosition = 'near the boundary between the lower and middle ranges';
        }
        break;
      case 'medium':
        tierLabel = 'Middle Range';
        tierContext = 'This means you scored in the balanced middle zone on this dimension. This is the most versatile position, giving you flexibility to adapt to different situations.';
        if (raw <= 16) {
          scorePosition = 'in the lower portion of the middle range, leaning slightly toward the lower end';
        } else if (raw >= 20) {
          scorePosition = 'in the upper portion of the middle range, leaning slightly toward the higher end';
        } else {
          scorePosition = 'right in the center of the middle range — a highly balanced position';
        }
        break;
      case 'high':
        tierLabel = 'Upper Range';
        tierContext = 'This means you scored above the midpoint on this dimension, indicating a strong preference or capability in this direction.';
        if (raw >= 28) {
          scorePosition = 'in the very top of this range, indicating an extremely strong trait expression';
        } else if (raw >= 26) {
          scorePosition = 'in the upper portion of this range';
        } else {
          scorePosition = 'near the boundary between the middle and upper ranges';
        }
        break;
    }

    return `**${dimName}: Your Score**\n\n` +
      `${studentName} scored **${raw} out of 30** on ${dimName}, which converts to **${Math.round(normalizedScore)} out of 100** on the normalized scale. This places you ${scorePosition}.\n\n` +
      `**What does "${tierLabel}" mean?**\n${tierContext}\n\n` +
      `**How is this calculated?**\nThis score is the sum of your responses to 6 carefully designed questions about ${dimName}. Four questions are scored directly (your answer of 1-5 maps to 1-5 points) and two are reverse-scored (your answer of 1-5 maps to 5-1 points). The reverse-scored questions ensure that both poles of the dimension are measured accurately. The minimum possible score is 6 (strongly one direction) and the maximum is 30 (strongly the other direction).\n\n` +
      `**${dimensionDef.purpose}**\n${dimensionDef.whatThisMeasures}\n\n` +
      `**Why This Dimension Matters:**\n${dimensionDef.whyItMatters}`;
  }

  /**
   * Generates an engaging "Did You Know?" fact section for reader engagement.
   */
  static generateDidYouKnow(dimensionDef: DimensionDefinition, tier: 'low' | 'medium' | 'high'): string {
    const dimId = dimensionDef.id;
    
    // Curated facts by dimension
    const facts: Record<string, Record<string, string>> = {
      'DIM_PERS_01': {
        low: '💡 Did You Know? Some of the most impactful leaders in history were introverts. Rosa Parks, Mahatma Gandhi, and Eleanor Roosevelt all described themselves as quiet, reflective people who preferred working behind the scenes. Susan Cain\'s research shows that introverts make up 33-50% of the population — you are far from alone in your preference for depth over breadth.',
        medium: '💡 Did You Know? Psychologists have a term for people who fall in the middle of the introversion-extraversion spectrum: "ambiverts." Research by Adam Grant at Wharton Business School found that ambiverts actually outperform both introverts and extroverts in sales roles because they can naturally calibrate their social approach to each situation.',
        high: '💡 Did You Know? Research shows that extroverts\' brains respond more strongly to dopamine — the "reward" chemical. This is why social interaction feels energizing: your brain literally produces more pleasure chemicals during social engagement than an introvert\'s brain does in the same situation. It\'s not a choice — it\'s neurobiology.'
      },
      'DIM_PERS_02': {
        low: '💡 Did You Know? Many successful entrepreneurs score LOW on conscientiousness assessments. Richard Branson, who has dyslexia and ADHD, built the Virgin Group (400+ companies) by leveraging his spontaneity and risk-tolerance rather than traditional organizational skills. He surrounds himself with highly conscientious people who execute his creative visions.',
        medium: '💡 Did You Know? Research shows that moderate conscientiousness combined with high creativity is the profile most associated with successful innovation. Too much structure can actually inhibit creative breakthroughs by preventing the "productive messiness" that leads to unexpected connections between ideas.',
        high: '💡 Did You Know? A landmark study following participants for over 80 years (the Terman study and its successors) found that conscientiousness was the SINGLE strongest personality predictor of longevity. Highly conscientious people live an average of 2-3 years longer than their less organized peers — partly because their disciplined habits extend to health behaviors like regular exercise, moderate eating, and consistent sleep.'
      },
      'DIM_LEARN_01': {
        low: '💡 Did You Know? People with strong verbal-textual processing often have exceptional "inner speech" — a rich, detailed internal monologue that helps them reason through complex problems. This internal verbal processing is a genuine cognitive advantage for professions that require precise reasoning with words, like law, philosophy, and diplomacy.',
        medium: '💡 Did You Know? The concept of fixed "learning styles" (visual, auditory, kinesthetic) has been significantly revised by modern neuroscience. Current research suggests that most people can learn effectively through multiple channels, and the most effective learning strategy is often to use MULTIPLE modalities simultaneously — exactly what balanced learners like you do naturally.',
        high: '💡 Did You Know? Visual-spatial thinking is the cognitive basis of architectural design, surgical planning, chess mastery, and navigation. London taxi drivers, who must navigate 25,000 streets from memory, have been shown to have measurably larger hippocampi (the brain region responsible for spatial memory) than the general population — proving that visual-spatial skills literally reshape the brain with practice.'
      }
    };

    const dimFacts = facts[dimId];
    if (dimFacts && dimFacts[tier]) {
      return dimFacts[tier];
    }

    // Generic fallback fact
    return `💡 Did You Know? Your brain is remarkably adaptable. The concept of "neuroplasticity" means that your cognitive patterns and abilities can be significantly reshaped through deliberate practice and new experiences, especially during adolescence and young adulthood. The dimension scores in this report are not fixed destinations — they are starting points from which growth in any direction is possible.`;
  }

  /**
   * Batch generates deep-dives for all dimensions in a single call.
   */
  static generateAllDimensionDeepDives(
    dimensionDefs: DimensionDefinition[],
    scores: DimensionScore[],
    normalizedScores: { dimensionId: string; normalizedScore: number }[],
    studentName: string
  ): DimensionDeepDive[] {
    const normalizedMap = new Map(
      normalizedScores.map(n => [n.dimensionId, n.normalizedScore])
    );

    return scores.map(score => {
      const def = dimensionDefs.find(d => d.id === score.dimensionId);
      if (!def) {
        throw new Error(`No dimension definition found for ${score.dimensionId}`);
      }
      const normalized = normalizedMap.get(score.dimensionId) || 50;
      return this.generateDimensionDeepDive(def, score, normalized, studentName);
    });
  }

  /**
   * Generates a comparative summary across all dimensions, identifying
   * the strongest and weakest areas and their relative positions.
   */
  static generateComparativeSummary(deepDives: DimensionDeepDive[]): string {
    if (deepDives.length === 0) return "No dimension data available for comparative analysis.";

    const sorted = [...deepDives].sort((a, b) => b.normalizedScore - a.normalizedScore);
    const top3 = sorted.slice(0, 3);
    const bottom3 = sorted.slice(-3).reverse();
    const avgScore = sorted.reduce((sum, d) => sum + d.normalizedScore, 0) / sorted.length;
    const range = sorted[0].normalizedScore - sorted[sorted.length - 1].normalizedScore;

    let narrative = `**Cross-Dimension Comparative Summary**\n\n`;
    narrative += `Across all ${deepDives.length} assessed dimensions, your scores range from ${Math.round(sorted[sorted.length - 1].normalizedScore)}/100 to ${Math.round(sorted[0].normalizedScore)}/100, with an overall average of ${Math.round(avgScore)}/100.\n\n`;

    narrative += `**Your Top 3 Dimensions:**\n`;
    top3.forEach((d, i) => {
      narrative += `${i + 1}. **${d.dimensionName}** — ${Math.round(d.normalizedScore)}/100 (${d.category})\n`;
    });

    narrative += `\n**Your 3 Greatest Growth Opportunities:**\n`;
    bottom3.forEach((d, i) => {
      narrative += `${i + 1}. **${d.dimensionName}** — ${Math.round(d.normalizedScore)}/100 (${d.category})\n`;
    });

    narrative += `\n**Profile Differentiation:** Your score range is ${Math.round(range)} points. ${range > 50 ? 'This is a highly differentiated profile — your strengths are dramatically stronger than your growth areas, which is characteristic of deep specialists.' : range > 30 ? 'This is a moderately differentiated profile — you have clear strengths and growth areas, with enough range to guide meaningful career and academic decisions.' : 'This is a mildly differentiated profile — your dimensions are relatively close together, indicating broad versatility without extreme specialization.'}`;

    return narrative;
  }

  // --- Fallback generators for dimensions without enriched narrative data ---

  private static generateFallbackAnalysis(def: DimensionDefinition, tier: string, studentName: string): string {
    const narrative = def.narrativeLogic[tier as keyof typeof def.narrativeLogic];
    return `${studentName}'s ${def.name} score falls in the ${tier} range, indicating the following profile:\n\n${narrative.summary}\n\n` +
      `This dimension — ${def.name} — measures ${def.whatThisMeasures.toLowerCase()} Understanding this trait is important because ${def.whyItMatters.toLowerCase()}\n\n` +
      `Students with ${tier} ${def.name} scores typically demonstrate specific behavioral patterns, learning preferences, and social tendencies that are detailed below. These patterns are not limitations — they are natural cognitive preferences that, when properly understood and leveraged, become genuine strengths.`;
  }

  private static generateFallbackBehaviors(def: DimensionDefinition, tier: string): string[] {
    const traits = def.traits[tier as keyof typeof def.traits];
    return traits.map(trait => `You tend to exhibit "${trait}" characteristics in your daily interactions and academic work`);
  }

  private static generateFallbackAcademics(def: DimensionDefinition, tier: string): string {
    const narrative = def.narrativeLogic[tier as keyof typeof def.narrativeLogic];
    return `In academic settings, your ${def.name} profile influences how you engage with coursework, interact with teachers, and perform on assessments. ${narrative.idealLearningEnvironment} ${narrative.whatThisMeansForYou}`;
  }

  private static generateFallbackSocial(def: DimensionDefinition, tier: string): string {
    const narrative = def.narrativeLogic[tier as keyof typeof def.narrativeLogic];
    return `Your ${def.name} score influences your social interactions and peer relationships. Key strengths in this area include: ${narrative.keyStrengths.join(', ')}. ${narrative.potentialChallenges.length > 0 ? `Areas to be mindful of include: ${narrative.potentialChallenges.join(', ')}.` : ''}`;
  }

  private static generateFallbackCareer(def: DimensionDefinition, tier: string): string {
    const narrative = def.narrativeLogic[tier as keyof typeof def.narrativeLogic];
    return `From a career perspective, ${narrative.whatThisMeansForYou} Your ${def.name} score suggests you would thrive in environments that align with your natural preferences: ${narrative.idealLearningEnvironment}`;
  }

  private static generateFallbackGrowth(def: DimensionDefinition, tier: string): string[] {
    const narrative = def.narrativeLogic[tier as keyof typeof def.narrativeLogic];
    return [
      `Explore activities and environments that align with your ${def.name} strengths: ${narrative.keyStrengths[0]}`,
      `Be aware of your potential growth areas and develop strategies to address them: ${narrative.potentialChallenges[0] || 'Continue developing your natural strengths'}`,
      `Seek out the learning environments that work best for you: ${narrative.idealLearningEnvironment}`,
      `Connect your ${def.name} profile to your long-term goals: ${narrative.whatThisMeansForYou}`
    ];
  }
}
