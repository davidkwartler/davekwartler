// All rendered site copy lives here. Career history lives in resume.ts.

export const links = {
  linkedin: "https://www.linkedin.com/in/dkwartler/",
  github: "https://github.com/davidkwartler",
  sentinel: "https://sentinel.davidkwartler.com",
};

// Standalone pages the ⌘K menu lists last, under "Secret pages"
export const palette = {
  pages: [
    { href: "/travel", label: "Where I've been", keywords: "travel globe map cities" },
    { href: "/shows", label: "My live music habit", keywords: "shows concerts music live festivals" },
  ],
};

export const nav = {
  name: "David Kwartler",
  sections: [
    { id: "home", label: "Home" },
    { id: "work", label: "Work" },
    { id: "career", label: "Career" },
    { id: "about", label: "About" },
    { id: "ask", label: "Ask" },
    { id: "contact", label: "Contact" },
  ],
};

export const hero = {
  name: "David Kwartler",
  tagline: "Identity nerd, travel-tech PM, occasional race car driver",
  intro:
    "I build account linking for Expedia's loyalty and AI partners, so travelers' member benefits follow them into cutting-edge agentic AI experiences.",
  also: "Also: Porsche, vinyl, and a cat named Rey.",
  contactCta: "Get in touch",
  linkedinCta: "LinkedIn",
};

// The hero's live status pill: Austin local time plus a guess at what David
// is up to. First match wins; hours are 0-23 in America/Chicago.
export const status = {
  city: "Austin",
  timeZone: "America/Chicago",
  moods: [
    { until: 7, text: "asleep, probably" },
    { until: 12, weekend: true, text: "on the gravel bike" },
    { until: 18, weekend: false, text: "building something" },
    { until: 18, weekend: true, text: "at the track, maybe" },
    { until: 20, text: "feeding Rey" },
    { until: 24, text: "at a show" },
  ] as { until: number; weekend?: boolean; text: string }[],
};

export type WhatIDoCard = {
  index: string;
  title: string;
  body: string;
  /** Optional side-project link, rendered as a pill in the card's bottom corner */
  project?: {
    name: string;
    /** One line on what the project does, shown above its links */
    blurb: string;
    demo: string;
    repo: string;
  };
};

const whatIDoCards: WhatIDoCard[] = [
  {
    index: "01",
    title: "Growing membership",
    body: "Account linking in partners like ChatGPT and Claude lets travelers connect their Expedia account, or join our rewards program, right where they already are.",
  },
  {
    index: "02",
    title: "Member benefits, everywhere",
    body: "Earn perks with loyalty partners, and see member prices inside AI assistants. Expedia membership should pay off wherever travelers are.",
  },
  {
    index: "03",
    title: "AI permissions",
    body: "When an AI assistant acts for a traveler, consent should be clear: scoped permissions, and access they can revoke anytime.",
  },
  {
    index: "04",
    title: "PM who builds",
    body: "I use AI tools to ship new features and experiments to production myself, across UI and APIs. It's the fastest way to test an idea, and it keeps our engineers focused on the big bets.",
    project: {
      name: "Sentinel",
      blurb:
        "Side project: Sentinel catches hijacked sessions by spotting device-fingerprint mismatches, with AI scoring each one.",
      demo: "https://sentinel.davidkwartler.com",
      repo: "https://github.com/davidkwartler/sentinel",
    },
  },
];

export const whatIDo = {
  label: "What I do",
  heading: "Membership, partners, and permissions.",
  cards: whatIDoCards,
};

export const careerSection = {
  label: "Where I've been",
  heading: "Consulting, electric cars, and travel tech.",
};

export type Photo = {
  src: string;
  alt: string;
  label: string;
  caption: string;
  imgClass?: string;
  /** The caption label becomes a link, e.g. Travel to the globe page */
  href?: string;
  /**
   * Real capture settings, read from the camera originals' EXIF (every
   * frame is the GR IV's 18.3mm lens, 28mm equivalent). The served WebPs
   * are stripped, so these live here; update them with the photo.
   */
  exif: { aperture: string; shutter: string; iso: number; ev?: string; date: string };
};

