/**
 * Fingerprint Narrative Engine
 * 
 * Generates the "What does this mean?" text for the Intelligence Fingerprint.
 * Decodes the 22-dimension signature into an explainable, personalized identity summary.
 * 
 * Enhanced to produce deep, multi-paragraph analysis covering:
 * - Identity summary with cognitive shape analysis
 * - Dimension cluster analysis across 4 categories
 * - Trait interaction insights for interesting combinations
 * - Cognitive profile type classification
 * - Uniqueness summary explaining what makes this combination rare
 */

interface DimensionData {
  dimensionId: string;
  normalizedScore: number;
  tier: 'low' | 'medium' | 'high';
  category?: string;
  name?: string;
}

export class FingerprintNarrativeEngine {
  
  /**
   * Generates a dynamic, multi-paragraph explanation of the core shape of the user's intelligence.
   * Expanded from 3 sentences to 4-5 comprehensive paragraphs.
   */
  static generateIdentitySummary(dimensions: DimensionData[], fingerprintHash: string): string {
    // 1. Identify dominant clusters
    let maxScore = 0;
    let minScore = 100;
    let dominantDim = '';
    let totalScore = 0;

    dimensions.forEach(d => {
      if (d.normalizedScore > maxScore) {
        maxScore = d.normalizedScore;
        dominantDim = d.dimensionId;
      }
      if (d.normalizedScore < minScore) {
        minScore = d.normalizedScore;
      }
      totalScore += d.normalizedScore;
    });

    const avgScore = dimensions.length > 0 ? totalScore / dimensions.length : 0;
    const isBalanced = dimensions.every(d => d.normalizedScore > 40 && d.normalizedScore < 80);
    const highDims = dimensions.filter(d => d.normalizedScore >= 75);
    
    const scoreRange = maxScore - minScore;

    // 2. Assemble comprehensive narrative
    let narrative = `**Your Unique Intelligence Identity** (Fingerprint Hash: ${fingerprintHash})\n\n`;
    
    narrative += `Your Intelligence Fingerprint is a visual representation of your complete cognitive identity — a unique pattern formed by the intersection of all 22 dimensions assessed in this evaluation. Just as no two people share identical physical fingerprints, no two students produce exactly the same intelligence fingerprint. The shape, color, and distribution of your fingerprint reflect your unique approach to learning, problem-solving, social engagement, and career orientation.\n\n`;

    if (isBalanced) {
      narrative += `Your fingerprint reveals a remarkably balanced cognitive profile — your scores are distributed evenly across all 22 dimensions without extreme peaks or valleys. This "Swiss Army Knife" pattern indicates extraordinary cognitive versatility. You possess functional competence across every assessed domain, which means you can adapt to virtually any learning environment, work setting, or social context without experiencing significant cognitive friction. While specialists excel by going deep in narrow areas, your strength lies in going wide — you can draw connections across disciplines, communicate effectively with different types of thinkers, and pivot between tasks that demand very different cognitive skills.\n\n`;
      narrative += `The balanced nature of your profile also suggests strong emotional regulation and cognitive flexibility — you are not rigidly locked into any single mode of thinking or processing. This adaptability is increasingly valued in a world that demands professionals who can work across traditional boundaries. However, balance also means you may not yet have discovered which dimensions you feel most passionate about developing into true expertise. The growth opportunity for balanced profiles is to deliberately explore and invest in the dimensions that energize you most, transforming broad competence into targeted excellence.\n\n`;
    } else if (highDims.length > 8) {
      narrative += `Your fingerprint displays an expansive, high-amplitude pattern — you score in the upper ranges across ${highDims.length} of your 22 dimensions. This "Rising Tide" profile indicates broad cognitive strength that lifts performance across nearly every domain. Students with this pattern typically excel academically, demonstrate leadership capabilities early, and have the cognitive horsepower to pursue demanding career paths across multiple fields. Your challenge is not capability but choice — with so many strong dimensions, identifying your deepest passions and committing to deliberate specialization will be key to maximizing your enormous potential.\n\n`;
      narrative += `The visual DNA pattern above reflects this breadth through its expansive, outward-reaching shape. Notice how the pattern extends significantly beyond the center across multiple axes — each extension represents a dimension where you significantly exceed typical performance. The overall symmetry (or asymmetry) of this expansion reveals whether your strengths cluster in specific cognitive families or spread evenly across all four categories.\n\n`;
    } else {
      narrative += `Your fingerprint shows distinct spikes in specific areas, creating a highly differentiated "Signature Spike" pattern. This profile shape is characteristic of students who possess deep, specialized cognitive strengths — your cognitive engine is optimized for intense performance in the areas surrounding your peak dimension${highDims.length > 1 ? 's' : ''} (${dominantDim}${highDims.length > 1 ? ` and ${highDims.length - 1} other${highDims.length > 2 ? 's' : ''}` : ''}). Your peaks represent genuine cognitive advantages where you can significantly outperform peers, while the valleys between peaks represent areas that may require compensatory strategies or deliberate avoidance in career planning.\n\n`;
      narrative += `The score range across your dimensions spans ${Math.round(scoreRange)} points (from ${Math.round(minScore)} to ${Math.round(maxScore)} on the normalized scale), which indicates a ${scoreRange > 50 ? 'highly differentiated' : scoreRange > 30 ? 'moderately differentiated' : 'mildly differentiated'} cognitive profile. ${scoreRange > 50 ? 'This wide range is typical of specialists and experts — individuals who develop exceptional capability in targeted areas. Your career and academic strategy should emphasize playing to your peaks rather than trying to eliminate your valleys.' : 'This moderate range gives you a good balance of specialization and versatility.'}\n\n`;
    }

    narrative += `The shape and color gradients of the visual DNA above encode the full complexity of your 22-dimension signature into a single, instantly recognizable pattern. Warmer colors represent higher-scoring dimensions, cooler colors represent lower-scoring ones, and the overall geometry reflects how your cognitive strengths interact across the four major categories: Personality, Learning Style, Skills & Abilities, and Career Interests. Your average score across all dimensions is ${Math.round(avgScore)}/100, which provides the baseline from which your individual peaks and valleys emerge.`;

    return narrative;
  }

