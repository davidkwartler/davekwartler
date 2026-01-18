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
              {resumeData.title} in {resumeData.location}
            </p>
            <div className="mt-12 flex justify-center gap-4">
              <Link
                href="/work"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                My Work
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 border border-gray-600 text-gray-300 font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                About Me
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
