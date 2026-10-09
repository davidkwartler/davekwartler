import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/arc/card/card";
import { SectionHeading } from "@/components/SectionHeading";
import {
  ArrowUpRightIcon,
  GitHubIcon,
  ShieldIcon,
} from "@/components/icons";
import { whatIDo } from "@/data/content";

const cards = whatIDo.cards;

export default function WhatIDo() {
  return (
    <section id="work" className="px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading label={whatIDo.label} heading={whatIDo.heading} />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {cards.map((card, i) => (
            <Reveal key={card.index} delay={i * 0.07} className="h-full">
              <Card
                className="h-full"
                title={card.title}
                description={card.body}
                meta={
                  <span className="font-normal text-gray-500 font-[family-name:var(--font-jetbrains)]">
                    {card.index}
                  </span>
                }
                // The side project gets Arc's quick look: the card grows
                // into a panel with the blurb.
                details={card.project && <p>{card.project.blurb}</p>}
                action={
                  card.project && (
                    <>
                      <a
                        href={card.project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-gray-200 transition-colors hover:border-white/30 hover:text-white"
                      >
                        {/* Inherits the pill's grey at rest so the section stays
                            monochrome, then hover pays out Sentinel's brand
                            violet (#7C3AED) */}
                        <ShieldIcon className="h-4 w-4 transition-colors group-hover:text-[#7C3AED]" />
                        {card.project.name}
                        <ArrowUpRightIcon className="h-3 w-3 text-gray-500" />
                      </a>
                      <a
                        href={card.project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${card.project.name} on GitHub`}
                        // Negative margin keeps the 16px mark visually in place
                        // while giving it a 32px tap target
                        className="-m-2 p-2 text-gray-500 transition-colors hover:text-white"
                      >
                        <GitHubIcon className="h-4 w-4" />
                      </a>
                    </>
                  )
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
