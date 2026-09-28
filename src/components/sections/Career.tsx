import Image from "next/image";
import { careerEntries } from "@/data/resume";
import { careerSection } from "@/data/content";
import { StarGlyph } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

// Newest first, like a changelog. The current role opens by default.
const entries = [...careerEntries].reverse();

// Career as a quiet changelog: one row per role (logo, years, title, one
// line, one number), native <details> for the rest. No JS: the disclosure,
// keyboard support and screen-reader state all come from the platform.
export default function Career() {
  return (
    <section id="career" className="-scroll-mt-20 px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading
            label={careerSection.label}
            heading={careerSection.heading}
          />
        </Reveal>

        <Reveal delay={0.07}>
          <div className="relative mt-12">
          {/* the rail: runs through the logo centers, fading toward the past */}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-8 left-[31px] top-8 hidden w-px sm:block bg-gradient-to-b from-white/20 via-white/[0.08] to-white/[0.04]"
          />
          <ol className="relative space-y-1">
            {entries.map((entry, i) => {
              const current = i === 0;
              return (
                <li key={entry.id} className="relative">
                  <details open={current} className="group">
                    <summary className="flex cursor-pointer list-none items-start gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-white/[0.025] group-open:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/40 [&::-webkit-details-marker]:hidden">
                      <span className="relative mt-0.5 shrink-0">
                        <Image
                          src={entry.logo}
                          alt=""
                          width={40}
                          height={40}
                          className={`rounded-full bg-neutral-950 ring-1 transition duration-300 ${
                            current
                              ? "ring-white/25"
                              : "opacity-70 ring-white/10 group-hover:opacity-100 group-open:opacity-100"
                          }`}
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                          <span className="text-xs tabular-nums text-gray-500 font-[family-name:var(--font-jetbrains)]">
                            {entry.years}
                          </span>
                          <span className="font-medium text-white">
                            {entry.rowTitle}
                            <span className="font-normal text-gray-400">
                              {" "}
                              · {entry.rowOrg}
                            </span>
                          </span>
                        </span>
                        <span className="mt-1 block text-sm text-gray-400">
                          {entry.line}
                        </span>
                        <span className="mt-2 inline-block rounded-md border border-white/10 px-2 py-0.5 text-xs text-gray-300 sm:hidden font-[family-name:var(--font-jetbrains)]">
                          {entry.stat}
                        </span>
                      </span>

                      <span className="mt-1 hidden shrink-0 rounded-md border border-white/10 px-2 py-0.5 text-xs text-gray-300 sm:inline-block font-[family-name:var(--font-jetbrains)]">
                        {entry.stat}
                      </span>
                      <svg
                        aria-hidden
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="mt-1.5 h-4 w-4 shrink-0 text-gray-500 transition-transform duration-300 group-open:rotate-180"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </summary>

                    <div className="pb-5 pl-3 pr-3 pt-1 sm:pl-[68px]">
                      <p className="text-sm text-gray-400">
                        {entry.orgUrl ? (
                          <a
                            href={entry.orgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 underline-offset-4 hover:underline"
                          >
                            {entry.org}
                          </a>
                        ) : (
                          <span className="text-gray-300">{entry.org}</span>
                        )}{" "}
                        · {entry.title} · {entry.location} ·{" "}
                        <span className="tabular-nums">{entry.dates}</span>
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-gray-300">
                        {entry.summary}
                      </p>
                      {entry.bullets.length > 0 && (
                        <ul className="mt-4 space-y-2.5">
                          {entry.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="relative pl-4 text-sm leading-relaxed text-gray-400"
                            >
                              <span
                                aria-hidden
                                className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-white/40"
                              />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                      <p className="mt-4 text-xs text-gray-500 font-[family-name:var(--font-jetbrains)]">
                        {entry.skills.join(" · ")}
                        {entry.certification &&
                          ` · Certified: ${entry.certification}`}
                      </p>
                    </div>
                  </details>
                  {current && (
                    // A still star on the rail where GM hands off to Expedia
                    <StarGlyph className="pointer-events-none absolute -bottom-[9px] left-[25px] hidden h-[13px] w-[13px] text-gray-400 sm:block" />
                  )}
                </li>
              );
            })}
          </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
