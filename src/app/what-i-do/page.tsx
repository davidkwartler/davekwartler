import Link from "next/link";
import { resumeData } from "@/data/resume";

export const metadata = {
  title: "My Work - David Kwartler",
  description: "Career background of David Kwartler, Senior Product Manager",
};

export default function WhatIDo() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          My Work
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Career Background
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            {resumeData.careerBackground.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-6 text-gray-600 dark:text-gray-300">
            Curious to learn more?{" "}
            <Link
              href="/resume"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Download my full resume here
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Experience
          </h2>
          <div className="space-y-8">
            {resumeData.experience.map((job, index) => (
              <div
                key={index}
                className="border-l-4 border-blue-600 pl-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {job.position}
                </h3>
                <p className="text-blue-600 dark:text-blue-400">
                  {job.company} | {job.location} | {job.startDate} – {job.endDate}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400 italic">
                  {job.description}
                </p>
              </div>
            ))}

            {resumeData.education.map((edu, index) => (
              <div
                key={index}
                className="border-l-4 border-green-600 pl-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {edu.degree}
                </h3>
                <p className="text-green-600 dark:text-green-400">
                  {edu.institution} | {edu.location} | {edu.graduationDate}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400 italic">
                  {edu.details}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
