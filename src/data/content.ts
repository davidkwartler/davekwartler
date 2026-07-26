// All rendered site copy lives here. Career history lives in resume.ts.

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
  intro: "I build identity and authorization products for AI agents with OAuth.",
  also: "Also: Porsche, vinyl, and a cat named Rey.",
};

export type WhatIDoCard = {
  index: string;
  title: string;
  body: string;
  /** Optional side-project link, rendered as a pill in the card's bottom corner */
  project?: {
    name: string;
    demo: string;
    repo: string;
  };
};

const whatIDoCards: WhatIDoCard[] = [
  {
    index: "01",
    title: "Identity connectivity",
    body: "I build the OAuth and OIDC systems that let travelers connect their Expedia accounts with loyalty programs, social platforms, and AI experiences. Done well, account linking is a growth engine.",
  },
  {
    index: "02",
    title: "AI agent authorization",
    body: "I design how AI agents get permission to act for you: the consent and access models behind Expedia's MCP-based Gen AI integrations.",
  },
  {
    index: "03",
    title: "PM who builds",
    body: "I prototype with AI and ship production changes myself, from UI design to API and OIDC changes. It's the fastest way to test an idea.",
    project: {
      name: "Sentinel",
      demo: "https://sentinel.davidkwartler.com",
      repo: "https://github.com/davidkwartler/sentinel",
    },
  },
];

export const whatIDo = {
  label: "What I do",
  heading: "Identity, consent, and AI agents.",
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
  drift: number;
  imgClass?: string;
  /** Easter-egg door: the caption becomes a quiet link */
  href?: string;
};

export const human = {
  label: "Who I am",
  heading: "Chasing momentum and catching eighty shows a year.",
  intro:
    "I grew up in Boston, studied in DC, and landed in Austin. Live music is my thing, and the vinyl collection is the receipt. I'm a big fan of track days in a Porsche or Corvette, and gravel bike rides on the Town Lake trail. I travel for vegan food, music festivals, and modern art museums. At home, my cat Rey is in charge.",
  photos: [
    {
      src: "/paris-orsay.webp",
      alt: "The main hall of the Musée d'Orsay in Paris",
      label: "Travel",
      caption: "Visiting the Musée d'Orsay in Paris",
      drift: 28,
      href: "/travel",
    },
    {
      src: "/austin-skyline.webp",
      alt: "Downtown Austin skyline at dusk from the Town Lake bike trail",
      label: "Wellness",
      caption: "Austin skyline from the Town Lake bike trail",
      drift: -36,
      // Dusk shot runs dark next to the other two; lift it in CSS
      imgClass: "brightness-[1.15]",
    },
    {
      src: "/porsche.webp",
      alt: "White Porsche 718 Cayman GTS with a Texas plate reading DAVID",
      label: "Motorsports",
      caption: "My Porsche 718 Cayman GTS",
      drift: 22,
    },
  ] satisfies Photo[],
  photosCredit: "Shot by me on a Ricoh GR IV.",
};

export const contact = {
  label: "Contact",
  heading: "Get in touch.",
  subline: "Identity, authorization, AI agents, or anything tech. All fair game.",
  cta: "Email me",
  email: "david@davidkwartler.com",
};
