"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { status } from "@/data/content";

type Now = { time: string; mood: string };

const timeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: status.timeZone,
  hour: "numeric",
  minute: "2-digit",
});
const partsFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: status.timeZone,
  hour: "numeric",
  hourCycle: "h23",
  weekday: "short",
});

function read(): Now {
  const now = new Date();
  const parts = partsFormat.formatToParts(now);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 12) % 24;
  const day = parts.find((p) => p.type === "weekday")?.value;
  const weekend = day === "Sat" || day === "Sun";
  const mood =
    status.moods.find(
      (m) => hour < m.until && (m.weekend === undefined || m.weekend === weekend),
    )?.text ?? "";
  return { time: timeFormat.format(now), mood };
}

// useSyncExternalStore needs a stable snapshot between ticks, so the clock
// is cached and only replaced when the minute actually changes.
let snapshot: Now | null = null;
function getSnapshot() {
  const next = read();
  if (!snapshot || snapshot.time !== next.time || snapshot.mood !== next.mood)
    snapshot = next;
  return snapshot;
}
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

// Hero status line: David's avatar, Austin local time, and a guess at what
// he's up to. The static HTML carries just the city; the time fills in on
// hydration, since the page is prerendered once at build time.
export default function StatusPill() {
  const now = useSyncExternalStore(subscribe, getSnapshot, () => null);

  return (
    <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-neutral-950/50 py-1 pl-1 pr-3.5 text-xs text-gray-300 backdrop-blur-sm font-[family-name:var(--font-jetbrains)]">
      <Image
        id="hero-headshot-img"
        src="/dk-headshot-72.webp"
        alt="David Kwartler"
        width={26}
        height={26}
        priority
        className="h-[26px] w-[26px] rounded-full"
      />
      <span
        aria-hidden
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
      />
      <span className="truncate">
        {status.city}
        {now && (
          <>
            , <span className="tabular-nums">{now.time}</span>
            {now.mood && <> · {now.mood}</>}
          </>
        )}
      </span>
    </p>
  );
}
