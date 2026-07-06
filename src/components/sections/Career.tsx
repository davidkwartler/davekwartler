"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { careerEntries } from "@/data/resume";
import { careerSection } from "@/data/content";
import { Reveal } from "@/components/Reveal";
import { isGalaxyPaused, subscribeGalaxyPause } from "@/lib/galaxy-pause";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const entries = careerEntries;

// "DK MCP" in ASCII, repeated so the stream always overflows the full bar
// width — the clip just reveals more of an already-flowing stream, so it
// never has to "catch up" when a phase is reselected.
const BINARY_STREAM =
  "01000100 01001011 01001101 01000011 01010000 ".repeat(6);

const panelVariants = {
  enter: (dir: number) => ({ opacity: 0, x: 28 * dir, filter: "blur(4px)" }),
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: (dir: number) => ({ opacity: 0, x: -20 * dir, filter: "blur(3px)" }),
};

export default function Career() {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(entries[entries.length - 1].id);
  const [dir, setDir] = useState(1);
  const active = entries.find((e) => e.id === activeId)!;
  const activeIndex = entries.findIndex((e) => e.id === activeId);
  const progressPct = ((activeIndex + 1) / entries.length) * 100;
  const stopRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const paused = useSyncExternalStore(
    subscribeGalaxyPause,
    isGalaxyPaused,
    () => false,
  );

  const select = (id: string) => {
    if (id === activeId) return;
    const next = entries.findIndex((e) => e.id === id);
    setDir(next > activeIndex ? 1 : -1);
    setActiveId(id);
  };

  const onStopKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const delta = e.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + delta + entries.length) % entries.length;
    select(entries[nextIndex].id);
    stopRefs.current[nextIndex]?.focus();
  };

  return (
    <section id="career" className="-scroll-mt-2 px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 font-[family-name:var(--font-jetbrains)]">
            {careerSection.label}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl font-[family-name:var(--font-playfair)] tracking-wide">
            {careerSection.heading}
          </h2>
        </Reveal>

        {/* Phased timeline: four bordered cells, tap one to select */}
        <Reveal delay={0.07}>
          <div className="relative mt-16 overflow-hidden rounded-2xl border border-white/10">
            <div
              className="relative grid grid-cols-4 divide-x divide-white/[0.08]"
              role="tablist"
              aria-label="Career timeline"
            >
              {entries.map((entry, i) => {
                const isActive = entry.id === activeId;
                // Only cells you've reached glow; brighter toward the active
                // one, nothing ahead of it.
                const reached = i <= activeIndex;
                const rel = activeIndex > 0 ? i / activeIndex : 1;
                const glowOpacity = reached ? 0.35 + rel * 0.65 : 0;
                return (
                  <button
                    key={entry.id}
                    ref={(el) => {
                      stopRefs.current[i] = el;
                    }}
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => select(entry.id)}
                    onKeyDown={(e) => onStopKeyDown(e, i)}
                    className="group relative flex flex-col items-center justify-center gap-2.5 px-2 py-7 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/40"
                  >
                    {/* progressive white glow — fills the whole reached cell,
                        brighter toward the active one */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                      style={{
                        opacity: glowOpacity,
                        background:
                          "radial-gradient(130% 120% at 50% 45%, rgba(255,255,255,0.12), transparent 72%)",
                      }}
                    />
                    {/* active-phase glow — blue, crossfades in on the picked cell */}
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        background:
                          "radial-gradient(150px circle at 50% 38%, rgba(96,165,250,0.16), transparent 70%)",
                      }}
                    />
                    <span className="relative rounded-full bg-neutral-950">
                      {/* soft blue halo — crossfades in on the active stop */}
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute -inset-2 rounded-full bg-[#60a5fa]/30 blur-md transition-opacity duration-500 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      {/* crisp rim, also a crossfade — nothing slides */}
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute -inset-[3px] rounded-full ring-2 transition-all duration-500 ${
                          isActive
                            ? "ring-white/80 shadow-[0_0_26px_rgba(96,165,250,0.45)]"
                            : "ring-transparent"
                        }`}
                      />
                      <Image
                        src={entry.logo}
                        alt={`${entry.org} logo`}
                        width={44}
                        height={44}
                        className={`relative rounded-full bg-neutral-950 transition duration-500 ${
                          isActive
                            ? "scale-105 opacity-100"
                            : "opacity-50 group-hover:opacity-90"
                        }`}
                      />
                    </span>
                    <span
                      className={`relative text-center text-xs leading-tight font-medium transition-colors sm:text-sm ${
                        isActive
                          ? "text-white"
                          : "text-gray-500 group-hover:text-gray-300"
                      }`}
                    >
                      {entry.node}
                    </span>
                    <span
                      className={`relative text-xs tabular-nums transition-colors ${
                        isActive ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {entry.years}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* progress region — a flowing 0/1 stream over a bright underline,
                both filling left→right to the active phase */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6">
              {/* base track */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-white/[0.06]" />
              {/* filled portion, clipped to progress */}
              <motion.div
                className="absolute bottom-0 left-0 top-0 overflow-hidden"
                initial={false}
                animate={{ width: `${progressPct}%` }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.45, ease: EASE }
                }
              >
                {/* flowing 0/1 stream, brightest toward the leading edge */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    maskImage:
                      "linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,1))",
                    WebkitMaskImage:
                      "linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,1))",
                  }}
                >
                  <div
                    className="career-binary-stream absolute bottom-[5px] left-0 whitespace-nowrap text-[10px] tracking-[0.25em] text-white/35 will-change-transform font-[family-name:var(--font-jetbrains)]"
                    style={{
                      animationName: prefersReducedMotion
                        ? "none"
                        : "career-binary-flow",
                      animationDuration: "108s",
                      animationTimingFunction: "linear",
                      animationIterationCount: "infinite",
                      animationPlayState: paused ? "paused" : "running",
                    }}
                  >
                    <span>{BINARY_STREAM}</span>
                    <span>{BINARY_STREAM}</span>
                  </div>
                </div>
                {/* bright underline fill */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-white/20 via-white/45 to-white/80" />
              </motion.div>
            </div>
          </div>
        </Reveal>

        {/* Detail card */}
        <Reveal delay={0.12}>
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] sm:p-7">
            {/* top highlight + corner glow for flair */}
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/[0.05] blur-3xl" />

            <div className="relative min-h-[160px]">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div
                  key={active.id}
                  custom={dir}
                  variants={panelVariants}
                  initial={prefersReducedMotion ? false : "enter"}
                  animate="center"
                  exit={prefersReducedMotion ? undefined : "exit"}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <div className="flex items-start gap-4">
                    <Image
                      src={active.logo}
                      alt=""
                      aria-hidden
                      width={44}
                      height={44}
                      className="mt-0.5 shrink-0 rounded-full bg-white/5 ring-1 ring-white/10"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="text-lg font-semibold text-white">
                          {active.title}
                        </h3>
                        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs tabular-nums text-gray-400 font-[family-name:var(--font-jetbrains)]">
                          {active.dates}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-400">
                        {active.orgUrl ? (
                          <a
                            href={active.orgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 underline-offset-4 hover:underline"
                          >
                            {active.org}
                          </a>
                        ) : (
                          active.org
                        )}{" "}
                        · {active.location}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-gray-300 leading-relaxed">
                    {active.summary}
                  </p>

                  {active.bullets.length > 0 && (
                    <ul className="mt-5 space-y-2.5">
                      {active.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="relative pl-5 text-sm leading-relaxed text-gray-400"
                        >
                          <span
                            aria-hidden
                            className="absolute left-0 top-[0.5em] h-1.5 w-1.5 rounded-full bg-white/30 ring-1 ring-white/10"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {active.skills.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.07] pt-5">
                      {active.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-sm text-gray-400 transition-colors hover:border-white/25 hover:text-gray-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {active.certification && (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-400">
                      <svg
                        aria-hidden
                        viewBox="0 0 20 20"
                        className="h-3.5 w-3.5 text-gray-300"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.79 6.8-6.79a1 1 0 0 1 1.4 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Certification:{" "}
                      <span className="text-gray-300">
                        {active.certification}
                      </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
