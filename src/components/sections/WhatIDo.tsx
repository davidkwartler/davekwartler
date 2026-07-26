"use client";

import { Reveal } from "@/components/Reveal";
import { GlowCard } from "@/components/GlowCard";
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
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.index} delay={i * 0.07} className="h-full">
              <GlowCard className="h-full">
                <p className="text-sm text-gray-500 font-[family-name:var(--font-jetbrains)]">
                  {card.index}
                </p>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">
                  {card.body}
                </p>
                {card.project && (
                  <div className="mt-auto flex items-center justify-end gap-3 pt-6">
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
                  </div>
                )}
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
