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
  // A side quest from this pin rather than the city itself; renders as a
  // quiet "day trip" tag so it doesn't need its own dot on the globe.
  dayTrip?: boolean;
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

export const travelCities: TravelCity[] = [
  {
    name: "Washington, DC",
    region: "District of Columbia",
    lat: 38.91,
    lon: -77.04,
    featured: true,
    highlights: [
      { title: "HipCityVeg", kind: "food", description: "The crispy HipCity Ranch, every time" },
      { title: "The Hirshhorn", kind: "museum", description: "Best art museum, period" },
      {
        title: "Project Glow Fest",
        kind: "music",
        description: "Porter Robinson live, a bucket-list set",
      },
    ],
  },
  {
    name: "London",
    region: "United Kingdom",
    lat: 51.51,
    lon: -0.13,
    featured: true,
    highlights: [
      {
        title: "Mallow",
        kind: "food",
        description: "Vegan fine dining good enough to convert the table",
      },
      {
        title: "Tate Modern",
        kind: "museum",
        description: "The Turbine Hall resets your sense of scale",
      },
      { title: "Hamilton", kind: "music", description: "West End cast, no notes" },
    ],
  },
  {
    name: "Paris",
    region: "France",
    lat: 48.86,
    lon: 2.35,
    highlights: [
      {
        title: "Breathe, or Le Potager de Charlotte",
        kind: "food",
        description: "Proof vegan French food isn't an oxymoron",
      },
      {
        title: "Le Défilé Renault carwalk",
        kind: "activity",
        description: "Concept cars on a catwalk, my kind of runway",
      },
    ],
  },
  {
    name: "Brussels",
    region: "Belgium",
    lat: 50.85,
    lon: 4.35,
    highlights: [
      { title: "Vegan chocolate", kind: "food", description: "Anywhere it's sold" },
      { title: "Magritte Museum", kind: "museum", description: "Surrealism in its hometown" },
    ],
  },
  {
    name: "Amsterdam",
    region: "Netherlands",
    lat: 52.37,
    lon: 4.9,
    featured: true,
    highlights: [
      {
        title: "Moco Museum",
        kind: "museum",
        description: "Banksy in a canal house, somehow it works",
      },
      { title: "Canal boat tour", kind: "activity", description: "Touristy, worth it anyway" },
    ],
  },
  {
    name: "Boston",
    region: "Massachusetts",
    lat: 42.36,
    lon: -71.06,
    highlights: [
      {
        title: "Life Alive",
        kind: "food",
        description: "The grain bowls I measure all other bowls against",
      },
      { title: "Veggie Galaxy", kind: "food", description: "Vegan diner with a mean milkshake" },
      {
        title: "Larz Anderson Museum",
        kind: "museum",
        description: "America's oldest car collection, in a carriage house",
      },
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
      {
        title: "Gunstock Mountain Resort",
        kind: "activity",
        description: "Ski runs with Winnipesaukee views",
      },
      {
        title: "New England Dragway",
        kind: "activity",
        description: "Quarter-mile therapy",
      },
    ],
  },
  {
    name: "New York",
    region: "New York",
    lat: 40.71,
    lon: -74.01,
    featured: true,
    highlights: [
      { title: "MoMA", kind: "museum", description: "Starry Night, then three hours vanish" },
      { title: "9/11 Museum", kind: "museum", description: "Heavy, and it should be" },
      {
        title: "Little Island",
        kind: "activity",
        description: "A park floating on tulip stilts over the Hudson",
      },
    ],
  },
  {
    name: "Chicago",
    region: "Illinois",
    lat: 41.88,
    lon: -87.63,
    featured: true,
    highlights: [
      {
        title: "Frank Lloyd Wright Home & Studio",
        kind: "museum",
        description: "Where the Prairie style figured itself out",
      },
      { title: "System of a Down", kind: "music", description: "At Soldier Field" },
      {
        title: "Riverwalk",
        kind: "activity",
        description: "The skyline is better from water level",
      },
    ],
  },
  {
    name: "Nashville",
    region: "Tennessee",
    lat: 36.16,
    lon: -86.78,
    highlights: [
      {
        title: "Frist Art Museum",
        kind: "museum",
        description: "An art museum inside an art deco post office",
      },
      {
        title: "Country Music Hall of Fame",
        kind: "museum",
        description: "Not a country guy, left impressed",
      },
      {
        title: "Corvette Museum",
        kind: "museum",
        dayTrip: true,
        description: "The sinkhole exhibit is peak America",
      },
      {
        title: "Ryman Auditorium",
        kind: "music",
        description: "The Mother Church earns the acoustics hype",
      },
    ],
  },
  {
    name: "New Orleans",
    region: "Louisiana",
    lat: 29.95,
    lon: -90.07,
    highlights: [
      {
        title: "French Quarter",
        kind: "activity",
        description: "Brass bands leaking out of every doorway",
      },
    ],
  },
  {
    name: "Atlanta",
    region: "Georgia",
    lat: 33.75,
    lon: -84.39,
    highlights: [
      {
        title: "World of Coca-Cola",
        kind: "museum",
        description: "The international tasting room is a dare",
      },
      {
        title: "Mercedes-Benz Stadium",
        kind: "activity",
        description: "The halo board is absurd in person",
      },
    ],
  },
  {
    name: "Detroit",
    region: "Michigan",
    lat: 42.33,
    lon: -83.05,
    highlights: [
      {
        title: "Renaissance Center",
        kind: "activity",
        description: "Motor City from the 72nd floor",
      },
    ],
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
        description: "Glass sculpture that upstages the Space Needle next door",
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
      {
        title: "Bellagio Fountains",
        kind: "activity",
        description: "Free, and still the best show on the Strip",
      },
    ],
  },
  {
    name: "Los Angeles",
    region: "California",
    lat: 34.05,
    lon: -118.24,
    highlights: [
      {
        title: "Petersen Automotive Museum",
        kind: "museum",
        description: "Do the vault tour, thank me later",
      },
    ],
  },
  {
    name: "Austin",
    region: "Texas",
    lat: 30.27,
    lon: -97.74,
    featured: true,
    home: true,
    highlights: [
      {
        title: "Concourse Project",
        kind: "music",
        description: "The best sound system in Texas",
      },
      {
        title: "Waterloo Records",
        kind: "music",
        description: "Where my record budget goes to die",
      },
      { title: "Town Lake Trail", kind: "activity", description: "My default reset button" },
      { title: "Q2 Stadium", kind: "activity", description: "Austin FC under the lights" },
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
      { title: "Silo Dallas", kind: "music", description: "Warehouse techno done right" },
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
    highlights: [
      {
        title: "Space Center Houston",
        kind: "museum",
        description: "You get to touch a moon rock",
      },
    ],
  },
  {
    name: "Quebec City",
    region: "Canada",
    lat: 46.81,
    lon: -71.21,
    highlights: [
      {
        title: "Café Félin Chats-Nous",
        kind: "food",
        description: "A cat café, don't tell Rey",
      },
      {
        title: "Citadel of Quebec",
        kind: "museum",
        description: "A star fort that's still an active garrison",
      },
      {
        title: "Valcartier Village",
        kind: "activity",
        description: "Snow slides, zero dignity, great day",
      },
    ],
  },
  {
    name: "Ottawa",
    region: "Canada",
    lat: 45.42,
    lon: -75.7,
    highlights: [
      {
        title: "National Gallery of Canada",
        kind: "museum",
        description: "The giant spider out front is just the greeter",
      },
      {
        title: "Parliament Hill",
        kind: "activity",
        description: "Gothic revival showing off",
      },
    ],
  },
  {
    name: "Nova Scotia",
    region: "Canada",
    lat: 44.65,
    lon: -63.57,
    highlights: [
      { title: "Cape Breton Island", kind: "activity", description: "Cliffside wonder" },
      {
        title: "Prince Edward Island",
        kind: "activity",
        dayTrip: true,
        description: "Red sand beaches",
      },
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
      {
        title: "Modena Ferrari Museum",
        kind: "museum",
        dayTrip: true,
        description: "The pilgrimage every car person owes themselves",
      },
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
      {
        title: "Venchi Gelato",
        kind: "food",
        description: "Vegan chocolate hazelnut gelato",
      },
      { title: "Galleria dell'Accademia", kind: "museum", description: "David statue" },
      {
        title: "Lucca",
        kind: "music",
        dayTrip: true,
        description: "The walled city, saw Swedish House Mafia here",
      },
      {
        title: "Fort Belvedere",
        kind: "activity",
        description: "The view over the Duomo at golden hour",
      },
      {
        title: "Brunelleschi's Dome",
        kind: "activity",
        description: "Architectural masterpiece",
      },
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
