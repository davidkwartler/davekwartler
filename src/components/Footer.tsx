import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/dkwartler/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            <LinkedInIcon className="h-5 w-5" />
            LinkedIn
          </a>
          <a
            href="https://github.com/davidkwartler"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            <GitHubIcon className="h-5 w-5" />
            GitHub
          </a>
        </div>
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} David Kwartler. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
