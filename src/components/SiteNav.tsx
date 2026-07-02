"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

const sections = [
  { id: "top", label: "Home" },
  { id: "what-i-do", label: "What I do" },
  { id: "career", label: "Career" },
  { id: "about", label: "About" },
  { id: "contact", label: "Say hi" },
];

export function SiteNav() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState("top");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);

  // Show the nav avatar once the hero headshot has scrolled out of view
  useEffect(() => {
    const img = document.getElementById("hero-headshot-img");
    if (!img) {
      setShowAvatar(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) =>
      setShowAvatar(!entry.isIntersecting)
    );
    io.observe(img);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const pos = window.scrollY + window.innerHeight * 0.35;
        let current = sections[0].id;
        for (const s of sections) {
          const el = document.getElementById(s.id);
          if (el && el.offsetTop <= pos) current = s.id;
        }
        // Bottom of page always counts as the last section
        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2
        ) {
          current = sections[sections.length - 1].id;
        }
        setActive(current);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 border-b border-white/10 bg-neutral-950/60 backdrop-blur-md ${
        isMenuOpen ? "z-[60]" : "z-40"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center font-semibold text-white">
          <motion.span
            className="h-9 shrink-0 overflow-hidden rounded-full"
            initial={false}
            animate={{
              width: showAvatar ? 36 : 0,
              marginRight: showAvatar ? 12 : 0,
              opacity: showAvatar ? 1 : 0,
            }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 320, damping: 30 }
            }
          >
            <Image
              src="/dk-headshot.jpg"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 max-w-none rounded-full"
            />
          </motion.span>
          David Kwartler
        </a>

        {/* Desktop: scrollspy links with sliding active pill */}
        <div className="hidden md:flex items-center gap-1">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                active === s.id
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {active === s.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 400, damping: 32 }
                  }
                />
              )}
              <span className="relative">{s.label}</span>
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/dkwartler/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <LinkedInIcon className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/davidkwartler"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <GitHubIcon className="w-5 h-5" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-300 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-neutral-950/90 backdrop-blur-md px-4 pb-4 sm:px-6">
          <div className="flex flex-col space-y-1 pt-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  active === s.id
                    ? "text-white bg-white/10 font-semibold"
                    : "text-gray-400 hover:text-white font-medium"
                }`}
              >
                {s.label}
              </a>
            ))}
            <a
              href="https://www.linkedin.com/in/dkwartler/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white"
            >
              <LinkedInIcon className="w-5 h-5" />
              LinkedIn
            </a>
            <a
              href="https://github.com/davidkwartler"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white"
            >
              <GitHubIcon className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
