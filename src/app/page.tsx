import Link from "next/link";
import Image from "next/image";
import { resumeData } from "@/data/resume";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative">
      <HeroBackground />
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="relative">

          <div className="relative text-center">
            <div className="mb-8 flex justify-center">
              <Image
                src="/dk-headshot.jpg"
                alt="David Kwartler"
                width={200}
                height={200}
                className="rounded-full"
                priority
              />
            </div>
            <h1 className="text-5xl font-bold text-white sm:text-6xl font-[family-name:var(--font-playfair)] tracking-wide">
              {resumeData.name}
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Identity nerd, agentic-travel PM, occasional race car driver
            </p>
            <p className="mt-3 text-lg text-gray-400 max-w-xl mx-auto">
              I design how AI agents get permission to act for you. Also:
              Porsche, vinyl, and a cat named Rey.
            </p>
            <div className="mt-12 flex justify-center gap-4">
              <Link
                href="/work"
                className="px-6 py-3 bg-white/90 text-neutral-900 font-medium rounded-lg hover:bg-white transition-colors"
              >
                Work
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 border border-white/20 text-gray-200 font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