  /**
   * Groups the 22 dimensions into 4 categories and produces a narrative for each cluster.
   */
  static generateDimensionClusterAnalysis(dimensions: DimensionData[]): string {
    const categories: Record<string, DimensionData[]> = {
      'Personality': [],
      'LearningStyle': [],
      'SkillsAndAbilities': [],
      'CareerInterest': []
    };

    dimensions.forEach(d => {
      const cat = d.category || this.inferCategory(d.dimensionId);
      if (categories[cat]) {
        categories[cat].push(d);
      }
    });

    let narrative = `**Dimension Cluster Analysis**\n\n`;
    narrative += `Your 22 dimensions are organized into four fundamental cognitive clusters. Understanding how you perform within each cluster — and how the clusters interact with each other — provides a much richer picture than any individual dimension score alone.\n\n`;

    // Personality Cluster
    const persAvg = this.clusterAverage(categories['Personality']);
    narrative += `**🧠 Personality Cluster** (Average: ${Math.round(persAvg)}/100)\n`;
    narrative += `This cluster captures the core personality traits that shape how you interact with the world — your social energy, emotional regulation, openness to experience, conscientiousness, and stress resilience. ${persAvg > 65 ? 'Your personality dimensions are well-developed, indicating strong self-awareness and emotional maturity. You likely navigate social and emotional challenges with relative ease.' : persAvg > 40 ? 'Your personality dimensions show a balanced, still-developing pattern. This is completely normal and expected — personality continues to evolve significantly through adolescence and into early adulthood.' : 'Your personality dimensions suggest areas where additional support and development could make a significant positive impact on your daily experience and long-term wellbeing.'}\n\n`;

    // Learning Style Cluster
    const learnAvg = this.clusterAverage(categories['LearningStyle']);
    narrative += `**📚 Learning Style Cluster** (Average: ${Math.round(learnAvg)}/100)\n`;
    narrative += `This cluster identifies how you most effectively absorb, process, and retain information — your visual, auditory, kinesthetic, and reading/writing preferences. ${learnAvg > 65 ? 'Your learning dimensions indicate strong, well-established learning preferences. You likely already know intuitively which study methods work best for you.' : 'Your learning dimensions suggest a multimodal or still-developing learning profile. Experiment with different study methods to discover your optimal approaches.'} Understanding your learning style cluster is essential for designing study routines, choosing educational resources, and communicating with teachers about your needs.\n\n`;

    // Skills & Abilities Cluster
    const skillsAvg = this.clusterAverage(categories['SkillsAndAbilities']);
    narrative += `**⚡ Skills & Abilities Cluster** (Average: ${Math.round(skillsAvg)}/100)\n`;
    narrative += `This cluster measures cognitive capabilities like analytical thinking, creative problem-solving, verbal reasoning, and numerical aptitude. ${skillsAvg > 65 ? 'Your skills dimensions are strong, indicating well-developed cognitive tools that you can apply across academic subjects and real-world challenges.' : 'Your skills dimensions show a developing pattern with specific areas of strength and areas for targeted improvement.'} These dimensions are highly responsive to practice and education — unlike personality traits, which are relatively stable, skills can be dramatically improved through deliberate training.\n\n`;

    // Career Interest Cluster
    const careerAvg = this.clusterAverage(categories['CareerInterest']);
    narrative += `**🎯 Career Interest Cluster** (Average: ${Math.round(careerAvg)}/100)\n`;
    narrative += `This cluster captures the types of work activities and professional environments that energize and motivate you. ${careerAvg > 65 ? 'Your career interest dimensions show clear, well-defined preferences — you have a strong sense of what types of work appeal to you, which significantly narrows and focuses your career exploration.' : 'Your career interest dimensions suggest that your professional identity is still forming — which is both normal and exciting. This is the time to explore broadly and discover what truly engages you.'} Career interests typically crystallize further through direct exposure and experience, so actively seeking internships, mentorships, and project-based learning in areas aligned with your highest career dimensions will accelerate your professional clarity.\n\n`;

    // Cross-Cluster Insight
    const clusterScores = [
      { name: 'Personality', avg: persAvg },
      { name: 'Learning Style', avg: learnAvg },
      { name: 'Skills & Abilities', avg: skillsAvg },
      { name: 'Career Interest', avg: careerAvg }
    ].sort((a, b) => b.avg - a.avg);

    narrative += `**Cross-Cluster Insight:** Your strongest cluster is ${clusterScores[0].name} (${Math.round(clusterScores[0].avg)}/100), and your area of greatest growth opportunity is ${clusterScores[clusterScores.length - 1].name} (${Math.round(clusterScores[clusterScores.length - 1].avg)}/100). The gap between your strongest and weakest clusters is ${Math.round(clusterScores[0].avg - clusterScores[clusterScores.length - 1].avg)} points — ${clusterScores[0].avg - clusterScores[clusterScores.length - 1].avg > 25 ? 'a significant difference that suggests you may experience noticeable contrast between how comfortable you feel in different types of tasks and environments.' : 'a moderate difference indicating relatively even development across cognitive domains.'}`;

    return narrative;
  }

