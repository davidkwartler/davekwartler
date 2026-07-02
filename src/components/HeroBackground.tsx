"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * HeroBackground - monochrome aurora
 *
 * Features:
 * - Slow-moving radial gradients in grays/whites with a faint cool tint
 * - Subtle skew for depth and perspective
 * - Static noise overlay for texture
 * - Respects prefers-reduced-motion
 */
export default function HeroBackground() {
  const prefersReducedMotion = useReducedMotion();

  const blobAnimate = (x: string[], y: string[], scale: number[]) =>
    prefersReducedMotion ? undefined : { x, y, scale };

  const blobTransition = (duration: number) =>
    prefersReducedMotion
      ? undefined
      : { duration, ease: "easeInOut" as const, repeat: Infinity, repeatType: "loop" as const };

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Base dark layer */}
      <div className="absolute inset-0 bg-[#0a0a0b]" />

      {/* Skewed gradient container for depth */}
      <div
        className="absolute inset-0"
        style={{ transform: "skewY(-6deg) scaleY(1.2)", transformOrigin: "top left" }}
      >
        {/* Bright silver blob - top left */}
        <motion.div
          className="absolute"
          style={{
            top: "-20%",
            left: "-10%",
            width: "70%",
            height: "70%",
            background: "radial-gradient(ellipse at center, rgba(226, 232, 240, 0.14) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={blobAnimate(["0%", "5%", "-3%", "0%"], ["0%", "10%", "5%", "0%"], [1, 1.05, 0.95, 1])}
          transition={blobTransition(25)}
        />

        {/* Cool slate blob - right side */}
        <motion.div
          className="absolute"
          style={{
            top: "10%",
            right: "-20%",
            width: "60%",
            height: "60%",
            background: "radial-gradient(ellipse at center, rgba(148, 163, 184, 0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={blobAnimate(["0%", "-8%", "5%", "0%"], ["0%", "5%", "-5%", "0%"], [1, 1.1, 0.9, 1])}
          transition={blobTransition(30)}
        />

        {/* Soft white blob - center */}
        <motion.div
          className="absolute"
          style={{
            top: "30%",
            left: "20%",
            width: "50%",
            height: "50%",
            background: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.09) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={blobAnimate(["0%", "10%", "-5%", "0%"], ["0%", "-5%", "10%", "0%"], [1, 0.95, 1.05, 1])}
          transition={blobTransition(35)}
        />

        {/* Dim slate accent - bottom */}
        <motion.div
          className="absolute"
          style={{
            bottom: "-10%",
            left: "30%",
            width: "50%",
            height: "40%",
            background: "radial-gradient(ellipse at center, rgba(100, 116, 139, 0.10) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={blobAnimate(["0%", "-5%", "8%", "0%"], ["0%", "-8%", "-3%", "0%"], [1, 1.1, 0.95, 1])}
          transition={blobTransition(28)}
        />

        {/* Pale overlay - creates depth */}
        <motion.div
          className="absolute"
          style={{
            top: "40%",
            right: "10%",
            width: "40%",
            height: "40%",
            background: "radial-gradient(ellipse at center, rgba(203, 213, 225, 0.08) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
          animate={blobAnimate(["0%", "5%", "-8%", "0%"], ["0%", "5%", "-5%", "0%"], [1, 0.9, 1.05, 1])}
          transition={blobTransition(32)}
        />
      </div>

      {/* Mesh gradient overlay for blending */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(226, 232, 240, 0.07), transparent),
            radial-gradient(ellipse 60% 40% at 100% 50%, rgba(148, 163, 184, 0.05), transparent),
            radial-gradient(ellipse 50% 50% at 0% 100%, rgba(255, 255, 255, 0.04), transparent)
          `,
        }}
      />

      {/* Static noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0, 0, 0, 0.35) 100%)",
        }}
      />
    </div>
  );
}
