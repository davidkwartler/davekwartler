"use client";

import { useRef, useState, useEffect } from "react";
import { useCanvasLoop } from "@/lib/use-canvas-loop";
import { landAt } from "@/data/land-mask";
import { travelCities, travelPage, type TravelCity } from "@/data/travel";

/**
 * TravelMap - the hidden /travel easter egg, v2: a binary-glyph globe.
 *
 * The continents are drawn as electric-blue 0/1 glyphs sampled from the same
 * equirectangular land mask as v1, but projected onto an orthographic sphere.
 * The globe idles with a very slow wobble constrained to the Atlantic face
 * (North America + Europe), so it never rotates round to the empty Pacific
 * back where David has no pins. Grab-and-drag nudges it within that envelope
 * and it eases back to center. Cities are bright-orange triangles that hide as
 * they cross to the back hemisphere; hover or tap one to freeze the globe and
 * open a field-notes card. Night-vision palette: blue land, orange pins.
 */

const DEG = Math.PI / 180;
const TAU = Math.PI * 2;

// Framing
const MAX_CANVAS = 620; // px; the globe canvas is square and caps here
const GLOBE_FRACTION = 0.44; // radius as a fraction of the canvas dimension

// Rest orientation: mid-Atlantic, tilted north so North America (left) and
// Europe (right) both sit on the visible face at rest.
const CENTER_LON = -45;
const CENTER_LAT = 32;

// Constrained wobble — a slow idle oscillation that never swings to the empty
// back. Drag adds a manual offset (capped) that eases back to the wobble center.
const LON_AMP = 20; // wobble reach in longitude degrees
const LON_PERIOD = 82; // seconds per wobble cycle — deliberately very slow
const LAT_AMP = 5;
const LAT_PERIOD = 104;
const MANUAL_LON_MAX = 42; // how far a drag can push longitude past the wobble
const CENTER_LAT_MIN = 8;
const CENTER_LAT_MAX = 58;
const DRAG_SENS = 0.28; // degrees per pixel dragged
const MANUAL_HALFLIFE = 0.9; // seconds for a released drag to ease halfway back

// Land glyph field: Fibonacci samples over the whole sphere, filtered to land.
const LAND_SAMPLES = 5200;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

// Night-vision palette
const BLUE = "56, 189, 248"; // electric blue landmass
const ORANGE = "255, 120, 24"; // bright electric orange pins

// Phosphor scan band drifting across the globe. Set STRENGTH to 0 to kill it.
const SWEEP_STRENGTH = 0.26;
const SWEEP_PERIOD = 15; // seconds for the band to cross
const SWEEP_WIDTH = 0.15; // fraction of the globe diameter

const HIT_RADIUS = 26;
const DRAG_THRESHOLD = 5; // px of movement before a press counts as a drag

type LandPoint = { lon: number; lat: number; seed: number };
type Proj = { x: number; y: number; cosc: number };
type Active = { city: TravelCity; x: number; y: number };

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

// Evenly spread points over the sphere, keep the ones that land on land.
function buildLandPoints(): LandPoint[] {
  const pts: LandPoint[] = [];
  for (let i = 0; i < LAND_SAMPLES; i++) {
    const y = 1 - (i / (LAND_SAMPLES - 1)) * 2; // 1 → -1
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * GOLDEN_ANGLE;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    const lat = Math.asin(y) / DEG;
    const lon = Math.atan2(x, z) / DEG;
    if (landAt(lon, lat)) {
      pts.push({ lon, lat, seed: (i * 2654435761) >>> 0 });
    }
  }
  return pts;
}

let LAND_CACHE: LandPoint[] | null = null;
const landPoints = () => (LAND_CACHE ??= buildLandPoints());

// Orthographic projection centered on (centerLon, centerLat). cosc is the
// cosine of the angular distance from the globe center: >0 means the point is
// on the visible front hemisphere, and it doubles as a facing/limb factor.
function project(
  lon: number,
  lat: number,
  centerLon: number,
  centerLat: number,
  cx: number,
  cy: number,
  R: number,
): Proj {
  const lat0 = centerLat * DEG;
  const phi = lat * DEG;
  const dl = (lon - centerLon) * DEG;
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const cosc =
    Math.sin(lat0) * sinPhi + Math.cos(lat0) * cosPhi * Math.cos(dl);
  const x = cx + R * cosPhi * Math.sin(dl);
  const y =
    cy - R * (Math.cos(lat0) * sinPhi - Math.sin(lat0) * cosPhi * Math.cos(dl));
  return { x, y, cosc };
}

