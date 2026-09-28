import Link from "next/link";
import PauseMotionButton from "@/components/PauseMotionButton";
import StarField from "@/components/StarField";
import TravelMap from "@/components/TravelMap";
import { SiteNav } from "@/components/SiteNav";
import TravelLabel from "@/components/TravelLabel";
import { travelPage } from "@/data/travel";

// Linked from Who I am (the Travel caption and a plain link) and the
// command menu's secret pages. Kept off the SEO surface: noindex, no
// sitemap entry.
export const metadata = {
  title: "David Kwartler: Travel",
  robots: { index: false },
  alternates: { canonical: "/travel" },
  // Explicit OG block (reusing the homepage card) so link previews don't
  // fall back to snapshotting the page, which is a blank canvas without JS.
  openGraph: {
    title: "David Kwartler: Travel",
    description: "Where I've been.",
    url: "https://www.davidkwartler.com/travel",
    siteName: "David Kwartler",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "David Kwartler: Senior Product Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "David Kwartler: Travel",
    description: "Where I've been.",
    images: ["/og.jpg"],
  },
};

export default function Travel() {
  return (
    <>
      <SiteNav />
      {/* Single immersive screen: the globe fills it and bleeds past the edges,
          with the eyebrow floating up top and the back-link pinned to the
          bottom, level with the pause button. */}
      <main id="main-content" tabIndex={-1} className="relative isolate h-svh overflow-hidden bg-neutral-950">
        <TravelLabel>{travelPage.label}</TravelLabel>

        <StarField />
        <TravelMap />

        <p className="fixed inset-x-0 bottom-3 z-40 flex h-7 items-center justify-center text-sm">
          <Link
            href="/#about"
            className="inline-block py-1 text-gray-400 underline-offset-4 hover:text-white hover:underline"
          >
            ← {travelPage.backLink}
          </Link>
        </p>
      </main>
      <PauseMotionButton />
    </>
  );
}
