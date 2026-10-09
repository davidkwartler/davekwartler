import Image from "next/image";
import { careerEntries, type CareerEntry } from "@/data/resume";
import { careerSection } from "@/data/content";
import { Accordion } from "@/components/arc/accordion/accordion";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

// Newest first, like a changelog. The current role opens by default.
const entries = [...careerEntries].reverse();

// Career as a quiet changelog: one row per role (logo, years, title, one
// line, one number), Arc's accordion for the rest. Radix carries the
// disclosure semantics and keyboard support; Motion springs the height.
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
          <div className="mt-12">
            <Accordion
              items={entries.map((entry, i) => ({
                title: <CareerRow entry={entry} current={i === 0} />,
                content: <CareerDetail entry={entry} />,
              }))}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CareerRow({ entry, current }: { entry: CareerEntry; current: boolean }) {
  return (
    <span className="flex items-start gap-4 py-1">
      <Image
        src={entry.logo}
        alt=""
        width={40}
        height={40}
        className={`mt-0.5 shrink-0 rounded-full bg-neutral-950 ring-1 ${
          current ? "ring-white/25" : "ring-white/10"
        }`}
      />
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
          <span className="text-xs tabular-nums text-gray-500 font-[family-name:var(--font-jetbrains)]">
            {entry.years}
          </span>
          <span className="font-medium text-white">
            {entry.rowTitle}
            <span className="font-normal text-gray-400"> · {entry.rowOrg}</span>
          </span>
        </span>
        <span className="mt-1 block text-sm font-normal text-gray-400">
          {entry.line}
        </span>
      </span>
      <span className="mt-1 hidden shrink-0 rounded-md border border-white/10 px-2 py-0.5 text-xs font-normal text-gray-300 sm:inline-block font-[family-name:var(--font-jetbrains)]">
        {entry.stat}
      </span>
    </span>
  );
}

function CareerDetail({ entry }: { entry: CareerEntry }) {
  return (
    <div className="pl-14">
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
      <span className="mt-3 inline-block rounded-md border border-white/10 px-2 py-0.5 text-xs text-gray-300 sm:hidden font-[family-name:var(--font-jetbrains)]">
        {entry.stat}
      </span>
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
        {entry.certification && ` · Certified: ${entry.certification}`}
      </p>
    </div>
  );
}