export const human = {
  label: "Who I am",
  heading: "Chasing momentum and catching eighty shows a year.",
  intro:
    "I grew up in Boston, studied in DC, and landed in Austin. Live music is my thing, and the vinyl collection is the receipt. I'm a big fan of track days in a Porsche or Corvette, and gravel bike rides on the Town Lake trail. I travel for vegan food, music festivals, and modern art museums. At home, my cat Rey is in charge.",
  camera: "Ricoh GR IV",
  lens: "18.3mm",
  photos: [
    {
      src: "/paris-orsay.webp",
      alt: "The main hall of the Musée d'Orsay in Paris",
      label: "Travel",
      caption: "Musée d'Orsay, Paris",
      href: "/travel",
      exif: { aperture: "f/7.1", shutter: "1/30", iso: 800, date: "May 2026" },
    },
    {
      src: "/austin-skyline.webp",
      alt: "Downtown Austin skyline at dusk from the Town Lake bike trail",
      label: "Wellness",
      caption: "Town Lake trail, Austin",
      // Dusk shot runs dark next to the other two; lift it in CSS
      imgClass: "brightness-[1.15]",
      exif: { aperture: "f/3.2", shutter: "1/400", iso: 100, ev: "-0.7 EV", date: "Feb 2026" },
    },
    {
      src: "/porsche.webp",
      alt: "White Porsche 718 Cayman GTS with a Texas plate reading DAVID",
      label: "Motorsports",
      caption: "My 718 Cayman GTS",
      exif: { aperture: "f/2.8", shutter: "1/400", iso: 12800, date: "Feb 2026" },
    },
  ] satisfies Photo[],
  // Pages that used to hide behind a caption; now linked in plain sight
  elsewhere: [
    { href: "/travel", label: "Where I've been", note: "a globe of every city" },
    { href: "/shows", label: "Shows", note: "every one since 2024" },
  ],
};

export const showsPage = {
  label: "Shows",
  heading: "My live music habit.",
  subline: "Every show I've been to recently, from Austin warehouses to festival fields.",
  backLink: "Back to Who I am",
};

export const contact = {
  label: "Contact",
  heading: "Get in touch.",
  subline:
    "Account linking, AI permissions, loyalty partnerships, or anything tech. All fair game.",
  cta: "Email me",
  copyCta: "Copy email",
  copiedCta: "Copied",
  linkedinCta: "LinkedIn",
  email: "david@davidkwartler.com",
};

export type AskQuestion = {
  id: string;
  /** The chip label, phrased the way a visitor would ask it */
  q: string;
  /**
   * The answer. Tokens in braces are filled in when the answer is shown:
   * {shows} past shows logged, {topVenue} the most-visited venue, {cities}
   * cities on the travel globe.
   */
  a: string;
  /** Words a typed question can match on (lowercase, any order) */
  keywords: string[];
  links?: { label: string; href: string }[];
};

