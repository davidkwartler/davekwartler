"use client";

import { useRef } from "react";
import { motion, useSpring, useReducedMotion } from "motion/react";

/**
 * MagneticLink - anchor that leans toward the cursor on hover and
 * springs back on leave. No-op under prefers-reduced-motion.
 */
export function MagneticLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 300, damping: 22 });
  const y = useSpring(0, { stiffness: 300, damping: 22 });

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.2);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.a>
  );
}
