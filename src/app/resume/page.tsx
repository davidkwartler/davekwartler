import { resumeData } from "@/data/resume";
import Footer from "@/components/Footer";

const companyUrls: Record<string, string> = {
  "Expedia Group": "https://www.expediagroup.com",
  "General Motors": "https://www.gm.com",
  "CVP": "https://www.cvpcorp.com",
};

export const metadata = {
  title: "Resume - David Kwartler",
  description: "Professional resume of David Kwartler",
};

export default function Resume() {
  return (
    <main className="min-h-screen bg-neutral-900 flex flex-col">
      <div className="flex-grow max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white font-[family-name:var(--font-playfair)] tracking-wide">
            {resumeData.name}
          </h1>
          <p className="text-xl text-gray-300 mt-1">
            {resumeData.title} | {resumeData.location}
          </p>
          <p className="text-lg text-blue-400 mt-1">
            {resumeData.subtitle}
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white border-b-2 border-blue-500 pb-2 mb-4">
            Summary
          </h2>
          <ul className="space-y-3">
            {resumeData.summary.map((point, index) => (
              <li key={index} className="text-gray-300 flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white border-b-2 border-blue-500 pb-2 mb-4">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white border-b-2 border-blue-500 pb-2 mb-4">
            Experience
          </h2>
          <div className="space-y-6">
            {resumeData.experience.map((job, index) => (
              <div key={index} className="bg-neutral-800/50 rounded-lg p-6 border border-neutral-700">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {job.position}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {companyUrls[job.company] ? (
                        <a href={companyUrls[job.company]} target="_blank" rel="noopener noreferrer" className="text-blue-400 font-semibold hover:underline">
                          {job.company}
                        </a>
                      ) : (
                        <span className="text-blue-400 font-semibold">{job.company}</span>
                      )} · {job.location}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 sm:mt-0">
                    {job.startDate} – {job.endDate}
                  </p>
                </div>
                <ul className="mt-4 space-y-2">
                  {job.highlights.map((highlight, i) => (
                    <li key={i} className="text-gray-300 flex items-start text-sm">
                      <span className="text-blue-400 mr-2">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white border-b-2 border-blue-500 pb-2 mb-4">
            Education
          </h2>
          {resumeData.education.map((edu, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-white">
                {edu.institution} | {edu.location}
              </h3>
              <p className="text-gray-300">
                {edu.degree}
              </p>
              <p className="text-sm text-gray-400">
                {edu.details}
              </p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white border-b-2 border-blue-500 pb-2 mb-4">
            Certifications
          </h2>
          <ul className="space-y-2">
            {resumeData.certifications.map((cert, index) => (
              <li key={index} className="text-gray-300 flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                {cert}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <Footer />
    </main>
  );
}
