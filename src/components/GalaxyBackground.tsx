"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { isGalaxyPaused, subscribeGalaxyPause } from "@/lib/galaxy-pause";

/**
 * GalaxyBackground - purple galaxy canvas.
 *
 * Layers drawn per frame:
 *  1. Nebula: violet/magenta/indigo light bands drifting on sine paths,
 *     blended additively, plus two low-alpha accent wisps when `accents`
 *     is set.
 *  2. Stars: fixed positions, twinkling alpha (white or violet only).
 *  3. Shooting star: rare meteor streak (hero only, `shootingStars`).
 *  4. Binary field: a grid of 0s and 1s whose brightness follows slow
 *     traveling waves; glyphs flip over time. With `easterEggs`, the field
 *     very occasionally resolves a short string (DK / MCP / OIDC).
 *
 * Props tune the instance: timeScale slows all motion, dim scales all
 * light intensity, starCount sets star density, flip mirrors the nebula
 * composition. Draws a single static frame under prefers-reduced-motion.
 * The rAF loop stops while the canvas is offscreen (IntersectionObserver)
 * or while the user has paused motion via PauseMotionButton.
 */

export type RGB = [number, number, number];

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
  tint: RGB;
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

// Two extra wisps carrying the instance's accent tints, at the same
// intensity as the main outer wisps so the colors read as part of the
// galaxy gradient.
function accentBands([a1, a2]: [RGB, RGB]): Band[] {
  return [
    { cx: 0.24, cy: 0.66, ax: 0.06, ay: 0.05, px: 31, py: 26, phase: 3.1, rot: -0.42, r: 0.32, scaleX: 1.7, scaleY: 0.55, alpha: 0.2, tint: a1 },
    { cx: 0.76, cy: 0.24, ax: 0.05, ay: 0.05, px: 36, py: 29, phase: 5.2, rot: 0.34, r: 0.28, scaleX: 1.5, scaleY: 0.6, alpha: 0.19, tint: a2 },
  ];
}

type Star = {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
  tint: RGB;
  bright: boolean;
};

type Meteor = {
  x0: number;
  y0: number;
  dx: number;
  dy: number;
  start: number;
  dur: number;
};

type Egg = {
  word: string;
  i: number;
  j: number;
  start: number;
  dur: number;
};

type GalaxyDebug = { meteor: () => void; egg: (word?: string) => void };

declare global {
  interface Window {
    __galaxy?: GalaxyDebug[];
  }
}

const TAU = Math.PI * 2;
const GRID = 28; // px between binary glyphs
const VIOLET: RGB = [196, 181, 253];
const WHITE: RGB = [255, 255, 255];
const EGG_WORDS = ["DK", "MCP", "OIDC"];

function makeStars(count: number): Star[] {
  return Array.from({ length: count }, () => {
    const bright = Math.random() < 0.16;
    const tint = Math.random() < 0.25 ? VIOLET : WHITE;
    return {
      x: Math.random(),
      y: Math.random(),
      r: bright ? 1.1 + Math.random() * 0.9 : 0.3 + Math.random() * 0.8,
      phase: Math.random() * TAU,
      speed: 0.3 + Math.random() * 1.2,
      tint,
      bright,
    };
  });
}

function spawnMeteor(now: number): Meteor {
  const ltr = Math.random() < 0.5;
  const dist = 0.28 + Math.random() * 0.14; // fraction of viewport width
  return {
    x0: ltr ? 0.05 + Math.random() * 0.35 : 0.6 + Math.random() * 0.35,
    y0: 0.06 + Math.random() * 0.28,
    dx: ltr ? dist : -dist,
    dy: 0.1 + Math.random() * 0.12,
    start: now,
    dur: 0.9 + Math.random() * 0.4,
  };
}

// Brightness field for the binary glyphs; also used to place easter eggs
// inside a patch that's currently glowing.
function waveAt(x: number, y: number, t: number) {
  return (
    Math.sin(x * 0.006 + t * 0.55) * Math.sin(y * 0.009 - t * 0.4) * 0.5 +
    0.5 * Math.sin((x + y) * 0.004 + t * 0.3)
  );
}

