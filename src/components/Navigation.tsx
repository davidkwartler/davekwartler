"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "My Work" },
  { href: "/about", label: "About Me" },
  { href: "/resume", label: "Resume" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-neutral-900 border-b border-gray-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-xl font-bold text-white"
          >
            David Kwartler
          </Link>
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-white"
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
        </div>
      </div>
    </nav>
  );
}
