"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import GalaxyBackground, { type RGB } from "@/components/GalaxyBackground";
import { LinkedInIcon, StarMark } from "@/components/icons";
import { PaletteHint } from "@/components/CommandPalette";
import StatusPill from "@/components/StatusPill";
import { hero, links } from "@/data/content";

// Subtle warm hints for the hero galaxy: orange and pink
const HERO_ACCENTS: [RGB, RGB] = [
  [251, 146, 60],
  [244, 114, 182],
];

const firstNames = hero.name.split(" ").slice(0, -1).join(" ");
const lastName = hero.name.split(" ").slice(-1)[0];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // Galaxy fades away as the hero scrolls out
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, (v) => {
    // innerHeight can be 0 before the viewport is measured (0/0 = NaN, which
    // hydrates differently from the server's 1); treat that as fully visible.
    if (typeof window === "undefined" || window.innerHeight === 0) return 1;
    return Math.max(0, 1 - v / (window.innerHeight * 0.75));
  });

  return (
    <section
      id="home"
      className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden px-4 pb-24 pt-28 sm:px-6 sm:pb-32 lg:px-8"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ opacity: prefersReducedMotion ? 1 : bgOpacity }}
      >
        <GalaxyBackground
          accents={HERO_ACCENTS}
          shootingStars
          easterEggs
          avoidSelector="#hero-copy"
        />
      </motion.div>

      {/* Left-aligned and bottom-weighted: the sky gets the top of the
          screen, the words sit on the horizon */}
      <div id="hero-copy" className="mx-auto w-full max-w-5xl">
        <div style={{ animationDelay: "0s" }} className="hero-rise">
          <StatusPill />
        </div>
        <h1
          style={{ animationDelay: "0.05s" }}
          className="hero-rise mt-6 text-5xl font-bold leading-none tracking-wide text-white sm:text-7xl font-[family-name:var(--font-playfair)]"
        >
          {firstNames}{" "}
          {/* the galaxy's star as the full stop, never wrapped onto its own line */}
          <span className="whitespace-nowrap">
            {lastName}
            <StarMark className="ml-0.5 inline-block h-[0.42em] w-[0.42em] align-baseline" />
          </span>
        </h1>
        <p
          style={{ animationDelay: "0.15s" }}
          className="hero-rise mt-5 max-w-xl text-lg text-balance text-gray-300 sm:text-xl"
        >
          {hero.tagline}
        </p>
        <p
          style={{ animationDelay: "0.25s" }}
          className="hero-rise mt-3 max-w-xl text-base text-pretty text-gray-400 sm:text-lg"
        >
          {hero.intro} {hero.also}
        </p>
        <div
          style={{ animationDelay: "0.35s" }}
          className="hero-rise mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href="#contact"
            className="rounded-full bg-white/90 px-6 py-2.5 text-sm font-medium text-neutral-900 transition-all duration-300 hover:bg-white hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(255,255,255,0.22)] active:scale-[0.98]"
          >
            {hero.contactCta}
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-neutral-950/40 px-6 py-2.5 text-sm font-medium text-gray-200 backdrop-blur-sm transition-all duration-300 hover:border-white/35 hover:text-white active:scale-[0.98]"
          >
            <LinkedInIcon className="h-4 w-4" />
            {hero.linkedinCta}
          </a>
          <PaletteHint />
        </div>
      </div>
    </section>
  );
}
