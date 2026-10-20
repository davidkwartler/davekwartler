"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon } from "@/components/icons";
import { askMe, type AskQuestion } from "@/data/content";
import { shows } from "@/data/shows";
import { todayInAustin } from "@/lib/austin-date";

type Message =
  | { id: number; from: "visitor"; text: string }
  | { id: number; from: "david"; text: string; links?: AskQuestion["links"] };

const questions: AskQuestion[] = askMe.questions;
const OPENERS = 5;
const TYPING_DELAY = 550; // ms of "typing" dots before an answer starts
const greeting: Message = { id: 0, from: "david", text: askMe.greeting };

// Fills an answer's {tokens} at the moment it's asked. The last show is the
// newest one already past in Austin: upcoming shows are never named.
function fill(text: string) {
  const today = todayInAustin();
  const last = shows.filter((s) => s.date < today).at(-1);
  return text.replace("{lastShow}", last ? `${last.artist} at ${last.venue}` : "");
}

// Five openers drawn from the top pool, fresh each conversation
function pickOpeners() {
  const pool = questions.filter((q) => q.top);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, OPENERS).map((q) => q.id);
}

const chipClass =
  "rounded-full border border-white/15 px-3 py-1.5 text-left text-[13px] text-gray-200 transition-[color,border-color,transform] duration-500 ease-spring hover:border-white/35 hover:text-white active:scale-[0.96]";
const linkClass =
  "inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-xs text-gray-200 transition-[color,border-color,transform] duration-500 ease-spring hover:border-white/30 hover:text-white active:scale-[0.96]";