function spawnEgg(
  now: number,
  tWave: number,
  w: number,
  h: number,
  word?: string
): Egg | null {
  const text = word ?? EGG_WORDS[Math.floor(Math.random() * EGG_WORDS.length)];
  const cols = Math.floor(w / GRID);
  const rows = Math.floor(h / GRID);
  if (cols < text.length + 4 || rows < 5) return null;
  // Score each candidate run of cells by its dimmest glyph, so the whole
  // word lands embedded in a bright region of the floating pattern rather
  // than popping up in dark space.
  const candidates: { i: number; j: number; score: number }[] = [];
  for (let j = 1; j < rows - 1; j++) {
    for (let i = 1; i < cols - text.length; i++) {
      let score = Infinity;
      for (let k = 0; k < text.length; k++) {
        score = Math.min(
          score,
          waveAt((i + k) * GRID + GRID / 2, j * GRID + GRID / 2, tWave)
        );
      }
      candidates.push({ i, j, score });
    }
  }
  candidates.sort((a, b) => b.score - a.score);
  const pick =
    candidates[Math.floor(Math.random() * Math.min(8, candidates.length))];
  if (!pick) return null;
  return { word: text, i: pick.i, j: pick.j, start: now, dur: 5 };
}

function drawMeteor(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  tReal: number,
  m: Meteor,
  dim: number
) {
  const p = (tReal - m.start) / m.dur;
  if (p < 0 || p > 1) return;
  const hx = (m.x0 + m.dx * p) * w;
  const hy = (m.y0 + m.dy * p) * h;
  const ang = Math.atan2(m.dy * h, m.dx * w);
  const tail = 90;
  const tx = hx - Math.cos(ang) * tail;
  const ty = hy - Math.sin(ang) * tail;
  const fade = Math.sin(p * Math.PI) * dim;

  ctx.globalCompositeOperation = "lighter";
  const grad = ctx.createLinearGradient(tx, ty, hx, hy);
  grad.addColorStop(0, "rgba(255, 244, 235, 0)");
  grad.addColorStop(1, `rgba(255, 244, 235, ${0.85 * fade})`);
  ctx.strokeStyle = grad;
  ctx.lineWidth = 1.4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(tx, ty);
  ctx.lineTo(hx, hy);
  ctx.stroke();

  const glow = ctx.createRadialGradient(hx, hy, 0, hx, hy, 6);
  glow.addColorStop(0, `rgba(255, 255, 255, ${0.9 * fade})`);
  glow.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(hx, hy, 6, 0, TAU);
  ctx.fill();
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  tReal: number,
  stars: Star[],
  dim: number,
  bands: Band[],
  flip: boolean,
  meteor: Meteor | null,
  egg: Egg | null
) {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#050409";
  ctx.fillRect(0, 0, w, h);

  // Nebula
  ctx.globalCompositeOperation = "lighter";
  const base = Math.max(w, h);
  for (const b of bands) {
    const cx = flip ? 1 - b.cx : b.cx;
    const rot = flip ? -b.rot : b.rot;
    const x = (cx + b.ax * Math.sin((t / b.px) * TAU + b.phase)) * w;
    const y = (b.cy + b.ay * Math.sin((t / b.py) * TAU + b.phase * 1.7)) * h;
    const r = b.r * base;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
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
    const [cr, cg, cb] = s.tint;

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

  if (meteor) drawMeteor(ctx, w, h, tReal, meteor, dim);

  // Binary field: brightness follows traveling waves, glyphs flip slowly
  ctx.globalCompositeOperation = "source-over";
  ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const cols = Math.ceil(w / GRID);
  const rows = Math.ceil(h / GRID);
  const eggEnv = egg
    ? Math.sin(Math.min(Math.max((tReal - egg.start) / egg.dur, 0), 1) * Math.PI)
    : 0;
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      const x = i * GRID + GRID / 2;
      const y = j * GRID + GRID / 2;
      const wave = waveAt(x, y, t);
      const fieldAlpha = Math.pow(Math.max(0, wave), 3) * 0.3 * dim;

      let char: string;
      let alpha: number;
      if (egg && eggEnv > 0 && j === egg.j && i >= egg.i && i < egg.i + egg.word.length) {
        // Barely brighter than the field's own peak so the word sits inside
        // the pattern instead of floating on top of it
        char = egg.word[i - egg.i];
        alpha = Math.max(fieldAlpha, eggEnv * 0.38 * dim);
      } else {
        if (fieldAlpha < 0.02) continue;
        const seed = i * 7919 + j * 104729;
        const flipTick = Math.floor(t / (2.5 + (seed % 5) * 0.7));
        char = (seed + flipTick) % 2 === 0 ? "0" : "1";
        alpha = fieldAlpha;
      }
      ctx.fillStyle = `rgba(196, 181, 253, ${alpha})`;
      ctx.fillText(char, x, y);
    }
  }
}

