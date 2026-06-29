/**
 * Parent Narrative Engine
 * 
 * Translates psychometric data into actionable, empathetic guidance for parents.
 * Focuses on support strategies, communication tips, and learning environment optimization.
 * 
 * Enhanced with comprehensive family guidance covering:
 * - Communication tips for all personality dimensions
 * - Actual learning support implementation (not placeholder)
 * - Home environment optimization guide
 * - Motivation strategies based on profile
 * - Conversation starters for discussing results
 * - Age-appropriate milestone guidance
 * - Warning signals parents should watch for
 */

export class ParentNarrativeEngine {
  
  /**
   * Generates specific communication recommendations based on ALL personality dimensions.
   * Enhanced from 2 dimensions (social energy + openness) to cover all personality dimensions
   * with 6-8 specific, actionable tips.
   */
  static generateCommunicationTips(
    socialEnergyScore: number, 
    opennessScore: number,
    conscientiousnessScore?: number,
    emotionalResilienceScore?: number
  ): string[] {
    const tips: string[] = [];
    
    // Social Energy tips
    if (socialEnergyScore > 75) {
      tips.push("Your child thrives on verbalizing their thoughts. Encourage them to 'talk out' their problems with you rather than expecting them to figure it out silently in their room. When they come home from school, give them an opportunity to share their day immediately — they process experiences by narrating them to someone who listens.");
      tips.push("Be prepared for high-energy, rapid-fire conversations. Your child may jump between topics quickly and think out loud in a stream-of-consciousness style. This is NOT scattered thinking — it's how their brain processes information. Try to follow along and ask follow-up questions rather than asking them to 'slow down and organize their thoughts.'");
    } else if (socialEnergyScore < 30) {
      tips.push("Your child needs time to process information internally before discussing it. When asking about their day or future plans, give them a few hours of downtime first. Don't interpret their initial silence as resistance or secrecy — they are processing, not hiding.");
      tips.push("Respect their closed door. If your child retreats to their room after school or social events, this is healthy recharging, not antisocial behavior. Knock before entering, offer them space without making it a point of conflict, and trust that they'll engage when they're ready. Forced socialization during their recovery time will backfire.");
      tips.push("For important conversations (about grades, future plans, or emotional topics), consider writing them a letter or text first, then following up in person. This gives your child time to process the information privately before having to respond verbally — which plays to their processing strengths.");
    } else {
      tips.push("Your child has a balanced social style. They can engage in lively family discussions AND appreciate quiet time alone. Follow their lead — on some days they'll want to chat at length about their experiences, and on other days they'll prefer companionable silence. Both are normal for their profile.");
    }

    // Openness tips
    if (opennessScore > 75) {
      tips.push("They are highly receptive to new ideas and experiences. Instead of giving direct advice, use 'What if?' scenarios to guide their decision-making. Ask questions like 'What would happen if you tried it this way?' or 'Have you considered looking at it from this angle?' Their open mind responds much better to guided discovery than direct instruction.");
      tips.push("Encourage their natural curiosity by exposing them to diverse experiences — museums, documentaries, cultural events, new cuisines, travel, and conversations with people from different backgrounds. Their brain craves novelty and intellectual stimulation. Boredom is their kryptonite, so help them find constructive outlets for their exploratory drive.");
    } else if (opennessScore < 30) {
      tips.push("Your child prefers the familiar and established. When introducing new ideas, subjects, or activities, connect them to things they already know and enjoy. Framing new experiences as 'related to' their existing interests dramatically reduces resistance. Avoid phrases like 'You should try something completely different' — instead say 'This is kind of like [thing they like], but with a twist.'");
      tips.push("Respect their preference for routine and predictability. Major changes (new school, family move, schedule changes) require extra preparation time for your child. Give them as much advance notice as possible, walk them through what the change will look like step by step, and maintain as many existing routines as possible during transitions.");
    }

    // Conscientiousness tips
    if (conscientiousnessScore !== undefined) {
      if (conscientiousnessScore > 75) {
        tips.push("Your child is highly self-disciplined and may put excessive pressure on themselves. Watch for signs of perfectionism and burnout: reluctance to submit work they consider 'not good enough,' visible stress over minor mistakes, or difficulty relaxing and having fun. Counter this by explicitly praising effort over outcomes: 'I'm proud of how hard you worked on this' is more helpful than 'I'm proud you got an A.'");
      } else if (conscientiousnessScore < 30) {
        tips.push("Your child's brain is wired for flexibility rather than rigid structure. Instead of expecting them to spontaneously organize themselves, help them build simple external systems: a shared family calendar for deadlines, a designated homework station with supplies ready, and a brief nightly 'tomorrow prep' routine (5 minutes of packing their bag and reviewing tomorrow's schedule). Frame these as helpful tools, not punishments for being disorganized.");
        tips.push("When they procrastinate on assignments, resist the urge to lecture about responsibility. Instead, help them break the task into tiny, achievable steps and sit with them (without hovering) for the first 10 minutes of work. Often, the hardest part for their personality type is starting — once they begin, momentum carries them forward.");
      }
    }

    // Emotional Resilience tips
    if (emotionalResilienceScore !== undefined) {
      if (emotionalResilienceScore < 40) {
        tips.push("Your child may experience emotions more intensely than their peers and take longer to recover from setbacks. After a bad grade, social conflict, or disappointment, avoid immediately trying to 'fix' the situation or minimize their feelings ('It's not a big deal'). Instead, validate their emotions first ('I can see this is really upsetting for you, and that makes sense'), then help them develop perspective once the initial emotional wave has passed.");
        tips.push("Create a 'safe landing zone' at home — a consistent, predictable environment where your child knows they are accepted regardless of their academic performance or social struggles. Children with lower emotional resilience are especially sensitive to parental disappointment, even when it's unintentional. Be mindful of your facial expressions and tone when they share difficult news.");
      }
    }

    // Universal tip
    if (tips.length < 3) {
      tips.push("Maintain open, non-judgmental communication to support their growth. Ask open-ended questions ('Tell me more about that') rather than yes/no questions ('Did you have a good day?'). Show genuine curiosity about their interests, even if those interests seem unfamiliar or unproductive to you — your engagement validates their identity development.");
    }

    return tips;
  }

