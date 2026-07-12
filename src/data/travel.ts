// Travel map easter egg: destinations and field notes.
// `featured` cities glow brightest and get a bigger pin; the rest are
// smaller pins, some still awaiting David's notes.

export type TravelHighlight = {
  title: string;
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
      { title: "HipCityVeg" },
      { title: "The Hirshhorn", description: "Best art museum, period" },
      { title: "Porter Robinson", description: "At Glow festival" },
    ],
  },
  {
    name: "London",
    region: "United Kingdom",
    lat: 51.51,
    lon: -0.13,
    featured: true,
    highlights: [
      { title: "Mallow", description: TBD },
      { title: "Tate Modern", description: TBD },
      { title: "Hamilton", description: TBD },
    ],
  },
  {
    name: "Paris",
    region: "France",
    lat: 48.86,
    lon: 2.35,
    highlights: [
      { title: "Breathe, or Le Potager de Charlotte", description: TBD },
      { title: "Le Défilé Renault carwalk", description: TBD },
    ],
  },
  {
    name: "Brussels",
    region: "Belgium",
    lat: 50.85,
    lon: 4.35,
    highlights: [
      { title: "Vegan chocolate", description: "Anywhere it's sold" },
      { title: "Magritte Museum", description: TBD },
    ],
  },
  {
    name: "Amsterdam",
    region: "Netherlands",
    lat: 52.37,
    lon: 4.9,
    featured: true,
    highlights: [
      { title: "Moco Museum", description: TBD },
      { title: "Canal boat tour", description: TBD },
    ],
  },
  {
    name: "Boston",
    region: "Massachusetts",
    lat: 42.36,
    lon: -71.06,
    highlights: [
      { title: "Life Alive", description: TBD },
      { title: "Veggie Galaxy", description: TBD },
      { title: "Larz Anderson Museum", description: TBD },
    ],
  },
  {
    name: "New Hampshire",
    region: "New Hampshire",
    lat: 43.79,
    lon: -71.58,
    featured: true,
    highlights: [
      { title: "Funspot", description: "The world's largest classic arcade" },
      { title: "Lake Winnipesaukee", description: "New Hampshire's largest lake" },
      { title: "Gunstock Mountain Resort", description: TBD },
      { title: "New England Dragway", description: TBD },
    ],
  },
  {
    name: "New York",
    region: "New York",
    lat: 40.71,
    lon: -74.01,
    featured: true,
    highlights: [
      { title: "Little Island", description: TBD },
      { title: "MoMA", description: TBD },
      { title: "9/11 Museum", description: TBD },
    ],
  },
  {
    name: "Chicago",
    region: "Illinois",
    lat: 41.88,
    lon: -87.63,
    featured: true,
    highlights: [
      { title: "Riverwalk", description: TBD },
      { title: "Frank Lloyd Wright Home & Studio", description: TBD },
      { title: "System of a Down", description: "At Soldier Field" },
    ],
  },
  {
    name: "Nashville",
    region: "Tennessee",
    lat: 36.16,
    lon: -86.78,
    highlights: [
      { title: "Ryman Auditorium", description: TBD },
      { title: "Frist Art Museum", description: TBD },
      { title: "Country Music Hall of Fame", description: TBD },
      { title: "Corvette Museum", description: TBD },
    ],
  },
  {
    name: "New Orleans",
    region: "Louisiana",
    lat: 29.95,
    lon: -90.07,
    highlights: [{ title: "French Quarter", description: TBD }],
  },
  {
    name: "Atlanta",
    region: "Georgia",
    lat: 33.75,
    lon: -84.39,
    highlights: [
      { title: "Mercedes-Benz Stadium", description: TBD },
      { title: "World of Coca-Cola", description: TBD },
    ],
  },
  {
    name: "Detroit",
    region: "Michigan",
    lat: 42.33,
    lon: -83.05,
    highlights: [{ title: "Renaissance Center", description: TBD }],
  },
  {
    name: "Seattle",
    region: "Washington",
    lat: 47.61,
    lon: -122.33,
    highlights: [
      {
        title: "Chihuly Garden",
        description: "Stunning glass sculptures against the city background",
      },
      { title: "Alki Beach", description: "Waterfront vibe with skyline views" },
    ],
  },
  {
    name: "Las Vegas",
    region: "Nevada",
    lat: 36.17,
    lon: -115.14,
    highlights: [{ title: "Bellagio Fountains", description: "An iconic light show" }],
  },
  {
    name: "Los Angeles",
    region: "California",
    lat: 34.05,
    lon: -118.24,
    highlights: [{ title: "Petersen Automotive Museum", description: TBD }],
  },
  {
    name: "Austin",
    region: "Texas",
    lat: 30.27,
    lon: -97.74,
    featured: true,
    home: true,
    highlights: [
      { title: "Concourse Project", description: TBD },
      { title: "Town Lake Trail", description: TBD },
      { title: "Waterloo Records", description: TBD },
      { title: "Q2 Stadium", description: TBD },
    ],
  },
  {
    name: "Dallas",
    region: "Texas",
    lat: 32.78,
    lon: -96.8,
    featured: true,
    highlights: [
      { title: "Silo Dallas", description: TBD },
      { title: "Rodeo Goat", description: "Great vegan burger" },
      {
        title: "Meadows Museum",
        description: "Comprehensive Spanish art collection outside of Spain",
      },
      {
        title: "Dallas Holocaust Museum",
        description: "A deeply moving space dedicated to human rights",
      },
      {
        title: "Trinity River Audubon Center",
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
        description: "Modern art museum set inside a historic mansion",
      },
      {
        title: "Ruby City",
        description: "Contemporary art in a crimson architectural landmark",
      },
    ],
  },
  {
    name: "Houston",
    region: "Texas",
    lat: 29.76,
    lon: -95.37,
    highlights: [{ title: "Space Center Houston", description: TBD }],
  },
  {
    name: "Quebec City",
    region: "Canada",
    lat: 46.81,
    lon: -71.21,
    highlights: [
      { title: "Citadel of Quebec", description: TBD },
      { title: "Café Félin Chats-Nous", description: TBD },
      { title: "Valcartier Village", description: TBD },
    ],
  },
  {
    name: "Ottawa",
    region: "Canada",
    lat: 45.42,
    lon: -75.7,
    highlights: [
      { title: "Parliament Hill", description: TBD },
      { title: "National Gallery of Canada", description: TBD },
    ],
  },
  {
    name: "Nova Scotia",
    region: "Canada",
    lat: 44.65,
    lon: -63.57,
    highlights: [
      { title: "Cape Breton Island", description: "Cliffside wonder" },
      { title: "Prince Edward Island", description: "Red sand beaches" },
    ],
  },
  {
    name: "Venice",
    region: "Italy",
    lat: 45.44,
    lon: 12.33,
    featured: true,
    highlights: [
      { title: "Peggy Guggenheim Collection", description: "Incredible modern art" },
      { title: "Murano", description: "Glass factories" },
      { title: "Burano", description: "Colorful houses" },
      { title: "Modena Ferrari Museum", description: TBD },
    ],
  },
  {
    name: "Florence",
    region: "Italy",
    lat: 43.77,
    lon: 11.26,
    highlights: [
      { title: "Fort Belvedere", description: "Breathtaking city views" },
      { title: "Lucca", description: "The walled city: saw Swedish House Mafia here" },
      { title: "Brunelleschi's Dome", description: "Architectural masterpiece" },
      { title: "Venchi Gelato", description: "Vegan chocolate hazelnut gelato" },
      { title: "Gallerie Accademia", description: "David statue" },
    ],
  },
];
