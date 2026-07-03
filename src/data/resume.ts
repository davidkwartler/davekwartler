// Career history rendered by the Career timeline. Site copy lives in content.ts.

export type CareerEntry = {
  id: string;
  logo: string;
  node: string; // short label under the timeline stop
  years: string; // compact range next to the stop
  title: string;
  org: string;
  orgUrl?: string;
  location: string;
  dates: string;
  summary: string;
  bullets: string[];
  skills: string[];
  certification?: string;
};

// Timeline order: oldest first. Career.tsx opens on the last entry.
export const careerEntries: CareerEntry[] = [
  {
    id: "gw",
    logo: "/gw-logo.png",
    node: "GW School of Business",
    years: "2015–19",
    title: "Bachelor of Business Administration",
    org: "The George Washington University",
    location: "Washington, DC",
    dates: "2015 – 2019",
    summary: "Major in Finance, Minor in Environmental Sustainability",
    bullets: [],
    skills: ["Product Strategy", "Collaboration", "Communication"],
  },
  {
    id: "cvp",
    logo: "/cvp-logo.png",
    node: "CVP",
    years: "2019–21",
    title: "Product Manager",
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
    logo: "/gm-logo.jpeg",
    node: "General Motors",
    years: "2021–24",
    title: "Senior Product Manager",
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
    logo: "/expedia-logo.jpg",
    node: "Expedia",
    years: "2024–now",
    title: "Senior Product Manager",
    org: "Expedia Group",
    orgUrl: "https://www.expediagroup.com",
    location: "Austin, TX",
    dates: "08/2024 – Present",
    summary:
      "I lead identity connectivity for Expedia's enterprise partnerships: the account linking, consent, and authorization systems that power loyalty, social, and Gen AI integrations. My work enables personalized search, member pricing, and saved trips across industry-first Gen AI surfaces, safely and transparently.",
    bullets: [
      "I lead authorization strategy for Expedia's MCP-based Gen AI integrations like ChatGPT and Claude, building the identity and consent layer that enables personalized search, member pricing, and saved trips across industry-first agentic surfaces.",
      "I architected the centralized OAuth 2.0 consent system powering a nine-figure enterprise partnership portfolio across AI, loyalty programs, and social platforms, enabling secure scope-based identity connectivity and data exchange with 20+ global partners.",
      "I championed AI building within Expedia by shipping 50+ production code changes for account linking, from building UI designs in Figma Make to pushing frontend, API, and OIDC changes via Claude Code and Codex.",
      "I pioneered identity platform multi-tenancy, ensuring user data isolation and unlocking multi-million-dollar value via personalization and loyalty integrations for Expedia's B2B marketplace.",
      "I achieved a 1% booking conversion uplift by aligning loyalty, fraud, privacy, and cybersecurity teams to A/B test an extended session length strategy.",
      "I eliminated an external vendor dependency for authentication through system rearchitecture, delivering multi-million-dollar annual savings.",
      "I launched social login and a NAVER Pay integration in South Korea, capturing millions in incremental value by improving conversion in a key growth market.",
    ],
    skills: [
      "AI Agent Authorization",
      "Model Context Protocol (MCP)",
      "LLM Data Privacy & Governance",
      "OAuth 2.0",
      "AI-Assisted Development",
      "Leadership & Mentoring",
    ],
  },
];
