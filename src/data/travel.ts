// Travel map easter egg: destinations and field notes.
// Cities with `notes` glow brightest and show a card; the rest are pins
// awaiting David's notes.

export type TravelNotes = {
  food?: string;
  art?: string;
  music?: string;
};

export type TravelCity = {
  name: string;
  region: string;
  lat: number;
  lon: number;
  notes?: TravelNotes;
};

export const travelPage = {
  label: "Where I've been",
  backLink: "Back to the site",
  pendingNote: "Field notes coming soon.",
};

export const travelCities: TravelCity[] = [
  {
    name: "Washington, DC",
    region: "United States",
    lat: 38.91,
    lon: -77.04,
    notes: {
      food: "HipCityVeg",
      art: "The Hirshhorn — best art museum, period",
      music: "Porter Robinson at Glow festival",
    },
  },
  {
    name: "London",
    region: "United Kingdom",
    lat: 51.51,
    lon: -0.13,
    notes: {
      food: "Mallow",
      art: "Tate Modern",
      music: "Hamilton",
    },
  },
  {
    name: "Paris",
    region: "France",
    lat: 48.86,
    lon: 2.35,
    notes: {
      food: "Breathe, or Le Potager de Charlotte",
      art: "Le Défilé Renault carwalk",
      music: "Daft Punk on vinyl",
    },
  },
  {
    name: "Brussels",
    region: "Belgium",
    lat: 50.85,
    lon: 4.35,
    notes: {
      food: "Vegan chocolate, anywhere it's sold",
      art: "Magritte Museum",
    },
  },
  {
    name: "Amsterdam",
    region: "Netherlands",
    lat: 52.37,
    lon: 4.9,
    notes: {
      art: "Moco Museum",
    },
  },
  { name: "Boston", region: "United States", lat: 42.36, lon: -71.06 },
  { name: "New Hampshire", region: "United States", lat: 43.79, lon: -71.58 },
  { name: "New York", region: "United States", lat: 40.71, lon: -74.01 },
  { name: "Chicago", region: "United States", lat: 41.88, lon: -87.63 },
  { name: "Nashville", region: "United States", lat: 36.16, lon: -86.78 },
  { name: "Seattle", region: "United States", lat: 47.61, lon: -122.33 },
  { name: "Las Vegas", region: "United States", lat: 36.17, lon: -115.14 },
  { name: "Los Angeles", region: "United States", lat: 34.05, lon: -118.24 },
  { name: "Austin", region: "Texas, obviously", lat: 30.27, lon: -97.74 },
  { name: "Dallas", region: "United States", lat: 32.78, lon: -96.8 },
  { name: "San Antonio", region: "United States", lat: 29.42, lon: -98.49 },
  { name: "Quebec City", region: "Canada", lat: 46.81, lon: -71.21 },
  { name: "Ottawa", region: "Canada", lat: 45.42, lon: -75.7 },
  { name: "Nova Scotia", region: "Canada", lat: 44.65, lon: -63.57 },
  { name: "Italy", region: "Rome and beyond", lat: 41.9, lon: 12.5 },
];
