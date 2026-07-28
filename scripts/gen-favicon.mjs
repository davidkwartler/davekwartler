// Regenerates every favicon asset from one vector source, so the tab, the
// Android icon and the iOS home-screen icon can't drift apart.
//
//   node scripts/gen-favicon.mjs
//
// Writes public/favicon.svg, public/icon-192.png, public/apple-icon.png and
// src/app/favicon.ico.
//
// The mark is the galaxy's own bright star: white core, violet glow, four
// tapered spikes with the horizontal pair longer than the vertical. The
// asymmetry is deliberate — a perfectly symmetric four-point sparkle reads as
// the generic "AI" glyph, uneven spikes read as a point source through a lens.
//
// Two glows, not one: the original faint violet bloom, plus a wider grey glow
// sitting behind it to give the mark some depth at small sizes.
//
// Both fall off monotonically and reach zero opacity, which is the whole trick
// to avoiding rings. A plateau in the middle of a gradient, or a stop that
// lands on a non-zero opacity at offset 1, puts a hard circular edge in the
// render. Every stop below steps down, and both gradients end at 0.
//
// The grey is meant to be barely perceptible on its own — if you can point at
// where it stops, it's too strong.
//
// The secondary diagonal spikes and the flare hairline are detail for the
// 180px and 192px assets. They fall below a pixel at 16px, which is fine:
// they thin the big renders without muddying the small ones.

import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const BG = "#06040D"; // near-black with a violet cast, so the tile doesn't
// disappear into a dark tab strip the way pure black does

const H_REACH = 29; // horizontal spike, in a 64-unit box — the long pair
const V_REACH = 23; // vertical spike, still shorter but no longer stubby
const H_WAIST = 4.9; // half-height of the horizontal pair where they cross
const V_WAIST = 5.7; // half-width of the vertical pair — slightly the thicker
// of the two, so the long horizontals don't also read as the heavy ones
const CORE_R = 7.2;

const D_REACH = 13.5; // secondary spikes on the diagonals
const D_WAIST = 2.1;

const VIOLET_R = 29; // the original bloom's radius — reach stays put
const VIOLET_A = 0.96; // brightness sits between the B and C samples
const HAZE_R = 34; // grey glow sitting behind the violet, deliberately faint
const HAZE_A = 0.18; // grey desaturates violet, so it stays out of the way

const spike = (reach, waist) =>
  `M32 ${32 - reach} L${32 + waist} 32 L32 ${32 + reach} L${32 - waist} 32 Z`;

const vert = spike(V_REACH, V_WAIST);
const horiz = `M${32 - H_REACH} 32 L32 ${32 - H_WAIST} L${32 + H_REACH} 32 L32 ${32 + H_WAIST} Z`;
const diag = spike(D_REACH, D_WAIST);

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <radialGradient id="haze">
      <stop offset="0" stop-color="#E5E7EB" stop-opacity="${HAZE_A}"/>
      <stop offset="0.25" stop-color="#D9DCE1" stop-opacity="${HAZE_A * 0.72}"/>
      <stop offset="0.45" stop-color="#CFD3DA" stop-opacity="${HAZE_A * 0.45}"/>
      <stop offset="0.65" stop-color="#C6CAD2" stop-opacity="${HAZE_A * 0.24}"/>
      <stop offset="0.83" stop-color="#BFC3CC" stop-opacity="${HAZE_A * 0.09}"/>
      <stop offset="1" stop-color="#BFC3CC" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow">
      <stop offset="0" stop-color="#D3C7FD" stop-opacity="${VIOLET_A}"/>
      <stop offset="0.32" stop-color="#9B7EF8" stop-opacity="${VIOLET_A * 0.58}"/>
      <stop offset="0.66" stop-color="#7C3AED" stop-opacity="${VIOLET_A * 0.265}"/>
      <stop offset="1" stop-color="#6D28D9" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="core">
      <stop offset="0" stop-color="#FFFFFF"/>
      <stop offset="0.62" stop-color="#FFFFFF"/>
      <stop offset="1" stop-color="#EDE9FE" stop-opacity="0.9"/>
    </radialGradient>
    <linearGradient id="flare" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#DDD6FE" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#FFFFFF" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#DDD6FE" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" fill="${BG}"/>
  <circle cx="32" cy="32" r="${HAZE_R}" fill="url(#haze)"/>
  <circle cx="32" cy="32" r="${VIOLET_R}" fill="url(#glow)"/>
  <rect x="0" y="31.4" width="64" height="1.2" fill="url(#flare)"/>
  <g transform="rotate(45 32 32)" fill="#FFFFFF" fill-opacity="0.42">
    <path d="${diag}"/>
    <path d="${diag}" transform="rotate(90 32 32)"/>
  </g>
  <path d="${vert}" fill="#FFFFFF" fill-opacity="0.92"/>
  <path d="${horiz}" fill="#FFFFFF" fill-opacity="0.92"/>
  <circle cx="32" cy="32" r="${CORE_R}" fill="url(#core)"/>
</svg>
`;

const raster = (size) =>
  sharp(Buffer.from(SVG), { density: 512 }).resize(size, size).png().toBuffer();

// Minimal ICO container. Modern browsers read PNG payloads inside ICO, so each
// entry is just the PNG for that size rather than a BMP.
function ico(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);

  const dir = Buffer.alloc(16 * entries.length);
  let offset = header.length + dir.length;
  entries.forEach(({ size, png }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o); // 0 means 256
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2); // palette size
    dir.writeUInt8(0, o + 3); // reserved
    dir.writeUInt16LE(1, o + 4); // colour planes
    dir.writeUInt16LE(32, o + 6); // bits per pixel
    dir.writeUInt32LE(png.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += png.length;
  });

  return Buffer.concat([header, dir, ...entries.map((e) => e.png)]);
}

writeFileSync(join(ROOT, "public/favicon.svg"), SVG);

await sharp(Buffer.from(SVG), { density: 512 })
  .resize(192, 192)
  .png()
  .toFile(join(ROOT, "public/icon-192.png"));

await sharp(Buffer.from(SVG), { density: 512 })
  .resize(180, 180)
  .png()
  .toFile(join(ROOT, "public/apple-icon.png"));

const icoSizes = [16, 32, 48];
const icoEntries = [];
for (const size of icoSizes) icoEntries.push({ size, png: await raster(size) });
writeFileSync(join(ROOT, "src/app/favicon.ico"), ico(icoEntries));

console.log(
  "wrote public/favicon.svg, public/icon-192.png, public/apple-icon.png, src/app/favicon.ico"
);
