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
    { href: "/shows", label: "Shows", keywords: "concerts music live festivals" },
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
  heading: "The live music receipts.",
  subline: "Every show I've been to since 2024, mostly in Austin.",
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