  /**
   * Generates the "How to Support Their Learning" narrative with actual learning-style-specific 
   * recommendations instead of a placeholder.
   */
  static generateLearningSupport(learningStyleDimensions: any[]): string {
    if (!learningStyleDimensions || learningStyleDimensions.length === 0) {
      return "Learning style data is not yet available. Once the full assessment is complete, this section will provide specific recommendations for optimizing your child's study environment at home.";
    }

    let narrative = `**How to Support Their Learning at Home**\n\n`;
    narrative += `Your child's assessment reveals specific learning preferences that, when supported at home, can dramatically improve their study effectiveness, retention, and enjoyment of the learning process. Here are tailored recommendations based on their learning style profile:\n\n`;

    // Find dominant learning style
    const sortedStyles = [...learningStyleDimensions].sort((a, b) => 
      (b.normalizedScore || b.score || 0) - (a.normalizedScore || a.score || 0)
    );
    
    const primaryStyle = sortedStyles[0];
    const primaryId = primaryStyle?.dimensionId || '';
    const primaryScore = primaryStyle?.normalizedScore || primaryStyle?.score || 50;

    if (primaryId.includes('LEARN_01')) {
      // Visual Learning dominant
      if (primaryScore > 65) {
        narrative += `**Primary Learning Channel: Visual** 🎨\n\n`;
        narrative += `Your child processes and retains information most effectively through visual channels — diagrams, charts, videos, color-coding, and spatial organization. To support this at home:\n\n`;
        narrative += `- **Study Space:** Provide a large whiteboard or corkboard in their study area where they can map out concepts visually. Include plenty of colored markers, highlighters, and sticky notes.\n`;
        narrative += `- **Homework Support:** When helping with homework, draw diagrams and flowcharts together rather than just talking through problems verbally. Ask them to 'show you what it looks like' rather than 'explain it in words.'\n`;
        narrative += `- **Study Resources:** Invest in mind-mapping software (like MindMeister or XMind), educational YouTube channels, and video-based learning platforms. These are not distractions for your child — they are their primary learning tools.\n`;
        narrative += `- **Textbook Strategy:** When they struggle with a text-heavy chapter, sit with them and help them convert the key points into a visual summary page with diagrams, arrows, and color-coded sections.\n`;
        narrative += `- **Exam Preparation:** Help them create 'visual study sheets' — single pages that map out an entire topic's key relationships using spatial positioning, colors, and symbols. These sheets become powerful review tools.\n\n`;
      } else {
        narrative += `**Learning Channel: Mixed with Visual Component**\n\n`;
        narrative += `Your child can learn through multiple channels but has a notable visual component. Ensure they have access to both text-based and visual learning resources. When one method isn't clicking, try switching to the other modality.\n\n`;
      }
    } else if (primaryId.includes('LEARN_02')) {
      // Auditory/Reading learning dominant
      narrative += `**Primary Learning Channel: Verbal/Auditory** 📖\n\n`;
      narrative += `Your child processes and retains information most effectively through reading, writing, and listening. To support this at home:\n\n`;
      narrative += `- **Study Space:** Ensure access to a quiet reading area with good lighting and minimal visual distractions. A comfortable reading chair or desk with a book stand can make long reading sessions more sustainable.\n`;
      narrative += `- **Homework Support:** When helping with homework, discuss concepts verbally and encourage them to write out their reasoning step by step. Reading problems aloud often helps them 'hear' the solution.\n`;
      narrative += `- **Study Resources:** Invest in audiobooks, educational podcasts, and text-based study materials. Recording lectures (with teacher permission) for replay is especially effective.\n`;
      narrative += `- **Exam Preparation:** Help them create written study guides and practice explaining concepts out loud to you. The 'teach-back' method — where they explain the material as if teaching you — is one of the most powerful study strategies for their learning type.\n\n`;
    } else {
      // Kinesthetic/Other learning dominant
      narrative += `**Primary Learning Channel: Hands-On/Kinesthetic** 🔧\n\n`;
      narrative += `Your child learns most effectively through direct experience, physical manipulation, and active engagement. To support this at home:\n\n`;
      narrative += `- **Study Space:** Create a flexible study environment where they can move — a standing desk option, exercise ball chair, or permission to pace while reviewing notes. Sitting still for long periods actively impairs their learning.\n`;
      narrative += `- **Homework Support:** Incorporate physical elements whenever possible. Use manipulatives for math, build models for science, act out historical events, or create physical timelines using cards on the floor.\n`;
      narrative += `- **Study Resources:** Seek out hands-on learning kits, lab experiments, maker projects, and interactive simulations. Learning-by-doing is their superpower.\n`;
      narrative += `- **Exam Preparation:** Help them create physical study aids — flashcard sorting games, walking reviews (associating facts with physical locations in the house), and teaching the material to you using props or demonstrations.\n\n`;
    }

    narrative += `**General Study Environment Tips:**\n`;
    narrative += `- Establish a consistent daily study routine, but allow flexibility in the exact timing based on their energy levels\n`;
    narrative += `- Ensure good lighting, comfortable temperature, and appropriate noise levels (some students concentrate better with ambient sound; others need silence — follow your child's preference)\n`;
    narrative += `- Keep healthy snacks and water available in the study area — cognitive function is directly impacted by hydration and nutrition\n`;
    narrative += `- Minimize digital distractions during focused study time by using app blockers or placing phones in another room\n`;
    narrative += `- Take breaks every 45-60 minutes — short physical movement breaks (stretching, walking, jumping jacks) restore cognitive focus more effectively than passive breaks (scrolling social media)`;

    return narrative;
  }

