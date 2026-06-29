/**
 * Executive Summary Narrative Engine
 * 
 * Generates the high-level synthesis for Page 2 of the report, combining Readiness,
 * Strengths, and dominant Themes into an actionable overview.
 * 
 * Enhanced to produce deep, multi-paragraph personalized content covering:
 * - Opening Statement with profile shape analysis
 * - Future implications across academic, career, and personal domains
 * - Strengths narrative with real-world applications
 * - Blind spots narrative with empathetic growth framing
 * - Profile comparison against common archetypes
 * - Actionable next steps the student can take immediately
 */

export class ExecutiveSummaryEngine {
  
  /**
   * Generates the personalized opening summary — expanded from 1 sentence to a 
   * full 3-paragraph introduction with score context, profile shape analysis, 
   * and a motivational framing.
   */
  static generateOpeningStatement(
    readinessScore: number, 
    topThemes: any[], 
    studentName: string,
    dimensionScores?: any[]
  ): string {
    
    let readinessDescriptor = '';
    let readinessContext = '';
    if (readinessScore >= 85) {
      readinessDescriptor = 'an exceptionally high degree of preparedness';
      readinessContext = 'This places them in the top tier of assessed students, indicating a strong alignment between their cognitive strengths, personality traits, and career interests. Their profile suggests they have already developed many of the foundational competencies needed to thrive in demanding academic and professional environments.';
    } else if (readinessScore >= 65) {
      readinessDescriptor = 'a strong foundational readiness';
      readinessContext = 'This indicates a solid foundation across most dimensions, with clear strengths that can be leveraged and specific growth areas that, once addressed, will significantly accelerate their trajectory. Their profile shows the hallmarks of a student who is well-positioned for future success with targeted development.';
    } else {
      readinessDescriptor = 'an emerging readiness';
      readinessContext = 'This indicates a student with untapped potential who is still in the early stages of discovering and developing their cognitive strengths. Rather than a limitation, this score represents an enormous opportunity — with the right guidance and targeted interventions, rapid growth is not only possible but expected.';
    }

    const dominantTheme = topThemes[0]?.name || 'Adaptive Learner';
    const secondaryTheme = topThemes[1]?.name || '';

    let profileShapeAnalysis = '';
    if (dimensionScores && dimensionScores.length > 0) {
      const highCount = dimensionScores.filter((d: any) => d.tier === 'high').length;
      const lowCount = dimensionScores.filter((d: any) => d.tier === 'low').length;
      
      if (highCount > 10) {
        profileShapeAnalysis = `Their profile exhibits broad-spectrum strength across ${highCount} dimensions, suggesting a highly versatile "Renaissance" cognitive profile capable of excelling in diverse environments. This breadth is a rare and valuable asset.`;
      } else if (highCount > 5 && lowCount > 5) {
        profileShapeAnalysis = `Their profile shows a distinctive "spiky" pattern with pronounced peaks and valleys across dimensions — a signature of deep specialization. This pattern is characteristic of individuals who develop exceptional expertise in specific domains rather than generalized competence.`;
      } else {
        profileShapeAnalysis = `Their profile shows a balanced distribution across dimensions, indicating a well-rounded cognitive foundation with room for strategic specialization as they discover their deepest interests and aptitudes.`;
      }
    }

    const themeDescription = secondaryTheme 
      ? `Driven primarily by their core themes as a ${dominantTheme} and ${secondaryTheme}` 
      : `Driven primarily by their core theme as a ${dominantTheme}`;

    return `${studentName}'s intelligence profile indicates ${readinessDescriptor} for future academic and career environments. ${readinessContext}\n\n${themeDescription}, they naturally approach challenges with a unique blend of their top cognitive dimensions. This theme combination shapes not only how they learn and solve problems, but also how they interact with peers, respond to setbacks, and envision their future. Understanding this core identity is the first step toward leveraging it for maximum personal and professional growth.\n\n${profileShapeAnalysis} The pages that follow provide a comprehensive, dimension-by-dimension analysis of ${studentName}'s unique intelligence signature, along with actionable guidance for students, parents, and counselors to translate these insights into real-world outcomes.`;
  }

