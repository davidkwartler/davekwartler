import Link from "next/link";

export const metadata = {
  title: "Work - David Kwartler",
  robots: { index: false },
};

export default function Work() {
  return (
    <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <script
        dangerouslySetInnerHTML={{
          __html: 'window.location.replace("/#career");',
        }}
      />
      <p className="text-gray-400">
        This page moved.{" "}
        <Link
          href="/#career"
          className="text-white underline underline-offset-4"
        >
          Continue to Career
        </Link>
      </p>
    </main>
  );
}
