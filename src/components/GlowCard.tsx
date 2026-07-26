"use client";

import { useRef, useState } from "react";

/**
 * GlowCard - card with a mouse-tracking white glow on its 1px border.
 * The outer wrapper is the border (1px padding); a radial gradient layer
 * follows the cursor and only shows through on the rim, plus a faint
 * interior sheen.
 */
export function GlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-2xl p-px bg-white/[0.08] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background:
            "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(255, 255, 255, 0.35), transparent 70%)",
        }}
      />
      <div className="relative h-full rounded-[15px] bg-neutral-950 p-6 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background:
              "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(255, 255, 255, 0.045), transparent 70%)",
          }}
        />
        {/* Full-height column so cards can bottom-anchor their last row */}
        <div className="relative flex h-full flex-col">{children}</div>
      </div>
    </div>
  );
}
