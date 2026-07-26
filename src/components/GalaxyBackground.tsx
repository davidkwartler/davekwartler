"use client";

import { useRef } from "react";
import { glyphSeed, useCanvasLoop } from "@/lib/use-canvas-loop";
import { galaxySeed, mulberry32 } from "@/lib/star-seed";

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
 * The rAF loop (via useCanvasLoop) stops while the canvas is offscreen or
 * while the user has paused motion via PauseMotionButton.
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

// Two accent glows sitting on the ends of the galactic plane, sharing its
// rotation and drift so the band's color temperature shifts smoothly from
// one tint through violet to the other instead of reading as separate
// shapes.
function accentBands([a1, a2]: [RGB, RGB]): Band[] {
  return [
    { cx: 0.24, cy: 0.53, ax: 0.05, ay: 0.04, px: 40, py: 33, phase: 0.0, rot: -0.32, r: 0.34, scaleX: 2.0, scaleY: 0.45, alpha: 0.16, tint: a1 },
    { cx: 0.76, cy: 0.35, ax: 0.05, ay: 0.04, px: 40, py: 33, phase: 0.0, rot: -0.32, r: 0.3, scaleX: 1.9, scaleY: 0.5, alpha: 0.16, tint: a2 },
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
const METEOR_TAIL = 120; // px of streak behind the head
const METEOR_CLEARANCE = 26; // px of daylight left around the no-fly zone
const VIOLET: RGB = [196, 181, 253];
const WHITE: RGB = [255, 255, 255];
const EGG_WORDS = ["DK", "MCP", "OIDC"];

// `rand` is the seeded generator, so a given seed always paints the same sky.
function makeStars(count: number, rand: () => number): Star[] {
  return Array.from({ length: count }, () => {
    const bright = rand() < 0.16;
    const tint = rand() < 0.25 ? VIOLET : WHITE;
    return {
      x: rand(),
      y: rand(),
      r: bright ? 1.1 + rand() * 0.9 : 0.3 + rand() * 0.8,
      phase: rand() * TAU,
      speed: 0.3 + rand() * 1.2,
      tint,
      bright,
    };
  });
}

// A region the meteor must not fly through, in canvas pixels. The hero's
// canvas sits behind the headshot, so a streak crossing it doesn't overlap,
// it disappears mid-flight.
type NoFlyZone = { x: number; y: number; r: number };

function noFlyZone(
  canvas: HTMLCanvasElement,
  selector?: string
): NoFlyZone | null {
  if (!selector) return null;
  const el = document.querySelector(selector);
  if (!el) return null;
  const a = el.getBoundingClientRect();
  const c = canvas.getBoundingClientRect();
  if (!a.width || !c.width) return null;
  // Both rects are viewport-relative, so the difference holds at any scroll
  return {
    x: a.left - c.left + a.width / 2,
    y: a.top - c.top + a.height / 2,
    r: Math.max(a.width, a.height) / 2,
  };
}

function distanceToSegment(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len2 = dx * dx + dy * dy;
  const t = len2
    ? Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / len2))
    : 0;
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

function randomMeteor(now: number): Meteor {
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

/**
 * Rejection-samples a meteor until its whole streak — head, flight path and
 * trailing tail — clears the no-fly zone. Meteors stay random on every load;
 * only the star layout is seeded.
 */
function spawnMeteor(
  now: number,
  w: number,
  h: number,
  zone: NoFlyZone | null
): Meteor {
  let candidate = randomMeteor(now);
  if (!zone || !w || !h) return candidate;

  for (let attempt = 0; attempt < 24; attempt++) {
    const hx = candidate.x0 * w;
    const hy = candidate.y0 * h;
    const ex = (candidate.x0 + candidate.dx) * w;
    const ey = (candidate.y0 + candidate.dy) * h;
    // Extend backwards by the tail so the streak's far end clears too
    const ang = Math.atan2(candidate.dy * h, candidate.dx * w);
    const tx = hx - Math.cos(ang) * METEOR_TAIL;
    const ty = hy - Math.sin(ang) * METEOR_TAIL;

    if (
      distanceToSegment(zone.x, zone.y, tx, ty, ex, ey) >
      zone.r + METEOR_CLEARANCE
    ) {
      return candidate;
    }
    candidate = randomMeteor(now);
  }

  // Nothing cleared it (short viewport, photo near the middle): tuck the
  // flight into the band above the zone rather than give up and cross it.
  const ceiling = (zone.y - zone.r - METEOR_CLEARANCE) / h;
  return {
    ...candidate,
    y0: Math.max(0.03, ceiling * 0.45),
    dy: Math.max(0.02, Math.min(0.06, ceiling * 0.25)),
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
  const tx = hx - Math.cos(ang) * METEOR_TAIL;
  const ty = hy - Math.sin(ang) * METEOR_TAIL;
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
        const seed = glyphSeed(i, j);
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
  avoidSelector,
}: {
  timeScale?: number;
  dim?: number;
  starCount?: number;
  flip?: boolean;
  accents?: [RGB, RGB];
  shootingStars?: boolean;
  easterEggs?: boolean;
  /** Element the shooting star must not pass behind, e.g. the hero headshot */
  avoidSelector?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const accentsKey = accents ? accents.join(",") : "";

  useCanvasLoop(
    canvasRef,
    (canvas, ctx) => {
      const bands = accents ? [...BANDS, ...accentBands(accents)] : BANDS;
      // Salt the shared session seed with what distinguishes this instance,
      // so hero and contact get different skies that are each stable.
      const salt = Math.imul(starCount, 2654435761) ^ (flip ? 0x9e3779b9 : 0);
      const stars = makeStars(starCount, mulberry32(galaxySeed() ^ salt));

      let w = 0;
      let h = 0;
      let tAnim = 0;
      let tReal = 0;
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

      // Time accumulates only while the loop runs, so meteor/egg schedules
      // pause with the canvas.
      const frame = (dt: number) => {
        tAnim += dt * timeScale;
        tReal += dt;

        if (shootingStars) {
          if (!meteor && tReal >= nextMeteorAt) {
            // Measured at spawn time, so it tracks layout and resizes
            meteor = spawnMeteor(tReal, w, h, noFlyZone(canvas, avoidSelector));
          }
          if (meteor && tReal > meteor.start + meteor.dur) {
            meteor = null;
            nextMeteorAt = tReal + 90 + Math.random() * 30;
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
      };

      let debugApi: GalaxyDebug | undefined;
      if (process.env.NODE_ENV === "development") {
        debugApi = {
          meteor: () => {
            meteor = spawnMeteor(
              tReal - 0.5,
              w,
              h,
              noFlyZone(canvas, avoidSelector)
            );
            draw();
          },
          egg: (word?: string) => {
            egg = spawnEgg(tReal - 2.5, tAnim, w, h, word);
            draw();
          },
        };
        (window.__galaxy ||= []).push(debugApi);
      }

      return {
        resize,
        frame,
        cleanup: () => {
          if (debugApi && window.__galaxy) {
            window.__galaxy = window.__galaxy.filter((api) => api !== debugApi);
          }
        },
      };
    },
    // accentsKey stands in for the accents tuple (kept stable by parents)
    [
      timeScale,
      dim,
      starCount,
      flip,
      shootingStars,
      easterEggs,
      accentsKey,
      avoidSelector,
    ],
  );

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