  /**
   * Generates the "What this means for your future" section — expanded to cover
   * academic trajectory, career readiness, and personal growth outlook.
   */
  static generateFutureImplications(topStrengths: any[], readinessScore?: number): string {
    if (!topStrengths || topStrengths.length === 0) return "Data insufficient to project future implications.";

    const strengthA = topStrengths[0]?.name || 'your primary strength';
    const strengthB = topStrengths[1]?.name || 'your secondary strength';
    const strengthC = topStrengths[2]?.name || '';

    let academicOutlook = '';
    if (readinessScore && readinessScore >= 75) {
      academicOutlook = `Academically, your profile positions you for success in rigorous programs that demand both analytical depth and creative problem-solving. Consider pursuing advanced coursework, honors programs, or independent research projects that challenge you to apply your strengths in novel contexts.`;
    } else {
      academicOutlook = `Academically, your profile highlights specific areas where targeted effort will yield dramatic improvements. Focus on building foundational skills in your growth areas while continuing to leverage your natural strengths — this dual approach creates the fastest path to academic confidence and performance.`;
    }

    const strengthList = strengthC 
      ? `${strengthA}, ${strengthB}, and ${strengthC}` 
      : `${strengthA} and ${strengthB}`;

    return `By leveraging high capabilities in ${strengthList}, you are uniquely positioned to excel in environments that demand rapid adaptation and complex problem solving. Your cognitive signature suggests you will thrive when given autonomy over your learning process and the freedom to approach challenges in ways that align with your natural thinking patterns.\n\n${academicOutlook}\n\nFrom a career perspective, your strength combination opens doors to specific professional pathways where these capabilities are not just valued but essential. The career recommendations in this report are carefully matched to your unique profile, not generic suggestions. Each recommended career family has been selected because it aligns with multiple dimensions of your intelligence signature.\n\nOn a personal level, understanding your cognitive profile empowers you to make more informed decisions about how you spend your time, who you collaborate with, and what environments bring out your best performance. This self-knowledge is one of the most valuable outcomes of this assessment — it transforms vague feelings of "I'm good at some things and not others" into a precise, actionable map of your cognitive landscape.`;
  }

  /**
   * Generates a rich multi-paragraph breakdown of the student's top 3 strengths
   * with real-world examples and applications.
   */
  static generateStrengthsNarrative(topStrengths: any[], studentName: string): string {
    if (!topStrengths || topStrengths.length === 0) {
      return "Strength analysis requires completed dimension scores.";
    }

    let narrative = `${studentName}'s assessment reveals a distinctive pattern of cognitive strengths that, when properly understood and leveraged, form the foundation for exceptional achievement. These are not merely areas of mild preference — they represent genuine cognitive advantages where ${studentName}'s brain processes information more efficiently, retains knowledge more durably, and generates solutions more creatively than in other domains.\n\n`;

    topStrengths.slice(0, 3).forEach((strength: any, index: number) => {
      const rank = index === 0 ? 'Primary' : index === 1 ? 'Secondary' : 'Tertiary';
      const name = strength.name || `Strength ${index + 1}`;
      const score = strength.normalizedScore || strength.score || 0;

      narrative += `**${rank} Strength: ${name}** (Score: ${score}/100)\n`;
      
      if (score >= 85) {
        narrative += `This dimension stands out as an exceptional strength — scoring in this range indicates not just proficiency but genuine excellence. ${studentName} can reliably outperform peers in tasks that demand this capability, and should actively seek opportunities to apply it in academic projects, extracurricular activities, and future career choices. This is the kind of strength that, when deliberately cultivated, can become a defining professional advantage.\n\n`;
      } else if (score >= 70) {
        narrative += `This dimension represents a strong, well-developed capability. ${studentName} consistently demonstrates above-average performance in tasks requiring this skill, and with continued development, it has the potential to become a true signature strength. Investing additional effort here will yield significant returns because the foundation is already solid.\n\n`;
      } else {
        narrative += `This dimension shows emerging strength with meaningful upside potential. ${studentName} has demonstrated clear aptitude in this area, and targeted practice and deliberate engagement will help convert this potential into a reliable, high-performing capability.\n\n`;
      }
    });

    narrative += `The combination of these specific strengths is what makes ${studentName}'s profile truly unique. While individual dimensions are important, it is the interaction between strengths that creates distinctive value. Consider how these strengths complement each other and look for academic and career opportunities that allow multiple strengths to be applied simultaneously — this is where ${studentName} will find their greatest engagement and impact.`;

    return narrative;
  }

