"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const HERO_SIZE = 176; // matches the h-44 w-44 anchor in the hero
const NAV_SIZE = 36; // matches the h-9 w-9 slot in the nav

type Metrics = {
  heroX: number;
  heroDocY: number;
  navX: number;
  navY: number;
  range: number;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * HeadshotScrub - the site's single scroll-scrubbed moment.
 *
 * A fixed clone of the hero headshot travels from the hero anchor into the
 * nav avatar slot, scrubbed by scroll position and fully reversible. The
 * vertical path lands exactly when the anchor's natural position would meet
 * the slot, so motion stays continuous with the page. Under
 * prefers-reduced-motion this renders nothing (the nav shows a static
 * avatar instead).
 */
export default function HeadshotScrub() {
  const prefersReducedMotion = useReducedMotion();
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const { scrollY } = useScroll();

  const measure = useCallback(() => {
    const anchor = document.getElementById("hero-headshot-anchor");
    const slot = document.getElementById("nav-avatar-slot");
    if (!anchor || !slot) return;
    const a = anchor.getBoundingClientRect();
    const s = slot.getBoundingClientRect();
    const heroDocY = a.top + window.scrollY;
    setMetrics({
      heroX: a.left,
      heroDocY,
      navX: s.left,
      navY: s.top,
      // Scrub over ~60% of a viewport so the moment reads as deliberate,
      // not a blink; never shorter than the natural meeting distance.
      range: Math.max(window.innerHeight * 0.6, heroDocY - s.top, 1),
    });
  }, []);

  useEffect(() => {
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const active = !prefersReducedMotion && metrics !== null;

  // Hide the static hero image while the fixed clone is driving
  useEffect(() => {
    const img = document.getElementById("hero-headshot-img");
    if (!img) return;
    img.style.visibility = active ? "hidden" : "";
  }, [active]);

  const x = useTransform(scrollY, (v: number) => {
    if (!metrics) return 0;
    const p = easeInOutCubic(clamp01(v / metrics.range));
    return lerp(metrics.heroX, metrics.navX, p);
  });
  const y = useTransform(scrollY, (v: number) => {
    if (!metrics) return 0;
    const p = clamp01(v / metrics.range);
    return lerp(metrics.heroDocY - v, metrics.navY, p);
  });
  const scale = useTransform(scrollY, (v: number) => {
    if (!metrics) return 1;
    const p = clamp01(v / metrics.range);
    return lerp(1, NAV_SIZE / HERO_SIZE, p);
  });

  if (!active) return null;

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 pointer-events-none"
      style={{
        x,
        y,
        scale,
        width: HERO_SIZE,
        height: HERO_SIZE,
        transformOrigin: "top left",
      }}
    >
      <Image
        src="/dk-headshot.jpg"
        alt="David Kwartler"
        width={HERO_SIZE}
        height={HERO_SIZE}
        className="rounded-full"
        priority
      />
    </motion.div>
  );
}
