import Link from "next/link";
import Footer from "@/components/Footer";
import GalaxyBackground from "@/components/GalaxyBackground";
import PauseMotionButton from "@/components/PauseMotionButton";
import ShowsBrowser from "@/components/ShowsBrowser";
import { LastShow, ShowStats } from "@/components/ShowsSummary";
import { SiteNav } from "@/components/SiteNav";
import { showsPage } from "@/data/content";
import { todayInAustin } from "@/lib/austin-date";

// Linked from Who I am and the command menu. Personal, so it stays off
// the SEO surface like /travel: noindex, no sitemap entry.
export const metadata = {
  title: "Shows - David Kwartler",
  description: showsPage.subline,
  robots: { index: false },
  openGraph: {
    title: "Shows - David Kwartler",
    description: showsPage.subline,
    url: "https://www.davidkwartler.com/shows",
    siteName: "David Kwartler",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "David Kwartler" }],
  },
};

// What the static HTML shows; visitors' browsers move it to their today
const buildDate = todayInAustin();

export default function Shows() {
  return (
    <>
      <SiteNav />
      <main id="main-content" tabIndex={-1} className="bg-neutral-950">
        <header className="relative isolate overflow-hidden px-4 pb-14 pt-36 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10">
            <GalaxyBackground timeScale={0.5} dim={0.7} starCount={90} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent" />
          </div>
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 font-[family-name:var(--font-jetbrains)]">
              {showsPage.label}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-wide text-white sm:text-5xl font-[family-name:var(--font-playfair)]">
              {showsPage.heading}
            </h1>
            <p className="mt-4 max-w-xl text-gray-400">{showsPage.subline}</p>

            <LastShow buildDate={buildDate} />
          </div>
        </header>

        <div className="px-4 pb-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <ShowStats buildDate={buildDate} />

            <div className="mt-14">
              <ShowsBrowser buildDate={buildDate} />
            </div>

            <p className="mt-16 text-sm">
              <Link href="/#about" className="text-gray-400 underline-offset-4 hover:text-white hover:underline">
                ← {showsPage.backLink}
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <PauseMotionButton />
    </>
  );
}