  /**
   * Generates an empathetic, constructive analysis of growth areas (blind spots)
   * with specific improvement strategies.
   */
  static generateBlindSpotsNarrative(blindSpots: any[], studentName: string): string {
    if (!blindSpots || blindSpots.length === 0) {
      return `${studentName}'s profile does not reveal any significant blind spots. All dimensions fall within healthy ranges, suggesting a well-rounded cognitive foundation.`;
    }

    let narrative = `Every intelligence profile has areas of relative strength and areas that present opportunities for growth. It is critically important to understand that the following "growth areas" are NOT weaknesses in any absolute sense — they are simply dimensions where ${studentName}'s scores are relatively lower compared to their own peak capabilities. In many cases, these areas may still fall within perfectly normal ranges.\n\nThe value of identifying these areas is not to create anxiety or self-criticism, but to provide a clear, evidence-based roadmap for targeted development. Small, consistent improvements in growth areas often produce disproportionately large gains in overall performance and confidence.\n\n`;

    blindSpots.slice(0, 3).forEach((spot: any, index: number) => {
      const name = spot.name || `Growth Area ${index + 1}`;
      const score = spot.normalizedScore || spot.score || 0;

      narrative += `**Growth Area ${index + 1}: ${name}** (Score: ${score}/100)\n`;
      narrative += `This dimension scored lower relative to ${studentName}'s overall profile, which means it may require more conscious effort and deliberate practice to develop. The good news is that this dimension is highly responsive to targeted intervention — students who implement specific strategies for this area typically see measurable improvement within 3-6 months. The detailed dimension analysis later in this report provides specific, actionable growth strategies tailored to ${studentName}'s exact score level.\n\n`;
    });

    narrative += `**Important Context:** Growth areas are not permanent limitations. The brain is remarkably plastic, especially during adolescence and young adulthood. With the right strategies, consistent practice, and supportive environments, every one of these dimensions can be significantly strengthened. The key is to approach development with patience, self-compassion, and a focus on progress rather than perfection.`;

    return narrative;
  }

  /**
   * Contextualizes the student's profile against common cognitive archetypes.
   */
  static generateProfileComparison(dimensionScores: any[]): string {
    if (!dimensionScores || dimensionScores.length === 0) {
      return "Profile comparison requires completed dimension scores.";
    }

    const highCount = dimensionScores.filter((d: any) => d.tier === 'high').length;
    const mediumCount = dimensionScores.filter((d: any) => d.tier === 'medium').length;
    const lowCount = dimensionScores.filter((d: any) => d.tier === 'low').length;
    const total = dimensionScores.length;

    let archetype = '';
    let archetypeDescription = '';

    if (highCount > total * 0.6) {
      archetype = 'The Renaissance Profile';
      archetypeDescription = `Your cognitive profile shows exceptional breadth — you score highly across a majority of dimensions, indicating versatility and adaptability that few profiles exhibit. Renaissance profiles are associated with individuals who can excel in multiple domains simultaneously, though they may face the challenge of choosing which path to pursue when many options are available. Historical examples include Leonardo da Vinci and Benjamin Franklin — polymaths who refused to be confined to a single discipline. Your challenge is not capability but focus: with so many areas of strength, the risk is spreading yourself too thin rather than developing deep expertise in any one domain. Consider choosing 2-3 areas for deliberate deep development while maintaining your natural breadth as a complementary advantage.`;
    } else if (highCount > 3 && lowCount > 3) {
      archetype = 'The Specialist Profile';
      archetypeDescription = `Your cognitive profile shows distinctive peaks and valleys — a pattern of pronounced strengths in specific areas combined with notable growth areas in others. This "spiky" profile is characteristic of specialists and experts who develop deep competence in targeted domains. This pattern is extremely common among high achievers in specialized fields: surgeons, software architects, professional athletes, research scientists, and performing artists typically show similar profiles. Your peaks represent your natural competitive advantage — the dimensions where you can achieve genuine expertise with deliberate practice. Your valleys represent areas where you may need support, compensatory strategies, or deliberate avoidance in career selection. The most effective strategy for specialist profiles is to double down on strengths while building minimum viable competence in growth areas.`;
    } else if (mediumCount > total * 0.6) {
      archetype = 'The Balanced Foundation Profile';
      archetypeDescription = `Your cognitive profile shows remarkable balance — most dimensions fall within the middle range, indicating a well-rounded foundation with no extreme peaks or valleys. This balanced pattern provides the most flexible career and academic foundation because you have competence across all cognitive domains. The Balanced Foundation profile is associated with effective managers, versatile professionals, and individuals who thrive in roles requiring broad competence rather than deep specialization. Your advantage is adaptability — you can perform adequately in almost any context. Your development strategy should focus on identifying which dimensions you most enjoy using and deliberately pushing those toward the "high" range, thereby adding distinctive peaks to your already solid foundation.`;
    } else {
      archetype = 'The Emerging Explorer Profile';
      archetypeDescription = `Your cognitive profile is still taking shape — which is perfectly normal and expected at this stage of development. Your dimensions show a pattern of emerging capabilities that have not yet crystallized into strong specializations. This is analogous to a canvas that has been primed but not yet painted — the potential is enormous, and the direction of development is still open. The Emerging Explorer profile benefits most from broad exposure to different subjects, activities, and experiences. Rather than trying to specialize prematurely, focus on discovering what genuinely excites and energizes you. The dimensions that score highest are early signals of where your natural aptitudes lie — pay attention to them and invest additional time in activities that align with those emerging strengths.`;
    }

    return `**Your Cognitive Archetype: ${archetype}**\n\n${archetypeDescription}\n\nThis archetype analysis is based on the overall shape and distribution of your scores across all assessed dimensions. It provides a high-level framework for understanding your profile, but the detailed dimension-by-dimension analysis that follows offers much more specific and actionable insights. Use the archetype as a compass for general direction, and the detailed analysis as a GPS for specific navigation.`;
  }

