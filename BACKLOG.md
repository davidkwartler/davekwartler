# Site Backlog

Groomed 2026-07-12. Active work up top, then a release-note changelog of
everything shipped. Effort ≈ Claude tokens: S (a few edits), M (a
component's worth), L (multi-file or iteration-heavy), XL (its own project).

## Active

- **(XL) David Kwartler AI ("chat with David")** — full spec below
- **(S–M) Link to Sentinel** — nothing on the site points at
  [Sentinel](https://sentinel.davidkwartler.com), the session-hijack detection
  demo ([repo](https://github.com/davidkwartler/sentinel)). It is the most
  substantial thing to show and it is currently undiscoverable from here.
  There is no projects section today — the sections are Hero, WhatIDo, Career,
  Human, Contact — so the first decision is whether this is a line inside
  WhatIDo (S) or a new projects section that could hold future work (M). One
  sentence on what it does, plus links to the live demo and the repo.

## Ruled out (privacy boundary, 2026-07-01)

Personal-data dumps stay off the professional site. Kept here in case David
changes his mind (the travel map survived as a hidden noindex page):

- Vinyl collection page (Discogs grid)
- Concert log (~80 shows/year timeline or map)
- Track day telemetry (HP Tuners lap/dyno visualizations)

Cut in the 2026-07-12 grooming (David's call, restore if wanted): resume PDF
download link, live-music photo for Who I am, Rey konami-code easter egg,
OAuth consent-screen easter egg, /now page, Spotify now-playing footer
widget, Writing section (MDX), further hero animation experiments.

---

## Changelog

### 2026-07-24 — Hero hydration fix (branch fix-hero-hydration)

- Hero galaxy fade: guard the scroll-opacity math against an unmeasured
  viewport (innerHeight 0 made 0/0 = NaN, mismatching the server's 1 and
  logging a dev hydration error). Verified against the live repro

### 2026-07-24 — Travel interactions batch (branch travel-followups)

- Pinned cards (opened by click) get a subtle X top-right to dismiss;
  hover cards stay chromeless
- Arrow keys tour the visible pins west-to-east, wrapping; either arrow
  starts the tour with no card open
- Easter egg: clicking the "Where I've been" eyebrow (plain-text
  affordance) pulls up a random featured city, shuffle-deck so all nine
  appear before any repeat
- Easter egg: clicking the home pin sweeps blue great-circle flight arcs
  from Austin to every featured city
- NH card region relabeled "Lakes Region"; dead pendingNote removed;
  fixed a pre-existing onPointerLeave crash when the pointer exits the
  window

### 2026-07-24 — Travel field note refinement (branch travel-notes-refinement)

- Full refinement pass with David over all 24 cities: AI-written one-liners
  replaced with factual, chill observations in his voice (new tone rule:
  no quippy zingers, no cliché landmarks)
- Thin cities deepened: Amsterdam (+3), Seattle (+2), DC (+2), NYC (+2),
  Boston (+2), Chicago (+1), Vegas (+2), Dallas (+1, now 6), Austin (+1,
  now 6), San Antonio (+1), Brussels (+2), Paris (+2), London (+1)
- "Concourse Project" retitled to The Concourse Project; Meadows Museum
  grammar fix; Breathe / Le Potager de Charlotte split into separate
  entries
- Hero hydration-mismatch bug spotted during verification and logged as a
  new Active item

### 2026-07-12 — Landing offsets, contact spacing, /travel OG, Reveal robustness (branch landing-offsets)

- Reveal robustness: `Reveal` converted from Motion `whileInView` to an
  IntersectionObserver + CSS-class pattern. Content now ships visible in
  the static HTML (no-JS / pre-hydration safe); after hydration only
  elements still below the viewport are hidden, and IO reveals them with
  the same 20px/0.45s/EASE rise. Fail-visible guard: if IO's initial
  callback never arrives within 1s, everything un-hides (verified live —
  the Browser pane's IO happened to be broken, and the guard did its job).
  Animated path unverifiable in the pane that day (environment bug);
  eyeball on a real browser before shipping
- /travel got its own explicit OG/twitter metadata (reusing the homepage
  og.jpg card, correct URL) so link previews stop falling back to
  snapshotting the blank-without-JS canvas page — root cause of the grey
  RCS preview card

- Section landing offsets fixed: Career and Who I am got `-scroll-mt-20`
  (cancels the global 5rem scroll-padding, heading lands ~80px higher);
  Contact got the same plus `py-36` → `pt-36 pb-16`, so the anchor landing
  clamps to the page bottom and the footer is fully visible on arrival.
  Verified numerically in preview (Browser-pane screenshots go black when
  scrolled — capture quirk, DOM confirmed fine)
- Google Search Console re-indexing finished by David

### 2026-07-11 — Travel polish (branches travel-moon, travel-fixes)

- Globe stopped clipping on wide/laptop screens: canvas now spans the full
  viewport instead of a min-axis square, so it bleeds real screen edges at
  any resolution
- Tried a lunar-phase moon feature (glowing point + cast light on the
  globe), iterated, killed it — wasn't landing. Added a faint background
  star field instead (StarField.tsx): 80 stars, rejection-sampled outside
  the globe's circular footprint. Required a Fable-agent-diagnosed
  stacking-context fix — travel/page.tsx's `<main>` needed `isolate` so its
  opaque background didn't paint over the star canvas
- Travel card bug fixes: sr-only zero guard, hover-onto-card no longer
  dismisses, pin-anchored card sizing so cards never scroll unless they
  truly can't fit
- Kind icons (food/museum/music/activity) with a fixed display order,
  signpost day-trip icon
- Real field notes in David's voice for every highlight city; Blanton added
  to Austin, WWII Museum to New Orleans, LA pin removed (not visited yet)
- README rewritten in full

### 2026-07-10 — Travel globe v2 + hero flash fix (branches travel-globe, hero-load-flash)

- Travel map v2: the flat /travel map became an orthographic binary-glyph
  globe. Electric-blue 0/1 continents (Fibonacci point field re-projecting
  the existing land mask), orange triangle pins that hide on the back
  hemisphere, night-vision palette
- Very slow idle wobble constrained to the Atlantic face (never shows the
  empty Pacific back); grab-and-drag within that envelope; hover/tap a city
  → globe freezes and a field-notes card opens, with a 1.12x push-in
  anchored on the city (0.4s in / 0.6s out)
- Immersive single-screen page: globe bleeds the edges, "Where I've been"
  eyebrow up top, back-link pinned bottom by the pause button; card clamps
  to the viewport for edge pins; hidden /travel link moved from the Paris
  caption to the "Travel" label
- Page-load flash fixed: hero name/tagline/intro were Motion components with
  initial opacity:0, so static HTML shipped them invisible until hydration.
  Entrance moved to pure CSS @keyframes (hero-rise, same EASE/16px/0.5s,
  staggered) that runs at first paint, with a prefers-reduced-motion
  override. Fable-agent verified

### 2026-07-06 — Performance + a11y + architecture (branch polish-opus-arch-ux)

- Image weight cut ~85%: About photos → 800px WebP with EXIF orientation
  applied, OG card → JPEG
- Career rail a11y finished (tabpanel wiring, Home/End) and mobile cell
  alignment fixed (logo/year pinned rows)
- Scrollspy consolidated into useActiveSection (SkipArrow no longer
  hardcodes section ids); the two lint errors on main fixed
- Canvas rAF/IntersectionObserver/pause scaffolding extracted to
  useCanvasLoop (galaxy + travel map); shared EASE + SectionHeading; Motion
  useScroll dev warning silenced

### 2026-07-03 — Career timeline redesign (branch career-timeline-redesign)

- Switching reworked: hover-to-select dropped in favor of click + arrow-key
  roving tabindex, so touch and desktop behave identically; sliding active
  ring replaced by a crossfading glow/rim on the selected logo
- Detail panel → elevated card: lifted bg, border, top-highlight line + soft
  corner glow, logo+title header with dates as a JetBrains-mono pill, dot
  bullet markers, check-icon certification badge. Card height floor lowered
  to `min-h-[160px]` so the GWU card sizes to content
- Rail → phased outline (David's pick from a 4-option mockup): one bordered
  container split into 4 `divide-x` cells; cells vertically center their
  logo/name/year (fixed the date-gap bug from `min-h-[2lh]`)
- Personality layer: blue glow (#60a5fa) on the selected cell; progressive
  white glow gated to reached cells only; a flowing 0/1 binary stream
  ("DK MCP" in ASCII) clipped to the progress fill, brightest at the leading
  edge. 108s drift, respects pause + reduced motion, `initial={false}` so it
  loads full on Expedia. Iteration knobs: blue strength (0.16/0.30), stream
  brightness (text-white/35), speed (108s)
- GW entry relabeled: rail "GW University", card org "The George Washington
  University School of Business"

### 2026-07-03 — Timeline/mobile/travel batch (branch timeline-mobile-map)

- Travel map easter egg v1: /travel page, world map drawn from 0/1 glyphs on
  canvas sampling a 720x360 land bitmask (scripts/gen-landmask.mjs →
  src/data/land-mask.ts, no runtime image sampling). 20 cities: 5 with
  field-note cards, 15 pending. Noindex, off sitemap and nav; respects
  pause-motion and reduced motion. Door: the Travel photo caption
- Mobile optimization pass: audited every section at 375px/320px/tablet; one
  real defect found and fixed (timeline year labels misaligned when a node
  name wrapped)
- URL scheme cleanup: anchors renamed #top→#home, #what-i-do→#work;
  vercel.json 308-redirects /home /work /career /about /contact to their
  anchors, replacing the JS-redirect stub pages (deleted; /resume 404s —
  David's call)
- Career timeline switcher polish (v1, superseded by the redesign above);
  hero/contact mobile type scale

### 2026-07-03 — Copy, content, and galaxy batch (branches galaxy-batch, copy-pass, font-brainstorm)

- Galaxy: hero orange/pink + contact blue/green accents blended into the
  galactic plane; flipped contact galaxy; pause-motion button (persists via
  localStorage); offscreen pause via IntersectionObserver; shooting star
  (~3s after load, then every ~2.5-4.5 min, hero only); binary easter eggs
  DK / MCP / OIDC (dev hook: `__galaxy[0].meteor()` / `.egg("DK")`)
- Full copy pass (done together): hero "travel-tech PM" + OAuth line;
  section heading system What I do / Where I've been / Who I am; Who I am
  intro rewritten (vinyl receipt, gravel bikes, festivals, Rey kicker);
  career copy first-personed. Expedia dollar figures collapsed to relative
  phrasing ("nine-figure", "multi-million-dollar"); NAVER Pay and ChatGPT
  namedrops kept per David
- Content refactor: all rendered copy centralized in src/data/content.ts;
  resume.ts slimmed to careerEntries; dead code deleted
- Skills section killed: chips folded into the four timeline panels;
  certifications moved into GM (SAFe PO/PM) and CVP (PSM I)
- Fonts: body-font bug fixed (site had been rendering the OS system font —
  Tailwind v4 @theme variable never emitted at runtime); palette C shipped —
  Schibsted Grotesk (body/UI), JetBrains Mono (labels), Playfair Display
  (hero + headings); Geist removed
- Custom 404: binary galaxy field, "401: you don't have permission to be
  here... kidding", OAuth-flavored error label, "Request a valid scope"
  home button
- Contact copy: "Get in touch." / "Identity, authorization, AI agents, or
  anything tech. All fair game."; header tabs renamed Home / Work / Career /
  About / Contact
- Photos: new Ricoh shots (Porsche DAVID plate, Musée d'Orsay, Austin
  skyline), Travel/Wellness/Motorsports order, skyline +15% brightness,
  bold-label captions, "Shot by me on a Ricoh GR IV." credit line, unused
  images deleted. EXIF orientation preserved — do NOT pixel-rotate
- Hero headshot: thin static 2px silver conic ring (rotating color version
  killed — "reads Instagram story")
- Footer rework (socials moved down, back-to-top), skip-to-next-section
  arrow, tighter anchor landings, og.png + favicon refresh, Vercel Analytics
  actually wired up, sitemap stays root-only (fragment URLs aren't
  sitemap-legal), public-surface scan (no disclaimer needed yet)

### 2026-07-02 — Single-page redesign (branch redesign/single-page)

- Full rework to a single-page scroll: galaxy hero, horizontal career
  timeline, 3-photo Human section, contact galaxy. Merged to main and live

---

## Spec: David Kwartler AI ("chat with David")

A chatbot on the site that lets visitors chat with an AI David — Claude API
with a basic system prompt plus context about him (resume, about, site
voice). Heavy rate limits.

- Architecture: the site is a static export, so the API key can't live in
  the frontend. Needs a small serverless function (Vercel Edge Function
  alongside the static site, or a separate tiny worker) that holds the key,
  injects the system prompt, and enforces limits.
- Rate limiting: aggressive — per-IP token bucket + small daily global cap
  so a viral moment can't run up the bill. Hard cap on response length and
  turns per session.
- System prompt: persona from site content only; deflect anything private,
  no partner namedrops (same content rules as the site), redirect serious
  inquiries to email/LinkedIn.
- Prompt-injection hygiene: treat all user input as untrusted; no tools, no
  browsing, nothing to exfiltrate. It only talks.
- On-brand touch: the chat could open with a consent-screen joke ("David AI
  requests access to: this conversation").
