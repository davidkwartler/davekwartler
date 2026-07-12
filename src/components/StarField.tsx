"use client";

import { useRef } from "react";
import { useCanvasLoop } from "@/lib/use-canvas-loop";
import { GLOBE_VIEW_FRACTION, HOVER_ZOOM } from "@/lib/globe-config";

/**
 * StarField - a night sky of faint, twinkling stars around the travel globe.
 * Same visual language as GalaxyBackground's star layer (soft glow, subtle
 * twinkle, white/violet tint) but standalone: no nebula, no binary field.
 *
 * The globe's ocean fill is mostly transparent (a ~5% tint between the land
 * glyphs), so a star merely painted *behind* it in z-order would still peek
 * through those gaps. Positions are rejection-sampled outside the globe's
 * footprint instead (including its hover-zoom growth and atmosphere bleed)
 * so no star ever ends up in a spot the globe could show it through. `-z-10`
 * on top of that is belt-and-suspenders.
 */

type Star = {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
  tint: readonly [number, number, number];
};

const TAU = Math.PI * 2;
// Keep stars clear of the fixed, translucent SiteNav (h-16) up top so none
// end up muted under its blur.
const NAV_HEIGHT = 64;
const VIOLET = [196, 181, 253] as const;
const WHITE = [255, 255, 255] as const;
const PLACEMENT_TRIES = 100;

// Half the homepage hero galaxy's default star count (160).
const DEFAULT_COUNT = 80;

// The globe's own atmosphere bleeds to R*1.06 (see TravelMap) and can grow by
// HOVER_ZOOM on a city hover, so exclude past that, not just past R.
function exclusionRadius(w: number, h: number) {
  return 0.5 * GLOBE_VIEW_FRACTION * HOVER_ZOOM * 1.06 * Math.min(w, h);
}

// Reject candidates that land inside the globe's footprint; on a cramped
// square-ish viewport where that eats the whole canvas, fall back to a
// corner, which is always clear.
function placeStar(w: number, h: number, exclR: number) {
  const cx = w / 2;
  const cy = h / 2;
  for (let i = 0; i < PLACEMENT_TRIES; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    if (y > NAV_HEIGHT && Math.hypot(x - cx, y - cy) > exclR) return { x, y };
  }
  const corner = Math.floor(Math.random() * 4);
  const jx = 0.05 + Math.random() * 0.07;
  const jy = 0.05 + Math.random() * 0.07;
  const x = (corner % 2 === 0 ? jx : 1 - jx) * w;
  const y = Math.max((corner < 2 ? jy : 1 - jy) * h, NAV_HEIGHT + 8);
  return { x, y };
}

function makeStars(count: number, w: number, h: number): Star[] {
  const exclR = exclusionRadius(w, h);
  return Array.from({ length: count }, () => {
    const { x, y } = placeStar(w, h, exclR);
    return {
      x,
      y,
      r: 0.6 + Math.random() * 0.6,
      phase: Math.random() * TAU,
      speed: 0.25 + Math.random() * 0.7,
      tint: Math.random() < 0.3 ? VIOLET : WHITE,
    };
  });
}

export default function StarField({ count = DEFAULT_COUNT }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useCanvasLoop(
    canvasRef,
    (canvas, ctx) => {
      let stars: Star[] = [];
      let w = 0;
      let h = 0;
      let t = 0;

      const draw = () => {
        ctx.clearRect(0, 0, w, h);
        for (const s of stars) {
          const tw = 0.2 + 0.3 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
          const [cr, cg, cb] = s.tint;

          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
          glow.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${tw * 0.28})`);
          glow.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 4, 0, TAU);
          ctx.fill();

          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${tw})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, TAU);
          ctx.fill();
        }
      };

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = canvas.clientWidth;
        h = canvas.clientHeight;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        // Regenerate on every resize: the globe's footprint (and therefore
        // the safe placement zone) changes with the viewport's aspect ratio.
        stars = makeStars(count, w, h);
        draw();
      };

      const frame = (dt: number) => {
        t += dt;
        draw();
      };

      return { resize, frame, onStop: draw };
    },
    [count],
  );

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    />
  );
}