  /**
   * Generates 5-7 concrete next steps the student can take immediately.
   */
  static generateActionableNextSteps(
    topStrengths: any[],
    blindSpots: any[],
    topThemes: any[],
    readinessScore: number
  ): string[] {
    const steps: string[] = [];

    // Step 1: Always start with reading the full report
    steps.push("Read through the complete dimension-by-dimension analysis in this report. Pay special attention to the sections on your top 3 strengths and your growth areas — understanding your unique profile is the foundation for everything that follows.");

    // Step 2: Strength-based action
    if (topStrengths && topStrengths.length > 0) {
      const primaryStrength = topStrengths[0]?.name || 'your primary strength';
      steps.push(`Identify one specific opportunity this week to apply your primary strength (${primaryStrength}) in a real-world context — a school project, extracurricular activity, or personal project. Deliberate application of your strengths accelerates their development and builds confidence.`);
    }

    // Step 3: Growth area action
    if (blindSpots && blindSpots.length > 0) {
      const primaryGrowth = blindSpots[0]?.name || 'your primary growth area';
      steps.push(`Review the growth strategies recommended for your primary growth area (${primaryGrowth}) and choose ONE strategy to implement this week. Start small — sustainable growth comes from consistent small actions, not dramatic overhauls.`);
    }

    // Step 4: Theme exploration
    if (topThemes && topThemes.length > 0) {
      const primaryTheme = topThemes[0]?.name || 'your primary theme';
      steps.push(`Research your primary theme archetype (${primaryTheme}) by looking at the career families recommended in this report. Spend 30 minutes exploring what professionals in those fields actually do day-to-day — this will help you connect your assessment results to tangible future possibilities.`);
    }

    // Step 5: Conversation starter
    steps.push("Share this report with a parent, guardian, or trusted mentor and discuss what surprised you. External perspectives often reveal insights that self-reflection alone misses, and having a support partner makes follow-through on growth strategies significantly more likely.");

    // Step 6: Readiness-based action
    if (readinessScore < 65) {
      steps.push("Schedule a meeting with your school counselor to discuss your growth areas and create a targeted development plan. Your readiness score suggests that structured support will accelerate your growth significantly — don't try to do everything alone.");
    } else {
      steps.push("Consider joining or starting an activity that directly engages your top strengths — whether that's a club, competition, volunteer opportunity, or personal project. Applying your strengths in new contexts is the fastest way to develop them further.");
    }

    // Step 7: Reflection habit
    steps.push("Start a simple weekly reflection practice: every Sunday, spend 5 minutes writing down one thing you did well this week and one thing you want to improve next week. This micro-habit builds the self-awareness that transforms assessment insights into lasting personal growth.");

    return steps;
  }
}
