"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import GalaxyBackground from "@/components/GalaxyBackground";
import { resumeData } from "@/data/resume";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

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
        <GalaxyBackground />
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
          {resumeData.name}
        </motion.h1>
        <motion.p {...fadeIn(0.15)} className="mt-4 text-xl text-gray-300">
          Identity nerd, agentic-travel PM, occasional race car driver
        </motion.p>
        <motion.p
          {...fadeIn(0.25)}
          className="mt-3 max-w-xl mx-auto text-lg text-gray-400"
        >
          I design how AI agents get permission to act for you.
          <br />
          Also: Porsche, vinyl, and a cat named Rey.
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#what-i-do"
        aria-label="Scroll to content"
        className="absolute bottom-8 text-gray-500 hover:text-white transition-colors"
        {...(prefersReducedMotion
          ? {}
          : {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 1, duration: 0.6 },
            })}
      >
        <motion.svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          {...(prefersReducedMotion
            ? {}
            : {
                animate: { y: [0, 6, 0] },
                transition: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              })}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.a>
    </section>
  );
}
