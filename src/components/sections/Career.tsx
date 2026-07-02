"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { resumeData } from "@/data/resume";
import { Reveal } from "@/components/Reveal";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const companyLogos: Record<string, string> = {
  "Expedia Group": "/expedia-logo.jpg",
  "General Motors": "/gm-logo.jpeg",
  "CVP": "/cvp-logo.png",
};

const companyUrls: Record<string, string> = {
  "Expedia Group": "https://www.expediagroup.com",
  "General Motors": "https://www.gm.com",
  "CVP": "https://www.cvpcorp.com",
};

function TimelineEntry({
  logo,
  logoAlt,
  isLast,
  children,
}: {
  logo?: string;
  logoAlt: string;
  isLast?: boolean;
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.li
      className="flex gap-5"
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <div className="flex flex-col items-center">
        {logo ? (
          <Image
            src={logo}
            alt={logoAlt}
            width={44}
            height={44}
            className="rounded-full ring-1 ring-white/10 bg-white/5"
          />
        ) : (
          <div className="w-11 h-11 rounded-full ring-1 ring-white/10 bg-white/5" />
        )}
        {!isLast && <div className="w-px flex-1 bg-white/10 mt-3" />}
      </div>
      <div className={`flex-1 min-w-0 ${isLast ? "" : "pb-12"}`}>{children}</div>
    </motion.li>
  );
}

export default function Career() {
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

        <ol className="mt-14">
          {resumeData.experience.map((job, index) => (
            <TimelineEntry
              key={index}
              logo={companyLogos[job.company]}
              logoAlt={`${job.company} logo`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-lg font-semibold text-white">
                  {job.position}
                </h3>
                <span className="text-sm text-gray-500 tabular-nums">
                  {job.startDate} – {job.endDate}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-gray-400">
                {companyUrls[job.company] ? (
                  <a
                    href={companyUrls[job.company]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 underline-offset-4 hover:underline"
                  >
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}{" "}
                · {job.location}
              </p>
              <p className="mt-3 text-gray-300 leading-relaxed">
                {job.workSummary || job.description}
              </p>
              {job.highlights && job.highlights.length > 0 && (
                <details className="mt-3 group">
                  <summary className="cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
                    <svg
                      className="w-3.5 h-3.5 transition-transform group-open:rotate-90"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Highlights
                  </summary>
                  <ul className="mt-4 space-y-3 border-l border-white/10 pl-5">
                    {job.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-400 leading-relaxed"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </TimelineEntry>
          ))}

          {resumeData.education.map((edu, index) => (
            <TimelineEntry
              key={`edu-${index}`}
              logo="/gw-logo.png"
              logoAlt={`${edu.institution} logo`}
              isLast={index === resumeData.education.length - 1}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-lg font-semibold text-white">
                  {edu.degree}
                </h3>
                <span className="text-sm text-gray-500 tabular-nums">
                  {edu.graduationDate}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-gray-400">
                {edu.institution} · {edu.location}
              </p>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                {edu.details}
              </p>
            </TimelineEntry>
          ))}
        </ol>

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
