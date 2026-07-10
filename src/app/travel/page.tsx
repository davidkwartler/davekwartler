import Link from "next/link";
import Footer from "@/components/Footer";
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
      <main className="min-h-svh bg-neutral-950 px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <h1 className="text-center text-sm font-semibold uppercase tracking-widest text-gray-500 font-[family-name:var(--font-jetbrains)]">
            {travelPage.label}
          </h1>

          <div className="mt-8 w-full">
            <TravelMap />
          </div>

          <p className="mt-10 text-sm text-gray-500">
            <Link
              href="/#about"
              className="text-gray-400 underline-offset-4 hover:text-white hover:underline"
            >
              ← {travelPage.backLink}
            </Link>
          </p>
        </div>
      </main>
      <Footer />
      <PauseMotionButton />
    </>
  );
}
