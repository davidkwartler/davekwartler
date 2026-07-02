"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * HeroBackground - purple galaxy canvas.
 *
 * Three layers drawn per frame:
 *  1. Nebula: violet/magenta/indigo light bands drifting on sine paths,
 *     blended additively.
 *  2. Stars: fixed positions, twinkling alpha.
 *  3. Binary field: a grid of 0s and 1s whose brightness follows slow
 *     traveling waves (link.com/agents-style); glyphs flip over time.
 *
 * Draws a single static frame under prefers-reduced-motion; the rAF
 * loop pauses automatically in hidden tabs. The parent fades this
 * whole layer out as the user scrolls past the hero.
 */

type Band = {
  cx: number;
  cy: number;
  ax: number;
  ay: number;
  px: number; // seconds per horizontal cycle
  py: number;
  phase: number;
  r: number; // fraction of max(viewport)
  scaleX: number;
  scaleY: number;
  alpha: number;
  tint: [number, number, number];
};

const BANDS: Band[] = [
  { cx: 0.22, cy: 0.28, ax: 0.14, ay: 0.10, px: 26, py: 21, phase: 0.0, r: 0.5, scaleX: 1.7, scaleY: 0.75, alpha: 0.32, tint: [139, 92, 246] },
  { cx: 0.78, cy: 0.24, ax: 0.12, ay: 0.12, px: 31, py: 24, phase: 2.1, r: 0.44, scaleX: 1.4, scaleY: 0.8, alpha: 0.18, tint: [217, 70, 239] },
  { cx: 0.5, cy: 0.64, ax: 0.16, ay: 0.09, px: 22, py: 28, phase: 4.2, r: 0.42, scaleX: 1.9, scaleY: 0.65, alpha: 0.26, tint: [99, 102, 241] },
  { cx: 0.85, cy: 0.75, ax: 0.10, ay: 0.11, px: 35, py: 19, phase: 5.6, r: 0.36, scaleX: 1.2, scaleY: 0.9, alpha: 0.16, tint: [59, 130, 246] },
];

type Star = { x: number; y: number; r: number; phase: number; speed: number; violet: boolean };

const TAU = Math.PI * 2;
const GRID = 28; // px between binary glyphs

function makeStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 0.4 + Math.random() * 1.1,
    phase: Math.random() * TAU,
    speed: 0.3 + Math.random() * 1.2,
    violet: Math.random() < 0.25,
  }));
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  stars: Star[]
) {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#08070d";
  ctx.fillRect(0, 0, w, h);

  // Nebula
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

  // Stars
  for (const s of stars) {
    const tw = 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
    ctx.fillStyle = s.violet
      ? `rgba(196, 181, 253, ${tw})`
      : `rgba(255, 255, 255, ${tw * 0.9})`;
    ctx.beginPath();
    ctx.arc(s.x * w, s.y * h, s.r, 0, TAU);
    ctx.fill();
  }

  // Binary field: brightness follows traveling waves, glyphs flip slowly
  ctx.globalCompositeOperation = "source-over";
  ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const cols = Math.ceil(w / GRID);
  const rows = Math.ceil(h / GRID);
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      const x = i * GRID + GRID / 2;
      const y = j * GRID + GRID / 2;
      const wave =
        Math.sin(x * 0.006 + t * 0.55) *
          Math.sin(y * 0.009 - t * 0.4) *
          0.5 +
        0.5 * Math.sin((x + y) * 0.004 + t * 0.3);
      const brightness = Math.max(0, wave);
      const alpha = Math.pow(brightness, 3) * 0.3;
      if (alpha < 0.02) continue;
      const seed = i * 7919 + j * 104729;
      const flip = Math.floor(t / (2.5 + (seed % 5) * 0.7));
      const char = (seed + flip) % 2 === 0 ? "0" : "1";
      ctx.fillStyle = `rgba(196, 181, 253, ${alpha})`;
      ctx.fillText(char, x, y);
    }
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

    const stars = makeStars(140);
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
      if (prefersReducedMotion) drawFrame(ctx, w, h, 0, stars);
    };
    resize();
    window.addEventListener("resize", resize);

    if (!prefersReducedMotion) {
      const start = performance.now();
      const loop = (now: number) => {
        drawFrame(ctx, w, h, (now - start) / 1000, stars);
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
