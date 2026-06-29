/**
 * Counselor Narrative Engine
 * 
 * Generates professional, data-dense interventions and guidance summaries
 * for academic counselors to support 1-on-1 sessions.
 * 
 * Enhanced with comprehensive professional-grade content covering:
 * - Multi-factor intervention strategies for all risk areas
 * - Growth recommendations for all theme types
 * - Structured 45-minute session agenda template
 * - Multi-factor risk assessment
 * - Progress tracking KPIs and milestones
 * - Referral recommendations for escalation
 */

export class CounselorNarrativeEngine {
  
  /**
   * Generates specific interventions based on Risk Indicators (Blind Spots + Low Readiness).
   * Enhanced to cover all major dimensions, not just Conscientiousness.
   */
  static generateInterventionStrategy(
    readinessScore: number, 
    blindSpots: any[],
    _dimensionScores?: any[]
  ): string[] {
    const interventions: string[] = [];
    
    // Readiness-based interventions
    if (readinessScore < 40) {
      interventions.push("CRITICAL — LOW READINESS: Student shows 'Novice' future readiness (score below 40). This requires immediate attention. Schedule a priority 1-on-1 session within the next 5 school days to discuss academic friction points, emotional wellbeing, and identify the root causes of low readiness. Common causes include: misalignment between teaching style and learning preferences, undiagnosed learning differences, social/emotional challenges, or lack of exposure to strength-aligned activities. Conduct a brief structured interview covering each of these areas before creating an intervention plan.");
    } else if (readinessScore < 65) {
      interventions.push("ATTENTION — MODERATE READINESS: Student shows 'Emerging' future readiness (score 40-64). This indicates a student with significant untapped potential. Schedule a session within 2 weeks to review their dimension profile and identify 2-3 specific, actionable interventions. Focus on connecting their existing strengths to academic strategies and career exploration opportunities rather than solely addressing deficits.");
    }

    // Dimension-specific interventions based on blind spots
    const hasLowConscientiousness = blindSpots.some(b => b.dimensionId === 'DIM_PERS_02');
    if (hasLowConscientiousness) {
      interventions.push("ACTION — EXECUTIVE FUNCTIONING: Student's Conscientiousness score is low. This is the single strongest personality predictor of academic underperformance. BEFORE discussing career goals or academic ambitions, establish foundational executive functioning scaffolding: (1) Introduce a simple daily planner or digital task manager, (2) Set up a weekly 15-minute check-in where the student reviews upcoming deadlines with you or a teacher, (3) Break all major assignments into micro-tasks with intermediate check-in dates, (4) Consider Pomodoro technique training (25 min work / 5 min break cycles). IMPORTANT: Screen for ADHD symptoms if the pattern is severe — chronic disorganization, time blindness, emotional dysregulation around deadlines, and difficulty sustaining attention on non-preferred tasks are clinical indicators that warrant formal assessment.");
    }

    const hasLowSocialEnergy = blindSpots.some(b => b.dimensionId === 'DIM_PERS_01');
    if (hasLowSocialEnergy) {
      interventions.push("MONITOR — SOCIAL ENGAGEMENT: Student's Social Energy score is low (introverted profile). This is NOT inherently problematic — introversion is a valid personality style, not a deficit. However, monitor for: (1) Social isolation that goes beyond healthy introversion (no close friends, avoidance of all social situations, visible distress in group settings), (2) Anxiety-driven avoidance versus preference-driven solitude (ask the student directly: 'Do you avoid groups because you don't enjoy them, or because they make you anxious?'), (3) Impact on class participation grades — advocate for alternative participation modes if the student is being penalized for a personality trait. ACCOMMODATIONS: Suggest smaller group assignments (2-3 students max), offer written participation options (discussion boards, reflection journals), and validate their preference for depth over breadth in social connections.");
    }

    const hasLowOpenness = blindSpots.some(b => b.dimensionId === 'DIM_PERS_03');
    if (hasLowOpenness) {
      interventions.push("ENRICHMENT — OPENNESS & CURIOSITY: Student's Openness score is low, suggesting preference for familiar routines and established methods over novelty and experimentation. This can limit academic exploration and career vision. INTERVENTION: (1) Introduce 'micro-explorations' — brief, low-stakes exposures to new subjects or activities (visiting a single class in a new department, watching a 10-minute documentary on an unfamiliar topic), (2) Frame new experiences as 'experiments with a defined end point' rather than permanent commitments, (3) Connect new learning to their existing interests and strengths to reduce resistance. AVOID: Forcing dramatic changes or overwhelming them with too many new experiences at once — build exposure gradually.");
    }

    const hasLowEmotionalResilience = blindSpots.some(b => 
      b.dimensionId === 'DIM_PERS_04' || b.dimensionId === 'DIM_PERS_05'
    );
    if (hasLowEmotionalResilience) {
      interventions.push("PRIORITY — EMOTIONAL RESILIENCE: Student shows lower scores in emotional stability dimensions. This may manifest as heightened stress reactivity, difficulty recovering from setbacks, or anxiety about performance. INTERVENTION: (1) Teach concrete coping strategies: box breathing (4-4-4-4), cognitive reframing ('What's the evidence for this worry?'), and progressive muscle relaxation, (2) Normalize struggle and failure by sharing examples of successful people who experienced significant setbacks, (3) Help the student develop a 'failure recovery plan' — a written protocol they can follow when things don't go as planned. WATCH FOR: Persistent anxiety, depression symptoms, self-harm ideation, or eating disturbances — escalate immediately if present.");
    }

    if (interventions.length === 0) {
      interventions.push("POSITIVE OUTLOOK: Student is on track across all assessed dimensions. No critical interventions are required at this time. Focus the next counseling session on advanced career exploration, portfolio building, and identifying stretch goals that challenge the student to develop their strengths further. Consider connecting them with mentorship opportunities, internships, or advanced academic programs aligned with their top themes.");
    }

    return interventions;
  }

