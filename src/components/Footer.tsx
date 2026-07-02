export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-1 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="text-sm text-gray-500 transition-colors hover:text-white"
        >
          Back to top
        </a>
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} David Kwartler. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
