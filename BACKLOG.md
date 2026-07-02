# Site Backlog

Ideas parked for future sessions. Roughly ordered by interest, not commitment.

Shipped 2026-07-02: single-page scroll redesign (galaxy hero, horizontal career
timeline, 3-photo Human section, contact galaxy) — merged to main and live.

## Next up (from David, 2026-07-02)

- **Hero animation experiments**: add more colors and glows to the galaxy
- **Header tabs**: rename after a brainstorm (current: Home / What I do /
  Career / About / Say hi)
- **New images**: swap the three Human-section photos for Ricoh GR IV shots —
  Porsche, art museum, Austin skyline (compress like the others, max 1600px;
  captions Motorsports / Travel / Fitness may need revisiting to match)
- **Copy pass — add detail everywhere** (do together with David). Direction by
  example: "long bike rides on the Town Lake trail", "I travel for vegan food,
  modern art museums, and good electronic music"
- **Footer links**: rethink — LinkedIn/GitHub in the footer sit two inches
  below the same links in the contact section
- **Font brainstorm**: everything other than the hero name (Playfair) is
  boring; explore alternatives
- **Accessibility**: small pause-animation button in the bottom corner(s) to
  stop the galaxy/motion
- **Public-surface scan**: check whether an "opinions are my own, not my
  employer's" disclaimer is needed, and audit all copy for anything
  Expedia-confidential
- **Pause galaxy when offscreen (perf)**: both canvases run rAF loops even
  when invisible (hero after fade-out, contact while elsewhere). Add an
  IntersectionObserver to stop/resume the loop; shares machinery with the
  pause-animation accessibility button
- **Link preview image (og.png) refresh**: replace with a screenshot of the
  galaxy background so LinkedIn/iMessage previews match the new site. Favicon
  needs the same refresh
- **Resume PDF download link**: David will provide his PDF resume; add a
  "Download resume (PDF)" link in the career section
- **Custom 404 page**: dark page with the binary field; identity-nerd joke
  copy ("401: you don't have permission to be here... kidding, it's a 404")
- **Binary-field easter eggs**: very infrequently, the 0/1 wave resolves into
  readable strings — "DK", "MCP", "OIDC". Unannounced, blink-and-miss-it
- **Vercel Analytics**: David thinks it's already enabled — verify, and wire
  up/review post-redesign
- **Google Search Console revisit**: already set up (David did the
  verification). Post-redesign: submit the sitemap, confirm old /work and
  /about URLs re-index to the single page
- **Headshot grey outline (tentative — David not sold)**: try the grey ring
  from the OG image around the hero headshot; preview against the galaxy
  before committing, easy to drop if it fights the breathing halo
- **Kill the Skills section**: collapse the flat skills-chip wall into the
  four timeline entries instead — each job's detail panel shows the skills
  used there ("spread the love"). Mapping from David (2026-07-02), covers all
  18 skills:
  - Expedia: AI Agent Authorization, Model Context Protocol (MCP), LLM Data
    Privacy & Governance, OAuth 2.0, AI-Assisted Development, Leadership &
    Mentoring
  - GM: Identity & Access Management, OIDC Identity Federation, API Design &
    Documentation, A/B Testing, Stakeholder Alignment & Influence
  - CVP: UI/UX Design, User Research, Data Analysis, Continuous Discovery
  - GWU: Product Strategy, Collaboration, Communication
  - Certifications: Professional Scrum Master I → CVP; SAFe Product Owner /
    Product Manager → GM
  - Open question: GWU's chips are the three softest (see "skills list trim"
    in the brainstorm) — consider cutting Collaboration/Communication and
    letting GWU carry Product Strategy alone, or moving Product Strategy to
    Expedia
- **Tighten anchor-nav landing position**: clicking a nav tab (e.g. "What I
  do") leaves too much dead space above the section. The gap is scroll-mt-20
  stacking on top of each section's own py-28/py-36 padding — likely fix is
  landing the heading closer to the nav (smaller scroll-margin or negative
  offset so padding is absorbed), verify scrollspy still highlights the right
  tab after the change
- **Differentiate the contact galaxy from the hero**: same composition twice
  reads as copy-paste. Flip it — mirror the galactic plane (opposite diagonal,
  core on the other side), maybe shift the wisp tints. Implementation: add a
  variant/flip prop to GalaxyBackground that mirrors band positions/rotations
  (cx→1-cx, rot→-rot) instead of hardcoding a second BANDS array
- **Shooting star easter egg**: very infrequent meteor streak across the hero
  galaxy — roughly every 3 minutes, randomized so it never feels scheduled.
  Fast (~1s), thin bright streak with a fading tail, random diagonal path in
  the upper half of the canvas. Respects prefers-reduced-motion and the
  future pause button; hero only (contact galaxy stays calm)
- **"Skip to next section" arrow**: persistent little down arrow that fast
  scrolls to the next section from anywhere. Generalize the hero's bouncing
  scroll cue: target derives from the scrollspy's current section; hide it on
  the last section (contact). Placement needs coordinating with the planned
  pause-animation button so the bottom corners don't get crowded; keep it
  subtle (gray, hover-white, same style as the hero cue)

## Travel map easter egg (elaborated 2026-07-02)

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

## David Kwartler AI ("chat with David")

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

## Earlier brainstorm (not yet committed)

- **OAuth consent screen easter egg**: first-visit parody consent dialog
  ("davidkwartler.com would like to access: your scroll position, your good
  opinion, your vibes"). On-brand for identity work.
- **Vinyl collection page**: album-art grid from Discogs export/API
- **Writing section (MDX)**: short essays on agentic authorization
- **Concert log**: timeline or map of ~80 shows/year
- **Track day telemetry**: lap-time or dyno visualizations from HP Tuners logs
- **/now page**: currently building, reading, listening to
- **Now playing (Spotify)** in the footer
- **Rey easter egg**: konami code shows the cat
- **Skills list trim**: drop the four generic soft skills (Stakeholder Alignment
  & Influence, Leadership & Mentoring, Collaboration, Communication)
