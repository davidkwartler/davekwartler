# Site Backlog

Groomed 2026-07-03. Three buckets: **Do now** (unblocked, build this session),
**Do later** (blocked on David or done together), **Backlog** (parked ideas).
Within each bucket, items are ranked by effort, cheapest first — effort ≈
Claude tokens: S (a few edits), M (a component's worth), L (multi-file or
iteration-heavy), XL (its own project).

Shipped 2026-07-02: single-page scroll redesign (galaxy hero, horizontal career
timeline, 3-photo Human section, contact galaxy) — merged to main and live.

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

## Do now


## Do later

- **(S) Resume PDF download link** — blocked: David to provide the PDF. Add a
  "Download resume (PDF)" link in the career section
- **(S) Google Search Console revisit**: already set up (David did the
  verification). Post-redesign: submit the sitemap, confirm old /work and
  /about URLs re-index to the single page
- **(M) Career timeline switcher polish**: the UI for switching between the
  four stops works but could be more solid, fluid, and beautiful — motion,
  active states, transitions between detail panels (David, 2026-07-02)
- **(L) Hero animation experiments**: first pass done 2026-07-03 (subtle
  orange/pink accents); keep for further glow/color iteration with David in
  preview if he wants more

## Backlog

- **(S) Live-music photo for Who I am**: music is David's #1 identity piece
  and the heading stakes eighty shows a year, but no photo shows it —
  consider swapping the skyline (or adding a fourth slot) when he has a
  good live-show shot
- **(S) Rey easter egg**: konami code shows the cat
- **(M) OAuth consent screen easter egg**: first-visit parody consent dialog
  ("davidkwartler.com would like to access: your scroll position, your good
  opinion, your vibes"). On-brand for identity work
- **(M) /now page**: currently building, reading, listening to
- **(L) Now playing (Spotify)** in the footer — needs a serverless function
  (static export can't hold the Spotify token)
- **(L) Writing section (MDX)**: short essays on agentic authorization
- **(XL) Travel map easter egg** — full spec below
- **(XL) David Kwartler AI ("chat with David")** — full spec below

## Ruled out (privacy boundary, 2026-07-01)

Personal-data dumps stay off the professional site. Kept here in case David
changes his mind (the travel map survived as a hidden noindex page):

- Vinyl collection page (Discogs grid)
- Concert log (~80 shows/year timeline or map)
- Track day telemetry (HP Tuners lap/dyno visualizations)

---

## Spec: Travel map easter egg (elaborated 2026-07-02)

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
