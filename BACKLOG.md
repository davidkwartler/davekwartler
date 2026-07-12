# Site Backlog

Groomed 2026-07-03. Three buckets: **Do now** (unblocked, build this session),
**Do later** (blocked on David or done together), **Backlog** (parked ideas).
Within each bucket, items are ranked by effort, cheapest first — effort ≈
Claude tokens: S (a few edits), M (a component's worth), L (multi-file or
iteration-heavy), XL (its own project).

Shipped 2026-07-02: single-page scroll redesign (galaxy hero, horizontal career
timeline, 3-photo Human section, contact galaxy) — merged to main and live.

Batch shipped 2026-07-03 (branch timeline-mobile-map → main): timeline switcher
polish, mobile type/layout pass, /travel map easter egg, hero/contact mobile
type scale, URL scheme + vercel.json redirects. All live.

Batch shipped 2026-07-03 (branch career-timeline-redesign → main): full career
timeline rework — click/keyboard switching, elevated detail card, phased-outline
rail, blue selected glow, progress-gated white glow, pause-aware binary stream.
All live.

Batch shipped 2026-07-11 (branch travel-moon → main): globe stopped clipping
on wide/laptop screens (canvas now spans the full viewport instead of a
min-axis square, so it bleeds real screen edges at any resolution). Tried a
lunar-phase moon feature (glowing point + cast light on the globe), iterated
on it, then killed it entirely — wasn't landing. Added a faint background
star field instead (StarField.tsx): 80 stars (half the homepage galaxy's
count), rejection-sampled outside the globe's circular footprint since the
globe's ocean fill is mostly transparent between glyphs (z-index alone isn't
enough to hide a star there). Fixed via a Fable-agent-diagnosed stacking-
context bug — travel/page.tsx's <main> needed `isolate` so its own opaque
background didn't paint over the star canvas. All live.

