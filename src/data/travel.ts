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
      {
        title: "Georgetown Waterfront Park",
        kind: "activity",
        description: "Views of the Rosslyn skyline and the Kennedy Center",
      },
      {
        title: "Adams Morgan & Dupont Circle",
        kind: "activity",
        description: "My favorite neighborhoods to wander",
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
        description: "Vegan fine dining",
      },
      {
        title: "Tate Modern",
        kind: "museum",
        description: "Modern art giant in a former power station",
      },
      { title: "Hamilton", kind: "music", description: "West End cast was incredible" },
      {
        title: "The Gherkin",
        kind: "activity",
        description: "Must-see in the financial district for architecture buffs",
      },
    ],
  },
  {
    name: "Paris",
    region: "France",
    lat: 48.86,
    lon: 2.35,
    highlights: [
      {
        title: "Breathe",
        kind: "food",
        description: "Best vegan meal in Paris",
      },
      {
        title: "Le Potager de Charlotte",
        kind: "food",
        description: "Incredibly creative vegan dishes",
      },
      {
        title: "Musée de l'Orangerie",
        kind: "museum",
        description: "Skip the Louvre and go here instead",
      },
      {
        title: "Le Défilé Renault carwalk",
        kind: "activity",
        description: "Concept cars on a catwalk",
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
      {
        title: "Kitsune Burgers",
        kind: "food",
        description: "Delicious vegan dinner with falafel smash burger",
      },
      { title: "Magritte Museum", kind: "museum", description: "Surrealism in its hometown" },
      {
        title: "Autoworld",
        kind: "museum",
        description: "Time travel to the origin of automotive",
      },
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
        title: "Kitchen Impossible",
        kind: "food",
        description: "Casual vegan ramen spot",
      },
      {
        title: "Rainbowls",
        kind: "food",
        description: "Epic acai bowl and coffee",
      },
      {
        title: "Moco Museum",
        kind: "museum",
        description: "Banksy and other modern icons in a canal house",
      },
      {
        title: "Canal boat rental",
        kind: "activity",
        description: "The best way to see the city, so relaxing",
      },
      {
        title: "Vondelpark",
        kind: "activity",
        description: "Bike ride with the locals",
      },
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
        description: "My go-to grain bowls when visiting",
      },
      { title: "Veggie Galaxy", kind: "food", description: "Vegan diner with a mean milkshake" },
      {
        title: "Larz Anderson Museum",
        kind: "museum",
        description: "America's oldest car collection, in a carriage house",
      },
      {
        title: "Linkin Park",
        kind: "music",
        description: "From Zero tour at TD Garden",
      },
      {
        title: "Charles River",
        kind: "activity",
        description: "Kayaking from Norumbega Park",
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
        description: "Every summer spent on the lake with family",
      },
      {
        title: "Gunstock Mountain Resort",
        kind: "activity",
        description: "Snowboard runs every Christmas",
      },
      {
        title: "New England Dragway",
        kind: "activity",
        description: "Quarter-mile therapy in a Corvette",
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
      {
        title: "Chloe's",
        kind: "food",
        description: "Get the vegan chocolate chip cookie",
      },
      {
        title: "MoMA",
        kind: "museum",
        description: "Standing in front of The Persistence of Memory was a surrealist dream come true",
      },
      {
        title: "9/11 Museum",
        kind: "museum",
        description: "Moving and powerful, give it the time it deserves",
      },
      {
        title: "Little Island",
        kind: "activity",
        description: "Unique elevated park built over the Hudson",
      },
      {
        title: "Top of the Rock",
        kind: "activity",
        description: "Best view in NYC, right in the middle of the skyline with Billionaires' Row in sight",
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
        description: "Birthplace of the Prairie style, the tour was a highlight of my trip",
      },
      { title: "System of a Down", kind: "music", description: "Epic show at Soldier Field" },
      {
        title: "Riverwalk",
        kind: "activity",
        description: "The skyline is better from water level, don't skip the architecture river tour",
      },
      {
        title: "Wrigley Field",
        kind: "activity",
        description: "Don't miss a Cubs game, they have vegan hot dogs",
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
        description: "Art museum in a former art deco post office",
      },
      {
        title: "Country Music Hall of Fame",
        kind: "museum",
        description: "Worth it even if country isn't your genre",
      },
      {
        title: "Corvette Museum",
        kind: "museum",
        dayTrip: true,
        description: "Worth the pilgrimage for any Corvette fan, and stop by the GM plant next door",
      },
      {
        title: "Ryman Auditorium",
        kind: "music",
        description: "Historic venue with famously perfect acoustics",
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
        title: "National WWII Museum",
        kind: "museum",
        description: "Great for history buffs",
      },
      {
        title: "French Quarter",
        kind: "activity",
        description: "Lively neighborhood, don't miss Bourbon St",
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
        description: "Taste the magic",
      },
      {
        title: "Mercedes-Benz Stadium",
        kind: "activity",
        description: "Home of the Atlanta Falcons, let's go Dirty Birds!",
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
        description: "Motor City waterfront staple",
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
        description: "Giant glass sculptures with the Space Needle as a backdrop",
      },
      {
        title: "Museum of Flight",
        kind: "museum",
        description: "Step inside the Concorde and learn aviation history",
      },
      {
        title: "Alki Beach",
        kind: "activity",
        description: "Waterfront vibe with skyline views",
      },
      {
        title: "Elliott Bay Trail",
        kind: "activity",
        description: "Perfect morning bike ride or stroll, with parks and art",
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
        title: "Gordon Ramsay Burger",
        kind: "food",
        description: "Surprisingly good vegan options",
      },
      {
        title: "Bellagio Fountains",
        kind: "activity",
        description: "Free, and still the best show on the Strip",
      },
      {
        title: "Casinos",
        kind: "activity",
        description: "Any of them! Blackjack is my game",
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
        title: "Nori",
        kind: "food",
        description: "Insanely good vegan sushi, my special-occasion go-to",
      },
      {
        title: "Blanton Museum of Art",
        kind: "museum",
        description: "Best art museum in the city",
      },
      {
        title: "The Concourse Project",
        kind: "music",
        description: "My happy place, Austin's home for EDM",
      },
      {
        title: "Waterloo Records",
        kind: "music",
        description: "Where my vinyl budget is spent",
      },
      { title: "Town Lake Trail", kind: "activity", description: "10-mile bike trail through downtown" },
      { title: "Q2 Stadium", kind: "activity", description: "Austin FC under the verde lights" },
    ],
  },
  {
    name: "Dallas",
    region: "Texas",
    lat: 32.78,
    lon: -96.8,
    featured: true,
    highlights: [
      { title: "Rodeo Goat", kind: "food", description: "My favorite vegan burger in Texas" },
      {
        title: "Meadows Museum",
        kind: "museum",
        description: "The best Spanish art collection outside Spain",
      },
      {
        title: "Dallas Holocaust Museum",
        kind: "museum",
        description: "A deeply moving space dedicated to human rights",
      },
      { title: "Silo Dallas", kind: "music", description: "Electronic music in a warehouse setting" },
      {
        title: "Trinity River Audubon Center",
        kind: "activity",
        description: "Wetlands and boardwalk trails just outside the city",
      },
      {
        title: "Klyde Warren Park",
        kind: "activity",
        description: "Peaceful park built over the freeway",
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
        description: "Modern art in a historic mansion",
      },
      {
        title: "Ruby City",
        kind: "museum",
        description: "Crimson architectural landmark",
      },
      {
        title: "Pearl",
        kind: "activity",
        description: "Shopping and farmers market",
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
        description: "You can touch a moon rock and walk in a space shuttle",
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
        description: "Historic fort that's still an active garrison",
      },
      {
        title: "Valcartier Village",
        kind: "activity",
        description: "Massive snow tubing park",
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
        description: "Canada's national collection, with the giant spider sculpture out front",
      },
      {
        title: "Parliament Hill",
        kind: "activity",
        description: "Gothic revival architecture overlooking the river, tour the Canadian Parliament if you can",
      },
    ],
  },
  {
    name: "Nova Scotia",
    region: "Canada",
    lat: 44.65,
    lon: -63.57,
    highlights: [
      {
        title: "Cape Breton Island",
        kind: "activity",
        description: "Family reunions with cliffside wonder",
      },
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
      {
        title: "Murano",
        kind: "activity",
        description: "Countless glass-blowing factories",
      },
      {
        title: "Burano",
        kind: "activity",
        description: "Stunning island of colorful homes",
      },
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
      {
        title: "Galleria dell'Accademia",
        kind: "museum",
        description: "David statue is a must-see",
      },
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
