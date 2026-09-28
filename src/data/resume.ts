// Career history rendered by the Career changelog. Site copy lives in content.ts.

export type CareerEntry = {
  id: string;
  logo: string;
  years: string; // compact range in the row's date column
  title: string;
  /** Compact title and org for the collapsed row */
  rowTitle: string;
  rowOrg: string;
  /** One line shown on the collapsed row */
  line: string;
  /** The single number the collapsed row leads with */
  stat: string;
  org: string;
  orgUrl?: string;
  location: string;
  dates: string;
  summary: string;
  bullets: string[];
  skills: string[];
  certification?: string;
};

// Oldest first; the changelog renders newest first and opens the latest.
export const careerEntries: CareerEntry[] = [
  {
    id: "gw",
    rowTitle: "BBA",
    rowOrg: "GW University",
    logo: "/gw-logo.webp",
    years: "2015–19",
    title: "Bachelor of Business Administration",
    line: "Finance major, environmental sustainability minor.",
    stat: "BBA",
    org: "The George Washington University School of Business",
    location: "Washington, DC",
    dates: "2015 – 2019",
    summary: "Major in Finance, Minor in Environmental Sustainability",
    bullets: [],
    skills: ["Product Strategy", "Collaboration", "Communication"],
  },
  {
    id: "cvp",
    rowTitle: "Product Manager",
    rowOrg: "CVP",
    logo: "/cvp-logo.webp",
    years: "2019–21",
    title: "Product Manager",
    line: "10+ consulting engagements on large modernization projects.",
    stat: "$2M from a POC",
    org: "CVP",
    orgUrl: "https://www.cvpcorp.com",
    location: "Washington, DC",
    dates: "06/2019 – 06/2021",
    summary:
      "I worked on 10+ technology consulting engagements, including two long-running projects, across roles spanning product management, business analysis, quality assurance, and agile delivery, supporting large-scale modernization initiatives for a wide range of clients.",
    bullets: [
      "I accelerated project efficiency by 65% by redesigning workflows and notification systems in an environmental planning application.",
      "I secured a $2M client contract by leading product and UI design for a real-time data visualization proof of concept.",
    ],
    skills: [
      "UI/UX Design",
      "User Research",
      "Data Analysis",
      "Continuous Discovery",
    ],
    certification: "Professional Scrum Master I",
  },
  {
    id: "gm",
    rowTitle: "Senior PM",
    rowOrg: "General Motors",
    logo: "/gm-logo.webp",
    years: "2021–24",
    title: "Senior Product Manager",
    line: "Customer identity across mobile apps, web, and the car.",
    stat: "+28% enrollments",
    org: "General Motors",
    orgUrl: "https://www.gm.com",
    location: "Austin, TX",
    dates: "06/2021 – 08/2024",
    summary:
      "I led product development for GM's customer identity and access management platform, strengthening account security and reducing authentication friction across mobile apps, web, and connected vehicle experiences for millions of users.",
    bullets: [
      "I increased loyalty enrollments by 28%, delivering $16M in monthly CLV gains by A/B testing the sign-up and enrollment funnel.",
      "I launched revamped mobile authentication informed by a 200-user pilot, driving a 19% lift in customer satisfaction.",
      "I improved MFA success rate by 13% by using product analytics to identify and prioritize UX enhancements.",
    ],
    skills: [
      "Identity & Access Management",
      "OIDC Identity Federation",
      "API Design & Documentation",
      "A/B Testing",
      "Stakeholder Alignment & Influence",
    ],
    certification: "SAFe Product Owner / Product Manager",
  },
  {
    id: "expedia",
    rowTitle: "Senior PM",
    rowOrg: "Expedia Group",
    logo: "/expedia-logo.webp",
    years: "2024–now",
    title: "Senior Product Manager",
    line: "Member growth and partner experiences in AI assistants and apps.",
    stat: "20+ partners",
    org: "Expedia Group",
    orgUrl: "https://www.expediagroup.com",
    location: "Austin, TX",
    dates: "08/2024 – Present",
    summary:
      "I work in Expedia's membership organization, where identity sits next to loyalty. Our job is to turn travelers into members and give them reasons to come back to Expedia directly. I lead the account linking and partner experiences that bring membership into AI assistants and partner apps.",
    bullets: [
      "I lead account linking and authorization for Expedia in ChatGPT and Claude, and for announced integrations with Alexa, Google AI Mode, and Meta, so travelers get member prices, personalized search, and saved trips inside AI assistants.",
      "I own how membership shows up in partner experiences: member prices, rewards, and the sign-in and booking prompts that give travelers a reason to choose Expedia.",
      "I architected the OAuth 2.0 consent system behind a nine-figure partnership portfolio, connecting 20+ global AI, loyalty, and social partners.",
      "I've shipped 50+ customer-facing production changes myself, from Figma Make designs to frontend, API, and OIDC changes built with Claude Code and Codex.",
      "I lifted booking conversion 1% by aligning loyalty, fraud, privacy, and security teams on an A/B test of longer sign-in sessions.",
      "I removed an external authentication vendor through a rearchitecture, saving millions of dollars a year.",
    ],
    skills: [
      "Member Growth",
      "Partnerships",
      "AI Agent Authorization",
      "Model Context Protocol (MCP)",
      "OAuth 2.0",
      "Shipping with AI",
    ],
  },
];
