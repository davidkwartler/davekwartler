import Link from "next/link";
import Image from "next/image";
import { resumeData } from "@/data/resume";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900 flex flex-col">
      <div className="flex-grow max-w-4xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
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
          <h1 className="text-5xl font-bold text-white sm:text-6xl">
            {resumeData.name}
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            {resumeData.title} in {resumeData.location}
          </p>
          <div className="mt-10 flex justify-center gap-4">
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
      <footer className="py-8 border-t border-gray-700">
        <div className="flex justify-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} David Kwartler. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
