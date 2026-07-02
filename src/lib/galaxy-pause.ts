// Shared pause state for the galaxy canvases. PauseMotionButton toggles it;
// each GalaxyBackground instance subscribes and stops/starts its rAF loop.

const STORAGE_KEY = "galaxy-paused";

let paused = false;
const listeners = new Set<() => void>();

export function isGalaxyPaused() {
  return paused;
}

export function setGalaxyPaused(next: boolean) {
  if (next === paused) return;
  paused = next;
  try {
    localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  } catch {
    // private browsing / storage disabled: preference just won't persist
  }
  listeners.forEach((listener) => listener());
}

export function subscribeGalaxyPause(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function restoreGalaxyPaused() {
  try {
    if (localStorage.getItem(STORAGE_KEY) === "1") setGalaxyPaused(true);
  } catch {
    // ignore
  }
}
