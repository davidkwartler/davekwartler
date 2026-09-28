"use client";

import Vinyl from "@/components/Vinyl";
import { usePastShows } from "@/lib/shows";

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/** The header's last-show card: a slow-turning record that scratches on hover. */
export function LastShow({ buildDate }: { buildDate: string }) {
  const { past } = usePastShows(buildDate);
  const last = past[past.length - 1];
  if (!last) return null;
  const date = new Date(`${last.date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  return (
    <div className="group mt-8 inline-flex max-w-full items-center gap-4 rounded-2xl border border-white/10 bg-neutral-950/60 py-2.5 pl-2.5 pr-5 backdrop-blur-sm">
      <Vinyl className="h-12 w-12 shrink-0" />
      <span className="min-w-0">
        <span className="block text-[11px] uppercase tracking-widest text-gray-500 font-[family-name:var(--font-jetbrains)]">
          Last show
        </span>
        <span className="block truncate font-medium text-white">{last.artist}</span>
        <span className="block truncate text-sm text-gray-400">
          {last.venue} · {date}
        </span>
      </span>
    </div>
  );
}

/** Four all-time numbers over the shows that have happened so far. */
export function ShowStats({ buildDate }: { buildDate: string }) {
  const { stats } = usePastShows(buildDate);
  const tiles = [
    { label: "Shows since 2024", value: stats.total, note: `${stats.thisYear} this year` },
    { label: "Artists", value: stats.artists, note: "seen live" },
    { label: "Festivals", value: stats.festivals, note: plural(stats.festivalSets, "set") },
    { label: "Venues", value: stats.venues, note: `${stats.topVenueNights} nights at ${stats.topVenue}` },
  ];
  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {tiles.map((t) => (
        <div key={t.label} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
          <dt className="text-xs text-gray-500">{t.label}</dt>
          <dd className="mt-1 text-2xl font-semibold tabular-nums text-white">{t.value}</dd>
          <dd className="text-xs text-gray-500">{t.note}</dd>
        </div>
      ))}
    </dl>
  );
}