  /**
   * Recommends specific extracurriculars based on top Themes.
   * Enhanced to cover all theme types with detailed, actionable recommendations.
   */
  static generateGrowthRecommendations(topThemes: any[]): string {
    const primaryTheme = topThemes[0]?.id;
    const secondaryTheme = topThemes[1]?.id;
    
    let primary = '';
    let secondary = '';
    
    switch (primaryTheme) {
      case 'THEME_INNOVATOR':
        primary = "**Primary Theme — The Innovator:** Recommend enrollment in STEM hackathons, robotics club, design thinking workshops, science fairs, or maker spaces. If available, connect them with entrepreneurship programs, coding bootcamps, or invention competitions. The Innovator theme thrives on creating tangible things from abstract ideas — hands-on, project-based activities are essential.";
        break;
      case 'THEME_COMMUNICATOR':
        primary = "**Primary Theme — The Communicator:** Recommend Model UN, debate team, school newspaper editorial roles, student government, public speaking clubs, or community advocacy organizations. The Communicator theme thrives on persuasion, storytelling, and connecting with audiences — seek activities that provide regular practice in crafting and delivering messages.";
        break;
      case 'THEME_STRATEGIST':
        primary = "**Primary Theme — The Strategist:** Recommend chess club, business plan competitions, strategic board game groups, investment clubs, or leadership development programs. The Strategist theme thrives on planning, analysis, and long-term thinking — seek activities that involve complex decision-making with meaningful consequences.";
        break;
      case 'THEME_HELPER':
        primary = "**Primary Theme — The Helper:** Recommend community service organizations, peer tutoring programs, hospital volunteering, mentorship roles (mentoring younger students), environmental clubs, or social justice organizations. The Helper theme thrives on making a tangible positive impact on others' lives — seek activities with visible, meaningful outcomes.";
        break;
      case 'THEME_CREATOR':
        primary = "**Primary Theme — The Creator:** Recommend art classes (visual, digital, or performing), creative writing workshops, film or photography clubs, music programs, theater productions, or digital content creation groups. The Creator theme thrives on self-expression and original production — seek activities that provide both creative freedom and constructive feedback.";
        break;
      case 'THEME_ANALYST':
        primary = "**Primary Theme — The Analyst:** Recommend science olympiad, mathematics competitions, data science clubs, research assistant opportunities, forensic science clubs, or technology analysis groups. The Analyst theme thrives on systematic investigation and evidence-based reasoning — seek activities that involve collecting, analyzing, and interpreting data.";
        break;
      default:
        primary = "**Primary Theme:** Align extracurricular recommendations with their top stated career interests. Seek activities that provide practical experience in the fields they are most drawn to, and ensure activities include both skill development and social engagement components.";
        break;
    }

    switch (secondaryTheme) {
      case 'THEME_INNOVATOR':
        secondary = "\n\n**Secondary Theme — The Innovator:** Supplement primary activities with at least one creative-technical activity that involves building, designing, or inventing. This secondary theme suggests they benefit from hands-on problem-solving even if their primary interests lie elsewhere.";
        break;
      case 'THEME_COMMUNICATOR':
        secondary = "\n\n**Secondary Theme — The Communicator:** Supplement with at least one communication-focused activity (debate, writing, public speaking). This secondary theme suggests they have untapped communication potential that, when developed, will amplify their primary theme.";
        break;
      case 'THEME_STRATEGIST':
        secondary = "\n\n**Secondary Theme — The Strategist:** Supplement with at least one strategic-analytical activity. Their analytical secondary nature will help them approach their primary theme's activities more systematically and effectively.";
        break;
      default:
        secondary = secondaryTheme ? `\n\n**Secondary Theme:** Consider supplementary activities that engage their secondary theme (${topThemes[1]?.name || 'see theme details'}) to create a well-rounded extracurricular portfolio.` : '';
        break;
    }

    return `${primary}${secondary}\n\n**General Guidance:** Aim for 2-3 extracurricular commitments maximum — quality of engagement matters far more than quantity. Ensure at least one activity aligns with each of the student's top two themes, and consider one "stretch" activity that develops a growth area dimension. Review extracurricular alignment at each semester's counseling session.`;
  }