type View = {
  phase: number; // wobble clock (s); frozen while dragging or a card is open
  t: number; // pulse/flip/sweep clock (s)
  manualLon: number;
  manualLat: number;
  dragging: boolean;
  activeName: string | null;
};

function currentCenter(v: View) {
  const wobLon = LON_AMP * Math.sin((v.phase / LON_PERIOD) * TAU);
  const wobLat = LAT_AMP * Math.sin((v.phase / LAT_PERIOD) * TAU + 1.3);
  const lon =
    CENTER_LON +
    clamp(wobLon + v.manualLon, -(LON_AMP + MANUAL_LON_MAX), LON_AMP + MANUAL_LON_MAX);
  const lat = clamp(CENTER_LAT + wobLat + v.manualLat, CENTER_LAT_MIN, CENTER_LAT_MAX);
  return { lon, lat };
}

function drawTriangle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  fill: string,
) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.moveTo(x, y - s);
  ctx.lineTo(x - s * 0.9, y + s * 0.72);
  ctx.lineTo(x + s * 0.9, y + s * 0.72);
  ctx.closePath();
  ctx.fill();
}

function drawGlobe(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  cx: number,
  cy: number,
  R: number,
  centerLon: number,
  centerLat: number,
  land: LandPoint[],
  t: number,
  sweepPos: number,
  activeName: string | null,
) {
  ctx.clearRect(0, 0, w, h);

  // Faint sphere: a dim ocean fill and an atmosphere rim so the globe reads
  // even across empty water.
  const ocean = ctx.createRadialGradient(cx, cy - R * 0.2, R * 0.1, cx, cy, R);
  ocean.addColorStop(0, `rgba(${BLUE}, 0.055)`);
  ocean.addColorStop(0.75, `rgba(${BLUE}, 0.02)`);
  ocean.addColorStop(1, `rgba(${BLUE}, 0)`);
  ctx.fillStyle = ocean;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, TAU);
  ctx.fill();

  const atmo = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.06);
  atmo.addColorStop(0, `rgba(${BLUE}, 0)`);
  atmo.addColorStop(0.6, `rgba(${BLUE}, 0.1)`);
  atmo.addColorStop(1, `rgba(${BLUE}, 0)`);
  ctx.fillStyle = atmo;
  ctx.beginPath();
  ctx.arc(cx, cy, R * 1.06, 0, TAU);
  ctx.fill();

  // Landmass glyphs
  ctx.font = "10px var(--font-jetbrains), ui-monospace, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const left = cx - R;
  for (const p of land) {
    const pr = project(p.lon, p.lat, centerLon, centerLat, cx, cy, R);
    if (pr.cosc <= 0.02) continue; // front hemisphere only
    // Limb darkening: bright at the center of the disc, fading to the edge.
    let alpha = (0.16 + 0.55 * pr.cosc) * pr.cosc;
    if (sweepPos >= 0) {
      const nx = (pr.x - left) / (2 * R);
      const d = Math.abs(nx - sweepPos);
      if (d < SWEEP_WIDTH) {
        const b = 1 - d / SWEEP_WIDTH;
        alpha += SWEEP_STRENGTH * b * b * pr.cosc;
      }
    }
    const flipTick = Math.floor(t / (3 + (p.seed % 5) * 0.8));
    const char = (p.seed + flipTick) % 2 === 0 ? "0" : "1";
    ctx.fillStyle = `rgba(${BLUE}, ${Math.min(alpha, 0.95)})`;
    ctx.fillText(char, pr.x, pr.y);
  }

  // City pins — orange triangles, hidden on the back hemisphere
  ctx.globalCompositeOperation = "lighter";
  for (const city of travelCities) {
    const pr = project(city.lon, city.lat, centerLon, centerLat, cx, cy, R);
    if (pr.cosc <= 0.06) continue;
    const hasNotes = !!city.notes;
    const isActive = city.name === activeName;
    const pulse = 0.7 + 0.3 * Math.sin(t * 1.5 + city.lon * 0.05);
    const facing = 0.55 + 0.45 * pr.cosc;
    const size = (hasNotes ? 7 : 5.5) * (isActive ? 1.45 : 1);
    const base = (hasNotes ? 0.95 : 0.6) * facing;
    const alpha = isActive ? 1 : base * (0.72 + 0.28 * pulse);

    if (hasNotes || isActive) {
      const gR = size * (isActive ? 3.4 : 2.4) * pulse;
      const glow = ctx.createRadialGradient(pr.x, pr.y, 0, pr.x, pr.y, gR);
      glow.addColorStop(0, `rgba(${ORANGE}, ${0.5 * alpha})`);
      glow.addColorStop(1, `rgba(${ORANGE}, 0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(pr.x, pr.y, gR, 0, TAU);
      ctx.fill();
    }

    drawTriangle(ctx, pr.x, pr.y, size, `rgba(${ORANGE}, ${alpha})`);
    if (isActive) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.beginPath();
      ctx.arc(pr.x, pr.y + size * 0.1, 1.3, 0, TAU);
      ctx.fill();
    }
  }
  ctx.globalCompositeOperation = "source-over";
}

export default function TravelMap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState<Active | null>(null);
  const [pinned, setPinned] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const view = useRef<View>({
    phase: 0,
    t: 0,
    manualLon: 0,
    manualLat: 0,
    dragging: false,
    activeName: null,
  });
  const geom = useRef({ w: 0, h: 0, cx: 0, cy: 0, R: 0 });
  const drawRef = useRef<() => void>(() => {});
  const pinnedRef = useRef(false);
  const drag = useRef({ downX: 0, downY: 0, lastX: 0, lastY: 0, moved: false, id: -1 });

  useEffect(() => {
    pinnedRef.current = pinned;
  }, [pinned]);

  useCanvasLoop(
    canvasRef,
    (canvas, ctx) => {
      const land = landPoints();

      const draw = () => {
        const g = geom.current;
        const v = view.current;
        const { lon, lat } = currentCenter(v);
        const sweep = SWEEP_STRENGTH > 0 ? (v.t / SWEEP_PERIOD) % 1 : -1;
        drawGlobe(ctx, g.w, g.h, g.cx, g.cy, g.R, lon, lat, land, v.t, sweep, v.activeName);
      };
      drawRef.current = draw;

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const cw = Math.min(wrapRef.current?.clientWidth ?? MAX_CANVAS, MAX_CANVAS);
        canvas.style.width = `${cw}px`;
        canvas.style.height = `${cw}px`;
        canvas.width = Math.round(cw * dpr);
        canvas.height = Math.round(cw * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const R = cw * GLOBE_FRACTION;
        geom.current = { w: cw, h: cw, cx: cw / 2, cy: cw / 2, R };
        setSize({ w: cw, h: cw });
        draw();
      };

      const frame = (dt: number) => {
        const v = view.current;
        v.t += dt;
        const frozen = v.dragging || v.activeName !== null;
        if (!frozen) {
          v.phase += dt;
          const decay = Math.pow(0.5, dt / MANUAL_HALFLIFE);
          v.manualLon *= decay;
          v.manualLat *= decay;
          if (Math.abs(v.manualLon) < 0.02) v.manualLon = 0;
          if (Math.abs(v.manualLat) < 0.02) v.manualLat = 0;
        }
        draw();
      };

      return { resize, frame, onStop: draw };
    },
    [],
  );

  const hitTest = (clientX: number, clientY: number): Active | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const mx = clientX - rect.left;
    const my = clientY - rect.top;
    const g = geom.current;
    const { lon, lat } = currentCenter(view.current);
    let best: Active | null = null;
    let bestD = HIT_RADIUS;
    for (const city of travelCities) {
      const pr = project(city.lon, city.lat, lon, lat, g.cx, g.cy, g.R);
      if (pr.cosc <= 0.06) continue;
      const d = Math.hypot(pr.x - mx, pr.y - my);
      if (d < bestD) {
        best = { city, x: pr.x, y: pr.y };
        bestD = d;
      }
    }
    return best;
  };

  const setHover = (hit: Active | null) => {
    view.current.activeName = hit?.city.name ?? null;
    setActive((prev) =>
      prev?.city.name === hit?.city.name ? prev : hit,
    );
  };

  const onPointerDown = (e: React.PointerEvent) => {
    canvasRef.current?.setPointerCapture(e.pointerId);
    drag.current = {
      downX: e.clientX,
      downY: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
      moved: false,
      id: e.pointerId,
    };
    view.current.dragging = true;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const ds = drag.current;
    if (view.current.dragging && ds.id === e.pointerId) {
      const dx = e.clientX - ds.lastX;
      const dy = e.clientY - ds.lastY;
      ds.lastX = e.clientX;
      ds.lastY = e.clientY;
      if (Math.hypot(e.clientX - ds.downX, e.clientY - ds.downY) > DRAG_THRESHOLD) {
        ds.moved = true;
      }
      if (ds.moved) {
        const v = view.current;
        v.manualLon = clamp(v.manualLon - dx * DRAG_SENS, -MANUAL_LON_MAX, MANUAL_LON_MAX);
        v.manualLat = clamp(
          v.manualLat + dy * DRAG_SENS,
          CENTER_LAT_MIN - CENTER_LAT,
          CENTER_LAT_MAX - CENTER_LAT,
        );
        if (!pinnedRef.current && v.activeName) setHover(null);
        drawRef.current();
      }
      return;
    }
    if (!pinnedRef.current) {
      setHover(hitTest(e.clientX, e.clientY));
      drawRef.current();
    }
  };

  const endDrag = (e: React.PointerEvent) => {
    const ds = drag.current;
    const wasDrag = view.current.dragging && ds.id === e.pointerId;
    view.current.dragging = false;
    canvasRef.current?.releasePointerCapture?.(e.pointerId);
    if (wasDrag && !ds.moved) {
      const hit = hitTest(e.clientX, e.clientY);
      if (hit) {
        view.current.activeName = hit.city.name;
        setActive(hit);
        setPinned(true);
      } else {
        setHover(null);
        setPinned(false);
      }
    }
    drawRef.current();
  };

  const onPointerLeave = () => {
    if (!view.current.dragging && !pinnedRef.current) {
      setHover(null);
      drawRef.current();
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        view.current.activeName = null;
        setActive(null);
        setPinned(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Card placement: centered over the pin, clamped to the canvas, flipped above
  // or below depending on which half the pin sits in. The globe is frozen while
  // a card is open, so the anchor stays put.
  const CARD_W = 264;
  const cardStyle = active
    ? {
        left: clamp(active.x - CARD_W / 2, 10, size.w - CARD_W - 10),
        ...(active.y < size.h * 0.5
          ? { top: active.y + 20 }
          : { bottom: size.h - active.y + 20 }),
      }
    : undefined;

  // Grabbing state comes from CSS :active so render never reads the drag ref.
  const cursor = active ? "cursor-pointer" : "cursor-grab active:cursor-grabbing";

  return (
    <div ref={wrapRef} className="mx-auto w-full max-w-[620px]">
      <div className="relative" style={{ width: size.w, height: size.h }}>
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={onPointerLeave}
          className={`touch-none select-none ${cursor}`}
        />

        {active && (
          <div
            className="pointer-events-none absolute z-10 w-[264px] rounded-xl border border-white/15 bg-neutral-950/90 p-4 text-left shadow-[0_0_40px_rgba(56,189,248,0.15)] backdrop-blur-md"
            style={cardStyle}
          >
            <p className="font-semibold text-white">{active.city.name}</p>
            <p className="text-xs text-gray-500">{active.city.region}</p>
            {active.city.notes ? (
              <dl className="mt-3 space-y-1.5 text-sm">
                {(
                  [
                    ["Food", active.city.notes.food],
                    ["Art", active.city.notes.art],
                    ["Music", active.city.notes.music],
                  ] as const
                )
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <dt className="w-12 shrink-0 text-xs uppercase tracking-wider text-gray-500 font-[family-name:var(--font-jetbrains)] leading-5">
                        {k}
                      </dt>
                      <dd className="text-gray-300">{v}</dd>
                    </div>
                  ))}
              </dl>
            ) : (
              <p className="mt-3 text-sm text-gray-500">{travelPage.pendingNote}</p>
            )}
          </div>
        )}
      </div>

      {/* The canvas is decorative for screen readers; the notes live here */}
      <ul className="sr-only">
        {travelCities.map((c) => (
          <li key={c.name}>
            {c.name}, {c.region}
            {c.notes &&
              ` — ${[
                c.notes.food && `food: ${c.notes.food}`,
                c.notes.art && `art: ${c.notes.art}`,
                c.notes.music && `music: ${c.notes.music}`,
              ]
                .filter(Boolean)
                .join("; ")}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
