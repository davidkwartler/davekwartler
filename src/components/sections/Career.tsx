"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { resumeData } from "@/data/resume";
import { Reveal } from "@/components/Reveal";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const companyUrls: Record<string, string> = {
  "Expedia Group": "https://www.expediagroup.com",
  "General Motors": "https://www.gm.com",
  "CVP": "https://www.cvpcorp.com",
};

type Entry = {
  id: string;
  logo: string;
  node: string;
  years: string;
  title: string;
  org: string;
  orgUrl?: string;
  location: string;
  dates: string;
  summary: string;
  bullets: string[];
};

function job(company: string) {
  const j = resumeData.experience.find((x) => x.company === company)!;
  return j;
}

const expedia = job("Expedia Group");
const gm = job("General Motors");
const cvp = job("CVP");
const edu = resumeData.education[0];

const entries: Entry[] = [
  {
    id: "gw",
    logo: "/gw-logo.png",
    node: "GW",
    years: "2015–19",
    title: edu.degree,
    org: edu.institution,
    location: edu.location,
    dates: edu.graduationDate,
    summary: edu.details,
    bullets: [],
  },
  {
    id: "cvp",
    logo: "/cvp-logo.png",
    node: "CVP",
    years: "2019–21",
    title: cvp.position,
    org: cvp.company,
    orgUrl: companyUrls[cvp.company],
    location: cvp.location,
    dates: `${cvp.startDate} – ${cvp.endDate}`,
    summary: cvp.workSummary,
    bullets: cvp.highlights,
  },
  {
    id: "gm",
    logo: "/gm-logo.jpeg",
    node: "GM",
    years: "2021–24",
    title: gm.position,
    org: gm.company,
    orgUrl: companyUrls[gm.company],
    location: gm.location,
    dates: `${gm.startDate} – ${gm.endDate}`,
    summary: gm.workSummary,
    bullets: gm.highlights,
  },
  {
    id: "expedia",
    logo: "/expedia-logo.jpg",
    node: "Expedia",
    years: "2024–now",
    title: expedia.position,
    org: expedia.company,
    orgUrl: companyUrls[expedia.company],
    location: expedia.location,
    dates: `${expedia.startDate} – ${expedia.endDate}`,
    summary: expedia.workSummary,
    bullets: expedia.highlights,
  },
];

export default function Career() {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState("expedia");
  const active = entries.find((e) => e.id === activeId)!;

  return (
    <section id="career" className="scroll-mt-20 px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 font-[family-name:var(--font-geist-mono)]">
            Career
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl font-[family-name:var(--font-playfair)] tracking-wide">
            Seven years of identity products.
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
                      className={`text-sm font-medium transition-colors ${
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
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal className="mt-16">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-6">
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full border border-white/10 text-sm text-gray-400 transition-colors hover:border-white/25 hover:text-gray-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">
            Certifications
          </h3>
          <p className="text-gray-400 text-sm">
            {resumeData.certifications.join(" · ")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