  /**
   * Generates a structured 45-minute counseling session template based on the student's profile.
   */
  static generateSessionAgenda(
    readinessScore: number,
    topStrengths: any[],
    blindSpots: any[],
    topThemes: any[]
  ): string {
    const isPriority = readinessScore < 50;
    const strengthName = topStrengths[0]?.name || 'their primary strength';
    const growthName = blindSpots[0]?.name || 'their growth area';
    const themeName = topThemes[0]?.name || 'their primary theme';

    let agenda = `**Recommended Counseling Session Agenda (45 minutes)**\n\n`;
    
    agenda += `**Session Priority Level:** ${isPriority ? '🔴 HIGH — Focus on stabilization and immediate support' : '🟢 STANDARD — Focus on growth and optimization'}\n\n`;

    agenda += `**Minutes 0-5: Rapport & Check-In**\n`;
    agenda += `- Open with a warm, non-academic question ("What's been the highlight of your week?")\n`;
    agenda += `- Briefly assess current emotional state and any immediate concerns\n`;
    agenda += `- Set the agenda collaboratively: "Today I'd like to talk about your assessment results and make a plan together. Does that work for you?"\n\n`;

    agenda += `**Minutes 5-15: Strengths Celebration**\n`;
    agenda += `- Begin with positive findings — lead with ${strengthName} and explain what it means in practical terms\n`;
    agenda += `- Ask the student to identify a recent experience where they noticed this strength in action\n`;
    agenda += `- Connect their strength to a specific academic or career opportunity: "Because you scored high in ${strengthName}, have you considered...?"\n`;
    agenda += `- ${isPriority ? 'Spend extra time here to build confidence before addressing growth areas' : 'Use this as a springboard to discuss theme alignment and career exploration'}\n\n`;

    agenda += `**Minutes 15-25: Growth Area Discussion**\n`;
    agenda += `- Transition carefully: "Every profile has areas that are developing — this isn't about what's wrong with you, it's about where you have the most room to grow"\n`;
    agenda += `- Present ${growthName} with empathy and normalization ("This is common and very responsive to targeted practice")\n`;
    agenda += `- Collaboratively identify ONE specific, actionable strategy the student is willing to try this week\n`;
    agenda += `- ${isPriority ? 'If readiness score is below 40, spend additional time identifying barriers to engagement and immediate support needs' : 'Keep the focus on strategies rather than dwelling on the score itself'}\n\n`;

    agenda += `**Minutes 25-35: Theme & Career Exploration**\n`;
    agenda += `- Introduce their ${themeName} theme and discuss what it means for their future\n`;
    agenda += `- Share 2-3 specific career families that align with their theme and ask which ones interest them\n`;
    agenda += `- Discuss one extracurricular or experiential learning opportunity they could pursue this semester\n`;
    agenda += `- If appropriate, introduce mentorship or internship possibilities\n\n`;

    agenda += `**Minutes 35-42: Action Planning**\n`;
    agenda += `- Summarize the 2-3 key takeaways from the session\n`;
    agenda += `- Collaboratively create a simple action plan with specific commitments:\n`;
    agenda += `  - One strength-building action (this week)\n`;
    agenda += `  - One growth-area strategy (this week)\n`;
    agenda += `  - One career exploration step (this month)\n`;
    agenda += `- Set a follow-up date and add it to both calendars\n\n`;

    agenda += `**Minutes 42-45: Closing & Emotional Check-Out**\n`;
    agenda += `- Ask: "How are you feeling about what we discussed today?"\n`;
    agenda += `- Validate their emotions regardless of response\n`;
    agenda += `- End with an encouraging statement connecting their strengths to their future\n`;
    agenda += `- Remind them that you are available between sessions if they need support`;

    return agenda;
  }

