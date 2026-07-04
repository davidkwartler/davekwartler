"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const SECTIONS = ["home", "work", "career", "about", "contact"];

// Persistent scroll cue: a small chevron fixed at the bottom center that
// jumps to the next section. Bounces on the hero (where it replaces the old
// one-off cue), sits still further down, and fades out on the last section.
export default function SkipArrow() {
  const prefersReducedMotion = useReducedMotion();
  const [next, setNext] = useState<string | null>("work");
  const [onHero, setOnHero] = useState(true);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = 0;
      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i]);
        if (el && el.offsetTop <= marker) current = i;
      }
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 2
      ) {
        current = SECTIONS.length - 1;
      }
      setNext(current < SECTIONS.length - 1 ? SECTIONS[current + 1] : null);
      setOnHero(current === 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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
