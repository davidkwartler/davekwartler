import { resumeData } from "@/data/resume";
import { Mail, MapPin, Phone, Globe, Linkedin, Github } from "lucide-react";

export function Header() {
  return (
    <header className="text-center pb-8 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        {resumeData.name}
      </h1>
      <p className="text-xl text-blue-600 dark:text-blue-400 mb-4">
        {resumeData.title}
      </p>
      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <a
          href={`mailto:${resumeData.email}`}
          className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <Mail size={16} />
          {resumeData.email}
        </a>
        <span className="flex items-center gap-1">
          <MapPin size={16} />
          {resumeData.location}
        </span>
        <a
          href={`tel:${resumeData.phone}`}
          className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <Phone size={16} />
          {resumeData.phone}
        </a>
        <a
          href={resumeData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <Linkedin size={16} />
          LinkedIn
        </a>
        <a
          href={resumeData.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <Github size={16} />
          GitHub
        </a>
        <a
          href={resumeData.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <Globe size={16} />
          Website
        </a>
      </div>
    </header>
  );
}
