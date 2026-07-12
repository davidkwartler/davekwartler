"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal - fade/rise-in on scroll, once, settles fast.
 * 20px rise over ~450ms; siblings stagger via the delay prop (seconds).
 *
 * Ships visible in the static HTML, so content never depends on JS to
 * appear (slow-3G fast-scrollers, no-JS). After hydration, elements still
 * fully below the viewport are hidden and revealed by an
 * IntersectionObserver flipping a CSS class; anything already on screen is
 * left alone. Reduced-motion users never get the hide at all.
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
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"visible" | "pending" | "shown">(
    "visible"
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only hide what the user can't see yet; -80px matches the reveal line.
    if (el.getBoundingClientRect().top < window.innerHeight - 80) return;

    if (typeof IntersectionObserver === "undefined") return;

    setPhase("pending");
    let gotInitialCallback = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        gotInitialCallback = true;
        if (entry.isIntersecting) {
          setPhase("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);
    // Fail visible: an observer always reports once right after observe();
    // if that never arrives, IO is broken here — un-hide rather than leave
    // the section blank.
    const guard = setTimeout(() => {
      if (!gotInitialCallback) {
        setPhase("visible");
        io.disconnect();
      }
    }, 1000);
    return () => {
      clearTimeout(guard);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className ?? ""} ${
        phase === "pending" ? "reveal-pending" : ""
      } ${phase === "shown" ? "reveal-shown" : ""}`.trim()}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
