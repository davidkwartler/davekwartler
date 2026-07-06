"use client";

import { motion, useReducedMotion } from "motion/react";
import { nav } from "@/data/content";
import { useActiveSection } from "@/lib/use-active-section";

const sectionIds = nav.sections.map((s) => s.id);

// Persistent scroll cue: a small chevron fixed at the bottom center that
// jumps to the next section. Bounces on the hero (where it replaces the old
// one-off cue), sits still further down, and fades out on the last section.
export default function SkipArrow() {
  const prefersReducedMotion = useReducedMotion();
  const active = useActiveSection(sectionIds);
  const activeIndex = sectionIds.indexOf(active);
  const next =
    activeIndex < sectionIds.length - 1 ? sectionIds[activeIndex + 1] : null;
  const onHero = activeIndex === 0;

  return (
    <motion.a
      href={`#${next ?? "contact"}`}
      aria-label="Skip to next section"
      aria-hidden={next === null}
      tabIndex={next === null ? -1 : 0}
      className={`fixed bottom-4 left-1/2 z-40 -translate-x-1/2 text-gray-500 transition-[color,opacity] duration-300 hover:text-white ${
        next ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      {...(prefersReducedMotion
        ? {}
        : {
            initial: { opacity: 0 },
            animate: { opacity: next ? 1 : 0 },
            transition: { delay: 0.6, duration: 0.5 },
          })}
    >
      <motion.svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        {...(prefersReducedMotion || !onHero
          ? {}
          : {
              animate: { y: [0, 6, 0] },
              transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
            })}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </motion.svg>
    </motion.a>
  );
}
