"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import {
  isGalaxyPaused,
  restoreGalaxyPaused,
  setGalaxyPaused,
  subscribeGalaxyPause,
} from "@/lib/galaxy-pause";

// Small fixed control to stop/resume the galaxy canvases. Hidden under
// prefers-reduced-motion, where the canvases are already static.
export default function PauseMotionButton() {
  const prefersReducedMotion = useReducedMotion();
  const paused = useSyncExternalStore(
    subscribeGalaxyPause,
    isGalaxyPaused,
    () => false
  );

  useEffect(() => {
    restoreGalaxyPaused();
  }, []);

  if (prefersReducedMotion) return null;

  const label = paused
    ? "Resume background animation"
    : "Pause background animation";

  return (
    <button
      type="button"
      onClick={() => setGalaxyPaused(!paused)}
      aria-label={label}
      aria-pressed={paused}
      title={label}
      className="fixed bottom-4 right-4 z-40 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900/70 text-gray-400 ring-1 ring-white/10 backdrop-blur transition-colors hover:text-white hover:ring-white/25"
    >
      {paused ? (
        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
          <path d="M2.5 1.5l8 4.5-8 4.5z" />
        </svg>
      ) : (
        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
          <rect x="2" y="1.5" width="2.6" height="9" rx="0.8" />
          <rect x="7.4" y="1.5" width="2.6" height="9" rx="0.8" />
        </svg>
      )}
    </button>
  );
}