  /**
   * Generates a detailed guide for optimizing the home study environment
   * based on the student's learning style and personality.
   */
  static generateHomeEnvironmentGuide(
    socialEnergyScore: number,
    _learningStyleDimensions: any[],
    conscientiousnessScore: number
  ): string {
    let guide = `**Optimizing Your Child's Home Study Environment**\n\n`;
    guide += `Research consistently shows that the home study environment has a measurable impact on academic performance — sometimes as significant as the quality of classroom instruction. The following recommendations are tailored to your child's specific cognitive profile:\n\n`;

    // Physical Space
    guide += `**🏠 Physical Space**\n`;
    if (socialEnergyScore > 65) {
      guide += `Your child benefits from studying in shared family spaces (kitchen table, living room) rather than isolated in their bedroom. The gentle presence of family members provides the low-level social stimulation that keeps their brain engaged. However, during deep focus work (exam preparation, complex problem-solving), they may need a quieter space — let them choose.\n\n`;
    } else if (socialEnergyScore < 35) {
      guide += `Your child needs a private, quiet study space where they can control noise levels and interruptions. A bedroom desk with a closed door, noise-cancelling headphones, and a 'do not disturb' signal (a sign on the door, a specific time block) are essential infrastructure for their cognitive style. Studying in shared family spaces will likely reduce their productivity significantly.\n\n`;
    } else {
      guide += `Your child is adaptable regarding study location. Provide both options — a shared family space for routine homework and a quiet private space for intensive study — and let them choose based on the task.\n\n`;
    }

    // Organization Systems
    guide += `**📋 Organization Systems**\n`;
    if (conscientiousnessScore > 65) {
      guide += `Your child likely already has organizational systems they prefer. Support their existing methods rather than imposing new ones. Provide the tools they request (planners, folders, desk organizers, digital apps) and let them organize their own space. Interfering with their systems — even with good intentions — can be stressful for highly conscientious students.\n\n`;
    } else if (conscientiousnessScore < 35) {
      guide += `Your child needs external organizational support that they won't naturally create for themselves. Set up a simple, visible system: a large wall calendar showing all upcoming deadlines, a designated spot for school materials (backpack hook, paper tray), and a weekly 15-minute 'reset session' where you help them organize their materials and review upcoming commitments. Make the system as visual and simple as possible — complex organizational tools will be abandoned.\n\n`;
    } else {
      guide += `Your child manages organization reasonably well but may benefit from a simple shared system for tracking major deadlines. A family whiteboard calendar or shared digital calendar keeps everyone aligned without being intrusive.\n\n`;
    }

    // Technology
    guide += `**💻 Technology & Distractions**\n`;
    guide += `The single most impactful change most families can make is establishing clear phone/device boundaries during study time. Research shows that even the presence of a phone on the desk (even silenced) reduces cognitive performance by up to 20% because part of the brain is monitoring it for notifications.\n\n`;
    guide += `Recommended approach:\n`;
    guide += `- During focused study sessions, phones go to a designated charging station in another room\n`;
    guide += `- Use website/app blocking tools (like Freedom, Cold Turkey, or built-in device settings) during study hours\n`;
    guide += `- Allow technology breaks between study sessions (e.g., 10 minutes of phone time between 45-minute study blocks)\n`;
    guide += `- Model the behavior yourself — if you're asking your child to put away their phone, demonstrate that you're doing the same\n\n`;

    // Routine
    guide += `**⏰ Routine & Scheduling**\n`;
    guide += `- Establish a consistent 'study window' each day — the exact timing matters less than the consistency\n`;
    guide += `- Protect study time from extracurricular conflicts and family obligations\n`;
    guide += `- Include a brief transition ritual between 'arrival home' and 'study time' (snack, 15-minute break, brief physical activity) to allow emotional decompression from the school day\n`;
    guide += `- End study time at a reasonable hour — sleep quality is the single strongest predictor of next-day cognitive performance. For teens, 8-10 hours of sleep is non-negotiable for optimal brain function`;

    return guide;
  }