  /**
   * Identifies interesting trait combinations and explains their implications.
   */
  static generateTraitInteractionInsights(dimensions: DimensionData[]): string {
    const dimMap = new Map(dimensions.map(d => [d.dimensionId, d]));
    const interactions: string[] = [];

    // Check for interesting combinations
    const socialEnergy = dimMap.get('DIM_PERS_01');
    const conscientiousness = dimMap.get('DIM_PERS_02');
    const openness = dimMap.get('DIM_PERS_03');
    const visualLearning = dimMap.get('DIM_LEARN_01');

    if (socialEnergy && conscientiousness) {
      if (socialEnergy.tier === 'high' && conscientiousness.tier === 'low') {
        interactions.push(`**The Social Maverick:** Your combination of high Social Energy and lower Conscientiousness creates a dynamic, spontaneous personality that thrives on social engagement and creative improvisation. You are likely the person who energizes a room and comes up with exciting plans on the fly. The growth opportunity is building just enough organizational structure to channel your social creativity into completed projects and reliable commitments.`);
      } else if (socialEnergy.tier === 'low' && conscientiousness.tier === 'high') {
        interactions.push(`**The Quiet Achiever:** Your combination of lower Social Energy and high Conscientiousness creates a powerful "silent engine" — you work diligently and produce exceptional results without needing external validation or social stimulation. This pattern is common among researchers, writers, engineers, and analysts who produce outstanding work through sustained independent effort. Your growth opportunity is developing enough social presence to ensure your excellent work gets the recognition it deserves.`);
      } else if (socialEnergy.tier === 'high' && conscientiousness.tier === 'high') {
        interactions.push(`**The Natural Leader:** Your combination of high Social Energy and high Conscientiousness is the classic leadership profile — you can inspire and energize others AND follow through with disciplined execution. This combination is relatively rare and is strongly associated with successful managers, entrepreneurs, and team leaders across virtually every field.`);
      }
    }

    if (openness && conscientiousness) {
      if (openness?.tier === 'high' && conscientiousness?.tier === 'low') {
        interactions.push(`**The Creative Visionary:** High Openness combined with lower Conscientiousness creates a classic "idea person" profile — you generate creative visions and novel solutions more quickly than you complete structured projects. Many successful artists, inventors, and entrepreneurs share this pattern. The key is partnering with detail-oriented collaborators who can help you execute your best ideas.`);
      }
    }

    if (socialEnergy && visualLearning) {
      if (socialEnergy.tier === 'high' && visualLearning?.tier === 'high') {
        interactions.push(`**The Visual Communicator:** Your combination of high Social Energy and strong Visual Learning creates a natural talent for visual storytelling, presentation design, and multimedia communication. You think in pictures AND communicate with enthusiasm — a powerful combination for careers in design, marketing, teaching, and media production.`);
      }
    }

    if (interactions.length === 0) {
      interactions.push(`Your dimension scores show a relatively uniform distribution without extreme contrasts between related dimensions. This balanced pattern suggests a well-integrated cognitive profile where different capabilities support and reinforce each other rather than creating internal tension. You are likely comfortable across a wide range of tasks and environments.`);
    }

    let narrative = `**Trait Interaction Insights**\n\n`;
    narrative += `Individual dimension scores tell an important story, but the most powerful insights emerge from examining how dimensions interact with each other. Certain combinations create synergies (where two strengths amplify each other) or creative tensions (where contrasting traits produce unique capabilities). Here are the most notable interactions in your profile:\n\n`;
    narrative += interactions.join('\n\n');

    return narrative;
  }

