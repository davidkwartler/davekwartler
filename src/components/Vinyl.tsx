"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { isGalaxyPaused, subscribeGalaxyPause } from "@/lib/galaxy-pause";

// Roughly the lazy end of a turntable, slowed so it reads as ambient
const SECONDS_PER_TURN = 6;

/**
 * The last-show record: always turning slowly. On hover it scratches
 * backwards for a beat, then eases back into the spin. Stands still under
 * reduced motion and while the site-wide pause is on.
 */
export default function Vinyl({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;

    const spin = el.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      { duration: SECONDS_PER_TURN * 1000, iterations: Infinity },
    );
    let timers: number[] = [];

    const syncPause = () => (isGalaxyPaused() ? spin.pause() : spin.play());
    syncPause();
    const unsubscribe = subscribeGalaxyPause(syncPause);

    // Scratch: yank it backwards fast, hold, then ramp back to normal speed
    const scratch = () => {
      if (isGalaxyPaused()) return;
      timers.forEach(clearTimeout);
      spin.updatePlaybackRate(-7);
      timers = [
        window.setTimeout(() => spin.updatePlaybackRate(3), 260),
        window.setTimeout(() => spin.updatePlaybackRate(1), 700),
      ];
    };
    el.parentElement?.addEventListener("pointerenter", scratch);

    return () => {
      timers.forEach(clearTimeout);
      el.parentElement?.removeEventListener("pointerenter", scratch);
      unsubscribe();
      spin.cancel();
    };
  }, [prefersReducedMotion]);

  return <span ref={ref} aria-hidden className={`vinyl rounded-full ${className}`} />;
}
