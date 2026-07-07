export const LOGO_URL = "/logo.png";

export const DIMENSIONS = [
  {
    id: "personality",
    number: "01",
    title: "Personality Profile",
    subs: [
      "Social Energy",
      "Conscientiousness & Discipline",
      "Curiosity & Openness",
      "Collaboration & Empathy",
      "Adaptability & Resilience",
    ],
  },
  {
    id: "learning",
    number: "02",
    title: "Learning Style Profile",
    subs: [
      "Visual Learning",
      "Practical & Experiential",
      "Independent Learning",
      "Collaborative Learning",
      "Structured vs Exploratory",
    ],
  },
  {
    id: "skills",
    number: "03",
    title: "Skills & Abilities Profile",
    subs: [
      "Verbal Ability",
      "Numerical Ability",
      "Logical Reasoning",
      "Creative Thinking",
      "Spatial & Visual Reasoning",
      "Leadership Potential",
    ],
  },
  {
    id: "interest",
    number: "04",
    title: "Career Interest Profile",
    subs: [
      "Investigative",
      "Artistic",
      "Social",
      "Enterprising",
      "Conventional",
      "Realistic",
    ],
  },
];

export const BENEFITS = [
  {
    title: "Clarity, Not Confusion",
    body: "See your strengths laid out clearly, backed by real assessment data.",
  },
  {
    title: "A Success Blueprint",
    body: "Your strengths, blind spots, and a growth roadmap built around how you function.",
  },
  {
    title: "A Career Blueprint",
    body: "Your top career themes, fit matrix, and a roadmap to explore them.",
  },
  {
    title: "Decisions You Can Defend",
    body: "Choose your stream or path with evidence, not guesswork.",
  },
];

export const SUCCESS_BLUEPRINT_TOP = [
  "Top Strengths",
  "Hidden Strengths",
  "Potential Blind Spots",
  "Growth Roadmap",
];

export const CAREER_BLUEPRINT_TOP = [
  "Top Career Themes",
  "Career Fit Matrix",
  "Subject Recommendations",
  "Exploration Roadmap",
];

export const SUCCESS_BLUEPRINT = [
  "Overall Student Profile",
  "Top Strengths",
  "Hidden Strengths",
  "Potential Blind Spots",
  "Learning Environment Fit",
  "Motivation Drivers",
  "Future Potential Themes",
  "Personalized Growth Roadmap",
];

export const CAREER_BLUEPRINT = [
  "Top Career Themes",
  "Career Clusters",
  "Career Fit Matrix",
  "Why These Career Themes Fit You",
  "Subject Recommendations",
  "Skills to Build",
  "Recommended Experiences",
  "Career Exploration Roadmap",
];

export const HERO_STATS = [
  { n: "04", l: "Dimensions" },
  { n: "22", l: "Sub-Dimensions" },
  { n: "02", l: "Blueprints" },
  { n: "10–12", l: "Classes" },
];

export const SAMPLE_PROGRESS = [
  { label: "Analytical Reasoning", pct: 88 },
  { label: "Creative Thinking", pct: 74 },
  { label: "Leadership Potential", pct: 62 },
];

export const ACTION_TABS = [
  {
    id: "assessment",
    label: "Take the Assessment",
    eyebrow: "Step 01",
    heading: "Answer, then unlock both blueprints.",
    body: "Answer a structured set of questions across all 4 dimensions. Takes about 30 minutes. Your results generate both blueprints instantly.",
    cta: "Start Assessment",
    route: "/assessment",
    meta: [
      { k: "Duration", v: "~30 min" },
      { k: "Questions", v: "Structured across 22 sub-dimensions" },
      { k: "Output", v: "Two personalized blueprints" },
    ],
  },
  {
    id: "sample",
    label: "Sample Report",
    eyebrow: "Preview",
    heading: "See exactly what you'll receive.",
    body: "See exactly what your personalized Student Success and Career Discovery Blueprints will look like before you begin.",
    cta: "View Sample Report",
    route: null,
    meta: [
      { k: "Format", v: "PDF blueprint" },
      { k: "Sections", v: "16 across two blueprints" },
      { k: "Length", v: "24 pages" },
    ],
  },
  {
    id: "library",
    label: "Career Library",
    eyebrow: "Explore",
    heading: "Where your results could lead.",
    body: "Explore career clusters and themes linked to each interest and ability profile — and see where your results could lead.",
    cta: "Browse Career Library",
    route: "/career-library",
    meta: [
      { k: "Framework", v: "RIASEC-based" },
      { k: "Clusters", v: "Investigative · Artistic · Social · Enterprising · Conventional · Realistic" },
      { k: "Depth", v: "Fit rationale + subject links" },
    ],
  },
];
