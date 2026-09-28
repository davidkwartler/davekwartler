// All rendered site copy lives here. Career history lives in resume.ts.

export const links = {
  linkedin: "https://www.linkedin.com/in/dkwartler/",
  github: "https://github.com/davidkwartler",
  sentinel: "https://sentinel.davidkwartler.com",
};

// Standalone pages the ⌘K menu lists (in plain sight, not hidden)
export const palette = {
  pages: [
    { href: "/travel", label: "Where I've been", keywords: "travel globe map cities" },
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
    "I grow Expedia's membership inside AI assistants and partner apps, and I ship a lot of the code myself.",
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
    { until: 18, weekend: false, text: "shipping to prod" },
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
    title: "Member growth",
    body: "Travel planning is moving into AI assistants, and I make sure Expedia is there. Travelers link their Expedia accounts in ChatGPT and Claude today, with Alexa, Google AI Mode, and Meta announced. Every linked account is a member we don't have to buy back through ads.",
  },
  {
    index: "02",
    title: "Member benefits, everywhere",
    body: "Membership is worth more when it works in more places. I bring member prices into partner and AI experiences, design the moments that make a traveler want to sign in, and build with loyalty partners so members earn rewards with brands they already use.",
  },
  {
    index: "03",
    title: "AI agent authorization",
    body: "I design how AI agents get permission to act for you: the consent and access models behind Expedia's MCP-based Gen AI integrations.",
  },
  {
    index: "04",
    title: "PM who builds",
    body: "I don't stop at prototypes. I use Claude Code and Codex to ship customer-facing features to production for millions of travelers, from the UI down to APIs and OIDC.",
    project: {
      name: "Sentinel",
      blurb:
        "Side project: Sentinel catches hijacked sessions by spotting device-fingerprint mismatches, with Claude scoring each one.",
      demo: "https://sentinel.davidkwartler.com",
      repo: "https://github.com/davidkwartler/sentinel",
    },
  },
];

export const whatIDo = {
  label: "What I do",
  heading: "Members, partners, and production code.",
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
  ],
};

export const contact = {
  label: "Contact",
  heading: "Get in touch.",
  subline:
    "Member growth, AI partnerships, shipping with AI, or anything tech. All fair game.",
  cta: "Email me",
  copyCta: "Copy email",
  copiedCta: "Copied",
  linkedinCta: "LinkedIn",
  email: "david@davidkwartler.com",
};