  /**
   * Classifies the overall profile into archetypes with detailed descriptions.
   */
  static generateCognitiveProfileType(dimensions: DimensionData[]): string {
    const highCount = dimensions.filter(d => d.normalizedScore >= 75).length;
    
    const avgScore = dimensions.reduce((sum, d) => sum + d.normalizedScore, 0) / (dimensions.length || 1);
    const scoreVariance = dimensions.reduce((sum, d) => sum + Math.pow(d.normalizedScore - avgScore, 2), 0) / (dimensions.length || 1);
    const scoreStdDev = Math.sqrt(scoreVariance);

    let profileType = '';
    let profileEmoji = '';
    let profileDescription = '';

    if (scoreStdDev < 12 && avgScore > 60) {
      profileType = 'The Generalist';
      profileEmoji = '🌐';
      profileDescription = `You exhibit consistent strength across a broad range of cognitive dimensions with relatively low variation between scores. Generalists are the most adaptable profile type — capable of performing well in diverse environments and roles. You bring value by connecting ideas across domains and serving as a bridge between specialists. In a world of increasing specialization, your breadth is a distinctive and increasingly rare advantage. Famous Generalists include Benjamin Franklin (scientist, diplomat, inventor, writer) and Aristotle (philosopher, scientist, teacher, political theorist).`;
    } else if (scoreStdDev > 20 && highCount > 3) {
      profileType = 'The Specialist';
      profileEmoji = '🎯';
      profileDescription = `Your profile shows pronounced peaks in specific dimensions combined with valleys in others — the signature pattern of deep specialization. Specialists create disproportionate value by developing world-class expertise in targeted areas. Your career strategy should focus on identifying roles that primarily demand your peak dimensions while minimizing exposure to your valley dimensions. Famous Specialists include Marie Curie (laser-focused on radioactivity research) and Michael Jordan (extraordinary athletic specialization complemented by fierce competitiveness).`;
    } else if (highCount > 10) {
      profileType = 'The Powerhouse';
      profileEmoji = '⚡';
      profileDescription = `Your profile shows broadly elevated scores across the majority of dimensions — a pattern indicating exceptional cognitive capability and development. Powerhouse profiles are relatively rare and are associated with high achievers who have both the ability and the drive to excel in demanding environments. Your challenge is not capability but strategic focus — channel your extraordinary potential into areas of deepest passion to prevent burnout from trying to excel at everything simultaneously.`;
    } else if (avgScore < 40) {
      profileType = 'The Explorer';
      profileEmoji = '🧭';
      profileDescription = `Your profile suggests a cognitive landscape that is still being mapped — your dimensions are in early stages of development, which represents enormous untapped potential. Explorer profiles are common among younger students and individuals who have not yet been exposed to experiences that activate their latent cognitive strengths. The most important action for Explorers is broad experimentation: try new subjects, join new activities, seek new experiences. The dimensions that start to spike in response to these explorations are your emerging signature strengths.`;
    } else {
      profileType = 'The Maverick';
      profileEmoji = '🔥';
      profileDescription = `Your profile displays a distinctive, unconventional pattern that doesn't fit neatly into standard archetypes — which is itself a significant finding. Maverick profiles are associated with original thinkers, creative problem-solvers, and individuals who approach challenges from unexpected angles. Your cognitive pattern creates unique capabilities that standard career matching algorithms might undervalue. Look for roles and environments that value originality, independent thinking, and the ability to see problems from perspectives that others miss.`;
    }

    return `**Your Cognitive Profile Type: ${profileEmoji} ${profileType}**\n\n${profileDescription}\n\nThis classification is based on the statistical pattern of your dimension scores — specifically, the average level, variance, and distribution shape. It provides a high-level identity framework that complements the detailed dimension-by-dimension analysis in the following pages.`;
  }

