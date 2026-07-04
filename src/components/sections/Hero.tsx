"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import GalaxyBackground, { type RGB } from "@/components/GalaxyBackground";
import { hero } from "@/data/content";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

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
    if (typeof window === "undefined") return 1;
    return Math.max(0, 1 - v / (window.innerHeight * 0.75));
  });

  const fadeIn = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: EASE },
        };

  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ opacity: prefersReducedMotion ? 1 : bgOpacity }}
      >
        <GalaxyBackground accents={HERO_ACCENTS} shootingStars easterEggs />
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
            src="/dk-headshot.jpg"
            alt="David Kwartler"
            width={176}
            height={176}
            className="rounded-full"
            priority
          />
        </div>
        <motion.h1
          {...fadeIn(0.05)}
          className="text-5xl font-bold text-white sm:text-6xl font-[family-name:var(--font-playfair)] tracking-wide"
        >
          {hero.name}
        </motion.h1>
        <motion.p
          {...fadeIn(0.15)}
          className="mt-4 text-lg text-balance text-gray-300 sm:text-xl"
        >
          {hero.tagline}
        </motion.p>
        <motion.p
          {...fadeIn(0.25)}
          className="mt-3 max-w-xl mx-auto text-base text-pretty text-gray-400 sm:text-lg"
        >
          {hero.intro}
          <br />
          {hero.also}
        </motion.p>
      </div>

    </section>
  );
}
