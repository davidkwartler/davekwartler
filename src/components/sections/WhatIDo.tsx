"use client";

import { Reveal } from "@/components/Reveal";
import { GlowCard } from "@/components/GlowCard";

const cards = [
  {
    index: "01",
    title: "Identity connectivity",
    body: "I build the OAuth and OIDC systems that let travelers connect their Expedia accounts with loyalty programs, social platforms, and AI experiences. Done well, account linking is a growth engine.",
  },
  {
    index: "02",
    title: "AI agent authorization",
    body: "I design how AI agents get permission to act for you: the consent and access models behind Expedia's MCP-based Gen AI integrations.",
  },
  {
    index: "03",
    title: "PM who builds",
    body: "I prototype with AI and ship production changes myself, from UI design to API and OIDC changes. It's the fastest way to test an idea.",
  },
];

export default function WhatIDo() {
  return (
    <section id="what-i-do" className="-scroll-mt-2 px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 font-[family-name:var(--font-geist-mono)]">
            What I do
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl font-[family-name:var(--font-playfair)] tracking-wide">
            Identity, consent, and AI agents.
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.index} delay={i * 0.07} className="h-full">
              <GlowCard className="h-full">
                <p className="text-sm text-gray-500 font-[family-name:var(--font-geist-mono)]">
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
