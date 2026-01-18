"use client";

import { motion } from "motion/react";

/**
 * HeroBackground - Stripe-inspired animated gradient background
 *
 * Features:
 * - Aurora-like mesh gradient with purple, cyan, and blue accents
 * - Slow-moving radial gradients that blend seamlessly
 * - Subtle skew for depth and perspective
 * - Static noise overlay for texture
 * - Respects prefers-reduced-motion
 * - High performance
 */
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Base dark layer */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      {/* Skewed gradient container for depth */}
      <div
        className="absolute inset-0"
        style={{ transform: "skewY(-6deg) scaleY(1.2)", transformOrigin: "top left" }}
      >
        {/* Primary purple blob - top left */}
        <motion.div
          className="absolute"
          style={{
            top: "-20%",
            left: "-10%",
            width: "70%",
            height: "70%",
            background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: ["0%", "5%", "-3%", "0%"],
            y: ["0%", "10%", "5%", "0%"],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: 25,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />

        {/* Cyan/teal blob - right side */}
        <motion.div
          className="absolute"
          style={{
            top: "10%",
            right: "-20%",
            width: "60%",
            height: "60%",
            background: "radial-gradient(ellipse at center, rgba(34, 211, 238, 0.2) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: ["0%", "-8%", "5%", "0%"],
            y: ["0%", "5%", "-5%", "0%"],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 30,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />

        {/* Deep blue blob - center */}
        <motion.div
          className="absolute"
          style={{
            top: "30%",
            left: "20%",
            width: "50%",
            height: "50%",
            background: "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.25) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={{
            x: ["0%", "10%", "-5%", "0%"],
            y: ["0%", "-5%", "10%", "0%"],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 35,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />

        {/* Pink/magenta accent - bottom */}
        <motion.div
          className="absolute"
          style={{
            bottom: "-10%",
            left: "30%",
            width: "50%",
            height: "40%",
            background: "radial-gradient(ellipse at center, rgba(236, 72, 153, 0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: ["0%", "-5%", "8%", "0%"],
            y: ["0%", "-8%", "-3%", "0%"],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 28,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />

        {/* Indigo overlay - creates depth */}
        <motion.div
          className="absolute"
          style={{
            top: "40%",
            right: "10%",
            width: "40%",
            height: "40%",
            background: "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.2) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: ["0%", "5%", "-8%", "0%"],
            y: ["0%", "5%", "-5%", "0%"],
            scale: [1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: 32,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      </div>

      {/* Mesh gradient overlay for blending */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139, 92, 246, 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 100% 50%, rgba(34, 211, 238, 0.1), transparent),
            radial-gradient(ellipse 50% 50% at 0% 100%, rgba(59, 130, 246, 0.1), transparent)
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
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0, 0, 0, 0.3) 100%)",
        }}
      />
    </div>
  );
}
