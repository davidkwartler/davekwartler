"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { careerEntries } from "@/data/resume";
import { careerSection } from "@/data/content";
import { Reveal } from "@/components/Reveal";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const entries = careerEntries;

export default function Career() {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(entries[entries.length - 1].id);
  const active = entries.find((e) => e.id === activeId)!;

  return (
    <section id="career" className="-scroll-mt-2 px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 font-[family-name:var(--font-geist-mono)]">
            {careerSection.label}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl font-[family-name:var(--font-playfair)] tracking-wide">
            {careerSection.heading}
          </h2>
        </Reveal>

        {/* Horizontal timeline: hover or tap a stop */}
        <Reveal delay={0.07}>
          <div className="relative mt-16">
            <div className="absolute left-5 right-5 top-[22px] h-px bg-white/10" />
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
                    onClick={() => setActiveId(entry.id)}
                    onMouseEnter={() => setActiveId(entry.id)}
                    className="group flex flex-col items-center gap-2 focus:outline-none"
                  >
                    <span
                      className={`rounded-full transition-all duration-300 ${
                        isActive
                          ? "ring-2 ring-white/70 shadow-[0_0_28px_rgba(255,255,255,0.18)]"
                          : "ring-1 ring-white/10 opacity-55 group-hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={entry.logo}
                        alt={`${entry.org} logo`}
                        width={44}
                        height={44}
                        className="rounded-full bg-white/5"
                      />
                    </span>
                    <span
                      className={`max-w-[5.5rem] text-center text-xs leading-tight font-medium transition-colors sm:max-w-[9rem] sm:text-sm ${
                        isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300"
                      }`}
                    >
                      {entry.node}
                    </span>
                    <span className="text-xs text-gray-600 tabular-nums">
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
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE }}
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
