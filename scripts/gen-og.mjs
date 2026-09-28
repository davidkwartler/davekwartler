// Renders the link-preview card (public/og.jpg, 1200x630) from an HTML
// template, so the image LinkedIn, Slack and iMessage show stays in step
// with the site's copy and look.
//
//   npm run build && node scripts/gen-og.mjs
//
// Needs a build first: the card borrows the site's own fonts from out/.
// Uses Playwright's Chromium (CHROMIUM_PATH points at a preinstalled one).
// Copy comes from src/data/content.ts by hand below; update both together.

import { readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "out");
const HOST = "http://og.local";

const card = {
  name: "David Kwartler",
  tagline: "Identity nerd, travel-tech PM, occasional race car driver",
  line: "Account linking for Expedia's loyalty and AI partners",
  meta: "Product at Expedia · Austin, TX",
  url: "davidkwartler.com",
};

const css = readdirSync(path.join(out, "_next/static/chunks"))
  .filter((f) => f.endsWith(".css"))
  .map((f) => `<link rel="stylesheet" href="${HOST}/_next/static/chunks/${f}">`)
  .join("\n");

// The favicon's star geometry, without its dark backdrop
const star = (size) => `
<svg viewBox="0 0 64 64" width="${size}" height="${size}" style="display:inline-block">
  <defs><radialGradient id="g${size}">
    <stop offset="0" stop-color="#D3C7FD" stop-opacity=".96"/>
    <stop offset=".32" stop-color="#9B7EF8" stop-opacity=".56"/>
    <stop offset=".66" stop-color="#7C3AED" stop-opacity=".25"/>
    <stop offset="1" stop-color="#6D28D9" stop-opacity="0"/>
  </radialGradient></defs>
  <circle cx="32" cy="32" r="29" fill="url(#g${size})"/>
  <path d="M32 9 L37.7 32 L32 55 L26.3 32 Z" fill="#fff" fill-opacity=".92"/>
  <path d="M3 32 L32 27.1 L61 32 L32 36.9 Z" fill="#fff" fill-opacity=".92"/>
  <circle cx="32" cy="32" r="7.2" fill="#fff"/>
</svg>`;

const html = `<!doctype html><html><head><meta charset="utf-8">${css}
<style>
  html,body{margin:0}
  body{width:1200px;height:630px;overflow:hidden;background:#07060b;color:#ededed;
    font-family:"Schibsted Grotesk",system-ui,sans-serif;position:relative}
  canvas{position:absolute;inset:0}
  .copy{position:absolute;left:80px;right:420px;bottom:88px}
  .meta{display:inline-flex;align-items:center;gap:10px;font:500 20px "JetBrains Mono",monospace;
    color:#c9cbd1;border:1px solid rgba(255,255,255,.16);border-radius:999px;padding:9px 20px 9px 16px;
    background:rgba(10,10,10,.5)}
  .dot{width:9px;height:9px;border-radius:50%;background:#34d399;box-shadow:0 0 10px #34d399}
  h1{font:700 80px/1 "Playfair Display",Georgia,serif;letter-spacing:.015em;color:#fff;margin:30px 0 22px;white-space:nowrap}
  h1 svg{vertical-align:baseline;margin-left:4px}
  .tag{font-size:26px;white-space:nowrap;color:#d1d5db;margin:0}
  .line{font-size:23px;color:#9ca3af;margin:12px 0 0}
  .url{position:absolute;left:80px;top:62px;font:500 20px "JetBrains Mono",monospace;color:#8b91a0;letter-spacing:.04em}
  .photo{position:absolute;right:90px;top:50%;transform:translateY(-50%);width:270px;height:270px}
  .photo::before{content:"";position:absolute;inset:-90px;border-radius:50%;
    background:radial-gradient(circle,rgba(196,181,253,.22),transparent 62%)}
  .photo img{position:relative;width:270px;height:270px;border-radius:50%;display:block}
  .ring{position:absolute;inset:-8px;border-radius:50%;
    background:conic-gradient(from 0deg,rgba(255,255,255,.55),rgba(255,255,255,.14) 50%,rgba(255,255,255,.55));
    -webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 2px),#000 calc(100% - 2px))}
</style></head><body>
<canvas id="sky" width="1200" height="630"></canvas>
<div class="url">${card.url}</div>
<div class="photo"><div class="ring"></div><img src="${HOST}/dk-headshot.jpg" alt=""></div>
<div class="copy">
  <span class="meta"><span class="dot"></span>${card.meta}</span>
  <h1>${card.name}${star(34)}</h1>
  <p class="tag">${card.tagline}</p>
  <p class="line">${card.line}</p>
</div>
<script>
  // A still of the site's galaxy: diagonal violet band, warm and cool
  // accents at its ends, seeded stars, and a faint corner of 0/1 glyphs.
  const c=document.getElementById("sky").getContext("2d");
  let s=7;const r=()=>(s=(s*16807)%2147483647)/2147483647;
  c.fillStyle="#07060b";c.fillRect(0,0,1200,630);
  c.globalCompositeOperation="lighter";
  const band=(x,y,rad,sx,sy,rot,col,a)=>{c.save();c.translate(x,y);c.rotate(rot);c.scale(sx,sy);
    const g=c.createRadialGradient(0,0,0,0,0,rad);g.addColorStop(0,"rgba("+col+","+a+")");g.addColorStop(1,"rgba("+col+",0)");
    c.fillStyle=g;c.beginPath();c.arc(0,0,rad,0,6.283);c.fill();c.restore();};
  band(640,300,620,2.4,.48,-.32,"139,92,246",.26);
  band(760,250,200,1.3,.75,-.32,"196,181,253",.2);
  band(250,420,420,2,.45,-.32,"251,146,60",.1);
  band(1000,170,380,1.9,.5,-.32,"244,114,182",.1);
  band(150,560,400,1.7,.6,-.5,"99,102,241",.12);
  c.globalCompositeOperation="source-over";
  for(let i=0;i<150;i++){const x=r()*1200,y=r()*630,b=r()<.12,rad=b?1.1+r():.4+r()*.7,a=b?.85:.25+r()*.45;
    c.fillStyle=r()<.25?"rgba(196,181,253,"+a+")":"rgba(255,255,255,"+a+")";c.beginPath();c.arc(x,y,rad,0,6.283);c.fill();
    if(b){c.strokeStyle="rgba(255,255,255,"+a*.35+")";c.lineWidth=.7;c.beginPath();c.moveTo(x-rad*5,y);c.lineTo(x+rad*5,y);c.moveTo(x,y-rad*3.5);c.lineTo(x,y+rad*3.5);c.stroke();}}
  c.font="13px 'JetBrains Mono', monospace";c.textAlign="center";
  for(let y=24;y<260;y+=26)for(let x=24;x<420;x+=26){const d=Math.hypot(x,y)/430;if(d>1)continue;
    c.fillStyle="rgba(255,255,255,"+(.05*(1-d))+")";c.fillText(r()<.5?"0":"1",x,y);}
</script></body></html>`;

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
// Serve out/ to the page without starting a server
await page.route(`${HOST}/**`, (route) => {
  const rel = decodeURIComponent(new URL(route.request().url()).pathname);
  return route.fulfill({ path: path.join(out, rel) });
});
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ type: "png" });
await browser.close();

const jpg = await sharp(png).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
writeFileSync(path.join(root, "public/og.jpg"), jpg);
console.log(`public/og.jpg  1200x630  ${jpg.length} B`);