  /**
   * Generates multi-factor risk assessment covering academic, social, emotional,
   * and career-readiness risks.
   */
  static generateRiskAssessment(
    readinessScore: number,
    blindSpots: any[],
    dimensionScores: any[]
  ): string {
    const risks: { domain: string; level: string; description: string; }[] = [];

    // Academic Risk
    const hasAcademicRisk = blindSpots.some(b => 
      ['DIM_PERS_02', 'DIM_SKILL_01', 'DIM_SKILL_02', 'DIM_LEARN_01', 'DIM_LEARN_02'].includes(b.dimensionId)
    );
    if (readinessScore < 50 || hasAcademicRisk) {
      risks.push({
        domain: '📚 Academic',
        level: readinessScore < 40 ? 'HIGH' : 'MODERATE',
        description: readinessScore < 40 
          ? 'Student is at significant risk of academic underperformance relative to cognitive potential. Low readiness combined with skill/conscientiousness deficits suggests structural barriers to academic success that require systematic intervention, not just encouragement.'
          : 'Student shows moderate academic risk in specific areas. Targeted support in identified growth dimensions should prevent escalation and accelerate improvement.'
      });
    }

    // Social Risk
    const socialEnergy = dimensionScores?.find((d: any) => d.dimensionId === 'DIM_PERS_01');
    const hasExtremelyLowSocial = socialEnergy && socialEnergy.normalizedScore < 15;
    if (hasExtremelyLowSocial) {
      risks.push({
        domain: '👥 Social',
        level: 'MODERATE',
        description: 'Student shows very low social energy scores that may indicate social withdrawal beyond healthy introversion. Differentiate between comfortable introversion (student has close friends and is content) and problematic isolation (student has no peer connections and expresses loneliness or distress). If the latter, consider referral to school psychologist for social skills support.'
      });
    }

    // Emotional Risk
    const emotionalDims = dimensionScores?.filter((d: any) => 
      ['DIM_PERS_04', 'DIM_PERS_05'].includes(d.dimensionId)
    ) || [];
    const hasEmotionalRisk = emotionalDims.some((d: any) => d.normalizedScore < 25);
    if (hasEmotionalRisk) {
      risks.push({
        domain: '💙 Emotional',
        level: 'HIGH',
        description: 'Student shows low emotional resilience scores. This dimension is associated with heightened stress reactivity, difficulty recovering from setbacks, and vulnerability to anxiety and mood disturbances. IMMEDIATE ACTIONS: (1) Conduct a brief wellbeing screening at the next session, (2) Ensure the student knows how to access school counseling and crisis resources, (3) If symptoms are present, initiate referral to school psychologist or external mental health provider.'
      });
    }

    // Career Readiness Risk
    const careerDims = dimensionScores?.filter((d: any) => d.dimensionId?.includes('CAREER')) || [];
    const allCareerLow = careerDims.length > 0 && careerDims.every((d: any) => d.normalizedScore < 30);
    if (allCareerLow) {
      risks.push({
        domain: '🎯 Career Readiness',
        level: 'MODERATE',
        description: 'Student shows uniformly low scores across career interest dimensions, suggesting they have not yet developed clear professional interests or career vision. This is developmentally normal for younger students but warrants attention for students in grades 10+. INTERVENTION: Increase exposure to career exploration activities — job shadowing, informational interviews, career fairs, and interest inventories. Consider referral to career counselor for structured exploration program.'
      });
    }

    if (risks.length === 0) {
      return `**Multi-Factor Risk Assessment**\n\nNo significant risks identified across academic, social, emotional, or career-readiness domains. The student's profile indicates healthy functioning across all assessed areas. Continue standard monitoring and focus sessions on growth optimization and career exploration.`;
    }

    let narrative = `**Multi-Factor Risk Assessment**\n\n`;
    risks.forEach(risk => {
      narrative += `**${risk.domain} Risk — ${risk.level}**\n${risk.description}\n\n`;
    });

    return narrative;
  }

