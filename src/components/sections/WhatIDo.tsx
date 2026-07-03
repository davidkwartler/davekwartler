"use client";

import { Reveal } from "@/components/Reveal";
import { GlowCard } from "@/components/GlowCard";
import { whatIDo } from "@/data/content";

const cards = whatIDo.cards;

export default function WhatIDo() {
  return (
    <section id="what-i-do" className="-scroll-mt-2 px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 font-[family-name:var(--font-jetbrains)]">
            {whatIDo.label}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl font-[family-name:var(--font-playfair)] tracking-wide">
            {whatIDo.heading}
          </h2>
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
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