// "Ask me": a chat-style FAQ. Every answer is written ahead of time from
// facts already on the site; nothing is generated and nothing is sent
// anywhere.
export const askMe = {
  label: "Ask me",
  heading: "Questions I get a lot.",
  greeting: "Hey, I'm David. Pick a question, or type your own.",
  fallback:
    "I don't have a good answer for that one here. Try one of these, or email me.",
  placeholder: "Ask a question",
  questions: [
    {
      id: "expedia",
      q: "What do you do at Expedia?",
      a: "I'm a Senior PM at Expedia Group in Austin. I build the account linking that connects Expedia members to our loyalty and AI partners, and the permissions that keep those connections safe.",
      keywords: ["expedia", "job", "role", "current", "currently", "day"],
    },
    {
      id: "account-linking",
      q: "What's account linking, in plain English?",
      a: "It lets travelers connect their Expedia account right where they already are, like inside ChatGPT or Claude. Once it's linked, their member prices, rewards, and saved trips come along, so they can shop and book without starting over.",
      keywords: ["account", "linking", "link", "oauth", "explain", "plain"],
    },
    {
      id: "partners",
      q: "Which AI companies do you work with?",
      a: "I lead account linking with AI partners like OpenAI, Anthropic, Google, Meta, and Amazon. The OAuth 2.0 linking and consent system I architected connects 20+ global AI, loyalty, and social partners.",
      keywords: ["partners", "partner", "companies", "openai", "anthropic", "google", "meta", "amazon", "chatgpt", "claude", "gemini"],
    },
    {
      id: "permissions",
      q: "How do you think about AI permissions?",
      a: "When an AI assistant acts for a traveler, consent should be clear. I design that model for our AI partners: scoped permissions, clear consent, and access travelers can revoke anytime.",
      keywords: ["permissions", "permission", "consent", "authorization", "agent", "agents", "agentic", "safe", "security", "privacy"],
    },
    {
      id: "gm",
      q: "What did you do at GM?",
      a: "From 2021 to 2024 I ran product for GM's customer identity platform: sign-in and account security across the mobile apps, web, and the car, for millions of users. A/B testing the enrollment funnel lifted loyalty enrollments 28%, worth $16M a month in customer lifetime value.",
      keywords: ["gm", "general", "motors", "identity", "mfa"],
    },
    {
      id: "cvp",
      q: "What did you do before GM?",
      a: "Two years at CVP, a tech consulting firm in DC, on 10+ modernization projects. I covered product, business analysis, QA, and agile delivery. Leading the design of a real-time data visualization proof of concept won a $2M contract.",
      keywords: ["cvp", "consulting", "consultant", "before", "earlier", "previous", "previously"],
    },
    {
      id: "code",
      q: "Do you actually code?",
      a: "Yes, with AI doing a lot of the typing. I've shipped 50+ changes to production at Expedia across UI, APIs, and OIDC, built with Claude Code and ChatGPT Codex. It's the fastest way to test an idea, and it keeps our engineers on the big bets. I built this site the same way.",
      keywords: ["code", "coding", "engineer", "build", "builder", "technical", "ai", "tools", "ship", "program"],
    },
    {
      id: "sentinel",
      q: "What's Sentinel?",
      a: "A side project. Sentinel catches hijacked sessions by spotting device-fingerprint mismatches, with AI scoring each one.",
      keywords: ["sentinel", "side", "project", "hijack", "session", "fingerprint"],
      links: [
        { label: "Try Sentinel", href: links.sentinel },
        { label: "Source on GitHub", href: "https://github.com/davidkwartler/sentinel" },
      ],
    },
    {
      id: "wins",
      q: "What results are you proudest of?",
      a: "A few numbers I like: +28% loyalty enrollments at GM ($16M a month in customer lifetime value), a 1% lift in Expedia booking conversion from longer sign-in sessions, and removing an external authentication vendor, which saves millions of dollars a year.",
      keywords: ["proud", "proudest", "results", "wins", "impact", "numbers", "achievements", "accomplishments"],
    },
    {
      id: "based",
      q: "Where are you based?",
      a: "Austin, Texas. I grew up in Boston and studied in DC.",
      keywords: ["based", "live", "located", "location", "austin", "from", "boston", "hometown"],
    },
    {
      id: "school",
      q: "Where did you go to school?",
      a: "George Washington University in DC: a BBA with a finance major and an environmental sustainability minor, class of 2019.",
      keywords: ["school", "college", "university", "gw", "degree", "study", "studied", "education"],
    },
    {
      id: "car",
      q: "What do you drive?",
      a: "A white Porsche 718 Cayman GTS, with a Texas plate that reads DAVID. I'm a big fan of track days, in the Porsche or a Corvette.",
      keywords: ["drive", "car", "porsche", "cayman", "corvette", "track", "racing", "race"],
    },
    {
      id: "shows",
      q: "How many shows do you go to?",
      a: "Around eighty a year. I've logged {shows} shows since 2024, from Austin warehouses to festival fields, and {topVenue} is my most-visited venue. The vinyl collection is the receipt.",
      keywords: ["shows", "concerts", "concert", "music", "festival", "festivals", "vinyl", "edm", "dj"],
      links: [{ label: "Every show since 2024", href: "/shows" }],
    },
    {
      id: "rey",
      q: "Who's Rey?",
      a: "My cat, and the one actually in charge at home.",
      keywords: ["rey", "cat", "pet", "pets"],
    },
    {
      id: "travel",
      q: "Where do you like to travel?",
      a: "I travel for vegan food, music festivals, and modern art museums. My travel globe has all {cities} cities I've been to, with notes on the good ones.",
      keywords: ["travel", "traveled", "traveling", "travels", "trips", "trip", "vacation", "visited", "cities", "city", "countries", "food", "vegan", "museums"],
      links: [{ label: "See the globe", href: "/travel" }],
    },
    {
      id: "contact",
      q: "What's the best way to reach you?",
      a: "Email is best: david@davidkwartler.com. LinkedIn works too. Account linking, AI permissions, loyalty partnerships, or anything tech: all fair game.",
      keywords: ["reach", "contact", "email", "hire", "hiring", "linkedin", "talk"],
      links: [
        { label: "Email me", href: "mailto:david@davidkwartler.com" },
        { label: "LinkedIn", href: links.linkedin },
      ],
    },
  ] satisfies AskQuestion[],
};
