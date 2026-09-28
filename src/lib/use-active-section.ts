"use client";

import { useEffect, useState } from "react";

/**
 * Scrollspy shared by SiteNav and SkipArrow: the active section is the last
 * one whose top has crossed a marker 35% down the viewport, and the bottom
 * of the page always counts as the last section.
 *
 * `ids` must be referentially stable (a module-level array).
 */
export function useActiveSection(ids: readonly string[]) {
  // Nothing active until measured: the static HTML of pages without these
  // sections (travel, shows, 404) must not mark Home active
  const [active, setActive] = useState("");

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const marker = window.scrollY + window.innerHeight * 0.35;
      // Pages without these sections (travel, shows, 404) highlight nothing
      let current = document.getElementById(ids[0]) ? ids[0] : "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= marker) current = id;
      }
      if (
        current &&
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2
      ) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids]);

  return active;
}
