"use client";

import type { AnchorHTMLAttributes } from "react";
import { motion, useReducedMotion } from "motion/react";
import { motionTokens } from "@/components/arc/lib/motion-tokens";
import type { ButtonSize, ButtonVariant } from "./button";
import styles from "./button.module.css";

// Not part of Arc: its Button only renders <button>, and the hero CTAs are
// links. Same classes and press spring, without the label morph a static
// link never needs.
export interface ButtonLinkProps
  extends Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart"
  > {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.a
      className={[styles.button, styles[variant], styles[size], className]
        .filter(Boolean)
        .join(" ")}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      transition={motionTokens.spring.snappy}
      {...props}
    >
      <span className={styles.labelPhase}>{children}</span>
    </motion.a>
  );
}
