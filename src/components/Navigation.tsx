"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Me" },
  { href: "/work", label: "My Work" },
  { href: "/resume", label: "Resume" },
];

export function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-neutral-900 border-b border-gray-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center gap-3 text-xl font-bold text-white"
          >
            {!isHomePage && (
              <Image
                src="/dk-headshot.jpg"
                alt="David Kwartler"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            David Kwartler
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  pathname === link.href
                    ? "text-blue-400 font-bold"
                    : "text-gray-300 hover:text-white font-medium"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://www.linkedin.com/in/dkwartler/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-100 hover:opacity-50 transition-opacity"
            >
              <Image
                src="/linkedin-icon.png"
                alt="LinkedIn"
                width={20}
                height={20}
              />
            </a>
          </div>

          {/* Mobile hamburger button */}
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
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm transition-colors py-2 ${
                    pathname === link.href
                      ? "text-blue-400 font-bold"
                      : "text-gray-300 hover:text-white font-medium"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://www.linkedin.com/in/dkwartler/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white py-2"
              >
                <Image
                  src="/linkedin-icon.png"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                />
                LinkedIn
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
