"use client";

import { Reveal } from "@/components/Reveal";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 px-4 py-36 sm:px-6 lg:px-8">
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
