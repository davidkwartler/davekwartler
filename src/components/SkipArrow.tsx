"use client";

import { nav } from "@/data/content";
import { useActiveSection } from "@/lib/use-active-section";

const sectionIds = nav.sections.map((s) => s.id);

// Persistent scroll cue: a small chevron fixed at the bottom center that
// jumps to the next section. Bounces on the hero (where it replaces the old
// one-off cue), sits still further down, and fades out on the last section.
// Entrance and bounce are CSS (globals.css) so the static HTML never
// carries an inline opacity that a reduced-motion client can't undo.
export default function SkipArrow() {
  const active = useActiveSection(sectionIds);
  // Before the scrollspy has measured (static HTML), assume the hero
  const activeIndex = Math.max(sectionIds.indexOf(active), 0);
  const next =
    activeIndex < sectionIds.length - 1 ? sectionIds[activeIndex + 1] : null;
  const onHero = activeIndex === 0;

  return (
    <a
      href={`#${next ?? "contact"}`}
      aria-label="Skip to next section"
      aria-hidden={next === null}
      tabIndex={next === null ? -1 : 0}
      className={`skip-arrow fixed bottom-4 left-1/2 z-40 -translate-x-1/2 text-gray-500 transition-[color,opacity] duration-300 hover:text-white ${
        next ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <svg
        aria-hidden
        className={`h-6 w-6 ${onHero ? "skip-arrow-bounce" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </a>
  );
}
