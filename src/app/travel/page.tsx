import Link from "next/link";
import PauseMotionButton from "@/components/PauseMotionButton";
import TravelMap from "@/components/TravelMap";
import { SiteNav } from "@/components/SiteNav";
import { travelPage } from "@/data/travel";

// Easter egg: reached by clicking the Travel photo caption in Who I am.
// Kept off the SEO surface — noindex, no sitemap entry, no nav link.
export const metadata = {
  title: "Travel - David Kwartler",
  robots: { index: false },
};

export default function Travel() {
  return (
    <>
      <SiteNav />
      {/* Single immersive screen: the globe fills it and bleeds past the edges,
          with the eyebrow floating up top and the back-link pinned to the
          bottom, level with the pause button. */}
      <main className="relative h-svh overflow-hidden bg-neutral-950">
        <h1 className="absolute inset-x-0 top-24 z-10 text-center text-sm font-semibold uppercase tracking-widest text-gray-500 font-[family-name:var(--font-jetbrains)]">
          {travelPage.label}
        </h1>

        <TravelMap />

        <p className="fixed inset-x-0 bottom-3 z-40 flex h-7 items-center justify-center text-sm">
          <Link
            href="/#about"
            className="text-gray-400 underline-offset-4 hover:text-white hover:underline"
          >
            ← {travelPage.backLink}
          </Link>
        </p>
      </main>
      <PauseMotionButton />
    </>
  );
}