  /**
   * Generates motivation strategies based on the student's interest and personality profile.
   */
  static generateMotivationStrategies(
    topThemes: any[],
    readinessScore: number,
    conscientiousnessScore: number
  ): string {
    const themeName = topThemes[0]?.name || 'their primary theme';

    let narrative = `**How to Motivate Your Child Effectively**\n\n`;
    narrative += `Motivation is not one-size-fits-all. What energizes one child can demotivate another. Based on your child's specific profile, here are strategies that are most likely to work:\n\n`;

    // Intrinsic vs Extrinsic
    if (conscientiousnessScore > 65) {
      narrative += `**Your Child's Motivation Type: Intrinsic Achievement**\n`;
      narrative += `Your child is primarily driven by internal standards and the satisfaction of completing high-quality work. External rewards (money, prizes) are less motivating than internal rewards (pride in accomplishment, mastery of a skill). Support this by:\n`;
      narrative += `- Acknowledging their effort and process, not just outcomes ("I noticed you revised that essay three times — that's real dedication")\n`;
      narrative += `- Helping them set their own challenging-but-achievable goals rather than imposing goals from outside\n`;
      narrative += `- Giving them autonomy over how they approach their work — controlling behavior undermines intrinsic motivation\n`;
      narrative += `- Watching for perfectionism burnout — sometimes the most motivating thing you can say is "This is already great. You can stop now."\n\n`;
    } else if (conscientiousnessScore < 35) {
      narrative += `**Your Child's Motivation Type: Interest-Driven Engagement**\n`;
      narrative += `Your child is primarily motivated by genuine interest and excitement rather than duty or obligation. They can produce exceptional work when they care about the topic, and minimal work when they don't. Support this by:\n`;
      narrative += `- Helping them find personal relevance in required schoolwork ("How does this connect to gaming/music/art/sports that you love?")\n`;
      narrative += `- Using short-term rewards strategically for tasks they find boring — "Finish this chapter, then you can play for 30 minutes"\n`;
      narrative += `- Never making motivation-killing comparisons to siblings or peers ("Why can't you be more like...")\n`;
      narrative += `- Celebrating completion of difficult tasks enthusiastically — finishing boring but necessary work is a genuine accomplishment for their personality type\n\n`;
    } else {
      narrative += `**Your Child's Motivation Type: Balanced/Adaptable**\n`;
      narrative += `Your child responds to a mix of internal drive and external encouragement. They can self-motivate for tasks they find meaningful and accept external support for less engaging tasks. Support this by maintaining a balance of autonomy and gentle accountability.\n\n`;
    }

    // Theme-based motivation
    narrative += `**Connecting to Their Core Identity (${themeName})**\n`;
    narrative += `The most powerful long-term motivator is connecting daily schoolwork to their bigger identity and aspirations. When they ask "Why do I have to learn this?", connect the answer to their theme:\n`;
    narrative += `- Frame academic subjects as building blocks for their future, not arbitrary hoops to jump through\n`;
    narrative += `- Share stories of successful people in their theme's field and how they leveraged education\n`;
    narrative += `- Help them see the direct connection between today's homework and tomorrow's career possibilities\n\n`;

    // Readiness-based
    if (readinessScore < 50) {
      narrative += `**Important Note for Lower-Readiness Students:**\n`;
      narrative += `Your child's readiness score suggests they may currently feel disconnected from or overwhelmed by academic demands. In this situation, the most effective motivation strategy is NOT pushing harder — it's reducing friction and rebuilding confidence. Focus on:\n`;
      narrative += `- Acknowledging how they feel without judgment ("I know school feels hard right now, and that's okay")\n`;
      narrative += `- Identifying one small, achievable win they can accomplish today (not this semester, not this week — today)\n`;
      narrative += `- Removing obstacles rather than adding pressure (better sleep, less overscheduling, reduced family conflict)\n`;
      narrative += `- Seeking professional support from their school counselor if motivation issues persist beyond 4-6 weeks`;
    }

    return narrative;
  }

