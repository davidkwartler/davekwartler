"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
} from "motion/react";
import HeroBackground from "@/components/HeroBackground";
import { resumeData } from "@/data/resume";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // Cursor-following glow: raw values track the mouse, springs trail it
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const sx = useSpring(mx, { stiffness: 120, damping: 25 });
  const sy = useSpring(my, { stiffness: 120, damping: 25 });
  const glow = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(255, 255, 255, 0.07), transparent 70%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

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
      onMouseMove={onMouseMove}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <HeroBackground />

      {/* Cursor spotlight */}
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: glow }}
        />
      )}

      {/* One-time light sweep on load */}
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-y-0 left-0 w-[35%]"
          style={{
            skewX: -12,
            background:
              "linear-gradient(100deg, transparent, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.04) 60%, transparent)",
          }}
          initial={{ x: "-130%", opacity: 0 }}
          animate={{ x: "430%", opacity: [0, 1, 1, 0] }}
          transition={{ delay: 0.45, duration: 1.6, ease: "easeInOut" }}
        />
      )}

      <div className="text-center">
        <div className="mx-auto mb-8 h-44 w-44">
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
