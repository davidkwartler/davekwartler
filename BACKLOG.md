# Site Backlog

Ideas parked for future sessions. Roughly ordered by interest, not commitment.

## UX overhaul: single-page scroll design

Convert the site from multi-page (Home / About / Work) to a single page where
scrolling moves through all content: hero → career timeline → about → photos → contact.

- Keep the aurora hero as the opening viewport
- The career timeline ports well as a scroll section
- Sticky anchor nav that highlights the current section replaces page links
- Preserve /work and /about as anchors or redirects so existing links don't break
- Motion is already a dependency; tasteful scroll-triggered reveals are possible

## Photo curation: fewer, better images (3-4 max)

The About page currently has 7 photos in a grid. Quality over quantity.

- Candidates to keep: one racing shot, one travel shot, one Austin (bike or Identiverse) shot
- Larger, more intentional placement instead of uniform grids
- Pairs well with the single-page redesign, where photos become section accents
  rather than a gallery

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
