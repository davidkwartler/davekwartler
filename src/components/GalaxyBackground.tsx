"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * GalaxyBackground - purple galaxy canvas.
 *
 * Three layers drawn per frame:
 *  1. Nebula: violet/magenta/indigo light bands drifting on sine paths,
 *     blended additively.
 *  2. Stars: fixed positions, twinkling alpha.
 *  3. Binary field: a grid of 0s and 1s whose brightness follows slow
 *     traveling waves; glyphs flip over time.
 *
 * Props tune the instance: timeScale slows all motion, dim scales all
 * light intensity, starCount sets star density. Draws a single static
 * frame under prefers-reduced-motion; the rAF loop pauses automatically
 * in hidden tabs.
 */

type Band = {
  cx: number;
  cy: number;
  ax: number;
  ay: number;
  px: number; // seconds per horizontal cycle
  py: number;
  phase: number;
  rot: number; // ellipse rotation in radians
  r: number; // fraction of max(viewport)
  scaleX: number;
  scaleY: number;
  alpha: number;
  tint: [number, number, number];
};

// A diagonal galactic plane with a bright core, plus two faint wisps.
// Deliberately dark: the glow should read as light in space, not a
// colored backdrop.
const BANDS: Band[] = [
  { cx: 0.5, cy: 0.44, ax: 0.05, ay: 0.04, px: 40, py: 33, phase: 0.0, rot: -0.32, r: 0.5, scaleX: 2.6, scaleY: 0.5, alpha: 0.2, tint: [139, 92, 246] },
  { cx: 0.56, cy: 0.4, ax: 0.04, ay: 0.03, px: 34, py: 27, phase: 1.3, rot: -0.32, r: 0.16, scaleX: 1.3, scaleY: 0.75, alpha: 0.3, tint: [196, 181, 253] },
  { cx: 0.82, cy: 0.18, ax: 0.07, ay: 0.06, px: 29, py: 24, phase: 2.6, rot: 0.4, r: 0.3, scaleX: 1.6, scaleY: 0.6, alpha: 0.12, tint: [217, 70, 239] },
  { cx: 0.16, cy: 0.72, ax: 0.07, ay: 0.06, px: 37, py: 25, phase: 4.4, rot: -0.5, r: 0.34, scaleX: 1.7, scaleY: 0.65, alpha: 0.12, tint: [99, 102, 241] },
];

type Star = {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
  violet: boolean;
  bright: boolean;
};

const TAU = Math.PI * 2;
const GRID = 28; // px between binary glyphs

function makeStars(count: number): Star[] {
  return Array.from({ length: count }, () => {
    const bright = Math.random() < 0.16;
    return {
      x: Math.random(),
      y: Math.random(),
      r: bright ? 1.1 + Math.random() * 0.9 : 0.3 + Math.random() * 0.8,
      phase: Math.random() * TAU,
      speed: 0.3 + Math.random() * 1.2,
      violet: Math.random() < 0.25,
      bright,
    };
  });
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  stars: Star[],
  dim: number
) {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#050409";
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
    ctx.rotate(b.rot);
    ctx.scale(b.scaleX, b.scaleY);
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    const [cr, cg, cb] = b.tint;
    const a = b.alpha * dim;
    grad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${a})`);
    grad.addColorStop(0.4, `rgba(${cr}, ${cg}, ${cb}, ${a * 0.35})`);
    grad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(-r, -r, r * 2, r * 2);
    ctx.restore();
  }

  // Stars: soft glow + core; the bright ones get a 4-point sparkle
  for (const s of stars) {
    const x = s.x * w;
    const y = s.y * h;
    const tw = (0.3 + 0.6 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase))) * dim;
    const [cr, cg, cb] = s.violet ? [196, 181, 253] : [255, 255, 255];

    if (s.bright) {
      const glow = ctx.createRadialGradient(x, y, 0, x, y, s.r * 4);
      glow.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${tw * 0.35})`);
      glow.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, s.r * 4, 0, TAU);
      ctx.fill();
    }

    ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${tw})`;
    ctx.beginPath();
    ctx.arc(x, y, s.r, 0, TAU);
    ctx.fill();

    if (s.bright) {
      ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${tw * 0.5})`;
      ctx.lineWidth = 0.6;
      const len = s.r * 3.5;
      ctx.beginPath();
      ctx.moveTo(x - len, y);
      ctx.lineTo(x + len, y);
      ctx.moveTo(x, y - len);
      ctx.lineTo(x, y + len);
      ctx.stroke();
    }
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
      const alpha = Math.pow(brightness, 3) * 0.3 * dim;
      if (alpha < 0.02) continue;
      const seed = i * 7919 + j * 104729;
      const flip = Math.floor(t / (2.5 + (seed % 5) * 0.7));
      const char = (seed + flip) % 2 === 0 ? "0" : "1";
      ctx.fillStyle = `rgba(196, 181, 253, ${alpha})`;
      ctx.fillText(char, x, y);
    }
  }
}

export default function GalaxyBackground({
  timeScale = 1,
  dim = 1,
  starCount = 160,
}: {
  timeScale?: number;
  dim?: number;
  starCount?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stars = makeStars(starCount);
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
      if (prefersReducedMotion) drawFrame(ctx, w, h, 0, stars, dim);
    };
    resize();
    window.addEventListener("resize", resize);

    if (!prefersReducedMotion) {
      const start = performance.now();
      const loop = (now: number) => {
        drawFrame(ctx, w, h, ((now - start) / 1000) * timeScale, stars, dim);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReducedMotion, timeScale, dim, starCount]);

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
            "radial-gradient(ellipse at center, transparent 0%, transparent 45%, rgba(0, 0, 0, 0.5) 100%)",
        }}
      />
    </div>
  );
}
