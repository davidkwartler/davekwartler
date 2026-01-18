import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-6 text-sm">
            <Link
              href="/resume"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Resume
            </Link>
            <a
              href="https://www.linkedin.com/in/dkwartler"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:david@davidkwartler.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
          <p className="text-sm text-gray-500">
            Designed and built by me ☕
          </p>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} David Kwartler. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
