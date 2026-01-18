import Link from "next/link";
import Image from "next/image";
import { resumeData } from "@/data/resume";
import Footer from "@/components/Footer";

const companyLogos: Record<string, string> = {
  "Expedia Group": "/expedia-logo.jpg",
  "General Motors": "/gm-logo.jpeg",
  "CVP": "/cvp-logo.png",
};

const educationLogos: Record<string, string> = {
  "The George Washington University": "/gw-logo.png",
};

const companyUrls: Record<string, string> = {
  "Expedia Group": "https://www.expediagroup.com",
  "General Motors": "https://www.gm.com",
  "CVP": "https://www.cvpcorp.com",
};

const educationUrls: Record<string, string> = {
  "The George Washington University": "https://www.gwu.edu",
};

export const metadata = {
  title: "My Work - David Kwartler",
  description: "Career background of David Kwartler, Senior Product Manager",
};

export default function WhatIDo() {
  return (
    <main className="min-h-screen bg-neutral-900 flex flex-col">
      <div className="flex-grow max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-12 font-[family-name:var(--font-playfair)] tracking-wide">
          My Work
        </h1>

        <section className="mb-16">
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
          <div className="space-y-6">
            {resumeData.experience.map((job, index) => (
              <div
                key={index}
                className="bg-neutral-800/50 rounded-lg p-6 flex gap-4 border border-neutral-700 border-l-4 border-l-blue-500 shadow-[inset_4px_0_12px_-4px_rgba(59,130,246,0.3)]"
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
                  <p className="text-sm text-gray-400 mt-1">
                    {companyUrls[job.company] ? (
                      <a href={companyUrls[job.company]} target="_blank" rel="noopener noreferrer" className="text-blue-400 font-semibold hover:underline">
                        {job.company}
                      </a>
                    ) : (
                      <span className="text-blue-400 font-semibold">{job.company}</span>
                    )} · {job.location} · {job.startDate} – {job.endDate}
                  </p>
                  <p className="mt-3 text-gray-300">
                    {job.description}
                  </p>
                </div>
              </div>
            ))}

            {resumeData.education.map((edu, index) => (
              <div
                key={index}
                className="bg-neutral-800/50 rounded-lg p-6 flex gap-4 border border-neutral-700 border-l-4 border-l-blue-500 shadow-[inset_4px_0_12px_-4px_rgba(59,130,246,0.3)]"
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
                  <p className="text-sm text-gray-400 mt-1">
                    {educationUrls[edu.institution] ? (
                      <a href={educationUrls[edu.institution]} target="_blank" rel="noopener noreferrer" className="text-blue-400 font-semibold hover:underline">
                        {edu.institution}
                      </a>
                    ) : (
                      <span className="text-blue-400">{edu.institution}</span>
                    )} · {edu.location}
                  </p>
                  <p className="mt-3 text-gray-300">
                    {edu.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
