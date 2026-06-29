/**
 * Dimension Insights Database
 * 
 * Deeply personalized, unique content for each of the 22 psychometric dimensions.
 * Every dimension has tier-specific (high/medium/low) insights covering:
 * - What the dimension measures and why it matters
 * - Core strengths, growth areas, and actionable steps
 * 
 * This is the heart of the report's value — highly specific, non-generic content.
 */

export interface TierInsight {
  strengths: string[];
  growth: string[];
  tips: string[];
}

export interface DimensionInsightData {
  whatItMeans: string;
  whyItMatters: string;
  high: TierInsight;
  medium: TierInsight;
  low: TierInsight;
}

export const DIMENSION_INSIGHTS: Record<string, DimensionInsightData> = {

  // ═══════════════════════════════════════════
  // PERSONALITY CLUSTER
  // ═══════════════════════════════════════════

  DIM_PERS_01: { // Openness
    whatItMeans: "Openness measures your appetite for novelty, intellectual curiosity, and willingness to challenge conventional thinking. It captures how eagerly you seek out new ideas, explore unfamiliar perspectives, and embrace creative or unconventional approaches to problems.",
    whyItMatters: "In a rapidly changing world, Openness is the single strongest predictor of adaptability. High-Openness individuals thrive in innovation-driven careers (design, research, entrepreneurship), while those with more focused Openness excel in roles requiring depth and consistency.",
    high: {
      strengths: [
        "You have an insatiable intellectual curiosity — you naturally seek out new ideas, perspectives, and experiences that others might overlook or avoid.",
        "You thrive in ambiguity and unstructured environments, often generating creative solutions when rigid frameworks fail.",
        "Your imagination and willingness to challenge 'the way things are done' make you a natural innovator and thought leader.",
        "You absorb information from diverse domains and connect seemingly unrelated concepts, producing genuinely original thinking.",
      ],
      growth: [
        "Your constant desire for novelty can sometimes lead to 'shiny object syndrome' — starting many projects but completing few.",
        "You may unconsciously dismiss structured, routine-based work as boring, which can create friction in team environments that value consistency.",
        "Overly abstract thinking can sometimes disconnect you from practical execution — your ideas may outpace your ability to implement them.",
      ],
      tips: [
        "Channel your curiosity into a structured 'exploration journal' — dedicate 30 minutes daily to exploring one new concept, then write a 3-sentence summary of how it connects to your current work.",
        "Pair your creative ideation with a 'commitment checkpoint': for every 3 ideas you explore, commit to executing 1 to completion before moving on.",
        "Seek out interdisciplinary projects (science + art, tech + humanities) where your cross-domain thinking creates maximum impact.",
        "Consider careers in research, UX design, product innovation, journalism, or any field where fresh thinking is the primary value driver.",
      ],
    },
    medium: {
      strengths: [
        "You strike a healthy balance between curiosity and focus — open enough to entertain new ideas, but grounded enough to commit to proven approaches when needed.",
        "You can adapt to both creative brainstorming sessions and structured execution phases without significant friction.",
        "Your moderate openness means you can serve as a bridge between 'the dreamers' and 'the doers' on any team.",
      ],
      growth: [
        "You may sometimes hold back from sharing truly unconventional ideas for fear of being seen as impractical or 'too out there.'",
        "There's a risk of defaulting to safe, incremental improvements rather than pursuing breakthrough thinking when the situation truly calls for it.",
        "You might underestimate the value of exploring topics completely outside your comfort zone — the biggest insights often come from unfamiliar territory.",
      ],
      tips: [
        "Set a weekly 'creative stretch' challenge: spend 1 hour exploring a topic you know nothing about (a new science, art form, or philosophy). Write down 2 ideas it sparks.",
        "In team settings, deliberately voice your most unconventional idea at least once per meeting — you may be surprised how often it shifts the conversation productively.",
        "Read one book per month from a genre or discipline completely outside your usual interests to expand your mental model library.",
      ],
    },
    low: {
      strengths: [
        "You have a strong preference for depth over breadth — when you commit to an approach, you execute with remarkable focus and consistency.",
        "Your practical, reality-grounded mindset means your ideas are almost always actionable and implementable immediately.",
        "Teams value your stability and predictability — you're the person others rely on to keep things running smoothly when chaos erupts.",
      ],
      growth: [
        "You may resist new methods or tools even when the evidence clearly shows they're superior, simply because the current approach feels more comfortable.",
        "In rapidly changing industries (tech, media, healthcare), a strong preference for the familiar can put you at a competitive disadvantage over time.",
        "You might unconsciously filter out feedback or perspectives that challenge your existing worldview, limiting your growth trajectory.",
      ],
      tips: [
        "Start with micro-experiments: try one new approach to a routine task each week. Keep it small and low-risk — the goal is to build comfort with novelty, not to overhaul your workflow.",
        "Ask a friend or colleague who thinks very differently from you to recommend one article, video, or podcast per week. Consume it with genuine curiosity.",
        "When you catch yourself thinking 'that won't work,' replace it with 'what would need to be true for that to work?' This single reframe unlocks creative thinking.",
      ],
    },
  },

  DIM_PERS_02: { // Conscientiousness
    whatItMeans: "Conscientiousness measures your natural tendency toward organization, self-discipline, goal persistence, and methodical planning. It reflects how naturally you create structure, follow through on commitments, and maintain high personal standards.",
    whyItMatters: "Conscientiousness is the strongest personality predictor of academic performance and career success across virtually all fields. It directly impacts your ability to set and achieve long-term goals, manage time, and build trust through reliability.",
    high: {
      strengths: [
        "You are exceptionally organized and self-disciplined — you naturally create systems, schedules, and checklists that keep complex projects on track.",
        "Your reliability is one of your most valued traits — when you commit to something, others know with near-certainty it will be done, and done well.",
        "You have an unusually strong ability to delay gratification, sacrificing short-term pleasure for long-term achievement.",
        "Your attention to detail catches errors and inefficiencies that others miss, making you invaluable in quality-critical roles.",
      ],
      growth: [
        "Your perfectionism can sometimes become a bottleneck — you may over-polish work that is already 'good enough,' missing deadlines while chasing the last 2% of quality.",
        "You may experience disproportionate anxiety when plans change unexpectedly, because your identity is closely tied to structure and predictability.",
        "High conscientiousness can sometimes manifest as rigidity — difficulty adapting when the best path forward requires improvisation rather than planning.",
      ],
      tips: [
        "Practice the '80/20 rule' deliberately: before each task, ask 'What is the minimum effort that achieves 80% of the value?' Ship that first, then refine if time allows.",
        "Build 'flex blocks' into your schedule — unplanned 30-minute windows where you're allowed to be spontaneous. This builds your comfort with ambiguity.",
        "When collaborating, explicitly ask others: 'Is this at the quality level you need, or should I invest more time?' This prevents over-engineering.",
        "Your natural organizational skills are a superpower in project management, operations, finance, engineering, and any role requiring systematic execution.",
      ],
    },
    medium: {
      strengths: [
        "You can shift between structured planning and flexible improvisation depending on the situation — a rare and valuable ability.",
        "You're organized enough to be reliable, but not so rigid that unexpected changes throw you off balance.",
        "You can maintain focus on important tasks while still being open to pivoting when new information arrives.",
      ],
      growth: [
        "You may occasionally let important-but-not-urgent tasks slip through the cracks because your organizational systems aren't quite airtight.",
        "Inconsistency in follow-through can erode trust over time — others may be unsure whether 'this time' you'll follow through or not.",
        "You might procrastinate on tasks that feel tedious or low-stimulation, even when they're critical to your long-term goals.",
      ],
      tips: [
        "Implement one simple organizational system and commit to it for 30 days: a daily to-do list with your top 3 priorities, reviewed every morning.",
        "Use the '2-minute rule': if a task takes less than 2 minutes, do it immediately rather than adding it to your list. This prevents small tasks from accumulating.",
        "Set up weekly accountability check-ins with a peer or mentor — external accountability dramatically boosts follow-through for moderate-conscientiousness individuals.",
      ],
    },
    low: {
      strengths: [
        "You have a natural spontaneity and flexibility that allows you to adapt quickly to changing circumstances without the friction of abandoned plans.",
        "Your relaxed approach to structure makes you comfortable in high-uncertainty environments where rigid planning is impossible (startups, creative fields, crisis response).",
        "You're less likely to experience burnout from self-imposed perfectionism — you have a healthier relationship with 'good enough.'",
      ],
      growth: [
        "Without deliberate effort, important deadlines, commitments, and long-term goals may consistently fall through the cracks.",
        "Others may perceive you as unreliable, even when your intentions are genuine — this is one of the highest-cost blind spots in professional settings.",
        "The gap between your aspirations and your daily actions may be large, leading to frustration about 'not living up to your potential.'",
      ],
      tips: [
        "Start with one micro-habit: every evening, write down the single most important thing you need to accomplish tomorrow. Tape it to your mirror or phone.",
        "Use external scaffolding (alarms, calendar blocks, accountability partners) to compensate for your natural resistance to self-imposed structure.",
        "Break large goals into tiny daily actions — 'study for 10 minutes' rather than 'prepare for the exam.' Consistency of tiny actions compounds dramatically.",
        "Consider pairing with a highly conscientious partner or colleague who can help you maintain structure while you bring flexibility and adaptability.",
      ],
    },
  },

  DIM_PERS_03: { // Social Energy
    whatItMeans: "Social Energy measures your natural preference for social interaction, assertiveness, and external stimulation. It captures whether you're energized by being around people and active environments, or whether you recharge through solitude and quiet reflection.",
    whyItMatters: "Understanding your Social Energy profile is critical for choosing the right work environment, communication style, and leadership approach. Neither high nor low is 'better' — they simply unlock different career paths and relationship dynamics.",
    high: {
      strengths: [
        "You draw genuine energy from social interaction — group brainstorming, networking events, and collaborative projects fuel rather than drain you.",
        "Your natural assertiveness and verbal fluency make you a compelling communicator, whether pitching ideas, leading meetings, or rallying a team.",
        "You build professional networks quickly and intuitively, creating a wide web of relationships that opens doors to opportunities others never see.",
        "Your enthusiasm is contagious — you naturally elevate the energy and motivation of any team or group you join.",
      ],
      growth: [
        "You may struggle with tasks that require prolonged solitary focus (deep reading, research, writing, coding) because isolation drains your energy.",
        "Your desire to be heard can sometimes overshadow quieter team members who have equally valuable insights but are less assertive.",
        "You might over-commit to social obligations (meetings, events, collaborations) at the expense of deep, focused work that requires uninterrupted concentration.",
      ],
      tips: [
        "Schedule 'deep work blocks' as non-negotiable calendar appointments — treat them as important as any meeting. Use noise-cancelling headphones as a physical signal.",
        "In group settings, practice the '3-second pause' before speaking — this creates space for quieter colleagues and often leads to richer discussions.",
        "Channel your social energy into roles that leverage it: sales, teaching, public relations, team leadership, counseling, or community management.",
        "Balance networking breadth with relationship depth — aim to have 3-5 truly deep professional relationships alongside your broader network.",
      ],
    },
    medium: {
      strengths: [
        "You have the valuable ability to 'switch modes' — energized in group settings when needed, but equally comfortable in solitary deep work.",
        "Your balanced social energy means you can read a room and adjust your communication style to match the situation.",
        "You form meaningful connections without the pressure to constantly socialize, leading to higher-quality relationships.",
      ],
      growth: [
        "You might default to the mode that feels most comfortable in the moment rather than choosing the mode that's most effective for the task at hand.",
        "In large group settings, you may feel uncertain about whether to take the lead or hang back, leading to inconsistent contributions.",
        "You might underestimate how much your environment affects your productivity — noisy vs. quiet, group vs. solo.",
      ],
      tips: [
        "Track your energy levels across different social contexts for 2 weeks. Identify which situations energize you and which drain you, then optimize your schedule accordingly.",
        "Alternate between collaborative and solitary work throughout the day to maintain your energy — avoid long stretches of either.",
        "Develop your public speaking skills through a local club or online community — this amplifies the social energy you already have.",
      ],
    },
    low: {
      strengths: [
        "Your capacity for sustained, deep, solitary focus is exceptional — you can concentrate on complex problems for hours without distraction or fatigue.",
        "You are a thoughtful, careful listener who processes information deeply before responding, leading to more considered and impactful contributions.",
        "Your preference for meaningful one-on-one interactions over surface-level networking produces deeper, more authentic professional relationships.",
        "You are naturally suited to roles requiring deep analysis, research, writing, or independent problem-solving.",
      ],
      growth: [
        "Important career opportunities (promotions, collaborations, mentorship) often flow through social networks — limited networking may cause you to miss them.",
        "You may be perceived as aloof, disengaged, or lacking confidence even when you're deeply engaged and thinking carefully.",
        "Speaking up in group settings may feel uncomfortable, causing your ideas to go unheard even when they're the best in the room.",
      ],
      tips: [
        "Set a small, sustainable networking goal: one meaningful conversation per week with someone outside your immediate circle. Quality over quantity.",
        "Prepare 2-3 talking points before meetings or social events — having prepared material reduces the energy cost of spontaneous interaction.",
        "Leverage written communication (email, Slack, documents) as your primary influence channel — your thoughtful writing style is a major asset.",
        "Seek careers that value depth and independence: research, writing, data analysis, software engineering, design, or specialized consulting.",
      ],
    },
  },

  DIM_PERS_04: { // Resilience
    whatItMeans: "Resilience measures your ability to handle stress, recover from setbacks, maintain emotional equilibrium under pressure, and persist through adversity. It reflects how quickly you bounce back from failure and how effectively you regulate negative emotions.",
    whyItMatters: "Resilience is the foundation upon which all other strengths are built. Without it, even exceptional intelligence and talent crumble under pressure. It's the #1 predictor of long-term well-being and the ability to sustain high performance over years, not just days.",
    high: {
      strengths: [
        "You recover from failures and setbacks remarkably quickly — while others remain stuck in frustration, you're already extracting lessons and planning your next move.",
        "High-pressure situations (exams, deadlines, presentations, competitions) bring out your best performance rather than triggering anxiety spirals.",
        "You maintain a stable emotional baseline that makes you a calming, grounding presence during team crises and organizational turbulence.",
        "Your ability to separate 'what happened' from 'what it means about me' protects you from the self-destructive spiral of personalized failure.",
      ],
      growth: [
        "Your emotional steadiness might sometimes be perceived as coldness or lack of empathy — others may feel you're minimizing their struggles.",
        "You may unconsciously minimize your own difficult emotions rather than processing them, which can lead to delayed emotional reactions.",
        "Your ability to 'push through' adversity might prevent you from recognizing when a situation genuinely requires quitting or pivoting rather than persisting.",
      ],
      tips: [
        "Mentor others who are struggling with resilience — your lived experience of recovering from failure is incredibly valuable to peers who haven't developed this skill yet.",
        "When others are distressed, lead with empathy before solutions: 'That sounds really hard' before 'Here's what you should do.'",
        "Use your resilience as a strategic advantage in high-stakes, high-uncertainty careers: entrepreneurship, emergency medicine, competitive sports, or crisis management.",
        "Periodically check in with yourself: 'Am I actually fine, or am I suppressing something that needs attention?' Journaling helps surface buried emotions.",
      ],
    },
    medium: {
      strengths: [
        "You experience and process setbacks in a healthy, human way — feeling the impact without being overwhelmed by it.",
        "Your moderate resilience means you're appropriately cautious about high-risk situations while still willing to take calculated risks.",
        "You can empathize deeply with others' struggles because you know firsthand what it feels like to be knocked down.",
      ],
      growth: [
        "Extended periods of stress or multiple setbacks in quick succession can erode your coping capacity, potentially leading to burnout.",
        "You may avoid certain challenges or opportunities because the fear of failure feels disproportionately threatening.",
        "Negative self-talk after setbacks ('I'm not good enough,' 'I always fail') may linger longer than it should, affecting subsequent performance.",
      ],
      tips: [
        "Build a 'resilience routine': after any setback, write down (1) what happened, (2) what you learned, and (3) one concrete next step. This transforms vague anxiety into actionable clarity.",
        "Develop a stress management practice you can do daily: 5 minutes of deep breathing, a short walk, or journaling. Consistency matters more than intensity.",
        "Create a 'wins file' — a document of past achievements and positive feedback. Review it when self-doubt creeps in after a setback.",
      ],
    },
    low: {
      strengths: [
        "Your heightened emotional sensitivity makes you acutely attuned to risks and potential problems — you often spot dangers that more resilient individuals dismiss.",
        "You experience emotions deeply and authentically, which can fuel powerful creative expression, empathetic leadership, and meaningful art.",
        "Your awareness of your own vulnerability can drive you to prepare more thoroughly, build stronger safety nets, and plan more carefully.",
      ],
      growth: [
        "Setbacks that others recover from in hours may affect your mood and motivation for days or weeks, creating a compounding productivity gap.",
        "You may develop avoidance patterns around challenging situations, which progressively shrinks your comfort zone and limits your growth.",
        "Negative thoughts after failure can spiral into generalized anxiety or self-doubt that bleeds into unrelated areas of your life.",
      ],
      tips: [
        "Start building resilience with micro-challenges: deliberately put yourself in slightly uncomfortable situations (asking a question in class, trying a new skill) where 'failure' has zero real consequences.",
        "Practice cognitive reframing: when you catch a thought like 'I'm terrible at this,' replace it with 'I'm learning this, and learning always involves mistakes.'",
        "Build a support network of 2-3 trusted people you can talk to openly when things go wrong. Verbalizing fears reduces their power significantly.",
        "Consider mindfulness or meditation practice — even 5 minutes daily has been shown to improve emotional regulation and stress tolerance measurably.",
      ],
    },
  },

  DIM_PERS_05: { // Empathy
    whatItMeans: "Empathy measures your capacity to understand, share, and respond to the emotional states of others. It encompasses both cognitive empathy (understanding what others feel) and affective empathy (actually feeling what they feel), plus your tendency to act compassionately.",
    whyItMatters: "Empathy is the cornerstone of effective leadership, teamwork, and relationship-building. In an increasingly collaborative world, the ability to understand others' perspectives and respond with appropriate emotional intelligence is a critical professional and personal skill.",
    high: {
      strengths: [
        "You intuitively read emotional undercurrents in conversations and group dynamics that others miss entirely — you know when someone is struggling before they say a word.",
        "Your deep empathy makes you an exceptional collaborator, mediator, and leader because people feel genuinely heard and valued in your presence.",
        "You naturally adapt your communication style to meet others where they are emotionally, creating safety and trust in even difficult conversations.",
        "You're driven by a genuine desire to help and support others, making you ideally suited for people-centric roles and service-oriented careers.",
      ],
      growth: [
        "You may absorb others' negative emotions like a sponge, leading to emotional exhaustion and compassion fatigue over time.",
        "Your desire to avoid hurting others' feelings can make it difficult to deliver honest, critical feedback when it's genuinely needed.",
        "You might prioritize harmony over truth, avoiding necessary conflicts and allowing unresolved issues to fester beneath the surface.",
      ],
      tips: [
        "Develop clear emotional boundaries: practice distinguishing between 'I understand how you feel' and 'I am responsible for how you feel.' The first is empathy; the second is codependency.",
        "After emotionally intensive interactions, schedule 15 minutes of personal decompression (walk, music, breathing) to reset your emotional baseline.",
        "Explore careers where your empathy creates maximum impact: counseling, healthcare, teaching, social work, UX research, human resources, or therapeutic roles.",
        "Practice the 'kind and clear' framework for difficult conversations: lead with genuine empathy, then deliver honest feedback without softening it into uselessness.",
      ],
    },
    medium: {
      strengths: [
        "You can empathize with others effectively while maintaining enough emotional distance to stay objective and solution-oriented.",
        "You understand social dynamics well enough to navigate complex interpersonal situations without getting emotionally overwhelmed.",
        "Your balanced empathy makes you adaptable across both people-focused and task-focused work environments.",
      ],
      growth: [
        "You may sometimes misread emotional situations, especially when others' emotional cues are subtle or culturally different from your own.",
        "In high-stress moments, you might default to task-focused 'fix it' mode rather than first acknowledging others' emotional experience.",
        "You may not always invest the energy to fully understand perspectives that are very different from your own.",
      ],
      tips: [
        "Practice active listening in one conversation per day: reflect back what the other person said and how they seem to feel before offering your own perspective.",
        "When someone shares a problem, ask 'Do you want me to listen, or do you want me to help solve it?' This simple question dramatically improves your interpersonal effectiveness.",
        "Read fiction or watch character-driven films intentionally — research shows this measurably improves empathetic capacity.",
      ],
    },
    low: {
      strengths: [
        "You can make tough, rational decisions without being paralyzed by emotional considerations — invaluable in high-stakes analytical or strategic roles.",
        "You maintain clear emotional boundaries naturally, protecting you from the burnout and compassion fatigue that plagues highly empathetic individuals.",
        "You can deliver blunt, honest feedback when it's needed without agonizing over hurt feelings, which accelerates growth for those around you.",
      ],
      growth: [
        "Others may perceive you as cold, dismissive, or uncaring — even when you genuinely care but simply express it differently.",
        "You might miss important social cues that signal when a colleague, friend, or team member needs support rather than solutions.",
        "Lack of empathetic communication can erode trust in relationships over time, as others don't feel emotionally safe around you.",
      ],
      tips: [
        "Start by simply asking: 'How did that make you feel?' in conversations where others share experiences. Even if empathy doesn't come naturally, curiosity is a powerful substitute.",
        "Observe a colleague you consider highly empathetic — notice their body language, tone, and the questions they ask. Try adopting one of their techniques this week.",
        "Before sending an important email or message, re-read it and ask: 'How would I feel receiving this?' Make one adjustment to soften the tone if needed.",
        "Recognize that empathy is a skill, not just a trait — it can be developed through deliberate practice, just like any other ability.",
      ],
    },
  },

  // ═══════════════════════════════════════════
  // COGNITIVE CLUSTER
  // ═══════════════════════════════════════════

  DIM_COG_01: { // Abstract Reasoning
    whatItMeans: "Abstract Reasoning measures your ability to identify patterns, recognize relationships between concepts, solve novel problems without prior experience, and think in terms of principles rather than specific examples. It's closely related to what psychologists call 'fluid intelligence.'",
    whyItMatters: "Abstract Reasoning is the most future-proof cognitive skill — it allows you to learn new domains quickly, solve problems you've never encountered before, and transfer knowledge across completely different fields. It's the engine behind 'learning how to learn.'",
    high: {
      strengths: [
        "You can look at a complex system — whether it's a math problem, a social dynamic, or a business challenge — and quickly identify the underlying patterns and rules governing it.",
        "You learn new subjects rapidly because you extract principles rather than memorizing specifics, allowing you to transfer knowledge between domains effortlessly.",
        "Complex, multi-variable problems that overwhelm others feel like puzzles you're eager to solve — you thrive on intellectual complexity.",
        "You can anticipate the consequences of decisions several steps ahead because you model systems abstractly in your mind.",
      ],
      growth: [
        "You may become impatient with people who need concrete examples and step-by-step explanations — your ability to 'just see it' can make you a frustrating teacher.",
        "Purely abstract thinking can disconnect you from real-world constraints like budgets, timelines, and human emotions that are critical to actual execution.",
        "You might over-complicate simple problems by searching for hidden patterns that don't exist, wasting time on unnecessary analysis.",
      ],
      tips: [
        "Develop your ability to translate abstract insights into concrete, accessible language — this is the difference between being smart and being influential.",
        "Apply your pattern recognition to real-world competitions: mathematical olympiads, programming contests, strategic games, or case competitions.",
        "Pursue careers that reward abstract thinking: pure mathematics, theoretical science, software architecture, strategic consulting, or philosophy.",
        "When explaining ideas to others, always start with a concrete example before presenting the abstract principle — meet people where they are.",
      ],
    },
    medium: {
      strengths: [
        "You can handle moderately complex abstract problems while remaining grounded enough to connect theory to practice.",
        "You balance conceptual thinking with practical execution — you can both understand 'why' and focus on 'how.'",
        "You learn new concepts at a solid pace and can identify patterns when given enough context and examples.",
      ],
      growth: [
        "Highly abstract material (advanced mathematics, philosophy, theoretical physics) may initially feel overwhelming and require more time to process.",
        "You might default to relying on familiar frameworks rather than deriving new principles from unfamiliar situations.",
        "Complex multi-step logical arguments may occasionally trip you up if you lose track of the chain of reasoning.",
      ],
      tips: [
        "Strengthen abstract reasoning by practicing pattern-recognition puzzles (Raven's matrices, logic puzzles, Sudoku) for 15 minutes daily — this is a trainable skill.",
        "When studying new material, force yourself to explain the underlying principle in one sentence before moving on. This deepens conceptual understanding.",
        "Use visual diagrams, mind maps, and flowcharts to externalize abstract relationships — making the invisible visible helps you think more clearly.",
      ],
    },
    low: {
      strengths: [
        "You excel with concrete, tangible, hands-on problems that have clear inputs and outputs — your thinking is deeply practical and applied.",
        "You learn best through real-world examples, case studies, and direct experience rather than abstract theory — this makes your knowledge immediately actionable.",
        "You have strong common sense and practical judgment that keeps projects grounded in reality while others get lost in theoretical debates.",
      ],
      growth: [
        "You may struggle when problems are presented in highly abstract or symbolic form without concrete context or examples.",
        "Transferring knowledge from one domain to another may not come naturally — you might feel like you're 'starting from scratch' in each new area.",
        "Standardized tests and academic assessments that emphasize abstract reasoning may not reflect your true capabilities.",
      ],
      tips: [
        "Always ask for concrete examples when learning new concepts — there's no shame in needing to 'see it in action' before understanding the theory.",
        "Practice making analogies: 'This is like...' comparisons. Analogical thinking is a bridge between concrete and abstract reasoning.",
        "Leverage your practical strengths in careers that reward hands-on expertise: trades, applied engineering, healthcare, culinary arts, or mechanical design.",
      ],
    },
  },

  DIM_COG_02: { // Analytical Thinking
    whatItMeans: "Analytical Thinking measures your capacity for logical deduction, systematic evaluation, data-driven reasoning, and breaking complex problems into manageable components. It reflects how naturally you approach decisions with evidence rather than intuition.",
    whyItMatters: "Analytical Thinking is the backbone of informed decision-making in any field. Whether you're evaluating a business proposal, diagnosing a medical condition, debugging code, or assessing risk, the ability to think systematically and reason with evidence is essential.",
    high: {
      strengths: [
        "You naturally decompose complex problems into component parts, systematically evaluating each piece before synthesizing a conclusion.",
        "You make decisions based on evidence and data rather than gut feeling, which leads to consistently higher-quality outcomes over time.",
        "You can quickly identify logical fallacies, weak arguments, and biased reasoning in others' proposals, protecting your team from bad decisions.",
        "Your systematic approach to problem-solving means you rarely miss important variables that others overlook in their haste.",
      ],
      growth: [
        "You may experience 'analysis paralysis' — spending so long gathering and evaluating data that you miss the window for decisive action.",
        "Your logical, evidence-based approach can feel cold or dismissive to colleagues who rely more on intuition and emotional intelligence.",
        "You might undervalue qualitative information (feelings, cultural context, subjective experience) that can't be easily measured or quantified.",
      ],
      tips: [
        "Set explicit decision deadlines for yourself: 'I will decide by Friday with whatever information I have.' Perfect information never arrives — act on sufficient information.",
        "Develop your ability to communicate analytical findings in narrative form — stories and visualizations make data compelling to non-analytical audiences.",
        "Excel in careers requiring rigorous analysis: data science, financial analysis, management consulting, scientific research, or engineering.",
        "Practice rapid analysis frameworks (SWOT, 80/20, First Principles) to channel your analytical strength under time pressure.",
      ],
    },
    medium: {
      strengths: [
        "You blend analytical rigor with intuitive judgment, allowing you to make solid decisions efficiently without over-analyzing.",
        "You can work with data and evidence when it's available, but you're also comfortable acting on informed intuition when data is scarce.",
        "Your balanced approach makes you effective in both structured (finance, engineering) and unstructured (creative, entrepreneurial) environments.",
      ],
      growth: [
        "You might occasionally skip important analytical steps when time-pressured, leading to decisions based on incomplete reasoning.",
        "Your analysis may sometimes lack the depth or rigor needed for high-stakes decisions where errors are costly.",
        "You may not always challenge your own assumptions or seek disconfirming evidence before committing to a conclusion.",
      ],
      tips: [
        "Build a personal 'decision checklist' for important choices: (1) What do I know? (2) What don't I know? (3) What could go wrong? (4) What's the best alternative?",
        "Practice spreadsheet or data visualization skills — being able to organize and visualize information amplifies your analytical capacity significantly.",
        "When making important decisions, always ask: 'What evidence would change my mind?' This single question dramatically improves decision quality.",
      ],
    },
    low: {
      strengths: [
        "You make decisions quickly and instinctively, which is invaluable in fast-moving environments where overthinking is the biggest risk.",
        "Your intuitive approach allows you to incorporate emotional and contextual factors that purely analytical thinkers often miss.",
        "You're comfortable with ambiguity and can act decisively even when information is incomplete or contradictory.",
      ],
      growth: [
        "Important decisions may be based more on feelings, habits, or first impressions than on careful evaluation of available evidence.",
        "You may struggle to systematically debug problems, optimize processes, or evaluate competing proposals when data is required.",
        "Others may question the rigor of your reasoning if you can't articulate the logical steps behind your conclusions.",
      ],
      tips: [
        "Before any important decision, write down your top 3 reasons 'for' and 'against.' This simple exercise adds analytical structure without overwhelming you.",
        "Learn one basic data tool (spreadsheets, basic statistics) — even minimal analytical skill dramatically improves decision quality.",
        "Pair with an analytical thinker for important decisions — your intuition combined with their rigor creates better outcomes than either approach alone.",
      ],
    },
  },

  DIM_COG_03: { // Strategic Thinking
    whatItMeans: "Strategic Thinking measures your aptitude for long-term planning, anticipating secondary consequences, considering multiple scenarios, and optimizing for outcomes over extended time horizons. It's the ability to think several moves ahead, like a chess player.",
    whyItMatters: "Strategic Thinking separates leaders from executors. It determines whether you react to events or shape them. In careers, education, and life, the ability to think long-term and plan for contingencies creates a compounding advantage over time.",
    high: {
      strengths: [
        "You naturally think 3-5 steps ahead of the current situation, anticipating consequences and preparing contingency plans before problems arise.",
        "You can hold multiple possible futures in your mind simultaneously and reason about which actions today best position you for each scenario.",
        "You see connections between seemingly unrelated events and trends, allowing you to spot opportunities and threats before they become obvious.",
        "Your decisions are grounded in long-term value creation rather than short-term gratification, leading to consistently better life outcomes.",
      ],
      growth: [
        "Your focus on the long game can sometimes cause you to miss or undervalue quick wins and immediate opportunities.",
        "You may frustrate action-oriented teammates who want to 'just do something' while you're still modeling scenarios and evaluating options.",
        "Over-planning for unlikely scenarios can consume time and energy that could be better spent on execution.",
      ],
      tips: [
        "Create a personal 5-year strategic plan with quarterly milestones — your natural strategic ability is wasted without a concrete framework to channel it.",
        "Practice communicating your strategic vision in simple, compelling language — strategy is only powerful when others understand and buy into it.",
        "Pursue careers where strategic thinking is the primary value: business strategy, venture capital, policy-making, military planning, or executive leadership.",
        "Balance your long-term orientation with weekly execution reviews to ensure your strategy is translating into tangible daily actions.",
      ],
    },
    medium: {
      strengths: [
        "You can plan for the medium-term (months to a year) while staying responsive to near-term demands and opportunities.",
        "You balance forward-thinking with pragmatic execution, avoiding both shortsightedness and over-planning.",
        "You can evaluate trade-offs between short-term costs and long-term benefits when the stakes are clear.",
      ],
      growth: [
        "You may not naturally think beyond a 1-2 year horizon, causing you to miss slow-building trends and long-term opportunities.",
        "Complex, multi-stakeholder scenarios with many interdependencies may overwhelm your planning capacity.",
        "You might not routinely develop contingency plans, leaving you unprepared when your primary plan encounters unexpected obstacles.",
      ],
      tips: [
        "Practice 'pre-mortem' thinking before major decisions: 'Imagine this failed. What went wrong?' This builds strategic foresight muscles.",
        "Read biographies of strategic thinkers (business leaders, military strategists, chess grandmasters) — absorbing their thought patterns accelerates your own strategic development.",
        "For every important goal, create a Plan A, Plan B, and a 'minimum viable outcome.' This builds strategic flexibility.",
      ],
    },
    low: {
      strengths: [
        "You excel at responding to the present moment with speed and decisiveness — you're not paralyzed by what-ifs and distant scenarios.",
        "Your tactical, action-oriented mindset gets things done quickly, which is exactly what's needed in fast-changing, unpredictable environments.",
        "You're highly adaptable to sudden changes because you're not emotionally invested in long-term plans that just became obsolete.",
      ],
      growth: [
        "Without strategic thinking, you may find yourself constantly reacting to events rather than shaping them to your advantage.",
        "You might repeatedly make decisions that optimize for today at the expense of tomorrow — skipping study for fun, spending instead of saving.",
        "Career progression may feel random rather than intentional, because you're not deliberately building toward a specific professional identity.",
      ],
      tips: [
        "Start with just one long-term goal in any area of your life and work backward: 'If I want X in 3 years, what must I do this year? This month? This week?'",
        "Before any significant decision, ask: 'What are the consequences of this choice in 1 week, 1 month, and 1 year?' This simple habit builds strategic thinking.",
        "Find a mentor who excels at strategic thinking and observe how they evaluate decisions — patterns will become visible over time.",
      ],
    },
  },

  DIM_COG_04: { // Creative Problem Solving
    whatItMeans: "Creative Problem Solving measures your ability to generate novel, unconventional solutions when standard approaches fail. It encompasses divergent thinking (generating many possible solutions), lateral thinking (approaching problems from unexpected angles), and the ability to recombine existing ideas into something new.",
    whyItMatters: "As AI and automation handle routine cognitive work, Creative Problem Solving becomes one of the few truly irreplaceable human skills. It's what allows you to innovate, disrupt, and create value that didn't exist before — the foundation of entrepreneurship and breakthrough innovation.",
    high: {
      strengths: [
        "You naturally see problems from angles that others miss — while everyone else is optimizing the current solution, you're inventing an entirely different approach.",
        "You can generate multiple creative alternatives rapidly, giving you (and your team) a wider solution space to choose from.",
        "You thrive when 'the textbook answer' doesn't work — novel, ambiguous problems that stump others are where you do your best work.",
        "Your ability to recombine ideas from different domains produces innovations that feel simultaneously surprising and obvious in hindsight.",
      ],
      growth: [
        "Not every problem needs a creative solution — sometimes the standard, proven approach is faster, cheaper, and more reliable.",
        "Your creative ideas may be difficult for others to understand or implement, especially if you skip the step of explaining your reasoning.",
        "You might resist following established processes and protocols even when they exist for good reasons (safety, compliance, efficiency).",
      ],
      tips: [
        "Document your creative process: when you have a breakthrough idea, write down the mental steps that led you there. This makes your creativity transferable and teachable.",
        "Apply your creativity to competitive formats: hackathons, design challenges, innovation competitions, or creative writing contests.",
        "Pair with a strong executor who can translate your creative ideas into actionable implementation plans — the idea-to-execution bridge is where most creativity dies.",
        "Explore careers at the intersection of creativity and problem-solving: product design, UX research, advertising, game design, or social entrepreneurship.",
      ],
    },
    medium: {
      strengths: [
        "You can generate creative solutions when prompted or when the situation clearly demands it, while also being comfortable with proven approaches.",
        "Your balanced creativity means you can both innovate and implement — you're not so attached to novelty that you reject effective existing methods.",
        "You contribute meaningfully to brainstorming sessions without dominating them, creating space for others' ideas as well.",
      ],
      growth: [
        "You may not automatically shift into creative mode when problems arise — you might need an external trigger or a colleague to prompt you to 'think differently.'",
        "Your creative solutions may tend toward incremental improvements rather than truly breakthrough innovations.",
        "Under pressure, you're likely to default to familiar approaches rather than investing the extra cognitive effort to generate novel alternatives.",
      ],
      tips: [
        "Practice 'forced creativity' exercises: pick any everyday object and brainstorm 10 unconventional uses for it in 3 minutes. This trains divergent thinking.",
        "When facing a problem, always generate at least 3 possible solutions before evaluating any of them — this prevents premature convergence on the first 'good enough' answer.",
        "Expose yourself to creative stimuli regularly: visit art galleries, attend improv comedy, read science fiction, or watch documentaries about inventors.",
      ],
    },
    low: {
      strengths: [
        "You excel at applying proven methods and established best practices efficiently — you don't waste time reinventing the wheel when a perfectly good wheel exists.",
        "Your solutions are practical, tested, and low-risk, which is exactly what's needed in environments where reliability is more important than novelty.",
        "You're efficient at executing standard operating procedures and optimizing existing processes rather than disrupting them unnecessarily.",
      ],
      growth: [
        "When standard approaches fail and no playbook exists, you may feel stuck and unsure how to proceed — this is increasingly common in modern workplaces.",
        "You might dismiss creative suggestions from others as 'too risky' or 'unrealistic' without fully exploring their potential.",
        "Routine problem-solving, while efficient, may limit your ability to stand out in competitive environments where innovation is rewarded.",
      ],
      tips: [
        "Start with 'What if...?' questions about small, low-stakes problems: 'What if we did this meeting standing up? What if we started with the conclusion?'",
        "Study creative methodologies (SCAMPER, Design Thinking, Brainstorming rules) — creativity has learnable techniques, it's not purely innate.",
        "When you encounter a problem, force yourself to list 5 possible solutions before defaulting to the most obvious one. Quantity breeds quality.",
      ],
    },
  },

  // ═══════════════════════════════════════════
  // LEARNING CLUSTER
  // ═══════════════════════════════════════════

  DIM_LRN_01: { // Self-Directed Learning
    whatItMeans: "Self-Directed Learning measures your preference and capacity for independent study, autonomous exploration, and self-guided intellectual discovery. It reflects how naturally you take ownership of your own learning without waiting for external instruction.",
    whyItMatters: "In the age of freely available information, Self-Directed Learning is the meta-skill that unlocks all other skills. The ability to teach yourself anything — from a YouTube tutorial to a research paper — is arguably the most valuable career capability of the 21st century.",
    high: {
      strengths: [
        "You naturally take ownership of your own learning — when you want to understand something, you don't wait for a teacher; you find resources, experiment, and build understanding independently.",
        "You're comfortable navigating ambiguity in learning — you can pick up a textbook on a completely unfamiliar topic and work through it systematically.",
        "Your intrinsic learning drive means you continuously upgrade your skills without external pressure, keeping you perpetually ahead of the curve.",
        "You've likely already developed effective personal learning strategies (note-taking, spaced repetition, project-based learning) through trial and error.",
      ],
      growth: [
        "You might resist formal instruction, group study, or structured curricula — even when they'd be more efficient than figuring everything out alone.",
        "Your independent learning style can sometimes lead to knowledge gaps if you accidentally skip foundational concepts while exploring what interests you.",
        "You may struggle to learn effectively in environments that are highly structured, paced, and lecture-based (traditional classrooms).",
      ],
      tips: [
        "Build a 'personal curriculum' for any skill you want to develop: define specific outcomes, curate resources (courses, books, projects), and set milestones.",
        "Balance self-directed exploration with periodic expert review — a mentor or tutor can identify blind spots in 10 minutes that might take you months to discover alone.",
        "Document your learning journey publicly (blog, video series, social media) — teaching forces deeper understanding and builds your professional reputation simultaneously.",
        "Your learning style is perfectly suited for careers in rapid-growth industries where the skills needed change faster than formal education can keep up.",
      ],
    },
    medium: {
      strengths: [
        "You can learn independently when motivated, but also benefit from and appreciate structured guidance when available.",
        "You adapt well to both self-paced online learning and traditional classroom environments.",
        "You recognize when you need external help and aren't too proud to ask for guidance or seek out a tutor.",
      ],
      growth: [
        "You may not naturally initiate learning outside of required coursework or job training — learning often happens reactively rather than proactively.",
        "Without external deadlines and structure, your learning momentum may stall or lose focus.",
        "You might not have developed robust personal learning strategies because you've relied on structured educational environments.",
      ],
      tips: [
        "Set one 'learning goal' per quarter that is completely self-chosen and self-directed — pick a topic you're genuinely curious about and learn it without any formal structure.",
        "Experiment with different learning formats (video, audio, reading, hands-on projects) to discover which works best for you in different contexts.",
        "Join a learning community or study group — peer accountability provides the external structure that supports your internal motivation.",
      ],
    },
    low: {
      strengths: [
        "You thrive in structured learning environments with clear curricula, expert instruction, and defined expectations — you know exactly what's expected and can execute on it.",
        "You're excellent at following established training programs to completion, which is critical in fields with formal certification paths.",
        "You value mentorship and expert guidance, which often leads to deeper, more curated learning than unguided self-study.",
      ],
      growth: [
        "In situations where no teacher, course, or manual exists, you may feel lost and unsure how to begin learning.",
        "Your reliance on external structure means career transitions or rapid skill changes can feel overwhelming without formal support.",
        "You might miss learning opportunities that arise organically (interesting problems at work, fascinating conversations) because they don't feel like 'real learning.'",
      ],
      tips: [
        "Start with highly structured self-learning resources: step-by-step tutorials, guided courses with quizzes, or workbooks. Gradually reduce the structure as your confidence grows.",
        "When you encounter an unfamiliar problem, adopt the habit of immediately Googling or YouTubing it. Building the 'I can figure this out' reflex is transformative.",
        "Find an accountability partner for learning goals — share what you're studying weekly. External structure compensates for low self-direction.",
      ],
    },
  },

  DIM_LRN_02: { // Hands-on Application
    whatItMeans: "Hands-on Application measures your preference for experiential, kinesthetic learning — learning by doing, building, experimenting, and physically interacting with the material rather than passively reading or listening.",
    whyItMatters: "Hands-on learners often underperform in traditional academic settings that emphasize passive learning, masking their true potential. When given the right environment (labs, workshops, projects, simulations), hands-on learners frequently outperform their peers dramatically.",
    high: {
      strengths: [
        "You learn fastest by doing — building prototypes, running experiments, and solving real-world problems embeds knowledge far more deeply than reading or lectures.",
        "You have strong spatial and kinesthetic intelligence, making you naturally skilled at tasks involving physical manipulation, construction, and design.",
        "Your 'just try it' approach means you spend less time overthinking and more time generating real feedback from real-world experiments.",
        "You intuitively understand how systems work by interacting with them — you learn machines by taking them apart, not by reading the manual.",
      ],
      growth: [
        "Purely theoretical or abstract material (advanced mathematics, philosophy, theoretical physics) may feel frustrating and inaccessible without practical examples.",
        "You might skip important foundational theory in your rush to start building, leading to gaps in understanding that surface as bugs or design flaws later.",
        "Standardized tests that emphasize passive recall of information may significantly understate your actual knowledge and capability.",
      ],
      tips: [
        "For every theoretical concept you need to learn, immediately create a hands-on project that applies it. 'Learn by building' is your superpower — lean into it.",
        "Seek out lab-based courses, maker spaces, hackathons, and project-based learning programs that match your learning style.",
        "Document your projects with portfolios, videos, or blog posts — your tangible work product is more impressive than any test score.",
        "Pursue careers with high hands-on components: engineering, medicine, culinary arts, robotics, architecture, or trades.",
      ],
    },
    medium: {
      strengths: [
        "You can engage with both theoretical learning and practical application, switching modes as the situation requires.",
        "You appreciate hands-on activities but don't require them to learn effectively — you can also learn from reading and lectures.",
        "Your balanced approach makes you adaptable across different educational and professional environments.",
      ],
      growth: [
        "You may not always seek out hands-on practice even when it would significantly deepen your understanding.",
        "You might underestimate the value of physical experimentation in fields that seem purely theoretical.",
        "Without deliberate practice, your practical skills may develop more slowly than your theoretical knowledge.",
      ],
      tips: [
        "For every 2 hours of reading or lecture, add 1 hour of practical application — building, experimenting, or practicing what you learned.",
        "When studying, create physical models, diagrams, or prototypes rather than relying solely on notes and summaries.",
        "Seek internships, volunteer opportunities, or side projects that give you real-world application experience alongside formal education.",
      ],
    },
    low: {
      strengths: [
        "You excel at learning through reading, lectures, and abstract reasoning — traditional academic environments play to your strengths.",
        "You can absorb and process large volumes of theoretical information without needing physical interaction or experimentation.",
        "Your reflective, conceptual learning style produces deep theoretical understanding that supports long-term mastery.",
      ],
      growth: [
        "You may avoid hands-on activities, lab work, or physical skill development even when they're critical to your field.",
        "The gap between knowing 'in theory' and being able to do 'in practice' may be wider than you realize.",
        "You might struggle in careers that require strong practical skills, even if you understand the theory perfectly.",
      ],
      tips: [
        "Start with small, low-stakes hands-on projects that connect to topics you already understand theoretically. The goal is to build comfort with 'doing.'",
        "When learning something new, ask yourself: 'Can I actually do this, or do I just understand it?' If the answer is 'understand it,' practice doing it.",
        "Pair with a hands-on learner for collaborative projects — they can handle the building while you handle the planning, and you'll both learn from each other.",
      ],
    },
  },

  DIM_LRN_03: { // Collaborative Learning
    whatItMeans: "Collaborative Learning measures your preference for learning through group discussion, debate, peer teaching, and team-based problem solving. It reflects how much your understanding deepens through interaction with others versus independent study.",
    whyItMatters: "Modern workplaces are overwhelmingly collaborative. The ability to learn effectively in group settings — building on others' ideas, teaching peers, and co-creating knowledge — is essential for team-based problem solving and organizational learning.",
    high: {
      strengths: [
        "Group discussions, debates, and study sessions are where you do your deepest thinking — other people's perspectives trigger insights you'd never reach alone.",
        "You're a natural peer teacher, and explaining concepts to others solidifies your own understanding dramatically.",
        "You thrive in team-based projects, contributing actively and drawing energy from collaborative intellectual exchange.",
        "You naturally build study networks and learning communities that benefit everyone involved, not just yourself.",
      ],
      growth: [
        "You may struggle to concentrate and learn effectively when working alone for extended periods.",
        "Your reliance on group learning can become a dependency — you might not develop strong independent study skills.",
        "Dominant voices in group settings (including your own) can sometimes prevent the deep, quiet reflection needed for certain types of learning.",
      ],
      tips: [
        "Form or join a study group for every major learning objective — but also schedule at least 30% of your study time for solo reflection and review.",
        "Practice the 'Teach-Back' method: after learning something new, explain it to someone else within 24 hours. If you can teach it clearly, you truly understand it.",
        "In professional settings, propose 'lunch and learn' sessions, knowledge-sharing meetings, or collaborative problem-solving workshops.",
      ],
    },
    medium: {
      strengths: [
        "You can learn effectively in both group and solo settings, adapting your approach to the situation.",
        "You contribute meaningfully to group learning without requiring it for every study session.",
        "You balance the social benefits of collaborative learning with the depth benefits of independent study.",
      ],
      growth: [
        "You may not actively seek out collaborative learning opportunities, even when they would accelerate your understanding.",
        "You might not fully leverage the teaching-to-learn effect because you don't regularly explain concepts to peers.",
        "Group learning benefits may depend heavily on the quality of the group — you might not know how to find or build effective study partnerships.",
      ],
      tips: [
        "Identify one area where group learning would be more effective than solo study and actively seek a study partner or group for it.",
        "When you learn something interesting, share it with someone — a colleague, friend, or online community. The act of sharing deepens your own understanding.",
        "Experiment with different collaborative formats: pair programming, book clubs, study groups, discussion forums — find what works best for you.",
      ],
    },
    low: {
      strengths: [
        "You have exceptional capacity for deep, focused, independent study — you can master complex material through sustained solo effort.",
        "Your learning is self-paced and self-directed, which often leads to deeper understanding than time-constrained group sessions.",
        "You're not dependent on others' schedules, availability, or participation quality — your learning progress is entirely in your own hands.",
      ],
      growth: [
        "You may miss perspectives and insights that only emerge through dialogue and debate with others who think differently.",
        "Important networking and relationship-building opportunities that come through collaborative learning may pass you by.",
        "You might develop blind spots in your understanding that a study partner or discussion group would quickly identify.",
      ],
      tips: [
        "Commit to one collaborative learning activity per week, even if it's just a 30-minute online discussion or a brief knowledge-sharing conversation with a peer.",
        "When you get stuck on a concept, try explaining your confusion to someone else — articulating the question often reveals the answer.",
        "Use asynchronous collaborative tools (forums, shared documents, comment threads) that let you participate in group learning at your own pace.",
      ],
    },
  },

  DIM_LRN_04: { // Structured Learning
    whatItMeans: "Structured Learning measures your preference for clear rules, step-by-step instructions, well-organized curricula, defined expectations, and systematic progression through material. It reflects how much you benefit from external framework and order in your learning process.",
    whyItMatters: "Understanding your Structured Learning preference helps you choose the right educational environments, study strategies, and career training paths. High-structure learners excel in formal programs; low-structure learners thrive in exploratory, self-designed paths.",
    high: {
      strengths: [
        "You excel in well-organized educational environments with clear syllabi, rubrics, grading criteria, and progressive difficulty — you know exactly where you stand and what's expected.",
        "Your ability to follow complex procedures accurately makes you highly reliable in rule-governed fields (medicine, law, accounting, aviation).",
        "You build knowledge systematically from foundations upward, which produces thorough, gap-free understanding of complex subjects.",
        "You create excellent personal organizational systems — detailed notes, categorized study materials, and revision schedules.",
      ],
      growth: [
        "When thrown into unstructured, ambiguous learning situations (open-ended projects, poorly defined assignments), you may feel paralyzed and anxious.",
        "You might mistake 'completing the curriculum' for 'mastering the material' — checking boxes doesn't always equal deep understanding.",
        "Over-reliance on external structure can prevent you from developing the meta-learning skills needed for lifelong, self-directed growth.",
      ],
      tips: [
        "When facing unstructured learning, create your own structure: break the topic into subtopics, define your own milestones, and build a personal curriculum.",
        "Practice one 'unstructured exploration' session per week where you learn without a plan — just follow your curiosity. This builds tolerance for ambiguity.",
        "Leverage your structural orientation in careers requiring procedural excellence: quality assurance, compliance, surgery, air traffic control, or systematic research.",
      ],
    },
    medium: {
      strengths: [
        "You appreciate structure when available but can create your own learning framework when none exists.",
        "You balance following curricula with self-directed exploration, getting the benefits of both approaches.",
        "You can adapt to both highly structured (university courses) and loosely structured (startup, project-based) learning environments.",
      ],
      growth: [
        "You might not always create structure when you need it, leading to scattered, unfocused learning in open-ended situations.",
        "Without external deadlines, your learning pace may fluctuate significantly.",
        "You might not have developed a consistent personal study methodology because you've relied on whatever structure was provided.",
      ],
      tips: [
        "Develop a personal 'learning template' that you apply to any new topic: (1) Define what you want to learn. (2) Find 3-5 resources. (3) Set a milestone. (4) Review in 1 week.",
        "Use tools like flashcard apps, note-taking systems, or learning management software to add structure to self-directed learning.",
        "Alternate between following structured courses and pursuing open-ended projects to develop strength in both modes.",
      ],
    },
    low: {
      strengths: [
        "You thrive in exploratory, self-designed learning paths — following your curiosity often leads you to unique insights that rigid curricula would never expose you to.",
        "You're highly adaptable as a learner, comfortable with ambiguity, and able to extract meaning from disorganized or incomplete information.",
        "Your resistance to rigid frameworks makes you naturally innovative in your learning approach — you find creative shortcuts and novel study methods.",
      ],
      growth: [
        "You may struggle to complete long, structured programs (degree programs, certification courses) even when the credential would be valuable.",
        "Without external structure, your learning may lack depth in foundational areas while being rich in scattered, surface-level knowledge.",
        "Important but boring foundational skills (grammar, basic math, procedural knowledge) may have gaps because you skipped them in favor of more interesting topics.",
      ],
      tips: [
        "When you must engage with structured learning (courses, certifications), gamify it: set personal challenges, compete with yourself, or reward milestones.",
        "Identify and fill foundational knowledge gaps by asking experts: 'What are the 3 most important things a beginner MUST understand about this field?'",
        "Design your own 'micro-courses': 5-day learning sprints with a specific, exciting topic and a tangible output (a project, essay, or presentation) at the end.",
      ],
    },
  },

  // ═══════════════════════════════════════════
  // MOTIVATION CLUSTER
  // ═══════════════════════════════════════════

  DIM_MOT_01: { // Intrinsic Drive
    whatItMeans: "Intrinsic Drive measures the degree to which your motivation comes from internal satisfaction, mastery, genuine interest, and the pure joy of learning and growing — as opposed to external rewards like grades, money, or recognition.",
    whyItMatters: "Research consistently shows that intrinsically motivated individuals produce higher quality work, persist longer through challenges, experience greater well-being, and achieve more sustainable success than those primarily driven by external incentives.",
    high: {
      strengths: [
        "You do your best work because it genuinely fascinates you, not because someone is watching or offering a reward — this produces consistently higher quality output.",
        "Your motivation is sustainable and self-renewing — you don't need constant external incentives to keep going through difficult phases.",
        "You're naturally drawn to mastery and depth, investing time in understanding subjects thoroughly rather than superficially.",
        "Your genuine enthusiasm is authentic and infectious — it inspires others and creates positive team dynamics.",
      ],
      growth: [
        "You may struggle to perform well on tasks that don't personally interest you, even when they're critically important for your career or education.",
        "Your intrinsic focus might cause you to undervalue external rewards (salary, title, recognition) to an impractical degree.",
        "You might resist doing 'boring but necessary' work (administrative tasks, compliance, documentation) because it doesn't feed your internal drive.",
      ],
      tips: [
        "When facing a task you find boring, connect it to a larger goal that does excite you. 'I'm doing this paperwork because it enables the creative project I love.'",
        "Pursue careers where your intrinsic interests align with market demand — this is the sweet spot where passion meets practicality.",
        "Build your life around your intrinsic interests while being pragmatic about the 20-30% of work that will always be 'have to' rather than 'want to.'",
      ],
    },
    medium: {
      strengths: [
        "You blend intrinsic satisfaction with healthy responsiveness to external incentives, allowing you to stay motivated across a wider range of tasks.",
        "You can find genuine interest in most tasks while also appreciating recognition and reward when they come.",
        "Your balanced motivation profile means you're less likely to burn out from either 'all passion, no pay' or 'all pay, no passion' scenarios.",
      ],
      growth: [
        "Your motivation may fluctuate significantly depending on whether a task appeals to your interests, making your output quality inconsistent.",
        "You might not have identified your deep intrinsic interests clearly enough to build a career strategy around them.",
        "External rewards might sometimes distort your priorities, causing you to pursue what's rewarded rather than what's truly meaningful.",
      ],
      tips: [
        "Invest time in identifying your top 3 intrinsic interests — what topics do you explore even when no one is asking you to? Build career plans around these.",
        "When motivation dips, alternate between interest-driven tasks and externally rewarded tasks throughout the day.",
        "Create a 'motivation menu' of activities that reliably re-energize you and refer to it when you're running low.",
      ],
    },
    low: {
      strengths: [
        "You respond powerfully to clear incentives, recognition, and competitive structures — environments with explicit rewards bring out your best performance.",
        "You're pragmatic and results-oriented, focusing on what delivers tangible outcomes rather than getting lost in intellectual curiosity.",
        "You can perform consistently across tasks regardless of personal interest level, as long as the external incentives are sufficient.",
      ],
      growth: [
        "Without external incentives, your motivation may drop significantly, making self-directed projects and personal development challenging.",
        "You may find it difficult to sustain effort through the 'boring middle' of long-term projects where external rewards are distant.",
        "Career satisfaction may suffer if you consistently choose roles for pay and status rather than genuine interest.",
      ],
      tips: [
        "Create your own reward systems: set micro-milestones with small rewards (treat, break, game time) to maintain momentum on self-directed work.",
        "Experiment with finding the intrinsic angle in required tasks: 'What's interesting about this? What can I learn from it? How can I make it a personal challenge?'",
        "Seek environments with clear recognition and advancement structures: sales, competitive industries, performance-based roles, or gamified workplaces.",
      ],
    },
  },

  DIM_MOT_02: { // Extrinsic Ambition
    whatItMeans: "Extrinsic Ambition measures your drive for external rewards, recognition, competitive success, status, and measurable achievements. It reflects how much your motivation is fueled by visible markers of success — rankings, titles, awards, income, and social status.",
    whyItMatters: "Extrinsic Ambition is the engine behind competitive achievement. While intrinsic motivation produces quality, extrinsic ambition produces quantity and speed. The most successful people typically harness both, using external goals to direct their efforts while internal interest sustains them.",
    high: {
      strengths: [
        "You're fiercely competitive and goal-oriented — clear targets, leaderboards, and benchmarks bring out your absolute best performance.",
        "You actively seek recognition and advancement, which translates into visible career progression and measurable achievements.",
        "You're willing to make sacrifices and put in extraordinary effort when the stakes are high and the rewards are significant.",
        "Your ambition drives you to continuously raise your own bar, preventing complacency and ensuring ongoing growth.",
      ],
      growth: [
        "The relentless pursuit of external validation can lead to burnout, anxiety, and a fragile self-worth that depends on constant achievement.",
        "You may prioritize winning over learning, choosing easy competitions you'll win rather than challenging ones where you'd grow most.",
        "Relationships may suffer if you view others primarily as competitors rather than collaborators and allies.",
      ],
      tips: [
        "Define success on your own terms before chasing someone else's definition. What does a truly fulfilling life look like to you — beyond just money and titles?",
        "Build recovery periods into your achievement cycle — after each major milestone, take time to reflect and recharge rather than immediately chasing the next goal.",
        "Channel your competitive drive into career paths that reward it directly: entrepreneurship, sales, investment banking, competitive sports, or performance-based consulting.",
        "Practice celebrating others' success genuinely — this builds the collaborative relationships that amplify your own achievements over time.",
      ],
    },
    medium: {
      strengths: [
        "You pursue success actively without being consumed by it — you want to achieve but not at the expense of your wellbeing or relationships.",
        "You can leverage competitive environments when they serve you while also being content with steady, non-competitive progress.",
        "Your balanced ambition means you're less susceptible to the burnout and anxiety that plague extremely driven individuals.",
      ],
      growth: [
        "You might sometimes settle for 'good enough' when pushing harder would have led to significantly better outcomes.",
        "Without the fire of intense ambition, you may not always advocate for yourself (asking for promotions, raises, or challenging assignments).",
        "You might underestimate how much more you could achieve if you deliberately turned up your competitive drive in strategic moments.",
      ],
      tips: [
        "Identify 2-3 areas where increased ambition would create the highest ROI for your life and career — focus your competitive energy there.",
        "Practice self-advocacy: prepare and deliver a 'pitch' for your next promotion, raise, or opportunity within 30 days.",
        "Set one ambitious 'stretch goal' per quarter that's 20-30% beyond what you think you can achieve — you'll surprise yourself.",
      ],
    },
    low: {
      strengths: [
        "Your self-worth is internally anchored, making you resilient to the toxic comparison and status anxiety that drives many high-achievers to burnout.",
        "You prioritize meaningful work, authentic relationships, and personal fulfillment over status symbols and external validation.",
        "You're a genuinely collaborative team member because you're not secretly competing with your colleagues for recognition.",
      ],
      growth: [
        "You may miss career opportunities because you don't actively pursue promotions, raises, or visibility — others who self-advocate will advance faster.",
        "Your comfort with the status quo might prevent you from reaching your full potential, even when you have the ability to achieve much more.",
        "Others may underestimate your contributions because you don't draw attention to your achievements.",
      ],
      tips: [
        "Reframe self-advocacy not as 'bragging' but as 'ensuring your contributions are visible so you can continue doing impactful work.'",
        "Set one measurable achievement goal per quarter — not to chase status, but to ensure your talents are being fully utilized and recognized.",
        "Find a career where the work itself is the reward — teaching, non-profit, research, art, craft — where low extrinsic ambition is an asset, not a liability.",
      ],
    },
  },

  DIM_MOT_03: { // Purpose Orientation
    whatItMeans: "Purpose Orientation measures how strongly your motivation is driven by the desire to make a meaningful impact, contribute to something larger than yourself, help others, or work toward a cause you believe in. It captures the 'why' behind your effort.",
    whyItMatters: "Purpose-oriented individuals report higher life satisfaction, greater resilience during hardship, and more sustained motivation across decades. Purpose acts as a compass that guides career decisions and provides meaning during the inevitable difficult phases of any path.",
    high: {
      strengths: [
        "You experience deep fulfillment when your work contributes to a larger mission — this gives you a sustainable energy source that outlasts any external incentive.",
        "Your sense of purpose provides a clear decision-making compass: opportunities that align with your mission feel right; those that don't feel hollow regardless of the pay.",
        "You inspire others through the authenticity of your commitment — people are drawn to work with and for individuals who clearly believe in what they're doing.",
        "Your purpose-driven mindset gives you extraordinary resilience during setbacks because you're fighting for something larger than personal gain.",
      ],
      growth: [
        "You may reject lucrative or strategically valuable opportunities that don't immediately feel 'purposeful,' even when they could fund or enable your mission long-term.",
        "Your idealism can lead to burnout if you consistently sacrifice personal needs (rest, income, relationships) for the cause.",
        "You might judge others who are motivated by money or status, creating unnecessary friction with colleagues who have different but equally valid motivations.",
      ],
      tips: [
        "Develop a personal mission statement — a single sentence that captures your purpose. Revisit it quarterly and use it to evaluate major life decisions.",
        "Build financial sustainability alongside purpose — you can't help others effectively if you're struggling yourself. Purpose and pragmatism aren't enemies.",
        "Pursue careers in social impact, education, healthcare, environmental work, non-profit leadership, public policy, or social entrepreneurship.",
        "Connect with a community of purpose-driven individuals who share your values — isolation is one of the biggest threats to sustained purpose.",
      ],
    },
    medium: {
      strengths: [
        "You appreciate meaningful work while also being pragmatic about career decisions — you don't need every task to feel world-changing.",
        "You can find purpose in a wide range of activities and roles, not just explicitly 'mission-driven' ones.",
        "Your balanced approach prevents the burnout risk associated with extreme purpose-driven individuals.",
      ],
      growth: [
        "Without a clear sense of purpose, you may feel a vague dissatisfaction that's hard to articulate — 'something is missing' but you're not sure what.",
        "You might not have invested the time to articulate what truly matters to you, leading to career decisions based on convenience rather than meaning.",
        "Your moderate purpose orientation may not be strong enough to sustain you through extended periods of difficulty or tedium.",
      ],
      tips: [
        "Spend 30 minutes journaling about: 'If I could solve one problem in the world, what would it be? If money were no object, what would I do with my days?'",
        "Volunteer for a cause you care about — even 2 hours per month. Direct impact is the fastest way to discover what gives you a sense of purpose.",
        "When evaluating career options, add 'meaning' as an explicit criterion alongside salary, growth, and location.",
      ],
    },
    low: {
      strengths: [
        "You're pragmatic and flexible in your career decisions, unencumbered by the need for every job to feel like a 'calling.'",
        "You can perform effectively across a wide range of roles and industries because your motivation isn't conditional on purpose-alignment.",
        "You're less susceptible to the guilt and burnout that plague highly purpose-driven individuals who feel they're 'never doing enough.'",
      ],
      growth: [
        "Without a sense of purpose, long-term career satisfaction and motivation may plateau, especially during mid-career phases.",
        "You may struggle to differentiate between career options because no clear internal compass guides your decisions.",
        "Lack of purpose-driven motivation can make it harder to persist through genuinely difficult, multi-year challenges.",
      ],
      tips: [
        "You don't need to 'find your passion' — try many things and notice what keeps pulling you back. Purpose is often discovered, not decided.",
        "Look for purpose in the impact of your work on specific people: a client you helped, a team you supported, a problem you solved. Purpose can be local and personal.",
        "Read or listen to stories of people in various careers — notice which stories resonate emotionally. These reactions point toward your latent purpose.",
      ],
    },
  },

  // ═══════════════════════════════════════════
  // WORK STYLE CLUSTER
  // ═══════════════════════════════════════════

  DIM_WRK_01: { // Execution Focus
    whatItMeans: "Execution Focus measures your tendency to prioritize getting things done quickly and efficiently, your bias toward action over deliberation, and your comfort with 'good enough' execution at speed rather than perfect execution at the cost of time.",
    whyItMatters: "In a world drowning in ideas, execution is the bottleneck. Execution-focused individuals are the engines that turn plans into results. This trait determines whether you're a 'dreamer' or a 'doer' — and the most impactful people are both.",
    high: {
      strengths: [
        "You have a powerful bias toward action — while others are still planning and debating, you've already shipped a working prototype and gathered real feedback.",
        "Your ability to move fast and break through inertia makes you invaluable on teams that are stuck in 'analysis paralysis.'",
        "You're comfortable with imperfect outputs because you understand that iteration beats perfection in nearly every real-world context.",
        "You generate momentum that motivates entire teams — your visible progress inspires others to accelerate their own contributions.",
      ],
      growth: [
        "Your 'move fast' approach can sometimes produce work that's genuinely too rough — speed without sufficient quality erodes trust over time.",
        "You might skip important planning and design steps that would have prevented expensive downstream rework.",
        "You may frustrate detail-oriented colleagues who feel your rushing compromises the quality of shared outputs.",
      ],
      tips: [
        "Develop a personal 'quality floor' — the minimum standard below which you will not ship anything, regardless of time pressure. Communicate it to your team.",
        "Before starting execution, invest 10 minutes in a brief plan: 'What's the goal? What are the 3 key steps? What could go wrong?' This small upfront investment saves hours of rework.",
        "Your execution speed is a superpower in startup environments, project management, operations, and any role where velocity directly correlates with value.",
      ],
    },
    medium: {
      strengths: [
        "You balance planning with execution, avoiding both overthinking and under-planning.",
        "You can adjust your pace to match the situation — fast when speed matters, careful when quality is critical.",
        "You're reliable about completing tasks without being so aggressive about speed that quality suffers.",
      ],
      growth: [
        "You might procrastinate on starting tasks because you're neither driven enough by urgency nor thorough enough in planning to have a clear launch point.",
        "Your moderate pace may feel frustrating in high-velocity environments where 'done is better than perfect' is the operating mantra.",
        "Important tasks may not be completed on time if you underestimate their complexity or overestimate your available time.",
      ],
      tips: [
        "Apply the 'eat the frog' technique: do your most important and difficult task first thing each morning before energy and willpower decline.",
        "Set personal deadlines that are 20% shorter than external deadlines — this builds a buffer and increases your sense of urgency.",
        "Break large tasks into sub-tasks small enough to complete in 30-60 minutes — this makes starting easier and progress more visible.",
      ],
    },
    low: {
      strengths: [
        "You take time to plan, consider, and think before acting, which produces more thoughtful, higher-quality outputs.",
        "Your deliberate pace reduces errors, rework, and the cascading consequences of hasty decisions.",
        "You bring a valuable counterbalance to teams dominated by action-oriented 'doers' who might otherwise rush into mistakes.",
      ],
      growth: [
        "Important projects may stall because you're perpetually 'not quite ready' to begin — the perfect plan never arrives.",
        "You may miss time-sensitive opportunities that require quick action, even imperfect action, to capitalize on.",
        "Others may perceive you as slow, unproductive, or lacking urgency, even when you're doing important mental work.",
      ],
      tips: [
        "Adopt the '5-minute start' rule: commit to working on any task for just 5 minutes. Starting is the hardest part — momentum usually carries you forward.",
        "Set artificial urgency: use timers (25-minute Pomodoro blocks) to create a sense of time pressure that motivates action.",
        "Practice shipping 'version 1' of your work before it feels ready — you'll discover that the feedback you receive is more valuable than the polish you would have added.",
      ],
    },
  },

  DIM_WRK_02: { // Quality Focus
    whatItMeans: "Quality Focus measures your tendency to prioritize perfection, precision, detail, and extreme accuracy over speed and volume. It reflects how naturally you catch errors, refine outputs, and hold your work to exacting standards.",
    whyItMatters: "Quality Focus is essential in fields where errors are costly or dangerous (medicine, engineering, finance, law). However, excessive quality focus in fast-moving environments can become a bottleneck. The key is matching your quality orientation to the right context.",
    high: {
      strengths: [
        "Your outputs are consistently polished, accurate, and reliable — you catch errors and inconsistencies that would embarrass others after publication.",
        "You hold yourself to standards that exceed what most people consider acceptable, producing work that builds strong professional reputation.",
        "Your attention to detail makes you invaluable in quality-critical roles: editing, code review, financial auditing, medical diagnostics, or legal review.",
        "You naturally create processes and checklists that prevent recurring errors, benefiting your entire team or organization.",
      ],
      growth: [
        "Perfectionism can become paralyzing — you may spend hours refining details that have minimal impact on the final outcome.",
        "You might delay or avoid sharing work because it 'isn't ready yet,' missing feedback windows and collaborative opportunities.",
        "Your high standards, when applied to others, can make you a difficult collaborator — others may feel they can never meet your expectations.",
      ],
      tips: [
        "Ask yourself before every refinement pass: 'Will the person receiving this notice the difference between 95% quality and 100% quality?' Usually, the answer is no.",
        "Set explicit 'done criteria' before starting any task — define what 'good enough' looks like so you have a clear stopping point.",
        "Reserve your quality focus for work that truly demands it (client deliverables, published content, safety-critical systems) and explicitly lower your standards for internal, iterative work.",
        "Your quality orientation is perfectly matched to careers in editing, quality assurance, surgery, precision manufacturing, or luxury goods and services.",
      ],
    },
    medium: {
      strengths: [
        "You produce work that's appropriately polished for the context — not so rough it's embarrassing, not so refined it took twice as long as necessary.",
        "You can distinguish between situations that require meticulous attention to detail and those that just need a quick, 'good enough' solution.",
        "You balance quality and speed effectively, making you productive across a wide range of task types.",
      ],
      growth: [
        "Your quality standard may be inconsistent — sometimes producing excellent work, other times letting important details slide.",
        "You might not always catch errors in your own work because you don't have a systematic review process.",
        "In quality-critical fields, your moderate attention to detail may not meet the standards required for excellence.",
      ],
      tips: [
        "Develop a personal review checklist for your most common types of work — a 5-point quality check before submitting anything important.",
        "Ask for feedback on the quality of your work from peers and supervisors — external perspective helps calibrate your internal quality bar.",
        "Save your best attention for the 20% of your work that has the highest impact — not everything deserves the same level of polish.",
      ],
    },
    low: {
      strengths: [
        "You ship work quickly without getting bogged down in perfectionist spirals, maximizing your output volume and speed.",
        "You're comfortable with 'good enough,' which enables rapid iteration and faster learning cycles.",
        "Your pragmatic approach to quality frees up mental energy for creative thinking and strategic planning.",
      ],
      growth: [
        "Repeated quality issues can erode trust, damage your reputation, and create costly rework for yourself and your team.",
        "You might not notice important errors in your work that others can see clearly, leading to avoidable mistakes.",
        "In professional settings, the gap between 'just okay' and 'excellent' quality often determines promotions, client retention, and career advancement.",
      ],
      tips: [
        "Before submitting any important work, add one review step: read it once slowly, looking specifically for errors. This single habit dramatically improves quality.",
        "For critical deliverables, ask a detail-oriented colleague to review your work — their eyes will catch what yours miss.",
        "Invest in tools that automate quality checking: spell-checkers, linters, calculators, templates — let technology compensate for what attention doesn't catch.",
      ],
    },
  },

  DIM_WRK_03: { // Autonomy Preference
    whatItMeans: "Autonomy Preference measures your desire for independence in decision-making, project management, and daily work structure. It reflects how much you value the freedom to choose what you work on, when you work on it, and how you approach it.",
    whyItMatters: "Autonomy-environment fit is one of the strongest predictors of job satisfaction. A mismatch — a high-autonomy individual in a micromanaged role, or a low-autonomy individual thrown into a self-directed role — creates significant friction and underperformance.",
    high: {
      strengths: [
        "You thrive when given the freedom to define your own priorities, schedule, and approach — minimal supervision brings out your best, most creative work.",
        "You're self-motivated and self-directed, requiring little external management to stay productive and focused.",
        "Your independence makes you well-suited for remote work, freelancing, entrepreneurship, and leadership roles where self-direction is essential.",
        "You take full ownership of your outcomes — both successes and failures — which accelerates your learning and professional growth.",
      ],
      growth: [
        "You may resist legitimate oversight, collaboration, and feedback, interpreting guidance as micromanagement even when it's constructive.",
        "Your preference for independence can isolate you from team dynamics, shared knowledge, and collaborative problem-solving opportunities.",
        "Without external structure, you might struggle with tasks that are important but not personally interesting — no one is there to hold you accountable.",
      ],
      tips: [
        "Seek roles that explicitly offer high autonomy: research, consulting, freelancing, entrepreneurship, or senior technical positions.",
        "Distinguish between 'I work best independently' (healthy) and 'I reject all input from others' (limiting). Autonomy doesn't mean isolation.",
        "Build your own accountability systems (daily standups with yourself, weekly goal reviews, public commitments) to replace the external structure you're opting out of.",
        "When receiving feedback or direction, practice pausing your defensive reaction and genuinely evaluating whether the input has merit.",
      ],
    },
    medium: {
      strengths: [
        "You can work effectively with both autonomy and guidance — adapting to the management style of your current team or organization.",
        "You appreciate direction when navigating unfamiliar territory while also valuing independence on tasks within your expertise.",
        "Your flexibility makes you a versatile team member who can shift between collaborative and independent work modes.",
      ],
      growth: [
        "You might not actively advocate for the level of autonomy you need, accepting more oversight than necessary.",
        "In highly autonomous roles, you may occasionally feel rudderless without clear direction from leadership.",
        "Your adaptability might prevent you from developing a strong independent work style or a strong collaborative work style — you're competent at both but exceptional at neither.",
      ],
      tips: [
        "Communicate your preferred working style to new managers early: 'I work best when you give me the goal and let me figure out the approach, but I appreciate check-ins if I get stuck.'",
        "Experiment with working more independently for one week, then more collaboratively the next — notice which mode produces your best work.",
        "Develop stronger self-management habits (goal-setting, time-blocking, progress tracking) to prepare for roles with greater autonomy.",
      ],
    },
    low: {
      strengths: [
        "You excel in structured, well-managed environments with clear expectations, regular feedback, and defined processes.",
        "You're an excellent team player who values collaboration, guidance, and shared decision-making over solo heroics.",
        "You respond well to mentorship and coaching, absorbing guidance effectively and implementing feedback quickly.",
        "You're reliable in roles that require adherence to established procedures and organizational standards.",
      ],
      growth: [
        "You may feel anxious or unproductive when left to your own devices without clear direction, feedback, or supervision.",
        "Career advancement into management or leadership roles may be challenging because they inherently require high self-direction.",
        "You might not develop your own professional judgment and decision-making confidence if you consistently defer to others.",
      ],
      tips: [
        "Gradually increase your autonomy in small, safe steps: ask your manager if you can independently handle one small project and report back with results.",
        "Practice making decisions on your own before asking for approval — even if you seek confirmation afterward, the act of deciding first builds confidence.",
        "Seek structured environments that match your preference while gradually building comfort with independence: large organizations, government, military, or established corporations.",
      ],
    },
  },

  // ═══════════════════════════════════════════
  // INTERESTS CLUSTER
  // ═══════════════════════════════════════════

  DIM_INT_01: { // Technical Interest
    whatItMeans: "Technical Interest measures your fascination with technology, engineering, coding, mechanical systems, and the desire to understand how things work at a technical level. It reflects your natural inclination toward building, designing, and optimizing systems.",
    whyItMatters: "Technical Interest is the gateway to the fastest-growing, highest-paying career clusters in the global economy. Even outside pure technology roles, technical fluency is increasingly required across every industry from healthcare to agriculture.",
    high: {
      strengths: [
        "You're naturally drawn to understanding how technology works — not just using it, but building, modifying, and improving it.",
        "You likely already tinker with code, hardware, software, or mechanical systems in your free time, giving you a head start in tech-adjacent careers.",
        "Your technical curiosity drives you to stay current with emerging technologies, keeping you perpetually ahead of the adoption curve.",
        "You instinctively approach problems through a technical lens, identifying where technology can automate, optimize, or transform existing processes.",
      ],
      growth: [
        "Your deep focus on technical subjects might lead you to underinvest in soft skills (communication, leadership, empathy) that are equally critical for career advancement.",
        "You might get lost in technical rabbit holes — spending hours optimizing something that delivers diminishing returns.",
        "Your preference for technical solutions may blind you to simpler, non-technical approaches that would be equally or more effective.",
      ],
      tips: [
        "Build real projects: a website, an app, a robot, a circuit — tangible creations build skills faster than tutorials and demonstrate competence to future employers.",
        "Participate in hackathons, coding competitions, or maker fairs to test your skills under pressure and network with like-minded peers.",
        "Explore career paths: software engineering, data science, cybersecurity, robotics, AI/ML, hardware engineering, or technical product management.",
        "Invest at least 20% of your learning time in non-technical skills (writing, presenting, persuading) — the best technologists are those who can also communicate.",
      ],
    },
    medium: {
      strengths: [
        "You appreciate technology without being consumed by it — you can work with tech effectively while maintaining broader interests.",
        "You're a capable user and adopter of technology, which keeps you competitive in an increasingly digital world.",
        "Your balanced interest allows you to bridge the gap between technical and non-technical teams.",
      ],
      growth: [
        "You might not have enough technical depth to pursue pure technology roles, but you may not realize how much additional learning would be needed.",
        "Without deeper technical engagement, you risk falling behind as technology increasingly permeates every professional field.",
        "You might not leverage technology tools and automations that could significantly improve your productivity in non-technical work.",
      ],
      tips: [
        "Learn one practical tech skill that's relevant to your primary interests: basic coding, data analysis, digital design, or workflow automation.",
        "Follow technology news in your field of interest — understanding tech trends relevant to your career gives you a significant competitive advantage.",
        "Take one online tech course per quarter — even basic technical literacy compounds into a significant advantage over time.",
      ],
    },
    low: {
      strengths: [
        "You have strong interests in domains that don't depend on technical skills, allowing you to develop deep expertise in humanities, arts, social sciences, or other fields.",
        "Your non-technical perspective is valuable in tech-heavy teams that need someone to focus on human experience, ethics, and impact.",
        "You're less susceptible to the 'shiny new tech' syndrome that distracts technically-minded individuals from fundamentals.",
      ],
      growth: [
        "Basic technical illiteracy can be a significant career handicap in an increasingly digital economy, even in non-technical roles.",
        "You might avoid useful technology tools that could dramatically improve your productivity simply because they seem intimidating.",
        "Without basic technical understanding, you may be unable to effectively evaluate, communicate with, or manage technical team members.",
      ],
      tips: [
        "Start with the most accessible, practical tech skills: basic spreadsheet formulas, simple presentation design, or a no-code website builder. Zero prior knowledge required.",
        "Find a patient, non-judgmental tech-savvy friend who can introduce you to useful tools at your own pace.",
        "Focus on technology as a tool for your existing interests: a writer might learn about digital publishing tools, a social worker about data management systems.",
      ],
    },
  },

  DIM_INT_02: { // Scientific Interest
    whatItMeans: "Scientific Interest measures your fascination with natural sciences, biology, physics, chemistry, empirical research, and the desire to understand the natural world through evidence-based inquiry. It captures your drive to ask 'why?' and seek empirically verified answers.",
    whyItMatters: "Scientific Interest drives curiosity, evidence-based thinking, and intellectual rigor across all domains — not just science careers. The scientific mindset of hypothesis-testing, data-gathering, and conclusion-revising is invaluable in any field that values truth over opinion.",
    high: {
      strengths: [
        "You have a deep, genuine curiosity about how the natural world works — from molecular biology to astrophysics, you find the pursuit of scientific knowledge inherently rewarding.",
        "You naturally think in terms of hypotheses, evidence, and experiments — this rigorous thinking style produces more reliable conclusions than intuition alone.",
        "Your scientific curiosity drives you to question claims, demand evidence, and resist accepting ideas simply because they're popular or traditional.",
        "You're comfortable with the uncertainty and ambiguity inherent in scientific inquiry — you can tolerate 'we don't know yet' without anxiety.",
      ],
      growth: [
        "Your demand for empirical evidence may make you dismissive of valuable insights that come from intuition, experience, or qualitative observation.",
        "You might struggle in environments where decisions must be made quickly with incomplete data — 'more research is needed' isn't always an option.",
        "Your preference for proven, evidence-based approaches may stifle creative or speculative thinking that hasn't been validated yet.",
      ],
      tips: [
        "Pursue hands-on research opportunities: school science fairs, citizen science projects, or research assistant positions at universities.",
        "Explore career paths: biomedical research, environmental science, data science, pharmaceutical development, clinical research, or science journalism.",
        "Apply the scientific method to personal decisions: when you're unsure about something, design a small experiment to test your hypothesis.",
        "Develop your science communication skills — the ability to explain complex scientific concepts in accessible language is rare and extremely valuable.",
      ],
    },
    medium: {
      strengths: [
        "You appreciate scientific thinking and evidence-based reasoning without requiring everything to be empirically proven before acting.",
        "You can engage with scientific topics and methods when relevant, while also drawing on other ways of knowing (intuition, experience, creativity).",
        "Your balanced approach allows you to work comfortably in both evidence-heavy and intuition-heavy environments.",
      ],
      growth: [
        "You might not regularly apply scientific thinking to everyday decisions and beliefs, missing opportunities for more rigorous reasoning.",
        "Your moderate interest may not sustain you through the intensive, detail-oriented work required by pure research careers.",
        "You might not stay current with scientific developments that could inform your career decisions and personal worldview.",
      ],
      tips: [
        "Subscribe to one accessible science publication (popular science magazine, podcast, or YouTube channel) and engage with it weekly.",
        "When facing important personal or professional decisions, ask: 'What would the evidence say?' This simple question improves decision quality dramatically.",
        "Take one science course that's adjacent to your primary interests — the cross-pollination often produces unexpected insights.",
      ],
    },
    low: {
      strengths: [
        "Your interests lie in domains where creativity, human connection, and subjective experience matter more than empirical measurement.",
        "You're comfortable with ambiguity and don't need scientific proof to act on strongly held beliefs and values.",
        "You may have stronger aesthetic, social, or philosophical sensibilities that lead to success in humanities, arts, and people-focused careers.",
      ],
      growth: [
        "Without basic scientific literacy, you may be vulnerable to misinformation, pseudoscience, and poorly supported claims.",
        "You might miss career opportunities in the growing fields of biotechnology, health tech, environmental science, and data-driven industries.",
        "A lack of scientific curiosity can limit your ability to evaluate evidence and make informed decisions about health, technology, and policy.",
      ],
      tips: [
        "Start with science topics that intersect with your existing interests: the science of music, psychology of art, physics of cooking, or biology of athletics.",
        "When you encounter a health or technology claim, practice asking: 'What's the evidence for this?' Building critical evaluation skills is valuable regardless of career path.",
        "Watch engaging science documentaries or listen to science storytelling podcasts — connecting science to narrative makes it far more accessible.",
      ],
    },
  },

  DIM_INT_03: { // Creative Interest
    whatItMeans: "Creative Interest measures your fascination with arts, design, writing, music, visual expression, and creative self-expression in all its forms. It captures your drive to create beauty, tell stories, design experiences, and express ideas through aesthetic media.",
    whyItMatters: "Creative Interest fuels innovation, brand-building, communication, and cultural influence. In an economy increasingly driven by content, design, and experience, creative skills command premium value — and they humanize technology-driven solutions.",
    high: {
      strengths: [
        "You have a deep, authentic drive to create — whether through visual art, writing, music, design, photography, film, or any other medium of expression.",
        "You see aesthetic possibilities where others see only functional requirements — you naturally enhance the beauty, clarity, and emotional impact of everything you touch.",
        "Your creative sensibility allows you to communicate complex ideas through compelling visuals, stories, and experiences that resonate emotionally.",
        "You're driven by self-expression and originality, producing work that carries a distinctive personal voice and style.",
      ],
      growth: [
        "The practical realities of creative careers (irregular income, subjective evaluation, rejection) can be challenging without proper preparation.",
        "You might prioritize aesthetic beauty over functional effectiveness, creating work that looks stunning but doesn't achieve its practical purpose.",
        "Your creative identity may be so central to your self-worth that criticism of your work feels like criticism of you as a person.",
      ],
      tips: [
        "Build a portfolio of your best creative work and share it publicly (website, social media, gallery) — visibility is the #1 factor in creative career success.",
        "Develop the business side of creativity: learn about pricing, marketing, client management, and intellectual property. Creative talent + business skills = creative career.",
        "Explore career paths: graphic design, UX/UI design, architecture, fashion, content creation, film production, advertising, game design, or creative direction.",
        "Cultivate the ability to separate 'feedback on my work' from 'feedback on me as a person.' This emotional skill is essential for creative longevity.",
      ],
    },
    medium: {
      strengths: [
        "You appreciate creativity and aesthetic quality without being dependent on creative expression for your identity or satisfaction.",
        "You can contribute meaningfully to creative projects while also engaging effectively with analytical, technical, or operational work.",
        "Your balanced creative interest makes you a versatile contributor across diverse team compositions and project types.",
      ],
      growth: [
        "You might not actively develop your creative skills because they feel 'optional' rather than essential to your career.",
        "Your creative contributions may tend toward conventional and expected rather than genuinely innovative or surprising.",
        "You might not recognize how much creative skill (presentation design, storytelling, visual communication) enhances performance in non-creative roles.",
      ],
      tips: [
        "Take up one creative practice (sketching, journaling, photography, music) and spend 20 minutes with it 3 times per week — creativity is a muscle that strengthens with use.",
        "Apply creative thinking to your primary work: How could you make a report more visually compelling? How could you tell a better story with your data?",
        "Attend cultural events (art exhibitions, music performances, design conferences) periodically to keep your creative sensibilities active and inspired.",
      ],
    },
    low: {
      strengths: [
        "You're highly practical and results-oriented, focusing on functional effectiveness over aesthetic considerations — this efficiency is valued in many professional contexts.",
        "You're comfortable with data-driven, analytical, or technical work that doesn't require creative expression.",
        "You make decisions based on logic and evidence rather than aesthetic preference, which is exactly what's needed in engineering, science, and quantitative fields.",
      ],
      growth: [
        "Without creative skills, your communication (presentations, reports, emails) may lack the visual and narrative polish needed to persuade and engage.",
        "You might undervalue design, branding, and aesthetics in professional contexts where they significantly impact outcomes (marketing, user experience, sales).",
        "A complete absence of creative outlets can contribute to a sense of monotony and emotional flatness in daily life.",
      ],
      tips: [
        "Start with functional creativity: learn basic presentation design (layout, color, typography) to immediately improve the impact of your professional communication.",
        "Try one low-pressure creative activity: cooking a new recipe, arranging your workspace aesthetically, or taking photos on a walk. Creativity doesn't require artistic talent.",
        "When evaluating products, services, or experiences, start noticing design choices: 'Why does this feel good to use? What makes this visually appealing?' Training your eye costs nothing but builds creative awareness.",
      ],
    },
  },
};
