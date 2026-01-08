import { resumeData } from "@/data/resume";
import { Section } from "./Section";

export function Skills() {
  const skillCategories = [
    { label: "Languages", skills: resumeData.skills.languages },
    { label: "Frameworks", skills: resumeData.skills.frameworks },
    { label: "Tools", skills: resumeData.skills.tools },
    { label: "Other", skills: resumeData.skills.other },
  ];

  return (
    <Section title="Skills">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skillCategories.map((category) => (
          <div key={category.label}>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {category.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
