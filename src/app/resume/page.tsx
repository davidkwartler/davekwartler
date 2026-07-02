import Link from "next/link";

export const metadata = {
  title: "Resume - David Kwartler",
  robots: { index: false },
};

export default function Resume() {
  return (
    <main className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <script
        dangerouslySetInnerHTML={{
          __html: 'window.location.replace("/work");',
        }}
      />
      <p className="text-gray-400">
        The resume has moved.{" "}
        <Link href="/work" className="text-white underline underline-offset-4">
          Continue to Work
        </Link>
      </p>
    </main>
  );
}
