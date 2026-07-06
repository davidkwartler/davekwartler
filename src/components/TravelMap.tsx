"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { glyphSeed, useCanvasLoop } from "@/lib/use-canvas-loop";
import { landAt } from "@/data/land-mask";
import { travelCities, travelPage, type TravelCity } from "@/data/travel";

/**
 * TravelMap - the hidden /travel easter egg.
 *
 * Continents are drawn as a grid of 0/1 glyphs (the galaxy's binary field,
 * repurposed as landmass) by sampling an equirectangular land bitmask at
 * each grid cell. Destination cities glow brighter than the land around
 * them; hovering or tapping one reveals a field-notes card. The canvas is
 * given a minimum width and wrapped in a horizontal scroller so city tap
 * targets stay usable on phones.
 */

const TAU = Math.PI * 2;
const CELL = 11; // px between glyphs
const LAT_MAX = 74; // crop empty poles so land fills the frame
const LAT_MIN = -56;
const MIN_MAP_WIDTH = 880; // below this, the map scrolls horizontally
const HIT_RADIUS = 24;
const VIOLET = "196, 181, 253";
const WARM = "255, 244, 235";

type LandCell = { x: number; y: number; seed: number };
type CityPoint = { city: TravelCity; x: number; y: number };

function lonLatToXY(lon: number, lat: number, w: number, h: number) {
  return {
    x: ((lon + 180) / 360) * w,
    y: ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * h,
  };
}

function shimmer(x: number, y: number, t: number) {
  return (
    0.5 +
    0.5 *
      Math.sin(x * 0.014 + t * 0.5) *
      Math.sin(y * 0.02 - t * 0.35 + Math.sin((x + y) * 0.006))
  );
}

function buildLandCells(w: number, h: number): LandCell[] {
  const cells: LandCell[] = [];
  const cols = Math.ceil(w / CELL);
  const rows = Math.ceil(h / CELL);
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      const x = i * CELL + CELL / 2;
      const y = j * CELL + CELL / 2;
      const lon = (x / w) * 360 - 180;
      const lat = LAT_MAX - (y / h) * (LAT_MAX - LAT_MIN);
      if (landAt(lon, lat)) {
        cells.push({ x, y, seed: glyphSeed(i, j) });
      }
    }
  }
  return cells;
}

function drawMap(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  land: LandCell[],
  cities: CityPoint[],
  activeName: string | null
) {
  ctx.clearRect(0, 0, w, h);
  ctx.font = "10px var(--font-jetbrains), ui-monospace, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Landmass: dim violet glyphs with a slow traveling shimmer
  for (const c of land) {
    const wave = shimmer(c.x, c.y, t);
    const alpha = 0.16 + 0.2 * wave * wave;
    const flipTick = Math.floor(t / (3 + (c.seed % 5) * 0.8));
    const char = (c.seed + flipTick) % 2 === 0 ? "0" : "1";
    ctx.fillStyle = `rgba(${VIOLET}, ${alpha})`;
    ctx.fillText(char, c.x, c.y);
  }

  // Cities: a warm glow, a bright glyph, and a halo when active
  ctx.globalCompositeOperation = "lighter";
  for (const p of cities) {
    const isActive = p.city.name === activeName;
    const hasNotes = !!p.city.notes;
    const pulse = 0.75 + 0.25 * Math.sin(t * 1.6 + p.x * 0.05);
    const base = hasNotes ? 0.95 : 0.55;
    const glowR = (hasNotes ? 12 : 8) * (isActive ? 1.7 : 1) * pulse;

    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
    const tint = hasNotes ? WARM : VIOLET;
    glow.addColorStop(0, `rgba(${tint}, ${0.5 * base * (isActive ? 1 : pulse)})`);
    glow.addColorStop(1, `rgba(${tint}, 0)`);
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(p.x, p.y, glowR, 0, TAU);
    ctx.fill();

    ctx.fillStyle = `rgba(255, 255, 255, ${base * (isActive ? 1 : 0.75 + 0.25 * pulse)})`;
    ctx.fillText("1", p.x, p.y);
  }
  ctx.globalCompositeOperation = "source-over";
}

export default function TravelMap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState<CityPoint | null>(null);
  const [pinned, setPinned] = useState(false);
  const [mapSize, setMapSize] = useState({ w: 0, h: 0 });
  const activeRef = useRef<CityPoint | null>(null);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // City pixel positions for the current canvas size (drives the card and
  // hit-testing; the draw loop recomputes the same coords in resize())
  const cityPoints = useMemo<CityPoint[]>(() => {
    if (!mapSize.w) return [];
    return travelCities.map((city) => ({
      city,
      ...lonLatToXY(city.lon, city.lat, mapSize.w, mapSize.h),
    }));
  }, [mapSize]);

  useCanvasLoop(
    canvasRef,
    (canvas, ctx) => {
      const wrap = wrapRef.current;

      let w = 0;
      let h = 0;
      let land: LandCell[] = [];
      let pts: CityPoint[] = [];
      let t = 0;

      const draw = () =>
        drawMap(ctx, w, h, t, land, pts, activeRef.current?.city.name ?? null);

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = Math.max(wrap?.clientWidth ?? MIN_MAP_WIDTH, MIN_MAP_WIDTH);
        h = Math.round(w * ((LAT_MAX - LAT_MIN) / 360));
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        land = buildLandCells(w, h);
        pts = travelCities.map((city) => ({
          city,
          ...lonLatToXY(city.lon, city.lat, w, h),
        }));
        setMapSize({ w, h });
        draw();
      };

      const frame = (dt: number) => {
        t += dt;
        draw();
      };

      // Redraw once on halt so the last frame reflects the current state
      return { resize, frame, onStop: draw };
    },
    [],
  );

  const findCity = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    let best: CityPoint | null = null;
    let bestDist = HIT_RADIUS;
    for (const p of cityPoints) {
      const d = Math.hypot(p.x - mx, p.y - my);
      if (d < bestDist) {
        best = p;
        bestDist = d;
      }
    }
    return best;
  };

  const onMove = (e: React.MouseEvent) => {
    if (pinned) return;
    setActive(findCity(e));
  };

  const onClick = (e: React.MouseEvent) => {
    const hit = findCity(e);
    if (hit && (!pinned || hit.city.name !== active?.city.name)) {
      setActive(hit);
      setPinned(true);
    } else {
      setActive(null);
      setPinned(false);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        setPinned(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Card placement: centered on the city, clamped to the map, above or
  // below depending on which half of the map the city sits in
  const CARD_W = 264;
  const cardStyle = active
    ? {
        left: Math.min(Math.max(active.x - CARD_W / 2, 10), mapSize.w - CARD_W - 10),
        ...(active.y < mapSize.h * 0.45
          ? { top: active.y + 18 }
          : { bottom: mapSize.h - active.y + 18 }),
      }
    : undefined;

  return (
    <div ref={wrapRef} className="overflow-x-auto overscroll-x-contain">
      <div className="relative w-fit">
        <canvas
          ref={canvasRef}
          onMouseMove={onMove}
          onMouseLeave={() => !pinned && setActive(null)}
          onClick={onClick}
          className={active ? "cursor-pointer" : "cursor-crosshair"}
        />

        {active && (
          <div
            className="pointer-events-none absolute z-10 w-[264px] rounded-xl border border-white/15 bg-neutral-950/90 p-4 text-left shadow-[0_0_40px_rgba(139,92,246,0.15)] backdrop-blur-md"
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
              <p className="mt-3 text-sm text-gray-500">
                {travelPage.pendingNote}
              </p>
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
