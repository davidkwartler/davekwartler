import Link from "next/link";

export const metadata = {
  title: "About Me - David Kwartler",
  robots: { index: false },
};

export default function About() {
  return (
    <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <script
        dangerouslySetInnerHTML={{
          __html: 'window.location.replace("/#about");',
        }}
      />
      <p className="text-gray-400">
        This page moved.{" "}
        <Link
          href="/#about"
          className="text-white underline underline-offset-4"
        >
          Continue to About
        </Link>
      </p>
    </main>
  );
}
