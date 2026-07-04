"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { careerEntries } from "@/data/resume";
import { careerSection } from "@/data/content";
import { Reveal } from "@/components/Reveal";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const entries = careerEntries;

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

  const select = (id: string) => {
    if (id === activeId) return;
    const next = entries.findIndex((e) => e.id === id);
    setDir(next > activeIndex ? 1 : -1);
    setActiveId(id);
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

        {/* Horizontal timeline: hover or tap a stop */}
        <Reveal delay={0.07}>
          <div className="relative mt-16">
            <div className="absolute left-5 right-5 top-[22px] h-px overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-white/15 via-white/35 to-white/60"
                initial={false}
                animate={{
                  width: `${(activeIndex / (entries.length - 1)) * 100}%`,
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.45, ease: EASE }
                }
              />
            </div>
            <div
              className="relative flex justify-between"
              role="tablist"
              aria-label="Career timeline"
            >
              {entries.map((entry) => {
                const isActive = entry.id === activeId;
                return (
                  <button
                    key={entry.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => select(entry.id)}
                    onMouseEnter={() => select(entry.id)}
                    className="group flex flex-col items-center gap-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    <span
                      className={`relative rounded-full ring-1 transition-all duration-300 ${
                        isActive
                          ? "ring-transparent"
                          : "ring-white/10 opacity-55 group-hover:opacity-100"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="career-active-ring"
                          className="absolute -inset-[3px] rounded-full ring-2 ring-white/70 shadow-[0_0_28px_rgba(255,255,255,0.22)]"
                          transition={
                            prefersReducedMotion
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 420, damping: 34 }
                          }
                        />
                      )}
                      <Image
                        src={entry.logo}
                        alt={`${entry.org} logo`}
                        width={44}
                        height={44}
                        className={`rounded-full bg-white/5 transition-transform duration-300 ${
                          isActive ? "scale-105" : "group-hover:scale-105"
                        }`}
                      />
                    </span>
                    <span
                      className={`flex min-h-[2lh] max-w-[5.5rem] items-start justify-center text-center text-xs leading-tight font-medium transition-colors sm:max-w-[9rem] sm:text-sm ${
                        isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300"
                      }`}
                    >
                      {entry.node}
                    </span>
                    <span
                      className={`text-xs tabular-nums transition-colors ${
                        isActive ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {entry.years}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Detail panel */}
        <div className="mt-10 min-h-[300px]">
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
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-lg font-semibold text-white">
                  {active.title}
                </h3>
                <span className="text-sm text-gray-500 tabular-nums">
                  {active.dates}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-gray-400">
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
              <p className="mt-4 text-gray-300 leading-relaxed">
                {active.summary}
              </p>
              {active.bullets.length > 0 && (
                <ul className="mt-5 space-y-3 border-l border-white/10 pl-5">
                  {active.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-400 leading-relaxed"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
              {active.skills.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {active.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full border border-white/10 text-sm text-gray-400 transition-colors hover:border-white/25 hover:text-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              {active.certification && (
                <p className="mt-4 text-sm text-gray-500">
                  Certification earned:{" "}
                  <span className="text-gray-400">{active.certification}</span>
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
