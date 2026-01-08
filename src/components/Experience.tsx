import { resumeData } from "@/data/resume";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section title="Experience">
      <div className="space-y-6">
        {resumeData.experience.map((job, index) => (
          <div key={index}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {job.position}
                </h3>
                <p className="text-blue-600 dark:text-blue-400">{job.company}</p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 sm:text-right">
                <p>{job.startDate} - {job.endDate}</p>
                <p>{job.location}</p>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
              {job.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