  /**
   * Generates specific open-ended questions parents can ask their child about their results.
   */
  static generateConversationStarters(topStrengths: any[], blindSpots: any[], _topThemes: any[]): string[] {
    const starters: string[] = [];
    const strengthName = topStrengths[0]?.name || 'your top strength';
    const growthName = blindSpots[0]?.name || 'your growth area';
    const themeName = _topThemes[0]?.name || 'your theme';

    starters.push(`"Your report says your biggest strength is ${strengthName}. Does that feel right to you? Can you think of a time recently when you really used that strength?"`);

    starters.push(`"One of the interesting things your report shows is your theme: ${themeName}. What do you think that means for the kind of work you might enjoy in the future?"`);

    starters.push(`"Your report mentions ${growthName} as an area where you could grow. I'm not worried about it — everyone has growth areas. But I'm curious: is that something you've noticed about yourself too? And would you want help working on it, or would you rather focus on your strengths?"`);

    starters.push(`"If you could design your perfect school day — the classes, the schedule, the way teachers teach — what would it look like? I'm asking because your report gives us clues about what environments work best for you, and I want to make sure we're supporting that at home too."`);

    starters.push(`"Was there anything in the report that surprised you? Something you didn't expect, or something that made you think about yourself differently?"`);

    starters.push(`"Looking at your career recommendations, which ones sound interesting to you? Even if they seem far away right now, I'd love to know what sparks your curiosity."`);

    return starters;
  }