  /**
   * Suggests KPIs and follow-up milestones for each risk area.
   */
  static generateProgressTracking(blindSpots: any[], readinessScore: number): string {
    let narrative = `**Progress Tracking & Follow-Up Plan**\n\n`;
    narrative += `Track the following indicators at each follow-up session (recommended: every 4-6 weeks) to measure intervention effectiveness:\n\n`;

    narrative += `**Overall Readiness** (Current: ${readinessScore}/100)\n`;
    narrative += `- Target: ${Math.min(readinessScore + 10, 100)}/100 by next assessment cycle\n`;
    narrative += `- Measurement: Re-assess using the same instrument or track proxy indicators (GPA trend, assignment completion rate, engagement level)\n\n`;

    if (blindSpots && blindSpots.length > 0) {
      blindSpots.slice(0, 3).forEach((spot: any) => {
        const name = spot.name || spot.dimensionId;
        narrative += `**${name}** (Growth Area)\n`;
        narrative += `- 4-Week Milestone: Student has implemented at least one recommended strategy consistently for 3+ weeks\n`;
        narrative += `- 8-Week Milestone: Student reports subjective improvement and can articulate what strategy is working\n`;
        narrative += `- 12-Week Milestone: Observable behavioral change confirmed by at least one teacher or parent report\n`;
        narrative += `- End-of-Semester Goal: Measurable improvement on next assessment cycle or equivalent proxy measure\n\n`;
      });
    }

    narrative += `**Session Frequency Recommendation:**\n`;
    if (readinessScore < 40) {
      narrative += `- Bi-weekly sessions for the first 8 weeks, then monthly if stable improvement is observed\n`;
    } else if (readinessScore < 65) {
      narrative += `- Monthly sessions with an optional mid-month check-in via email or brief hallway conversation\n`;
    } else {
      narrative += `- Once per semester minimum, with additional sessions as requested by the student\n`;
    }

    narrative += `\n**Documentation:** Record session notes, action plan commitments, and follow-up outcomes in the student's counseling file. Share relevant updates with parents (with student consent) and teachers (as appropriate) to ensure coordinated support.`;

    return narrative;
  }

