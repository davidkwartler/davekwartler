import { resumeData } from "@/data/resume";
import { Section } from "./Section";

export function Education() {
  return (
    <Section title="Education">
      <div className="space-y-4">
        {resumeData.education.map((edu, index) => (
          <div key={index}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {edu.degree}
                </h3>
                <p className="text-blue-600 dark:text-blue-400">{edu.institution}</p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 sm:text-right">
                <p>{edu.graduationDate}</p>
                <p>{edu.location}</p>
              </div>
            </div>
            {edu.gpa && (
              <p className="text-gray-600 dark:text-gray-300">GPA: {edu.gpa}</p>
            )}
            {edu.highlights && edu.highlights.length > 0 && (
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 mt-1">
                {edu.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
