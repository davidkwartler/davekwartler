"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { CheckIcon, CopyIcon, LinkedInIcon } from "@/components/icons";
import { contact, links } from "@/data/content";
import GalaxyBackground, { type RGB } from "@/components/GalaxyBackground";

// Subtle cool hints for the contact galaxy: blue and green
const CONTACT_ACCENTS: [RGB, RGB] = [
  [96, 165, 250],
  [52, 211, 153],
];

export default function Contact() {
  // mailto does nothing for visitors without a desktop mail client, so the
  // address is also one click from the clipboard.
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure context, denied permission): fall back
      // to the mail client.
      window.location.href = `mailto:${contact.email}`;
    }
  };

  const secondaryPill =
    "inline-flex items-center gap-2 rounded-full border border-white/15 bg-neutral-950/40 px-5 py-3 text-sm font-medium text-gray-200 backdrop-blur-sm transition-all duration-300 hover:border-white/35 hover:text-white active:scale-[0.98]";

  return (
    <section
      id="contact"
      className="relative isolate -scroll-mt-20 overflow-hidden px-4 pt-36 pb-16 sm:px-6 lg:px-8"
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
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 font-[family-name:var(--font-jetbrains)]">
            {contact.label}
          </p>
          <h2 className="mt-3 text-5xl font-bold text-white sm:text-6xl font-[family-name:var(--font-playfair)] tracking-wide">
            {contact.heading}
          </h2>
          <p className="mt-5 text-base text-balance text-gray-400 sm:text-lg">
            {contact.subline}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href={`mailto:${contact.email}`}
              className="inline-block rounded-full bg-white/90 px-8 py-4 text-lg font-medium text-neutral-900 transition-all duration-300 hover:bg-white hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] active:scale-[0.98]"
            >
              {contact.cta}
            </a>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button type="button" onClick={copyEmail} className={secondaryPill}>
                {copied ? (
                  <CheckIcon className="h-4 w-4 text-emerald-400" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
                {copied ? contact.copiedCta : contact.copyCta}
              </button>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryPill}
              >
                <LinkedInIcon className="h-4 w-4" />
                {contact.linkedinCta}
              </a>
            </div>
            {/* Announces the copy for screen readers; the button label
                changing alone isn't reliably read out */}
            <p className="sr-only" aria-live="polite">
              {copied ? `${contact.email} copied to clipboard` : ""}
            </p>
          </div>
          <a
            href="#home"
            className="mt-16 inline-flex flex-col items-center gap-1 text-sm text-gray-500 transition-colors hover:text-white"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            Back to top
          </a>
        </Reveal>
      </div>
    </section>
  );
}
