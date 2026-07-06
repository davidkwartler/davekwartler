import Link from "next/link";
import Footer from "@/components/Footer";
import PauseMotionButton from "@/components/PauseMotionButton";
import TravelMap from "@/components/TravelMap";
import { SectionHeading } from "@/components/SectionHeading";
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
      <main className="min-h-svh bg-neutral-950 px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            label={travelPage.label}
            heading={travelPage.heading}
            as="h1"
          />
          <p className="mt-6 max-w-2xl text-gray-300 leading-relaxed">
            {travelPage.intro}
          </p>

          <div className="mt-14">
            <TravelMap />
          </div>

          <p className="mt-12 text-sm text-gray-500">
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
