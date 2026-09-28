import Link from "next/link";
import Footer from "@/components/Footer";
import GalaxyBackground from "@/components/GalaxyBackground";
import PauseMotionButton from "@/components/PauseMotionButton";
import ShowsBrowser from "@/components/ShowsBrowser";
import { SiteNav } from "@/components/SiteNav";
import { showsPage } from "@/data/content";
import { shows } from "@/data/shows";

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

function mostCommon(values: string[]) {
  const counts = new Map<string, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1])[0];
}

const last = shows[shows.length - 1];
const [topArtist, topArtistCount] = mostCommon(shows.map((s) => s.artist));
const [topVenue, topVenueCount] = mostCommon(shows.map((s) => s.venue));
const lastDate = new Date(`${last.date}T00:00:00Z`).toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const stats = [
  { label: "Shows since 2024", value: String(shows.length) },
  { label: "Most seen", value: topArtist, note: `${topArtistCount} times` },
  { label: "Second home", value: topVenue, note: `${topVenueCount} nights` },
];

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

            {/* Last show: a record that spins while you hover */}
            <div className="group mt-8 inline-flex max-w-full items-center gap-4 rounded-2xl border border-white/10 bg-neutral-950/60 py-2.5 pl-2.5 pr-5 backdrop-blur-sm">
              <span aria-hidden className="vinyl h-12 w-12 shrink-0 rounded-full" />
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-widest text-gray-500 font-[family-name:var(--font-jetbrains)]">
                  Last show
                </span>
                <span className="block truncate font-medium text-white">{last.artist}</span>
                <span className="block truncate text-sm text-gray-400">
                  {last.venue} · {lastDate}
                </span>
              </span>
            </div>
          </div>
        </header>

        <div className="px-4 pb-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                  <dt className="text-xs text-gray-500">{s.label}</dt>
                  <dd className="mt-1 truncate text-lg font-semibold text-white">{s.value}</dd>
                  {s.note && <dd className="text-xs text-gray-500">{s.note}</dd>}
                </div>
              ))}
            </dl>

            <div className="mt-14">
              <ShowsBrowser />
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
