// Travel map easter egg: destinations and field notes.
// `featured` cities glow brightest and get a bigger pin; the rest are
// smaller pins, some still awaiting David's notes.

// Kind drives the little icon next to each highlight; cards render kinds in
// a fixed order (food, museum, music, activity) regardless of data order.
export type HighlightKind = "food" | "museum" | "music" | "activity";

export type TravelHighlight = {
  title: string;
  kind: HighlightKind;
  description?: string;
};

export type TravelCity = {
  name: string;
  region: string;
  lat: number;
  lon: number;
  featured?: boolean;
  home?: boolean;
  highlights?: TravelHighlight[];
};

export const travelPage = {
  label: "Where I've been",
  backLink: "Back to the site",
  pendingNote: "Field notes coming soon.",
};

const TBD = "Description coming soon.";

export const travelCities: TravelCity[] = [
  {
    name: "Washington, DC",
    region: "District of Columbia",
    lat: 38.91,
    lon: -77.04,
    featured: true,
    highlights: [
      { title: "HipCityVeg", kind: "food" },
      { title: "The Hirshhorn", kind: "museum", description: "Best art museum, period" },
      { title: "Porter Robinson", kind: "music", description: "At Glow festival" },
    ],
  },
  {
    name: "London",
    region: "United Kingdom",
    lat: 51.51,
    lon: -0.13,
    featured: true,
    highlights: [
      { title: "Mallow", kind: "food", description: TBD },
      { title: "Tate Modern", kind: "museum", description: TBD },
      { title: "Hamilton", kind: "music", description: TBD },
    ],
  },
  {
    name: "Paris",
    region: "France",
    lat: 48.86,
    lon: 2.35,
    highlights: [
      { title: "Breathe, or Le Potager de Charlotte", kind: "food", description: TBD },
      { title: "Le Défilé Renault carwalk", kind: "activity", description: TBD },
    ],
  },
  {
    name: "Brussels",
    region: "Belgium",
    lat: 50.85,
    lon: 4.35,
    highlights: [
      { title: "Vegan chocolate", kind: "food", description: "Anywhere it's sold" },
      { title: "Magritte Museum", kind: "museum", description: TBD },
    ],
  },
  {
    name: "Amsterdam",
    region: "Netherlands",
    lat: 52.37,
    lon: 4.9,
    featured: true,
    highlights: [
      { title: "Moco Museum", kind: "museum", description: TBD },
      { title: "Canal boat tour", kind: "activity", description: TBD },
    ],
  },
  {
    name: "Boston",
    region: "Massachusetts",
    lat: 42.36,
    lon: -71.06,
    highlights: [
      { title: "Life Alive", kind: "food", description: TBD },
      { title: "Veggie Galaxy", kind: "food", description: TBD },
      { title: "Larz Anderson Museum", kind: "museum", description: TBD },
    ],
  },
  {
    name: "New Hampshire",
    region: "New Hampshire",
    lat: 43.79,
    lon: -71.58,
    featured: true,
    highlights: [
      { title: "Funspot", kind: "activity", description: "The world's largest classic arcade" },
      {
        title: "Lake Winnipesaukee",
        kind: "activity",
        description: "New Hampshire's largest lake",
      },
      { title: "Gunstock Mountain Resort", kind: "activity", description: TBD },
      { title: "New England Dragway", kind: "activity", description: TBD },
    ],
  },
  {
    name: "New York",
    region: "New York",
    lat: 40.71,
    lon: -74.01,
    featured: true,
    highlights: [
      { title: "MoMA", kind: "museum", description: TBD },
      { title: "9/11 Museum", kind: "museum", description: TBD },
      { title: "Little Island", kind: "activity", description: TBD },
    ],
  },
  {
    name: "Chicago",
    region: "Illinois",
    lat: 41.88,
    lon: -87.63,
    featured: true,
    highlights: [
      { title: "Frank Lloyd Wright Home & Studio", kind: "museum", description: TBD },
      { title: "System of a Down", kind: "music", description: "At Soldier Field" },
      { title: "Riverwalk", kind: "activity", description: TBD },
    ],
  },
  {
    name: "Nashville",
    region: "Tennessee",
    lat: 36.16,
    lon: -86.78,
    highlights: [
      { title: "Frist Art Museum", kind: "museum", description: TBD },
      { title: "Country Music Hall of Fame", kind: "museum", description: TBD },
      { title: "Corvette Museum", kind: "museum", description: TBD },
      { title: "Ryman Auditorium", kind: "music", description: TBD },
    ],
  },
  {
    name: "New Orleans",
    region: "Louisiana",
    lat: 29.95,
    lon: -90.07,
    highlights: [{ title: "French Quarter", kind: "activity", description: TBD }],
  },
  {
    name: "Atlanta",
    region: "Georgia",
    lat: 33.75,
    lon: -84.39,
    highlights: [
      { title: "World of Coca-Cola", kind: "museum", description: TBD },
      { title: "Mercedes-Benz Stadium", kind: "activity", description: TBD },
    ],
  },
  {
    name: "Detroit",
    region: "Michigan",
    lat: 42.33,
    lon: -83.05,
    highlights: [{ title: "Renaissance Center", kind: "activity", description: TBD }],
  },
  {
    name: "Seattle",
    region: "Washington",
    lat: 47.61,
    lon: -122.33,
    highlights: [
      {
        title: "Chihuly Garden",
        kind: "museum",
        description: "Stunning glass sculptures against the city background",
      },
      {
        title: "Alki Beach",
        kind: "activity",
        description: "Waterfront vibe with skyline views",
      },
    ],
  },
  {
    name: "Las Vegas",
    region: "Nevada",
    lat: 36.17,
    lon: -115.14,
    highlights: [
      { title: "Bellagio Fountains", kind: "activity", description: "An iconic light show" },
    ],
  },
  {
    name: "Los Angeles",
    region: "California",
    lat: 34.05,
    lon: -118.24,
    highlights: [{ title: "Petersen Automotive Museum", kind: "museum", description: TBD }],
  },
  {
    name: "Austin",
    region: "Texas",
    lat: 30.27,
    lon: -97.74,
    featured: true,
    home: true,
    highlights: [
      { title: "Concourse Project", kind: "music", description: TBD },
      { title: "Waterloo Records", kind: "music", description: TBD },
      { title: "Town Lake Trail", kind: "activity", description: TBD },
      { title: "Q2 Stadium", kind: "activity", description: TBD },
    ],
  },
  {
    name: "Dallas",
    region: "Texas",
    lat: 32.78,
    lon: -96.8,
    featured: true,
    highlights: [
      { title: "Rodeo Goat", kind: "food", description: "Great vegan burger" },
      {
        title: "Meadows Museum",
        kind: "museum",
        description: "Comprehensive Spanish art collection outside of Spain",
      },
      {
        title: "Dallas Holocaust Museum",
        kind: "museum",
        description: "A deeply moving space dedicated to human rights",
      },
      { title: "Silo Dallas", kind: "music", description: TBD },
      {
        title: "Trinity River Audubon Center",
        kind: "activity",
        description: "Wetlands and boardwalk trails just outside the city",
      },
    ],
  },
  {
    name: "San Antonio",
    region: "Texas",
    lat: 29.42,
    lon: -98.49,
    highlights: [
      {
        title: "McNay Art Museum",
        kind: "museum",
        description: "Modern art museum set inside a historic mansion",
      },
      {
        title: "Ruby City",
        kind: "museum",
        description: "Contemporary art in a crimson architectural landmark",
      },
    ],
  },
  {
    name: "Houston",
    region: "Texas",
    lat: 29.76,
    lon: -95.37,
    highlights: [{ title: "Space Center Houston", kind: "museum", description: TBD }],
  },
  {
    name: "Quebec City",
    region: "Canada",
    lat: 46.81,
    lon: -71.21,
    highlights: [
      { title: "Café Félin Chats-Nous", kind: "food", description: TBD },
      { title: "Citadel of Quebec", kind: "museum", description: TBD },
      { title: "Valcartier Village", kind: "activity", description: TBD },
    ],
  },
  {
    name: "Ottawa",
    region: "Canada",
    lat: 45.42,
    lon: -75.7,
    highlights: [
      { title: "National Gallery of Canada", kind: "museum", description: TBD },
      { title: "Parliament Hill", kind: "activity", description: TBD },
    ],
  },
  {
    name: "Nova Scotia",
    region: "Canada",
    lat: 44.65,
    lon: -63.57,
    highlights: [
      { title: "Cape Breton Island", kind: "activity", description: "Cliffside wonder" },
      { title: "Prince Edward Island", kind: "activity", description: "Red sand beaches" },
    ],
  },
  {
    name: "Venice",
    region: "Italy",
    lat: 45.44,
    lon: 12.33,
    featured: true,
    highlights: [
      {
        title: "Peggy Guggenheim Collection",
        kind: "museum",
        description: "Incredible modern art",
      },
      { title: "Modena Ferrari Museum", kind: "museum", description: TBD },
      { title: "Murano", kind: "activity", description: "Glass factories" },
      { title: "Burano", kind: "activity", description: "Colorful houses" },
    ],
  },
  {
    name: "Florence",
    region: "Italy",
    lat: 43.77,
    lon: 11.26,
    highlights: [
      { title: "Venchi Gelato", kind: "food", description: "Vegan chocolate hazelnut gelato" },
      { title: "Gallerie Accademia", kind: "museum", description: "David statue" },
      {
        title: "Lucca",
        kind: "music",
        description: "The walled city: saw Swedish House Mafia here",
      },
      { title: "Fort Belvedere", kind: "activity", description: "Breathtaking city views" },
      { title: "Brunelleschi's Dome", kind: "activity", description: "Architectural masterpiece" },
    ],
  },
];

const KIND_ORDER: Record<HighlightKind, number> = {
  food: 0,
  museum: 1,
  music: 2,
  activity: 3,
};

// The canonical display order for a city's highlights. Data above is already
// kept in this order for readability, but sorting here means a future edit
// can't accidentally break the convention.
export function sortedHighlights(highlights: TravelHighlight[]): TravelHighlight[] {
  return [...highlights].sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind]);
}
