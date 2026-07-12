"use client";

import { useEffect, type RefObject } from "react";
import { useReducedMotion } from "motion/react";
import { isGalaxyPaused, subscribeGalaxyPause } from "@/lib/galaxy-pause";

// Deterministic per-cell seed for the binary glyph grids (galaxy field,
// travel map landmass): two primes keep neighboring cells uncorrelated.
export function glyphSeed(i: number, j: number) {
  return i * 7919 + j * 104729;
}

export type CanvasLoop = {
  /** Recompute sizes/caches for the current layout and draw one frame. */
  resize: () => void;
  /** Advance clocks by dt seconds (already clamped) and draw. */
  frame: (dt: number) => void;
  /** Runs when the loop halts, e.g. to render a final static frame. */
  onStop?: () => void;
  /** Teardown beyond what the hook wires itself. */
  cleanup?: () => void;
};

/**
 * Scaffolding shared by the site's canvas animations (galaxy, travel map):
 * an initial + window-resize `resize()` call, and a requestAnimationFrame
 * loop with clamped dt that only runs while the canvas is onscreen
 * (IntersectionObserver), the user hasn't paused motion (galaxy-pause
 * store), and reduced motion isn't requested. Otherwise the initial
 * resize() draw stands as a static frame.
 *
 * `setup` runs once per effect lifecycle and owns all drawing state in its
 * closure; `deps` lists the reactive values it reads.
 */
export function useCanvasLoop(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  setup: (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
  ) => CanvasLoop,
  deps: readonly unknown[],
) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loop = setup(canvas, ctx);

    let raf = 0;
    let last = 0;
    let running = false;
    let visible = false; // IntersectionObserver fires immediately with the real state
    let userPaused = isGalaxyPaused();

    const frame = (now: number) => {
      // Clamp dt so a background-tab gap doesn't teleport the animation
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      loop.frame(dt);
      raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      const shouldRun = !prefersReducedMotion && visible && !userPaused;
      if (shouldRun && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
        loop.onStop?.();
      }
    };

    loop.resize();
    window.addEventListener("resize", loop.resize);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);

    const unsubscribe = subscribeGalaxyPause(() => {
      userPaused = isGalaxyPaused();
      sync();
    });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      unsubscribe();
      window.removeEventListener("resize", loop.resize);
      loop.cleanup?.();
    };
    // deps stands in for the values setup's closure reads
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion, ...deps]);
}