// Ask me: a small chat popup behind a bubble in the corner, an easter egg
// more than a feature. Visitors tap pre-written questions and the answer
// types itself out. Everything runs in the browser; nothing is sent.
export default function AskMeChat() {
  const [open, setOpen] = useState(false);
  const [openers, setOpeners] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [asked, setAsked] = useState<string[]>([]);
  // The newest answer is hidden behind "typing" dots, then types out
  const [phase, setPhase] = useState<"idle" | "dots" | "typing">("idle");
  // How much of the newest answer is visible while it types, in characters
  const [shown, setShown] = useState(0);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Keep the newest message in view inside the log, without scrolling the page
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, phase, shown]);

  // The dropdown slides open and shrinks the log; stay pinned to the newest
  // message while it does
  useEffect(() => {
    const log = logRef.current;
    if (!open || !log || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => (log.scrollTop = log.scrollHeight));
    ro.observe(log);
    return () => ro.disconnect();
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  // Escape closes from anywhere in the panel and hands focus back
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Opening moves focus into the panel so keyboard users land on the chips
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  const toggle = () => {
    if (open) return close();
    if (!openers.length) setOpeners(pickOpeners());
    setOpen(true);
  };

  // Lands whatever answer is still typing, so a new question never waits
  const finish = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("idle");
  };

  const ask = (q: AskQuestion) => {
    finish();
    setAsked((a) => [...a, q.id]);
    const text = fill(q.a);
    setMessages((m) => [
      ...m,
      { id: m.length, from: "visitor", text: q.q },
      { id: m.length + 1, from: "david", text, links: q.links },
    ]);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("dots");
    timers.current.push(
      setTimeout(() => {
        // A few characters every 16ms: under a second for any answer
        const step = Math.max(2, Math.ceil(text.length / 50));
        let n = 0;
        const tick = () => {
          n += step;
          if (n >= text.length) return setPhase("idle");
          setShown(n);
          setPhase("typing");
          timers.current.push(setTimeout(tick, 16));
        };
        tick();
      }, TYPING_DELAY)
    );
  };

  const reset = () => {
    finish();
    setMessages([greeting]);
    setAsked([]);
    setOpeners(pickOpeners());
  };

  const busy = phase !== "idle";
  const last = messages.length - 1;
  const opening = questions.filter((q) => openers.includes(q.id) && !asked.includes(q.id));
  const rest = questions.filter((q) => !openers.includes(q.id) && !asked.includes(q.id));

  return (
    <>
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-labelledby="ask-title"
          tabIndex={-1}
          // Focus lands here on open and after a chip (which disappears) is
          // pressed from the keyboard; the panel itself needs no ring
          // Above the launcher, which sits above the pause button; both
          // drop a step when reduced motion hides the pause button
          className="ask-pop fixed right-3 bottom-[6.25rem] z-50 flex max-h-[min(34rem,calc(100svh-8rem))] w-[min(22rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/95 shadow-[0_16px_48px_rgba(0,0,0,0.5)] backdrop-blur-md focus-visible:outline-none motion-reduce:bottom-16"
        >
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <Image
              src="/dk-headshot-72.webp"
              alt=""
              width={28}
              height={28}
              className="rounded-full ring-1 ring-white/15"
            />
            <h2 id="ask-title" className="flex-1 text-sm font-medium text-white">
              {askMe.title}
            </h2>
            {asked.length > 0 && (
              <button
                type="button"
                onClick={reset}
                className="text-xs text-gray-500 underline-offset-4 hover:text-white hover:underline"
              >
                Start over
              </button>
            )}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="-m-1.5 rounded-full p-1.5 text-gray-400 transition-colors hover:text-white"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
                <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-label="Conversation"
            className="flex min-h-24 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((m, i) =>
              i === last && phase === "dots" ? null : m.from === "visitor" ? (
                <p
                  key={m.id}
                  className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-white/10 px-3.5 py-2 text-sm text-white"
                >
                  {m.text}
                </p>
              ) : (
                <div key={m.id} className="max-w-[92%]">
                  {i === last && phase === "typing" ? (
                    // Mid-typing: the visible text is decorative; the full
                    // answer is announced once, when it lands
                    <p aria-hidden className="text-sm leading-relaxed text-gray-300">
                      {m.text.slice(0, shown)}
                    </p>
                  ) : (
                    <p className="text-sm leading-relaxed text-gray-300">{m.text}</p>
                  )}
                  {m.links && !(i === last && busy) && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.links.map((l) => {
                        const external = l.href.startsWith("http");
                        return l.href.startsWith("/") ? (
                          <Link key={l.href} href={l.href} className={linkClass}>
                            {l.label}
                          </Link>
                        ) : (
                          <a
                            key={l.href}
                            href={l.href}
                            className={linkClass}
                            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                          >
                            {l.label}
                            {external && <ArrowUpRightIcon className="h-3 w-3 text-gray-500" />}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              )
            )}
            {phase === "dots" && (
              <span aria-hidden className="flex w-fit gap-1 rounded-2xl bg-white/[0.06] px-3 py-2.5">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="typing-dot h-1.5 w-1.5 rounded-full bg-gray-400"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </span>
            )}
          </div>

          <div className="border-t border-white/10 px-4 py-3">
            {opening.length > 0 && (
              <ul className="flex flex-wrap gap-1.5" aria-label="Suggested questions">
                {opening.map((q) => (
                  <li key={q.id}>
                    <button
                      type="button"
                      onClick={(e) => {
                        ask(q);
                        if (e.detail === 0) panelRef.current?.focus();
                      }}
                      className={chipClass}
                    >
                      {q.q}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {rest.length > 0 && (
              <details className="disclosure group mt-2">
                <summary className="flex cursor-pointer list-none items-center gap-1 rounded-full py-1 text-xs text-gray-400 hover:text-white [&::-webkit-details-marker]:hidden">
                  {askMe.more}
                  <svg aria-hidden viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 transition-transform duration-300 group-open:rotate-180">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
                  </svg>
                </summary>
                <ul className="mt-2 flex max-h-32 flex-wrap gap-1.5 overflow-y-auto">
                  {rest.map((q) => (
                    <li key={q.id}>
                      <button
                      type="button"
                      onClick={(e) => {
                        ask(q);
                        if (e.detail === 0) panelRef.current?.focus();
                      }}
                      className={chipClass}
                    >
                        {q.q}
                      </button>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={toggle}
        aria-label={open ? "Close chat" : askMe.launcherLabel}
        aria-expanded={open}
        title={askMe.launcherLabel}
        // Centered over the pause button (28px at right-3, so its middle is
        // 26px in) with an 8px gap; takes its corner when that's hidden
        className="fixed bottom-12 right-1.5 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900/70 text-gray-300 ring-1 ring-white/10 backdrop-blur transition-[color,box-shadow,transform] duration-500 ease-spring hover:text-white hover:ring-white/25 active:scale-[0.94] motion-reduce:bottom-3 motion-reduce:right-3"
      >
        {open ? (
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
            <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
            <path d="M4 12a8 8 0 1 1 3.3 6.48L4 19.5l1.02-3.3A7.96 7.96 0 0 1 4 12Z" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </>
  );
}
