import Link from "next/link";
import { resumeData } from "@/data/resume";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl">
            {resumeData.name}
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            {resumeData.title} in {resumeData.location}
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/what-i-do"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              My Work
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              About Me
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
