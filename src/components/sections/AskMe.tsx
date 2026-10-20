"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowUpRightIcon } from "@/components/icons";
import { askMe, type AskQuestion } from "@/data/content";
import { shows } from "@/data/shows";
import { travelCities } from "@/data/travel";
import { todayInAustin } from "@/lib/austin-date";

type Message =
  | { id: number; from: "visitor"; text: string }
  | { id: number; from: "david"; text: string; links?: AskQuestion["links"] };

const questions: AskQuestion[] = askMe.questions;
const CHIPS_SHOWN = 4;
const TYPING_DELAY = 550; // ms of "typing" dots before an answer starts

// Fills an answer's {tokens} at the moment it's asked, so counts track the
// data without a rebuild (shows count up as their dates pass in Austin).
function fill(text: string) {
  const today = todayInAustin();
  const past = shows.filter((s) => s.date < today);
  const venues = new Map<string, number>();
  for (const s of past) venues.set(s.venue, (venues.get(s.venue) ?? 0) + 1);
  const topVenue = [...venues].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";
  return text
    .replace("{shows}", String(past.length))
    .replace("{topVenue}", topVenue)
    .replace("{cities}", String(travelCities.length));
}

const wordsOf = (text: string) => new Set(text.toLowerCase().match(/[a-z0-9]+/g) ?? []);

// Picks the question a typed message is closest to: the most keyword hits
// wins, and ties go to the question whose wording overlaps the message
// most ("before GM" beats "at GM"). With no keyword hit, a message that is
// nearly a chip's own wording ("what do you do") still matches it.
function match(input: string): AskQuestion | null {
  const words = wordsOf(input);
  let best: AskQuestion | null = null;
  let bestScore = 0;
  for (const q of questions) {
    const hits = q.keywords.filter((k) => words.has(k)).length;
    const overlap = [...wordsOf(q.q)].filter((w) => words.has(w)).length;
    if (!hits && (overlap < 3 || overlap < words.size * 0.75)) continue;
    const score = hits * 100 + overlap;
    if (score > bestScore) {
      best = q;
      bestScore = score;
    }
  }
  return best;
}

