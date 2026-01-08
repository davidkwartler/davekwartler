import { resumeData } from "@/data/resume";
import { Section } from "./Section";
import { ExternalLink } from "lucide-react";

export function Projects() {
  return (
    <Section title="Projects">
      <div className="space-y-4">
        {resumeData.projects.map((project, index) => (
          <div key={index}>
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {project.name}
              </h3>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