  /**
   * Provides age-appropriate milestones and expectations for the student's profile type.
   */
  static generateMilestoneGuidance(readinessScore: number, _topThemes: any[]): string {
    let narrative = `**Age-Appropriate Milestone Guidance**\n\n`;
    narrative += `Every child develops at their own pace, and psychometric profiles evolve significantly during adolescence. Here are realistic, evidence-based milestones to guide your expectations:\n\n`;

    narrative += `**Grades 8-9 (Ages 13-15): Exploration Phase**\n`;
    narrative += `- Dimension scores are still forming and may change significantly over the next 2-3 years\n`;
    narrative += `- Career interests are exploratory, not commitments — support broad exposure to different fields\n`;
    narrative += `- Focus on building foundational study habits and organizational skills rather than career planning\n`;
    narrative += `- Social identity is in flux; personality dimensions (especially social energy and openness) may shift notably\n`;
    narrative += `- A readiness score below 60 at this age is developmentally normal and NOT a cause for alarm\n\n`;

    narrative += `**Grades 10-11 (Ages 15-17): Crystallization Phase**\n`;
    narrative += `- Dimension scores begin to stabilize, and dominant strengths become more apparent\n`;
    narrative += `- Career interests should be narrowing from broad exploration to 2-3 focused areas\n`;
    narrative += `- Academic performance patterns (strengths and weaknesses by subject) are now meaningful indicators\n`;
    narrative += `- This is the ideal time for career exploration activities: job shadowing, informational interviews, internships\n`;
    narrative += `- Readiness scores should be trending upward; if declining, investigate potential causes (social stress, academic mismatch, mental health)\n\n`;

    narrative += `**Grade 12+ (Ages 17+): Application Phase**\n`;
    narrative += `- Dimension scores are relatively stable and can meaningfully inform college major and career decisions\n`;
    narrative += `- Career interests should be specific enough to guide college applications and course selection\n`;
    narrative += `- The student should be able to articulate their strengths, growth areas, and career direction in their own words\n`;
    narrative += `- Readiness scores above 65 indicate strong preparation for post-secondary transitions\n`;
    narrative += `- If readiness is below 50 at this stage, prioritize immediate counselor consultation and targeted intervention\n\n`;

    if (readinessScore > 75) {
      narrative += `**Your Child's Current Position:** With a readiness score of ${readinessScore}, your child is ahead of typical developmental milestones. Focus on challenging them with advanced opportunities rather than reinforcing basics.`;
    } else if (readinessScore > 50) {
      narrative += `**Your Child's Current Position:** With a readiness score of ${readinessScore}, your child is progressing normally through expected developmental milestones. Continue supporting their growth without undue pressure.`;
    } else {
      narrative += `**Your Child's Current Position:** With a readiness score of ${readinessScore}, your child is in the earlier stages of cognitive development relative to their age group. This is not a permanent condition — with targeted support and appropriate interventions, significant improvement is expected. Partner with their school counselor to create a development plan.`;
    }

    return narrative;
  }

