import Link from "next/link";
import Image from "next/image";
import { resumeData } from "@/data/resume";

const companyLogos: Record<string, string> = {
  "Expedia Group": "/expedia-logo.jpg",
  "General Motors": "/gm-logo.jpeg",
  "CVP": "/cvp-logo.png",
};

const educationLogos: Record<string, string> = {
  "The George Washington University": "/gw-logo.png",
};

export const metadata = {
  title: "My Work - David Kwartler",
  description: "Career background of David Kwartler, Senior Product Manager",
};

export default function WhatIDo() {
  return (
    <main className="min-h-screen bg-neutral-900">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          My Work
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Career Background
          </h2>
          <div className="prose prose-invert max-w-none">
            {resumeData.careerBackground.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-300 leading-relaxed mb-4"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-6 text-gray-300">
            Curious to learn more?{" "}
            <Link
              href="/resume"
              className="text-blue-400 hover:underline font-medium"
            >
              Check out my full resume.
            </Link>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-8">
            Experience
          </h2>
          <div className="space-y-8">
            {resumeData.experience.map((job, index) => (
              <div
                key={index}
                className="border-l-4 border-blue-500 pl-6 flex gap-4"
              >
                {companyLogos[job.company] && (
                  <div className="flex-shrink-0">
                    <Image
                      src={companyLogos[job.company]}
                      alt={`${job.company} logo`}
                      width={48}
                      height={48}
                      className="rounded"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {job.position}
                  </h3>
                  <p className="text-blue-400">
                    {job.company} | {job.location} | {job.startDate} – {job.endDate}
                  </p>
                  <p className="mt-2 text-gray-400 italic">
                    {job.description}
                  </p>
                </div>
              </div>
            ))}

            {resumeData.education.map((edu, index) => (
              <div
                key={index}
                className="border-l-4 border-green-500 pl-6 flex gap-4"
              >
                {educationLogos[edu.institution] && (
                  <div className="flex-shrink-0">
                    <Image
                      src={educationLogos[edu.institution]}
                      alt={`${edu.institution} logo`}
                      width={48}
                      height={48}
                      className="rounded"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-green-400">
                    {edu.institution} | {edu.location} | {edu.graduationDate}
                  </p>
                  <p className="mt-2 text-gray-400 italic">
                    {edu.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
