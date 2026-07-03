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

## Do now

- **(S) Public-surface scan**: check whether an "opinions are my own, not my
  employer's" disclaimer is needed, and audit all copy for anything
  Expedia-confidential
- **(M) Kill the Skills section**: collapse the flat skills-chip wall into the
  four timeline entries — each job's detail panel shows the skills used there.
  Mapping from David (2026-07-02), covers all 18 skills:
  - Expedia: AI Agent Authorization, Model Context Protocol (MCP), LLM Data
    Privacy & Governance, OAuth 2.0, AI-Assisted Development, Leadership &
    Mentoring
  - GM: Identity & Access Management, OIDC Identity Federation, API Design &
    Documentation, A/B Testing, Stakeholder Alignment & Influence
  - CVP: UI/UX Design, User Research, Data Analysis, Continuous Discovery
  - GWU: Product Strategy, Collaboration, Communication
  - Certifications: Professional Scrum Master I → CVP; SAFe Product Owner /
    Product Manager → GM
  - Open question: GWU's chips are the three softest — consider cutting
    Collaboration/Communication and letting GWU carry Product Strategy alone,
    or moving Product Strategy to Expedia
- **(L) Custom 404 page**: dark page with the binary field; identity-nerd
  joke copy ("401: you don't have permission to be here... kidding, it's a
  404")

## Do later

- **(S) Resume PDF download link** — blocked: David to provide the PDF. Add a
  "Download resume (PDF)" link in the career section
- **(S) New images** — blocked: David to provide Ricoh GR IV shots (Porsche,
  art museum, Austin skyline) for the three Human-section slots. Compress like
  the others (max 1600px); captions Motorsports / Travel / Fitness may need
  revisiting to match
- **(S) Headshot grey outline** — tentative, David not sold: try the grey
  ring from the OG image around the hero headshot; preview against the galaxy
  before committing, easy to drop if it fights the breathing halo
- **(S) Google Search Console revisit**: already set up (David did the
  verification). Post-redesign: submit the sitemap, confirm old /work and
  /about URLs re-index to the single page
- **(M) Header tabs rename** — brainstorm together (current: Home / What I
  do / Career / About / Say hi)
- **(M) Copy pass — add detail everywhere** — do together with David.
  Direction by example: "long bike rides on the Town Lake trail", "I travel
  for vegan food, modern art museums, and good electronic music"
- **(L) Hero animation experiments**: first pass done 2026-07-03 (subtle
  orange/pink accents); keep for further glow/color iteration with David in
  preview if he wants more
- **(L) Font brainstorm**: everything other than the hero name (Playfair) is
  boring; explore alternatives (iteration-heavy)

## Backlog

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
