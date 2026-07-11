"use client";

import { useRef } from "react";
import { useCanvasLoop } from "@/lib/use-canvas-loop";

/**
 * StarField - a sparse handful of faint, twinkling stars. Same visual
 * language as GalaxyBackground's star layer (soft glow, subtle twinkle,
 * white/violet tint) but standalone: no nebula, no binary field. For pages
 * that want a hint of night sky without the full galaxy treatment.
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
const VIOLET = [196, 181, 253] as const;
const WHITE = [255, 255, 255] as const;

function makeStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 0.8 + Math.random() * 0.6,
    phase: Math.random() * TAU,
    speed: 0.25 + Math.random() * 0.7,
    tint: Math.random() < 0.3 ? VIOLET : WHITE,
  }));
}

export default function StarField({ count = 5 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useCanvasLoop(
    canvasRef,
    (canvas, ctx) => {
      const stars = makeStars(count);
      let w = 0;
      let h = 0;
      let t = 0;

      const draw = () => {
        ctx.clearRect(0, 0, w, h);
        for (const s of stars) {
          const x = s.x * w;
          const y = s.y * h;
          const tw = 0.2 + 0.3 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
          const [cr, cg, cb] = s.tint;

          const glow = ctx.createRadialGradient(x, y, 0, x, y, s.r * 4);
          glow.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${tw * 0.28})`);
          glow.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, s.r * 4, 0, TAU);
          ctx.fill();

          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${tw})`;
          ctx.beginPath();
          ctx.arc(x, y, s.r, 0, TAU);
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
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
