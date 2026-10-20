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
   * The answer, 1-3 sentences. Tokens in braces are filled in when it's
   * asked: {lastShow} is the most recent past show ("Artist at Venue").
   */
  a: string;
  /** In the pool the popup draws its five opening questions from */
  top?: boolean;
  links?: { label: string; href: string }[];
};

// Ask me: the chat popup in the corner. Pre-written answers only; nothing
// is generated and nothing is sent anywhere.
export const askMe = {
  launcherLabel: "Ask me something",
  title: "Ask David",
  greeting: "Hey, I'm David. Pick a question.",
  more: "More questions",
  questions: [
    {
      id: "now",
      q: "What are you working on right now?",
      a: "Bringing Expedia membership into AI assistants. Account linking lets travelers carry their member prices, rewards, and saved trips into ChatGPT, Claude, and our other AI partners.",
      top: true,
    },
    {
      id: "shipped",
      q: "What's the last thing you shipped yourself?",
      a: "This chat window, and a fix that finally lets the shooting star on my homepage show up. At work it's a steady stream of UI, API, and OIDC changes, built with Claude Code.",
      top: true,
    },
    {
      id: "proudest",
      q: "What's your proudest build?",
      a: "Building Expedia's account linking platform from scratch.",
      top: true,
    },
    {
      id: "headed",
      q: "Where is AI agent authorization headed?",
      a: "Toward the permissions we expect from apps, only tighter: narrow scopes, consent people actually understand, and access they can revoke anytime. The protocols exist; the hard part is making consent clear enough to trust.",
      top: true,
    },
    {
      id: "tool",
      q: "Favorite AI tool right now?",
      a: "I use a lot of AI tools, but Claude Code is my go-to. Most of what I ship, this site included, starts there.",
    },
    {
      id: "sentinel",
      q: "What's Sentinel, and why build it?",
      a: "A side project that catches hijacked sessions by spotting device-fingerprint mismatches, with AI scoring each one. I built it to get hands-on with the session security I think about at work.",
      links: [
        { label: "Try Sentinel", href: links.sentinel },
        { label: "Source on GitHub", href: "https://github.com/davidkwartler/sentinel" },
      ],
    },
    {
      id: "show",
      q: "What was your last show?",
      a: "{lastShow}. I make it to about eighty shows a year.",
      top: true,
      links: [{ label: "Every show since 2024", href: "/shows" }],
    },
    {
      id: "trip",
      q: "Favorite trip this year?",
      a: "My second Europe trip, earlier this year: London, Paris, and Amsterdam.",
      top: true,
      links: [{ label: "See the globe", href: "/travel" }],
    },
    {
      id: "austin",
      q: "Austin hidden gems?",
      a: "Nori for vegan sushi, the Blanton for art, and Waterloo Records for vinyl. For a show, The Concourse Project is my happy place.",
    },
    {
      id: "contact",
      q: "What's the best way to reach you?",
      a: "Email is best: david@davidkwartler.com. LinkedIn works too.",
      links: [
        { label: "Email me", href: "mailto:david@davidkwartler.com" },
        { label: "LinkedIn", href: links.linkedin },
      ],
    },
  ] satisfies AskQuestion[],
};
