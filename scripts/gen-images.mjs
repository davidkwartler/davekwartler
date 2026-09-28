// Derives the small raster assets the site actually serves. The static
// export ships images as-is (no Next image optimizer), so anything rendered
// far below its source size is pre-sized here, at 2x its CSS size.
//
//   node scripts/gen-images.mjs
//
// Sources: assets/ (logos, not served) and public/dk-headshot.jpg (served
// full-size too, for link previews and structured data).

import sharp from "sharp";

const jobs = [
  // Nav avatar and the hero status pill: 36px CSS at most
  { from: "public/dk-headshot.jpg", to: "public/dk-headshot-72.webp", size: 72 },
  // Career timeline logos: 44px CSS
  ...["cvp-logo.png", "gw-logo.png", "gm-logo.jpeg", "expedia-logo.jpg"].map(
    (f) => ({
      from: `assets/${f}`,
      to: `public/${f.replace(/\.\w+$/, "")}.webp`,
      size: 88,
    }),
  ),
];

for (const { from, to, size } of jobs) {
  const info = await sharp(from)
    .resize(size, size, { fit: "cover" })
    .webp({ quality: 82 })
    .toFile(to);
  console.log(`${to}  ${info.width}x${info.height}  ${info.size} B`);
}