export default function GalaxyBackground({
  timeScale = 1,
  dim = 1,
  starCount = 160,
  flip = false,
  accents,
  shootingStars = false,
  easterEggs = false,
}: {
  timeScale?: number;
  dim?: number;
  starCount?: number;
  flip?: boolean;
  accents?: [RGB, RGB];
  shootingStars?: boolean;
  easterEggs?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const accentsKey = accents ? accents.join(",") : "";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bands = accents ? [...BANDS, ...accentBands(accents)] : BANDS;
    const stars = makeStars(starCount);

    let w = 0;
    let h = 0;
    let raf = 0;
    let tAnim = 0;
    let tReal = 0;
    let last = 0;
    let running = false;
    let visible = false; // IntersectionObserver fires immediately with the real state
    let userPaused = isGalaxyPaused();
    let meteor: Meteor | null = null;
    let egg: Egg | null = null;
    // One welcome meteor shortly after load, then the sparse schedule
    let nextMeteorAt = 3;
    let nextEggAt = 45 + Math.random() * 75;

    const draw = () =>
      drawFrame(ctx, w, h, tAnim, tReal, stars, dim, bands, flip, meteor, egg);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    resize();
    window.addEventListener("resize", resize);

    const frame = (now: number) => {
      // Clamp dt so a background-tab gap doesn't teleport the animation
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      tAnim += dt * timeScale;
      tReal += dt;

      if (shootingStars) {
        if (!meteor && tReal >= nextMeteorAt) meteor = spawnMeteor(tReal);
        if (meteor && tReal > meteor.start + meteor.dur) {
          meteor = null;
          nextMeteorAt = tReal + 150 + Math.random() * 120;
        }
      }
      if (easterEggs) {
        if (!egg && tReal >= nextEggAt) egg = spawnEgg(tReal, tAnim, w, h);
        if (egg && tReal > egg.start + egg.dur) {
          egg = null;
          nextEggAt = tReal + 120 + Math.random() * 180;
        }
      }

      draw();
      raf = requestAnimationFrame(frame);
    };

    // The loop runs only while the canvas is onscreen, the user hasn't
    // paused motion, and reduced motion isn't requested. Time accumulates
    // only while running, so meteor/egg schedules pause with the canvas.
    const sync = () => {
      const shouldRun = !prefersReducedMotion && visible && !userPaused;
      if (shouldRun && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);

    const unsubscribe = subscribeGalaxyPause(() => {
      userPaused = isGalaxyPaused();
      sync();
    });

    let debugApi: GalaxyDebug | undefined;
    if (process.env.NODE_ENV === "development") {
      debugApi = {
        meteor: () => {
          meteor = spawnMeteor(tReal - 0.5);
          draw();
        },
        egg: (word?: string) => {
          egg = spawnEgg(tReal - 2.5, tAnim, w, h, word);
          draw();
        },
      };
      (window.__galaxy ||= []).push(debugApi);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      unsubscribe();
      window.removeEventListener("resize", resize);
      if (debugApi && window.__galaxy) {
        window.__galaxy = window.__galaxy.filter((api) => api !== debugApi);
      }
    };
    // accentsKey stands in for the accents tuple (kept stable by parents)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion, timeScale, dim, starCount, flip, shootingStars, easterEggs, accentsKey]);

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
