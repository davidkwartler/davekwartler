"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import GalaxyBackground, { type RGB } from "@/components/GalaxyBackground";
import { LinkedInIcon } from "@/components/icons";
import { hero, links } from "@/data/content";

// Subtle warm hints for the hero galaxy: orange and pink
const HERO_ACCENTS: [RGB, RGB] = [
  [251, 146, 60],
  [244, 114, 182],
];

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
      className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ opacity: prefersReducedMotion ? 1 : bgOpacity }}
      >
        <GalaxyBackground
          accents={HERO_ACCENTS}
          shootingStars
          easterEggs
          avoidSelector="#hero-headshot-img"
        />
      </motion.div>

      <div className="text-center">
        <div className="relative mx-auto mb-8 h-44 w-44">
          {/* Soft breathing halo behind the headshot */}
          {!prefersReducedMotion && (
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 h-[340px] w-[340px] rounded-full"
              style={{
                x: "-50%",
                y: "-50%",
                background:
                  "radial-gradient(circle, rgba(196,181,253,0.14), transparent 65%)",
              }}
              animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          {/* Thin static ring, brighter at the top like overhead light */}
          <div
            aria-hidden
            className="absolute -inset-1.5 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(255,255,255,0.55), rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.55))",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
            }}
          />
          <Image
            id="hero-headshot-img"
            src="/dk-headshot-352.webp"
            alt="David Kwartler"
            width={176}
            height={176}
            className="rounded-full"
            priority
          />
        </div>
        <h1
          style={{ animationDelay: "0.05s" }}
          className="hero-rise text-5xl font-bold text-white sm:text-6xl font-[family-name:var(--font-playfair)] tracking-wide"
        >
          {hero.name}
        </h1>
        <p
          style={{ animationDelay: "0.15s" }}
          className="hero-rise mt-4 text-lg text-balance text-gray-300 sm:text-xl"
        >
          {hero.tagline}
        </p>
        <p
          style={{ animationDelay: "0.25s" }}
          className="hero-rise mt-3 max-w-xl mx-auto text-base text-pretty text-gray-400 sm:text-lg"
        >
          {hero.intro}
          <br />
          {hero.also}
        </p>
        <div
          style={{ animationDelay: "0.35s" }}
          className="hero-rise mt-8 flex flex-wrap items-center justify-center gap-3"
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
        </div>
      </div>

    </section>
  );
}
