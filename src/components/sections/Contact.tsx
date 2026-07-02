"use client";

import { Reveal } from "@/components/Reveal";
import GalaxyBackground, { type RGB } from "@/components/GalaxyBackground";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

// Subtle cool hints for the contact galaxy: blue and green
const CONTACT_ACCENTS: [RGB, RGB] = [
  [96, 165, 250],
  [52, 211, 153],
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate -scroll-mt-10 overflow-hidden px-4 py-36 sm:px-6 lg:px-8"
    >
      {/* Smaller, slower galaxy with soft edges into the monochrome page */}
      <div className="absolute inset-0 -z-10">
        <GalaxyBackground
          timeScale={0.45}
          dim={0.85}
          starCount={80}
          flip
          accents={CONTACT_ACCENTS}
          easterEggs
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-neutral-950 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-950 to-transparent" />
      </div>
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 font-[family-name:var(--font-geist-mono)]">
            Contact
          </p>
          <h2 className="mt-3 text-5xl font-bold text-white sm:text-6xl font-[family-name:var(--font-playfair)] tracking-wide">
            Say hi.
          </h2>
          <p className="mt-5 text-lg text-gray-400">
            Email is the fastest way to reach me. I read everything.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center gap-6">
            <a
              href="mailto:david@davidkwartler.com"
              className="inline-block rounded-full bg-white/90 px-8 py-4 text-lg font-medium text-neutral-900 transition-all duration-300 hover:bg-white hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] active:scale-[0.98]"
            >
              Email me
            </a>
            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/in/dkwartler/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <LinkedInIcon className="w-5 h-5" />
                LinkedIn
              </a>
              <a
                href="https://github.com/davidkwartler"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <GitHubIcon className="w-5 h-5" />
                GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