// Ask me: a chat-shaped FAQ. Visitors tap a question (or type one, matched
// by keyword) and the pre-written answer types itself out. Everything runs
// in the browser; nothing is generated, stored, or sent.
export default function AskMe() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: "david", text: askMe.greeting },
  ]);
  const [asked, setAsked] = useState<string[]>([]);
  // The newest answer is hidden behind "typing" dots, then types out
  const [phase, setPhase] = useState<"idle" | "dots" | "typing">("idle");
  // How much of the newest answer is visible while it types, in characters
  const [shown, setShown] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [draft, setDraft] = useState("");
  const logRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLUListElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Keep the newest message in view inside the log, without scrolling the page
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, phase, shown]);

  // Lands whatever answer is still typing, so a new question never waits
  const finish = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("idle");
  };

  const reply = (visitorText: string, answer: Message & { from: "david" }) => {
    finish();
    setMessages((m) => [
      ...m,
      { id: m.length, from: "visitor", text: visitorText },
      { ...answer, id: m.length + 1 },
    ]);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("dots");
    timers.current.push(
      setTimeout(() => {
        // A few characters every 16ms: about a second for the longest answer
        const step = Math.max(2, Math.ceil(answer.text.length / 60));
        let n = 0;
        const tick = () => {
          n += step;
          if (n >= answer.text.length) return setPhase("idle");
          setShown(n);
          setPhase("typing");
          timers.current.push(setTimeout(tick, 16));
        };
        tick();
      }, TYPING_DELAY)
    );
  };

  const busy = phase !== "idle";

  const ask = (q: AskQuestion, visitorText = q.q) => {
    setAsked((a) => (a.includes(q.id) ? a : [...a, q.id]));
    reply(visitorText, { id: 0, from: "david", text: fill(q.a), links: q.links });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    const q = match(text);
    if (q) ask(q, text);
    else {
      setShowAll(true);
      reply(text, { id: 0, from: "david", text: askMe.fallback });
    }
  };

  const reset = () => {
    finish();
    setMessages([{ id: 0, from: "david", text: askMe.greeting }]);
    setAsked([]);
    setShowAll(false);
  };

  const remaining = questions.filter((q) => !asked.includes(q.id));
  const chips = showAll ? remaining : remaining.slice(0, CHIPS_SHOWN);
  const last = messages.length - 1;

  return (
    <section id="ask" className="-scroll-mt-20 px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading label={askMe.label} heading={askMe.heading} />
        </Reveal>

        <Reveal delay={0.07}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            <div
              ref={logRef}
              role="log"
              aria-live="polite"
              aria-label="Conversation"
              className="flex max-h-[28rem] min-h-32 flex-col gap-4 overflow-y-auto p-4 sm:p-6"
            >
              {messages.map((m, i) =>
                i === last && phase === "dots" ? null : m.from === "visitor" ? (
                  <p
                    key={m.id}
                    className="max-w-[80%] self-end rounded-2xl rounded-br-md bg-white/10 px-4 py-2.5 text-[15px] text-white"
                  >
                    {m.text}
                  </p>
                ) : (
                  <div key={m.id} className="flex max-w-[90%] items-start gap-3">
                    <Image
                      src="/dk-headshot-72.webp"
                      alt=""
                      width={32}
                      height={32}
                      className="mt-0.5 shrink-0 rounded-full ring-1 ring-white/15"
                    />
                    <div className="min-w-0">
                      {i === last && phase === "typing" ? (
                        // Mid-typing: the visible text is decorative; the full
                        // answer is announced once, when it lands
                        <p aria-hidden className="text-[15px] leading-relaxed text-gray-300">
                          {m.text.slice(0, shown)}
                        </p>
                      ) : (
                        <p className="text-[15px] leading-relaxed text-gray-300">{m.text}</p>
                      )}
                      {m.links && !(i === last && busy) && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {m.links.map((l) => {
                            const external = l.href.startsWith("http");
                            const cls =
                              "inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-gray-200 transition-[color,border-color,transform] duration-500 ease-spring hover:border-white/30 hover:text-white active:scale-[0.96]";
                            return external || l.href.startsWith("mailto:") ? (
                              <a
                                key={l.href}
                                href={l.href}
                                className={cls}
                                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                              >
                                {l.label}
                                {external && <ArrowUpRightIcon className="h-3 w-3 text-gray-500" />}
                              </a>
                            ) : (
                              <Link key={l.href} href={l.href} className={cls}>
                                {l.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
              {phase === "dots" && (
                <div className="flex items-center gap-3" aria-hidden>
                  <Image
                    src="/dk-headshot-72.webp"
                    alt=""
                    width={32}
                    height={32}
                    className="shrink-0 rounded-full ring-1 ring-white/15"
                  />
                  <span className="flex gap-1 rounded-2xl bg-white/[0.06] px-3 py-3">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="typing-dot h-1.5 w-1.5 rounded-full bg-gray-400"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 p-4 sm:p-6">
              {chips.length > 0 && (
                <ul
                  ref={chipsRef}
                  tabIndex={-1}
                  className="flex flex-wrap gap-2 rounded-xl"
                  aria-label="Suggested questions"
                >
                  {chips.map((q) => (
                    <li key={q.id}>
                      <button
                        type="button"
                        onClick={(e) => {
                          ask(q);
                          // The asked chip disappears; a keyboard press
                          // (detail 0) keeps focus in the list, not the page
                          if (e.detail === 0) chipsRef.current?.focus();
                        }}
                        className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-gray-200 transition-[color,border-color,transform] duration-500 ease-spring hover:border-white/35 hover:text-white active:scale-[0.96]"
                      >
                        {q.q}
                      </button>
                    </li>
                  ))}
                  {!showAll && remaining.length > CHIPS_SHOWN && (
                    <li>
                      <button
                        type="button"
                        onClick={() => setShowAll(true)}
                        className="rounded-full px-3.5 py-1.5 text-sm text-gray-400 underline-offset-4 hover:text-white hover:underline"
                      >
                        All {remaining.length} questions
                      </button>
                    </li>
                  )}
                </ul>
              )}

              <form onSubmit={onSubmit} className="mt-4 flex items-center gap-2">
                <label htmlFor="ask-input" className="sr-only">
                  {askMe.placeholder}
                </label>
                <input
                  id="ask-input"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={askMe.placeholder}
                  autoComplete="off"
                  maxLength={200}
                  className="min-w-0 flex-1 rounded-full border border-white/15 bg-transparent px-4 py-2.5 text-[15px] text-white placeholder:text-gray-500 focus:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="rounded-full bg-white/90 px-5 py-2.5 text-sm font-medium text-neutral-900 transition-all duration-500 ease-spring hover:bg-white active:scale-[0.96] disabled:opacity-40"
                >
                  Ask
                </button>
              </form>
              {asked.length > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="mt-3 text-xs text-gray-500 underline-offset-4 hover:text-white hover:underline"
                >
                  Start over
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
