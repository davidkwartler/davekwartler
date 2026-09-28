"use client";

import { useMemo, useSyncExternalStore } from "react";
import { shows, type Show } from "@/data/shows";
import { todayInAustin } from "@/lib/austin-date";

// The shows page lists a show once its date has passed in Austin, so the
// upcoming rows in data/shows.ts fill in on their own without a redeploy.
//
// The static HTML is rendered at build time with the build's date; on
// hydration useSyncExternalStore swaps in the visitor's "today", which is
// the only moment the list can change.

const noSubscribe = () => () => {};

export type ShowStats = {
  total: number;
  thisYear: number;
  artists: number;
  festivals: number;
  festivalSets: number;
  venues: number;
  topVenue: string;
  topVenueNights: number;
};

function stats(past: Show[], year: string): ShowStats {
  const festivalSets = past.filter((s) => s.festival);
  const venueCounts = new Map<string, number>();
  for (const s of past) venueCounts.set(s.venue, (venueCounts.get(s.venue) ?? 0) + 1);
  const [topVenue = "", topVenueNights = 0] =
    [...venueCounts].sort((a, b) => b[1] - a[1])[0] ?? [];
  return {
    total: past.length,
    thisYear: past.filter((s) => s.date.startsWith(year)).length,
    artists: new Set(past.map((s) => s.artist)).size,
    // Once per festival per year: ACL 2024 and ACL 2025 are two
    festivals: new Set(festivalSets.map((s) => `${s.festival}|${s.date.slice(0, 4)}`)).size,
    festivalSets: festivalSets.length,
    venues: venueCounts.size,
    topVenue,
    topVenueNights,
  };
}

/**
 * Shows up to (not including) today in Austin, plus the stats built on
 * them. `buildDate` is the server snapshot: what the static HTML shows.
 */
export function usePastShows(buildDate: string) {
  const today = useSyncExternalStore(noSubscribe, () => todayInAustin(), () => buildDate);
  return useMemo(() => {
    const past = shows.filter((s) => s.date < today);
    return { today, past, stats: stats(past, today.slice(0, 4)) };
  }, [today]);
}
