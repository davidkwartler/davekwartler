// Shared geometry for the travel page's globe (TravelMap) and anything else
// that needs to know its footprint, like StarField placing stars outside it.

// Globe diameter as a multiple of the smaller viewport axis; > 1 pushes the
// sphere past that axis so it bleeds off the screen edges.
export const GLOBE_VIEW_FRACTION = 1.22;

// Hover zoom: how much larger the globe grows on a city hover push-in.
export const HOVER_ZOOM = 1.12;