  /**
   * Recommends when and to whom a counselor should escalate.
   */
  static generateReferralRecommendations(
    readinessScore: number,
    blindSpots: any[],
    dimensionScores: any[]
  ): string {
    const referrals: string[] = [];

    // Learning Specialist Referral
    const hasLearningDeficits = blindSpots.some(b => 
      b.dimensionId?.includes('LEARN') || b.dimensionId?.includes('SKILL')
    );
    if (hasLearningDeficits && readinessScore < 50) {
      referrals.push("**📋 Learning Specialist / Educational Psychologist:** Student shows significant gaps in learning style and/or cognitive skill dimensions combined with low readiness. Recommend formal learning assessment to rule out specific learning disabilities (dyslexia, dyscalculia, processing speed disorders) and identify targeted academic accommodations. Referral is especially warranted if the student has a history of academic underperformance despite apparent cognitive ability.");
    }

    // Mental Health Referral
    const emotionalDims = dimensionScores?.filter((d: any) => 
      ['DIM_PERS_04', 'DIM_PERS_05'].includes(d.dimensionId)
    ) || [];
    const hasEmotionalConcerns = emotionalDims.some((d: any) => d.normalizedScore < 20);
    if (hasEmotionalConcerns) {
      referrals.push("**🧠 School Psychologist / Mental Health Provider:** Student shows very low emotional resilience scores that may indicate clinical-level anxiety, depression, or stress disorders. These scores alone are not diagnostic, but they warrant clinical screening by a qualified mental health professional. Initiate referral process according to school protocol. If the student reports suicidal ideation, self-harm behaviors, or severe functional impairment, follow crisis intervention protocols immediately.");
    }

    // ADHD Screening
    const hasADHDIndicators = blindSpots.some(b => b.dimensionId === 'DIM_PERS_02') 
      && dimensionScores?.find((d: any) => d.dimensionId === 'DIM_PERS_02')?.normalizedScore < 20;
    if (hasADHDIndicators) {
      referrals.push("**🔍 ADHD Screening: Pediatrician / Psychiatrist:** Student shows very low Conscientiousness & Discipline scores that, in combination with behavioral observations (chronic disorganization, time blindness, difficulty with sustained attention), may indicate undiagnosed ADHD. Recommend parent consultation to discuss formal screening. Provide Vanderbilt or Conners rating scale forms for completion by parents and teachers to support the referral.");
    }

    // Career Counselor Referral
    const careerDims = dimensionScores?.filter((d: any) => d.dimensionId?.includes('CAREER')) || [];
    const allCareerLow = careerDims.length > 0 && careerDims.every((d: any) => d.normalizedScore < 25);
    if (allCareerLow) {
      referrals.push("**🎯 Career Counselor / Vocational Specialist:** Student shows uniformly low career interest scores, suggesting limited career self-concept and professional identity development. Recommend structured career exploration program, potentially including formal career interest inventories (Strong Interest Inventory, Holland Code assessment) administered and interpreted by a certified career counselor.");
    }

    if (referrals.length === 0) {
      return `**Referral Recommendations**\n\nNo specialist referrals are indicated at this time. The student's profile does not reveal patterns that suggest the need for external clinical, educational, or vocational assessment. Continue standard school-based counseling support and monitor at regular intervals.`;
    }

    let narrative = `**Referral Recommendations**\n\nBased on the student's profile, the following specialist referrals should be considered. These are clinical recommendations based on psychometric patterns — they are not diagnoses. Each referral should be discussed with the student and their parents before initiating.\n\n`;
    narrative += referrals.join('\n\n');

    return narrative;
  }
}
