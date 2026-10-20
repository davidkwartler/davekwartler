// Pins each exported page's inline scripts by hash. Runs after `next build`
// (see the build script in package.json).
//
//   node scripts/csp-hashes.mjs
//
// The CSP header in vercel.json has to keep script-src 'unsafe-inline': it
// is one static header for every page, and Next's inline bootstrap and RSC
// payload scripts change with every build and page. So each HTML file in
// out/ gets its own <meta http-equiv="Content-Security-Policy"> listing the
// sha256 of exactly the inline scripts it contains. A browser enforces both
// policies, and a hash source makes it ignore 'unsafe-inline', so injected
// inline script is refused even though the header allows it.
//
// JSON-LD (type="application/ld+json") is a data block, never executed, and
// needs no hash. If this script doesn't run, pages simply ship without the
// meta tag and the header policy alone applies.

import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = "out";
const INLINE_SCRIPT = /<script(?![^>]*\ssrc=)([^>]*)>([\s\S]*?)<\/script>/g;
const CHARSET = '<meta charSet="utf-8"/>';

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith(".html")) yield path;
  }
}

let pages = 0;
for await (const file of htmlFiles(OUT)) {
  const html = await readFile(file, "utf8");
  if (html.includes('http-equiv="Content-Security-Policy"')) continue;
  if (!html.includes(CHARSET)) throw new Error(`${file}: no ${CHARSET} to anchor the CSP meta tag`);

  const hashes = new Set();
  for (const [, attrs, body] of html.matchAll(INLINE_SCRIPT)) {
    if (/\stype="application\/(ld\+)?json"/.test(attrs)) continue;
    hashes.add(`'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`);
  }

  const policy = ["script-src 'self'", ...hashes].join(" ");
  const meta = `<meta http-equiv="Content-Security-Policy" content="${policy}"/>`;
  // Right after the charset, ahead of every script, so it governs them all
  await writeFile(file, html.replace(CHARSET, CHARSET + meta));
  console.log(`${file}  ${hashes.size} inline script hash${hashes.size === 1 ? "" : "es"}`);
  pages++;
}

if (!pages) throw new Error(`no HTML pages found in ${OUT}/`);
