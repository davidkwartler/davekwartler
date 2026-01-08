import { resumeData } from "@/data/resume";
import { Section } from "./Section";

export function Summary() {
  return (
    <Section title="Summary">
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {resumeData.summary}
      </p>
    </Section>
  );
}
