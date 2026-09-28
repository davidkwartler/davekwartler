"use client";

import { useMemo, useState } from "react";
import type { Show } from "@/data/shows";
import { usePastShows } from "@/lib/shows";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Dates are calendar days, not instants: parse as UTC so no timezone can
// shift a show onto the previous day.
function parts(date: string) {
  const d = new Date(`${date}T00:00:00Z`);
  return { month: d.getUTCMonth(), day: d.getUTCDate(), weekday: WEEKDAYS[d.getUTCDay()] };
}


// Year tabs, a shows-per-month column chart, and the full list grouped by
// month. Each column links to its month in the list below.
export default function ShowsBrowser({ buildDate }: { buildDate: string }) {
  const { today, past } = usePastShows(buildDate);
  const years = useMemo(
    () => [...new Set(past.map((s) => s.date.slice(0, 4)))].sort().reverse(),
    [past],
  );
  const [picked, setYear] = useState<string | null>(null);
  // Default to the newest year; fall back if a pick no longer exists
  const year = picked && years.includes(picked) ? picked : years[0];
  const currentYear = today.slice(0, 4);
  const currentMonth = Number(today.slice(5, 7)) - 1;

  const { byMonth, counts, max } = useMemo(() => {
    const byMonth: Show[][] = Array.from({ length: 12 }, () => []);
    for (const s of past) if (s.date.startsWith(year)) byMonth[parts(s.date).month].push(s);
    const counts = byMonth.map((m) => m.length);
    return { byMonth, counts, max: Math.max(...counts, 1) };
  }, [past, year]);

  const total = counts.reduce((a, b) => a + b, 0);
  const partial = year === currentYear;
  // Clean ticks: the chart's top rounds up to an even number
  const top = Math.ceil(max / 2) * 2;

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % years.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + years.length) % years.length;
    else return;
    e.preventDefault();
    setYear(years[next]);
    document.getElementById(`shows-tab-${years[next]}`)?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Year"
        className="inline-flex rounded-full border border-white/10 bg-white/[0.02] p-1"
      >
        {years.map((y, i) => (
          <button
            key={y}
            id={`shows-tab-${y}`}
            role="tab"
            type="button"
            aria-selected={y === year}
            aria-controls="shows-panel"
            tabIndex={y === year ? 0 : -1}
            onClick={() => setYear(y)}
            onKeyDown={(e) => onTabKey(e, i)}
            className={`rounded-full px-4 py-1.5 text-sm tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
              y === year ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      <div id="shows-panel" role="tabpanel" aria-labelledby={`shows-tab-${year}`}>
        <p className="mt-8 text-sm text-gray-400">
          <span className="text-3xl font-semibold tabular-nums text-white">{total}</span>{" "}
          shows in {year}
          {partial && " so far"}
        </p>

        {/* Shows per month. One series, so no legend: the line above names it. */}
        <figure className="mt-6">
          <div className="relative h-40">
            {/* recessive gridlines at 0, half and the top */}
            {[0, 0.5, 1].map((f) => (
              <div
                key={f}
                aria-hidden
                className="absolute inset-x-0 flex items-center gap-2"
                style={{ bottom: `${f * 100}%` }}
              >
                <span className="w-5 -translate-y-1/2 text-right text-[10px] tabular-nums text-gray-500 font-[family-name:var(--font-jetbrains)]">
                  {Math.round(f * top)}
                </span>
                <span className="h-px flex-1 -translate-y-1/2 bg-white/[0.06]" />
              </div>
            ))}
            <div className="absolute inset-y-0 left-7 right-0 grid grid-cols-12">
              {counts.map((n, m) => {
                const future = partial && m > currentMonth;
                const label = `${MONTHS_LONG[m]} ${year}: ${n} show${n === 1 ? "" : "s"}`;
                const Column = n ? "a" : "div";
                return (
                  <Column
                    key={m}
                    {...(n
                      ? { href: `#m-${year}-${m}`, "aria-label": label }
                      : { role: "img", "aria-label": future ? `${MONTHS_LONG[m]} ${year}: still ahead` : label })}
                    className="group relative flex h-full items-end justify-center px-px outline-none"
                  >
                    {n > 0 && (
                      <span
                        className="w-full max-w-6 rounded-t bg-violet-400 transition-colors group-hover:bg-violet-300 group-focus-visible:bg-violet-300"
                        style={{ height: `${(n / top) * 100}%` }}
                      />
                    )}
                    {/* hover/focus tooltip; the whole column is the hit target */}
                    {!future && (
                      <span
                        role="tooltip"
                        className="pointer-events-none absolute bottom-full z-10 mb-2 hidden whitespace-nowrap rounded-md border border-white/10 bg-neutral-900 px-2 py-1 text-xs text-gray-200 shadow-lg group-hover:block group-focus-visible:block"
                      >
                        {MONTHS[m]}: <span className="tabular-nums text-white">{n}</span>
                      </span>
                    )}
                  </Column>
                );
              })}
            </div>
          </div>
          <div aria-hidden className="ml-7 mt-2 grid grid-cols-12 text-center text-[10px] text-gray-500 font-[family-name:var(--font-jetbrains)]">
            {MONTHS.map((m) => (
              <span key={m}>
                {m.slice(0, 1)}
                <span className="hidden sm:inline">{m.slice(1)}</span>
              </span>
            ))}
          </div>
          <figcaption className="sr-only">
            Shows per month in {year}. Each month is listed in full below.
          </figcaption>
        </figure>

        {/* The list doubles as the chart's table view */}
        <div className="mt-12 space-y-10">
          {byMonth
            .map((list, m) => ({ list, m }))
            .filter(({ list }) => list.length > 0)
            .reverse()
            .map(({ list, m }) => (
              <section key={m} id={`m-${year}-${m}`} className="scroll-mt-24">
                <h3 className="flex items-baseline justify-between border-b border-white/10 pb-2">
                  <span className="font-semibold text-white">{MONTHS_LONG[m]}</span>
                  <span className="text-xs tabular-nums text-gray-500 font-[family-name:var(--font-jetbrains)]">
                    {list.length}
                  </span>
                </h3>
                <ul className="divide-y divide-white/[0.05]">
                  {[...list].reverse().map((s, i) => {
                    const p = parts(s.date);
                    return (
                      <li
                        key={`${s.date}-${s.artist}-${i}`}
                        className="grid grid-cols-[4.5rem_1fr] gap-x-4 py-2.5 text-sm sm:grid-cols-[4.5rem_1fr_auto]"
                      >
                        <span className="tabular-nums text-gray-500 font-[family-name:var(--font-jetbrains)]">
                          {p.weekday} {p.day}
                        </span>
                        <span className="min-w-0">
                          <span className="text-gray-100">{s.artist}</span>
                          <span className="block text-gray-500 sm:inline">
                            <span className="hidden sm:inline"> · </span>
                            {s.venue}
                          </span>
                        </span>
                        {s.festival && (
                          <span className="col-start-2 mt-1 justify-self-start rounded-full border border-white/10 px-2 py-0.5 text-xs text-gray-400 sm:col-start-3 sm:mt-0 sm:self-center">
                            {s.festival}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
        </div>
      </div>
    </div>
  );
}
