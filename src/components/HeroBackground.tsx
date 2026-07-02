"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * HeroBackground - canvas aurora, monochrome silver with a cool tint.
 *
 * Four soft light bands drift on slow sine paths and blend additively,
 * Stripe-style but moonlit instead of colorful. Noise and vignette
 * overlays sit on top. Under prefers-reduced-motion a single static
 * frame is drawn; the rAF loop pauses automatically in hidden tabs.
 */

type Band = {
  cx: number; // resting center, fraction of width
  cy: number; // resting center, fraction of height
  ax: number; // sine amplitude, fraction of width
  ay: number; // sine amplitude, fraction of height
  px: number; // sine period in seconds (horizontal)
  py: number; // sine period in seconds (vertical)
  phase: number;
  r: number; // radius, fraction of max(viewport)
  scaleX: number; // >1 stretches into a band
  scaleY: number;
  alpha: number;
  tint: [number, number, number];
};

const BANDS: Band[] = [
  { cx: 0.22, cy: 0.28, ax: 0.14, ay: 0.10, px: 26, py: 21, phase: 0.0, r: 0.5, scaleX: 1.7, scaleY: 0.75, alpha: 0.3, tint: [226, 232, 240] },
  { cx: 0.78, cy: 0.24, ax: 0.12, ay: 0.12, px: 31, py: 24, phase: 2.1, r: 0.44, scaleX: 1.4, scaleY: 0.8, alpha: 0.24, tint: [148, 163, 184] },
  { cx: 0.5, cy: 0.62, ax: 0.16, ay: 0.09, px: 22, py: 28, phase: 4.2, r: 0.4, scaleX: 1.9, scaleY: 0.65, alpha: 0.26, tint: [255, 255, 255] },
  { cx: 0.85, cy: 0.75, ax: 0.10, ay: 0.11, px: 35, py: 19, phase: 5.6, r: 0.36, scaleX: 1.2, scaleY: 0.9, alpha: 0.18, tint: [203, 213, 225] },
];

const TAU = Math.PI * 2;

function drawFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number
) {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#0a0a0b";
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = "lighter";

  const base = Math.max(w, h);
  for (const b of BANDS) {
    const x = (b.cx + b.ax * Math.sin((t / b.px) * TAU + b.phase)) * w;
    const y = (b.cy + b.ay * Math.sin((t / b.py) * TAU + b.phase * 1.7)) * h;
    const r = b.r * base;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(b.scaleX, b.scaleY);
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    const [cr, cg, cb] = b.tint;
    grad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${b.alpha})`);
    grad.addColorStop(0.55, `rgba(${cr}, ${cg}, ${cb}, ${b.alpha * 0.45})`);
    grad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(-r, -r, r * 2, r * 2);
    ctx.restore();
  }
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (prefersReducedMotion) drawFrame(ctx, w, h, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    if (!prefersReducedMotion) {
      const start = performance.now();
      const loop = (now: number) => {
        drawFrame(ctx, w, h, (now - start) / 1000);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Static noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 55%, rgba(0, 0, 0, 0.4) 100%)",
        }}
      />
    </div>
  );
}