  /**
   * Identifies specific behavioral patterns parents should watch for
   * that indicate the student is struggling.
   */
  static generateWarningSignals(
    blindSpots: any[],
    readinessScore: number,
    socialEnergyScore: number
  ): string {
    let narrative = `**Warning Signals to Watch For**\n\n`;
    narrative += `While this assessment provides a snapshot of your child's cognitive profile at a point in time, ongoing observation at home is essential for identifying emerging concerns. The following warning signals are specifically calibrated to your child's profile — they are NOT generic parenting checklists but targeted indicators based on their specific dimension scores and risk areas.\n\n`;

    narrative += `**🔴 Immediate Attention Needed:**\n`;
    narrative += `- Persistent expressions of hopelessness or worthlessness ("Nothing I do matters" or "I'm stupid")\n`;
    narrative += `- Social withdrawal that represents a change from their baseline (even introverted students have a normal social pattern — watch for deviations from THEIR normal)\n`;
    narrative += `- Significant sleep changes (sleeping much more or much less than usual for 2+ weeks)\n`;
    narrative += `- Loss of interest in previously enjoyed activities for more than 2-3 weeks\n`;
    narrative += `- Any mention of self-harm or suicidal thoughts — take every mention seriously and contact their school counselor or a crisis helpline immediately\n\n`;

    narrative += `**🟡 Monitor and Address Within 2-4 Weeks:**\n`;
    
    if (readinessScore < 50) {
      narrative += `- Increasing avoidance of homework or school-related conversations (their low readiness makes academic engagement fragile)\n`;
      narrative += `- Growing gap between their capabilities (what they CAN do when engaged) and their output (what they actually produce)\n`;
    }

    if (socialEnergyScore > 65) {
      narrative += `- Unusual social withdrawal or declining invitations that they would normally accept (for high-social-energy students, this can signal depression or social conflict)\n`;
      narrative += `- Grades dropping specifically on individual assignments while group work remains strong (may indicate difficulty with independent focus)\n`;
    } else if (socialEnergyScore < 35) {
      narrative += `- Complete elimination of all social contact (even introverts need SOME connection — zero social engagement may indicate depression)\n`;
      narrative += `- Increasing anxiety about social situations that were previously manageable (may indicate developing social anxiety disorder)\n`;
    }

    const hasLowConscientiousness = blindSpots.some(b => b.dimensionId === 'DIM_PERS_02');
    if (hasLowConscientiousness) {
      narrative += `- Rapidly escalating disorganization (losing important items daily, missing multiple deadlines per week, complete inability to track responsibilities — may indicate undiagnosed ADHD)\n`;
      narrative += `- Emotional meltdowns around routine organizational tasks (crying over homework, rage about cleaning their room — emotional dysregulation combined with disorganization is a clinical red flag)\n`;
    }

    narrative += `\n**🟢 Normal Variations (NOT Warning Signals):**\n`;
    narrative += `- Occasional bad grades on subjects outside their strength areas (this is expected and normal)\n`;
    narrative += `- Preferring to study in ways that don't match your personal style (their assessment confirms their preferences — trust the data)\n`;
    narrative += `- Choosing extracurriculars that you don't understand or wouldn't have chosen (their theme alignment may lead them to activities that surprise you)\n`;
    narrative += `- Fluctuations in motivation and engagement from week to week (this is developmentally normal in adolescence)\n`;
    narrative += `- Score shifts between assessments (cognitive profiles evolve, especially during ages 13-18)\n\n`;

    narrative += `**If you observe any 🔴 signals:** Contact your child's school counselor immediately. You can also reach the national crisis text line by texting HOME to 741741.\n`;
    narrative += `**If you observe any 🟡 signals:** Schedule a conversation with your child first, then follow up with their school counselor if the pattern persists beyond 2-4 weeks.`;

    return narrative;
  }
}
