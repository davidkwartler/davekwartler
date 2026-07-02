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
- **Travel map**: cities visited with food/music/museum highlights
- **/now page**: currently building, reading, listening to
- **Now playing (Spotify)** in the footer
- **Rey easter egg**: konami code shows the cat
- **Skills list trim**: drop the four generic soft skills (Stakeholder Alignment
  & Influence, Leadership & Mentoring, Collaboration, Communication)