  /**
   * Tells the student what makes their specific combination rare and valuable.
   */
  static generateUniquenessSummary(dimensions: DimensionData[], fingerprintHash: string): string {
    const total = dimensions.length;
    const possibleCombinations = Math.pow(3, total); // 3 tiers per dimension

    
    const highDims = dimensions.filter(d => d.tier === 'high').map(d => d.name || d.dimensionId);
    const distinctiveCount = dimensions.filter(d => d.normalizedScore >= 80 || d.normalizedScore <= 20).length;

    let narrative = `**What Makes You Unique**\n\n`;
    narrative += `With ${total} dimensions, each scored into one of three tiers, there are over ${possibleCombinations.toLocaleString()} possible intelligence fingerprint patterns. Your specific pattern (Hash: ${fingerprintHash}) represents one unique combination out of this vast possibility space. No assessment we have conducted has produced an identical fingerprint — your cognitive identity is genuinely one-of-a-kind.\n\n`;

    if (distinctiveCount > 5) {
      narrative += `Your profile is especially distinctive because ${distinctiveCount} of your ${total} dimensions fall in extreme ranges (very high or very low). This high number of outlier scores means your fingerprint has a particularly sharp, recognizable shape — your cognitive signature is boldly written, not whispered. People who interact with you likely notice your distinctive traits quickly because they manifest clearly in your behavior, communication style, and approach to problems.\n\n`;
    } else if (distinctiveCount > 2) {
      narrative += `Your profile has ${distinctiveCount} dimensions in extreme ranges, creating a moderately distinctive fingerprint pattern. These outlier dimensions are the features that make you most recognizable as a thinker and learner — they are the traits that colleagues, friends, and teachers most associate with "who you are."\n\n`;
    } else {
      narrative += `Your profile has few extreme scores, creating a subtle, nuanced fingerprint pattern. Your uniqueness comes not from dramatic individual peaks but from the specific combination of moderate scores — like a mosaic where the beauty emerges from the arrangement of many similar-toned pieces rather than a few bold strokes.\n\n`;
    }

    if (highDims.length > 0) {
      narrative += `Your strongest dimensions — ${highDims.slice(0, 3).join(', ')}${highDims.length > 3 ? ` and ${highDims.length - 3} others` : ''} — form the core of your distinctive cognitive value. These are the areas where you have a genuine competitive advantage over most of your peers, and they should be central to your academic strategy, career planning, and personal identity development.`;
    } else {
      narrative += `While your profile doesn't show pronounced peaks yet, remember that uniqueness comes from the specific combination of all your dimensions together, not from any single score. Your particular blend of moderate capabilities creates a distinctive cognitive fingerprint that is valuable in its own right.`;
    }

    return narrative;
  }

  // --- Helper Methods ---

  private static inferCategory(dimensionId: string): string {
    if (dimensionId.includes('PERS')) return 'Personality';
    if (dimensionId.includes('LEARN')) return 'LearningStyle';
    if (dimensionId.includes('SKILL')) return 'SkillsAndAbilities';
    if (dimensionId.includes('CAREER')) return 'CareerInterest';
    return 'Personality';
  }

  private static clusterAverage(dimensions: DimensionData[]): number {
    if (dimensions.length === 0) return 50;
    return dimensions.reduce((sum, d) => sum + d.normalizedScore, 0) / dimensions.length;
  }
}
