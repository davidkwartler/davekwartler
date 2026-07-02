"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Reveal - fade/rise-in on scroll, once, settles fast.
 * 20px rise over ~450ms; siblings stagger via the delay prop.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