Batch shipped 2026-07-10 (branch travel-globe → main): Travel map v2 — the flat
/travel map became an orthographic binary-glyph globe. Electric-blue 0/1
continents (Fibonacci point field re-projecting the existing land mask), orange
triangle pins that hide on the back hemisphere, night-vision palette. Very slow
idle wobble constrained to the Atlantic face (never shows the empty Pacific
back); grab-and-drag within that envelope; hover/tap a city → globe freezes and
a field-notes card opens. Hover push-in (1.12x) anchored on the city, ease-in-out,
0.4s in / 0.6s out. Immersive single-screen page (globe bleeds the edges, "Where
I've been" eyebrow up top, back-link pinned bottom by the pause button). Hidden
/travel link moved from the Paris caption to the "Travel" label. Card clamps to
the viewport for edge pins. All live. Still open: field notes for the 15
pending pins.

Batch shipped 2026-07-10 (branch hero-load-flash → main): fixed the page-load
flash — hero name/tagline/intro were Motion components with initial opacity:0,
so the static HTML shipped them invisible and they only appeared after the JS
bundle hydrated (a visible pop-in on production latency). Moved the entrance to
a pure CSS @keyframes (hero-rise, same EASE/16px/0.5s, staggered delays) that
runs at first paint independent of JS, with a prefers-reduced-motion override.
Fable-agent verified: PASS, endorsed the CSS approach over the alternatives.

Batch shipped 2026-07-06 (branch polish-opus-arch-ux → main): image weight
cut ~85% (About photos → 800px WebP with EXIF orientation applied, OG card →
JPEG);
career rail a11y finished (tabpanel wiring, Home/End) and mobile cell
alignment fixed (logo/year pinned rows); scrollspy consolidated into
useActiveSection (SkipArrow no longer hardcodes section ids) and the two lint
errors on main fixed; canvas rAF/IntersectionObserver/pause scaffolding
extracted to useCanvasLoop (galaxy + travel map); shared EASE + SectionHeading;
Motion useScroll dev warning silenced (html position: relative). Verified in
preview: desktop + mobile, career keyboard nav, pause freeze, travel map
click-cards, clean console, clean build/lint/tsc.

## Shipped 2026-07-03 (career timeline redesign)

- ✅ Switching reworked — hover-to-select dropped (it was the jumpy part; now a
  brighten-only cue) in favor of click + arrow-key roving tabindex, so touch and
  desktop behave identically. The old sliding active ring (shared `layoutId`
  spring) was replaced by a crossfading glow/rim on the selected logo — nothing
  travels across the rail anymore
- ✅ Detail panel → elevated card — lifted bg (`bg-white/[0.03]`), border,
  top-highlight line + soft corner glow, logo+title header with dates as a
  JetBrains-mono pill, bullets got dot markers echoing the rail, certification
  became a check-icon badge. Content still centralized (resume.ts / content.ts)
- ✅ Rail → phased outline (David's pick from a 4-option mockup) — one bordered
  rounded container split into 4 `divide-x` cells; picking a cell lights it.
  Fixed the date-gap bug: dropped `min-h-[2lh]` (it reserved 2 lines so
  single-line names like CVP left dead space above the year); cells now
  vertically center their logo/name/year, tolerant of wrapping on mobile
- ✅ Personality layer — blue glow (`#60a5fa`) on the selected cell (radial +
  logo halo + rim shadow, white rim kept for definition); progressive white
  glow gated to *reached* cells only (fills the whole box, brightens toward the
  active one, dark for anything ahead); a flowing 0/1 binary stream ("DK MCP" in
  ASCII) clipped to the progress fill, brightest at the leading edge. Three
  coordinated left→right signals (underline, glow, stream) all point at "now".
  Called the stopping point — at the tasteful-maximalism ceiling, don't garnish
- ✅ Binary stream behaves — 108s slow drift (David: "don't want people motion
  sick"); respects the pause-motion button via the shared `galaxy-pause` store
  and reduced-motion; content overflows the bar ~6× so reselecting a phase never
  makes the stream "catch up"; `initial={false}` so it loads full on Expedia.
  Animation set via longhand props (not the `animation` shorthand) to avoid
  React's shorthand-vs-`animationPlayState` rerender warning
- ✅ GW entry relabeled — rail node "GW University", card org "The George
  Washington University School of Business"
- ✅ Verified live in preview: Expedia default fills the whole bar on load; GW
  select gates the glow to one cell and clips the binary to 25%; pause freezes
  the stream; no console errors. Iteration knobs if wanted: blue strength
  (`0.16`/`0.30`), stream brightness (`text-white/35`), speed (`108s`)
- ✅ Card height floor lowered `min-h-[300px]` → `min-h-[160px]` — the GWU card
  (no bullets) was over-padded; now sizes to content (~233px) while the floor
  still prevents a collapse flash mid-transition

## Shipped 2026-07-03

- ✅ Galaxy accent colors — hero orange/pink, contact blue/green, blended
  into the galactic plane as one smooth gradient
- ✅ Flipped contact galaxy (mirror of the hero, not a copy)
- ✅ Pause-motion button (bottom right, persists via localStorage)
- ✅ Pause galaxy when offscreen (IntersectionObserver stops the rAF loop)
- ✅ Shooting star — welcome meteor ~3s after load, then every ~2.5-4.5 min,
  hero only
- ✅ Binary easter eggs — DK / MCP / OIDC, embedded in bright patches of the
  0/1 wave. Dev hook: `__galaxy[0].meteor()` / `.egg("DK")`
- ✅ Tighter anchor-nav landings (~40px under the nav)
- ✅ Footer rework — socials (icon + wordmark) moved to footer; back-to-top
  with up chevron at the bottom of the contact section
- ✅ Skip-to-next-section arrow (persistent, bounces on hero only)
- ✅ og.png refresh — galaxy render with grey-ring headshot
- ✅ Favicon refresh — white DK on dark grey (nebula version rejected)
- ✅ Dev-warning fixes (LCP eager nav avatar, Motion scroll-offset warning)
- ✅ Vercel Analytics — verified it was never actually enabled (no package, no
  script on the live site); wired `@vercel/analytics` into the root layout,
  David enabled it in the dashboard
- ✅ Public-surface scan — no disclaimer needed yet (no editorial content;
  revisit when the Writing section ships). Findings: internal dollar figures
  in the Expedia bullets ($400M portfolio, $3M EBITDA, $15M/$4M value attrib,
  1% conversion) plus a NAVER Pay namedrop; toning down folded into the
  copy pass under Do later
- ✅ Skills section killed — chips folded into the four timeline detail
  panels per David's mapping; certifications moved into GM (SAFe PO/PM) and
  CVP (PSM I) panels; standalone Skills + Certifications blocks removed.
  GWU carries Product Strategy, Collaboration, Communication (David kept
  the soft skills after Claude trial-cut them)
- ✅ Custom 404 — binary galaxy field, "401: you don't have permission to be
  here... kidding" copy, OAuth-flavored error label, "Request a valid scope"
  home button. Has the site header and footer; nav anchors switched from
  #section to /#section so they work from any path
- ✅ Expedia dollar figures collapsed to relative phrasing — $400M portfolio
  → "nine-figure", $15M/$3M/$4M → "multi-million-dollar"/"millions";
  percentages kept. David OK'd naming NAVER Pay and ChatGPT, so those stay
- ✅ Full copy pass (done together, on branch) — hero: "travel-tech PM" +
  "I build identity and authorization products for AI agents with OAuth.";
  section heading system What I do / Where I've been / Who I am with
  headings "Identity, consent, and AI agents." / "Consulting, electric
  cars, and travel tech." / "Chasing momentum and catching eighty shows a
  year."; Who I am intro rewritten (vinyl collection is the receipt, gravel
  bikes, festivals, Rey kicker); career summaries and bullets first-personed
  with resume verbs intact. Kept deliberately: card 02 cute line, boring
  footer. Headshot grey ring: rejected, dropped from backlog
- ✅ Content refactor — all rendered copy centralized in src/data/content.ts;
  resume.ts slimmed to careerEntries with timeline presentation data; dead
  summary/careerBackground deleted; Career.tsx lookup scaffolding removed
- ✅ Contact copy rework — "Say hi." → "Get in touch."; "Email is the
  fastest way to reach me. I read everything." → "Work, AI agents, or the
  Porsche. All fair game.", then revised work-only per David: "Identity,
  authorization, AI agents, or anything tech. All fair game." (no Porsche
  in the contact section)
- ✅ Header tabs renamed — Home / Work / Career / About / Contact (David's
  call: boring but straightforward)
- ✅ Photo order rebalanced — Travel / Wellness / Motorsports, bright-dark-
  bright with the skyline in the staggered middle slot (drift values stay
  positional)
- ✅ Austin skyline brightness — 15% CSS lift (brightness-[1.15]) on that
  img only; drop the imgClass in Human.tsx to revert
- ✅ New Human-section photos — Ricoh shots landed: Porsche (DAVID plate),
  Musée d'Orsay hall, Austin skyline from Lady Bird Lake. Third caption
  changed Fitness → Wellness. Captions are now bold label + description
  ("Travel / Visiting the Musée d'Orsay in Paris"). Note: David first said
  l'Orangerie, but the photo's exhibition banner (M'O, "Le travail") is
  Orsay's, so Orsay it is. Compressed to 1600px max
  (EXIF orientation preserved; do NOT pixel-rotate these, browsers handle it)
- ✅ Image cleanup — killed unused david-chicago/falcons/seattle JPGs and
  identiverse.jpg, plus the three replaced photos (corvette, david-nyc,
  bike-austin). Confirmed no resume PDF was ever in the repo
- ✅ Sitemap question resolved — fragment URLs (/#career) aren't allowed by
  the sitemap protocol (Google strips them); section-level discovery already
  works via in-page anchors and nav links. Sitemap stays root-only
- ✅ Headshot ring (un-rejected) — thin static 2px silver ring around the hero
  headshot, conic gradient brighter at top like overhead light. Colored
  rotating version tried and killed ("reads Instagram story")
- ✅ Body-font bug fix — body { font-family: var(--font-sans) } referenced a
  variable Tailwind v4's @theme inline never emits at runtime, so the site
  had been rendering the OS system font, never Geist. Now points at the
  next/font variable directly
- ✅ Font brainstorm → shipped palette C — sans: Schibsted Grotesk (body,
  nav, UI), mono: JetBrains Mono (eyebrow labels, card numbers), Playfair
  Display unchanged (hero name + headings). Geist/Geist Mono removed.
  Runners-up: Instrument Sans (A), Hanken Grotesk (B), compared live via a
  temporary FontTrial switcher (deleted after the decision)
- ✅ Photo credit line — "Shot by me on a Ricoh GR IV." under the Who I am
  photo grid, tiny JetBrains Mono like EXIF data
- ✅ Career timeline switcher polish — active ring now slides between logos
  (shared layout element, spring), gradient progress fill along the track,
  direction-aware panel transitions with a slight blur, brightened active
  year, visible keyboard focus ring
- ✅ Mobile optimization pass — audited every section at 375px and 320px
  plus tablet: no horizontal overflow anywhere, menu/photos/contact/404 all
  clean. One real defect found and fixed: timeline year labels misaligned
  when a node name wrapped to two lines (min-height on the label block)
- ✅ URL scheme cleanup — consistent 1:1 path↔anchor mapping
  per David: anchors renamed #top→#home and #what-i-do→#work; vercel.json
  now 308-redirects /home /work /career /about /contact to their anchors,
  replacing the old JS-redirect stub pages for /work /about /resume (all
  three deleted; /resume gets no redirect and 404s — David's call). Fixes
  /contact and /career 404ing, and /work pointing at #career
- ✅ Travel map easter egg v1 — /travel page, world map drawn
  from 0/1 glyphs on canvas by sampling a 720x360 land bitmask generated
  from world GeoJSON (scripts/gen-landmask.mjs → src/data/land-mask.ts, no
  runtime image sampling). 20 cities from the spec: 5 with field-note cards
  (warm glow), 15 pending (violet glow, "Field notes coming soon.").
  Hover or tap opens the card; map scrolls horizontally on phones so tap
  targets stay usable; noindex, off sitemap and nav; respects pause-motion
  and reduced motion. Door: the Travel photo caption in Who I am links to
  /travel. Iteration knobs for David: land glyph brightness, glow sizes,
  page copy

Batch shipped 2026-07-11 (branch travel-fixes → main): travel card bug fixes
(sr-only zero guard, hover-onto-card no longer dismisses, pin-anchored card
sizing so cards never scroll unless they truly can't fit), kind icons
(food/museum/music/activity) with a fixed display order, signpost day-trip
icon, real field notes in David's voice for every highlight (no more
placeholders), Blanton added to Austin, WWII Museum to New Orleans, LA pin
removed (not visited yet), README rewritten in full.

Batch 2026-07-12 (branch landing-offsets): section landing offsets fixed —
Career and Who I am got `-scroll-mt-20` (cancels the global 5rem
scroll-padding, heading lands ~80px higher); Contact got `-scroll-mt-20`
plus `py-36` → `pt-36 pb-16`, so the anchor landing clamps to the page
bottom and the footer is fully visible on arrival. Verified numerically in
preview (Browser-pane screenshots go black when scrolled — capture quirk,
DOM confirmed fine).

- ✅ Google Search Console re-indexing — done by David (2026-07-12)

## Do now

(empty)

## Do later

- **(S) Resume PDF download link** — blocked: David to provide the PDF. Add a
  "Download resume (PDF)" link in the career section
- **(L) Hero animation experiments**: first pass done 2026-07-03 (subtle
  orange/pink accents); keep for further glow/color iteration with David in
  preview if he wants more

## Backlog

- **(S) Live-music photo for Who I am**: music is David's #1 identity piece
  and the heading stakes eighty shows a year, but no photo shows it —
  consider swapping the skyline (or adding a fourth slot) when he has a
  good live-show shot
- **(S) Rey easter egg**: konami code shows the cat
- **(S) Reveal robustness** — the below-fold `Reveal` sections still ship at
  `opacity:0` and wait for JS to fade in (same class of issue the hero-load-flash
  branch fixed for the hero). Not a visible bug today: they're below `min-h-svh`
  so the JS bundle lands before you scroll to them. Belt-and-suspenders fix (for
  slow-3G fast-scrollers / no-JS): convert `Reveal` from Motion `whileInView`
  to a small IntersectionObserver + CSS-class pattern. Separate change, real
  test surface — not worth folding into anything else
- **(M) OAuth consent screen easter egg**: first-visit parody consent dialog
  ("davidkwartler.com would like to access: your scroll position, your good
  opinion, your vibes"). On-brand for identity work
- **(M) /now page**: currently building, reading, listening to
- **(L) Travel map v2 — globe**: rotatable globe instead of the flat map,
  blue landmass glyphs, orange triangle pins, and strip the page text down to
  a single "Where I've been" eyebrow. Full feedback in the Travel spec section
  below (David's direction, 2026-07-03)
- **(L) Now playing (Spotify)** in the footer — needs a serverless function
  (static export can't hold the Spotify token)
- **(L) Writing section (MDX)**: short essays on agentic authorization
- **(XL) David Kwartler AI ("chat with David")** — full spec below

## Ruled out (privacy boundary, 2026-07-01)

Personal-data dumps stay off the professional site. Kept here in case David
changes his mind (the travel map survived as a hidden noindex page):

- Vinyl collection page (Discogs grid)
- Concert log (~80 shows/year timeline or map)
- Track day telemetry (HP Tuners lap/dyno visualizations)

---

## Spec: Travel map easter egg (elaborated 2026-07-02; v1 built 2026-07-03)

V1 shipped on branch — see Shipped 2026-07-03. Still open from the spec:
field notes for the 15 pending pins (table below tracks what David has
provided so far).

### v2 — David feedback (2026-07-03)

Next iteration on the shipped v1. "Good but not perfect." David's direction:

- **Cut the page text.** Remove the intro paragraph and the large `<h1>` so the
  map fills more of the page. Keep only the small JetBrains-mono eyebrow label,
  relabeled "Where I've been" (today the eyebrow is "Travel" and the big
  heading is "Where I've actually been." — travel.ts `label` / `heading` /
  `intro`). Less text also helps the page not feel blank.
- **Flat map → interactive globe.** Render the binary landmass on a rotatable
  sphere; mousing over rotates the globe. A globe fills the mostly-blank page
  better than the flat projection, since David has only been to North America
  and Europe (a flat map leaves a lot of empty ocean).
- **Recolor the landmass glyphs blue.** The 0/1 glyphs are "good but not great"
  today — move them to blue.
- **Pins → orange triangles.** Visited-city marks become orange triangles
  instead of glowing "1" glyphs, so they read as a distinct shape + color
  against the blue landmass.

Effort: L. Globe = 3D projection + rotation interaction replacing the flat-map
canvas sampling in `TravelMap.tsx`; the land-mask data (`src/data/land-mask.ts`)
can likely be re-projected onto the sphere rather than regenerated. Open at
build time: keep the hover/tap city cards, mapped onto globe coordinates and
hidden when a pin rotates to the back face.

Hidden page: clicking the "Travel" photo caption in the Human section opens a
standalone interactive world map.

- **Design**: black background; continents drawn entirely from the glowing 0/1
  binary glyphs (same visual family as the galaxy field). Destination cities
  glow brighter than the landmass; mousing over one highlights it and reveals
  a small card with food / art / music notes.
- **Route**: /travel — noindex, excluded from sitemap and nav. It's an easter
  egg, and keeping it off the SEO surface fits the personal/professional
  boundary.
- **Implementation sketch**: canvas like GalaxyBackground; sample an
  equirectangular land-mask image against the glyph grid to decide which
  cells are "land", so it stays static-export friendly. Tap targets need to
  work on mobile too (tap = hover).

City cards so far (David's notes):

| City | Food | Art | Music |
|---|---|---|---|
| Washington DC | HipCityVeg | Hirshhorn (best art museum) | Porter Robinson at Glow fest |
| London | Mallow | Tate Modern | Hamilton |
| Paris | Breathe, or Le Potager de Charlotte | Le Défilé Renault carwalk | Daft Punk on vinyl |
| Brussels | Vegan chocolate anywhere | Magritte Museum | — |
| Amsterdam | — | Moco Museum | — |

Pins mapped but awaiting details from David: New York, Los Angeles, Chicago,
Boston, Quebec, Ottawa, Nova Scotia, New Hampshire, Las Vegas, Seattle,
Nashville, Italy, and Texas (Austin, Dallas, San Antonio).

## Spec: David Kwartler AI ("chat with David")

A chatbot on the site that lets visitors chat with an AI David — Claude API with a
basic system prompt plus context about him (resume, about, site voice). Heavy rate
limits.

- Architecture: the site is a static export, so the API key can't live in the
  frontend. Needs a small serverless function (Vercel Edge Function alongside the
  static site, or a separate tiny worker) that holds the key, injects the system
  prompt, and enforces limits.
- Rate limiting: aggressive — per-IP token bucket + small daily global cap so a
  viral moment can't run up the bill. Hard cap on response length and turns per
  session.
- System prompt: persona from site content only; deflect anything private,
  no partner namedrops (same content rules as the site), redirect
  serious inquiries to email/LinkedIn.
- Prompt-injection hygiene: treat all user input as untrusted; no tools, no
  browsing, nothing to exfiltrate. It only talks.
- On-brand touch: the chat could open with a consent-screen joke ("David AI
  requests access to: this conversation").
