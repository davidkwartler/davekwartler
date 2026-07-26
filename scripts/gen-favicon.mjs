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
// Geometry is tuned for small rasters: most of the ink sits near the core,
// which is all a 16px downsample really samples.

import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const BG = "#06040D"; // near-black with a violet cast, so the tile doesn't
// disappear into a dark tab strip the way pure black does

const H_REACH = 29; // horizontal spike, in a 64-unit box
const V_REACH = 19; // vertical spike, deliberately shorter
const WAIST = 5.6; // half-width where the spikes cross
const CORE_R = 7.2;
const GLOW_R = 29;
const GLOW_A = 0.85;

const vert = `M32 ${32 - V_REACH} L${32 + WAIST} 32 L32 ${32 + V_REACH} L${32 - WAIST} 32 Z`;
const horiz = `M${32 - H_REACH} 32 L32 ${32 - WAIST} L${32 + H_REACH} 32 L32 ${32 + WAIST} Z`;

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <radialGradient id="glow">
      <stop offset="0" stop-color="#DDD6FE" stop-opacity="${GLOW_A}"/>
      <stop offset="0.32" stop-color="#A78BFA" stop-opacity="${GLOW_A * 0.5}"/>
      <stop offset="0.66" stop-color="#8B5CF6" stop-opacity="${GLOW_A * 0.2}"/>
      <stop offset="1" stop-color="#8B5CF6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="core">
      <stop offset="0" stop-color="#FFFFFF"/>
      <stop offset="0.62" stop-color="#FFFFFF"/>
      <stop offset="1" stop-color="#EDE9FE" stop-opacity="0.9"/>
    </radialGradient>
  </defs>
  <rect width="64" height="64" fill="${BG}"/>
  <circle cx="32" cy="32" r="${GLOW_R}" fill="url(#glow)"/>
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
