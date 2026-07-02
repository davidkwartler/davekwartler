# Single-Page Redesign — Handoff Doc

Status: approved for prototyping. Written 2026-07-01 before context compaction.
Read this fully before building. Companion files: BACKLOG.md (parked ideas),
memory files (voice rules, privacy boundary).

## Goal

Rebuild davidkwartler.com as a single-page scroll narrative that demonstrates
craft: the site itself is the proof of "PM who builds." Personality comes from
design, motion, and microcopy — NOT personal-data features (privacy boundary:
no vinyl/concert/telemetry data on this professional site).

## Design direction (David's explicit taste, 2026-07-01)

- **Base look: Linear.app** — black and white, minimalist, professional.
  David: "LOVE... reminds me of my moonswatch." Monochrome neutrals are the
  foundation. Glow used as hierarchy, not color splash.
- **Motion quality: rauno.me** — invisible details, physically plausible
  micro-interactions, restraint reads as confidence. Every interactive element
  acknowledges hover/press/focus.
- **Personality: joshwcomeau.com** — playful details and warmth, but applied
  onto the monochrome base sparingly (a restrained accent moment, delightful
  microcopy). Resolve the monochrome-vs-color tension in favor of monochrome;
  personality shows in behavior more than hue. Tune with David in preview.
- **One scroll-scrubbed "Apple moment" only.** Chosen concept (David's idea):
  the profile photo starts large and centered in the hero, and as you scroll it
  shrinks and travels into the sticky nav header, landing as the small round
  avatar (mirrors the current multi-page behavior where the headshot appears in
  the nav on non-home pages). Scrubbed by scroll position, reversible, smooth.
- **Rejected:** wattenberger.com scrollytelling ("not impressed"). No
  section-to-section narrative handoffs; sections stack cleanly.

## Page structure (5 acts, single route "/")

1. **Hero** — full viewport. Name, tagline ("Identity nerd, agentic-travel PM,
   occasional race car driver" + "I design how AI agents get permission to act
   for you. Also: Porsche, vinyl, and a cat named Rey."), large centered
   headshot (the scrub element), scroll cue. Current aurora background exists
   (HeroBackground.tsx) but must be re-skinned toward monochrome: desaturate to
   grays/whites with faint cool tint; keep the noise + vignette.
2. **What I do** — three statement cards: identity connectivity / AI agent
   authorization / builder. Copy exists in src/data/resume.ts
   (careerBackground). Staggered reveal, mouse-tracking glow border on hover
   (Linear trick, white glow not colored).
3. **Career** — port the existing timeline from src/app/work/page.tsx
   (logo nodes, connecting line, dates right, one-line summary, expandable
   Highlights via native <details>). Add: entries fade/rise in on scroll;
   optionally the connecting line draws in (CSS scroll-driven if cheap; skip if
   it competes with the headshot scrub — ONE scrubbed moment max).
4. **Human** — one tight personal paragraph (distill from
   src/app/about/page.tsx prose) + 3 photos max (photo culling: pick from
   public/ — one racing (corvette.jpg), one travel (david-nyc.JPG or
   david-chicago.JPG), one Austin (bike-austin.jpg or identiverse.jpg)).
   Gentle parallax drift. Rey deserves a mention in copy.
5. **Say hi** — big type, email + LinkedIn + GitHub, magnetic hover button.
   Footer stays minimal (existing Footer.tsx content).

**Nav:** sticky glass bar (backdrop-blur), scrollspy with sliding active
indicator, sections: Home/What I do/Career/About/Contact (labels can be
tighter). Avatar lands here from the hero scrub. Keep LinkedIn + GitHub icons
(src/components/icons.tsx).

## Motion rules (non-negotiable)

- Animate transform/opacity only (compositor-friendly).
- Reveals: once, 300-500ms, 16-24px rise, 50-80ms sibling stagger, settle fast;
  nothing still moving when reading starts.
- Interactive motion: springs (Motion lib), not duration curves.
- Exactly one scroll-scrubbed moment (headshot-to-nav).
- Respect prefers-reduced-motion everywhere (existing HeroBackground shows the
  pattern with useReducedMotion).
- Motion v12 is installed ("motion" package, import from "motion/react").
  Prefer CSS scroll-driven animations where they're simpler.

## Tech constraints & current state

- Next.js 16 app router, React 19, Tailwind CSS 4, TypeScript. Static export
  (`output: "export"` in next.config.ts, images unoptimized) — no server
  features. Deploys on push to main (Vercel serves /out).
- Repo: davidkwartler/davekwartler, local clone at ~/Desktop/davekwartler.
- Current routes: / (hero), /about, /work (timeline, merged resume),
  /resume (client-redirect stub to /work). All copy lives in
  src/data/resume.ts + about/page.tsx.
- SEO was just optimized — DO NOT regress: keep metadata in layout.tsx
  (OG image /og.png, JSON-LD Person, sitemap.ts, robots.ts, icons). After
  redesign: /work and /about become thin client-redirect stubs to /#career and
  /#about (same pattern as current /resume stub), update sitemap.ts to just /.
- Images already compressed (public/, max 1600px). Headshot: dk-headshot.jpg
  (512px). Fonts: Geist sans/mono + Playfair Display (display headings).
- Dev preview: .claude/launch.json at ~/Desktop defines "site-dev"
  (cd davekwartler && npm run dev, port 3000).

## Content rules (from memory, apply to any new copy)

- No em dashes. Concise, matter-of-fact, anti-hype.
- No Gen AI partner namedrops in site copy generally; EXCEPTION: resume
  highlights may say "Gen AI integrations like ChatGPT and Claude" and tool
  names (Figma Make, Claude Code, Codex). Alexa+/Gemini/Meta AI never.
- Hero tagline is approved verbatim (its em dash is allowed, David approved it).

## Build plan

1. Branch: `redesign/single-page` (do NOT push to main until David approves in
   preview).
2. Build order: monochrome re-skin of HeroBackground → single-page scaffold
   with all 5 acts static → glass scrollspy nav → reveals/stagger → headshot
   scrub → glow borders/micro-interactions → redirect stubs + sitemap.
3. Verify continuously with the preview server (site-dev) + screenshots;
   check mobile viewport (preview_resize) and prefers-reduced-motion.
4. `npm run build` must pass (static export) before showing final state.
5. Definition of done for prototype: David scrolls it in preview and signs off;
   then merge to main.

## Open questions to resolve with David during prototyping

- How monochrome is the hero? (Full grayscale aurora vs. faint cool tint.)
- Where does the single restrained accent color appear, if anywhere?
- Which 3 photos make the cut (his call on candidates above).
- Nav label set.
