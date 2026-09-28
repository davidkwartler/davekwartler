"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { contact, links, nav, palette } from "@/data/content";
import {
  isGalaxyPaused,
  setGalaxyPaused,
  subscribeGalaxyPause,
} from "@/lib/galaxy-pause";

const OPEN_EVENT = "palette:open";

/** Opens the palette from anywhere (nav button, hero hint). */
export function openPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

// ⌘ on Apple platforms, Ctrl elsewhere. The static HTML assumes ⌘.
const noop = () => () => {};
export function useModKey() {
  return useSyncExternalStore(
    noop,
    () => (/Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘" : "Ctrl "),
    () => "⌘",
  );
}

/** Small "⌘K" button: the palette's visible front door. */
export function PaletteHint({ className = "" }: { className?: string }) {
  const mod = useModKey();
  return (
    <button
      type="button"
      onClick={openPalette}
      aria-label="Open command menu"
      className={`hidden items-center gap-1.5 rounded-full px-3 py-2.5 text-sm text-gray-400 transition-colors hover:text-white sm:inline-flex ${className}`}
    >
      Press
      <kbd className="rounded border border-white/15 border-b-2 bg-white/[0.03] px-1.5 py-px text-xs text-gray-300 font-[family-name:var(--font-jetbrains)]">
        {mod}K
      </kbd>
    </button>
  );
}

type Command = {
  id: string;
  group: string;
  label: string;
  hint: string;
  keywords?: string;
  run: () => void | Promise<void>;
  /** Keep the palette open and show this instead of closing */
  feedback?: string;
};

export default function CommandPalette() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [note, setNote] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const paused = useSyncExternalStore(
    subscribeGalaxyPause,
    isGalaxyPaused,
    () => false,
  );

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setNote("");
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    // Hand focus back to whatever opened the palette
    requestAnimationFrame(() => returnFocus.current?.focus?.());
  }, []);

  // ⌘K / Ctrl+K toggles; the custom event opens it from buttons
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, [open, show, close]);

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => router.push(href);
    const external = (href: string) => () => {
      window.open(href, "_blank", "noopener,noreferrer");
    };
    return [
      ...nav.sections.map((s) => ({
        id: `nav-${s.id}`,
        group: "Go to",
        label: s.label,
        hint: `#${s.id}`,
        run: go(`/#${s.id}`),
      })),
      ...palette.pages.map((p) => ({
        id: `page-${p.href}`,
        group: "Pages",
        label: p.label,
        hint: p.href,
        keywords: p.keywords,
        run: go(p.href),
      })),
      {
        id: "copy-email",
        group: "Contact",
        label: "Copy email address",
        hint: contact.email,
        keywords: "mail",
        feedback: `Copied ${contact.email}`,
        run: async () => {
          await navigator.clipboard.writeText(contact.email);
        },
      },
      {
        id: "email",
        group: "Contact",
        label: "Send an email",
        hint: "mailto",
        run: () => {
          window.location.href = `mailto:${contact.email}`;
        },
      },
      {
        id: "linkedin",
        group: "Contact",
        label: "Open LinkedIn",
        hint: "↗",
        run: external(links.linkedin),
      },
      {
        id: "github",
        group: "Contact",
        label: "Open GitHub",
        hint: "↗",
        keywords: "code",
        run: external(links.github),
      },
      {
        id: "sentinel",
        group: "Projects",
        label: "Open the Sentinel demo",
        hint: "↗",
        keywords: "side project session hijack",
        run: external(links.sentinel),
      },
      {
        id: "motion",
        group: "Settings",
        label: paused ? "Resume background animation" : "Pause background animation",
        hint: "motion",
        keywords: "galaxy stars stop",
        feedback: paused ? "Animation resumed" : "Animation paused",
        run: () => setGalaxyPaused(!paused),
      },
    ];
  }, [router, paused]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.group} ${c.hint} ${c.keywords ?? ""}`
        .toLowerCase()
        .includes(q),
    );
  }, [commands, query]);

  const activeIndex = Math.min(active, Math.max(results.length - 1, 0));

  // Keep the highlighted row in view while arrowing through the list
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const run = async (cmd: Command | undefined) => {
    if (!cmd) return;
    try {
      await cmd.run();
    } catch {
      setNote("That didn't work here. Try again from the page.");
      return;
    }
    if (cmd.feedback) {
      setNote(cmd.feedback);
      setTimeout(close, 900);
    } else {
      close();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((activeIndex + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(
        (activeIndex - 1 + results.length) % Math.max(results.length, 1),
      );
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(Math.max(results.length - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[activeIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      // The input is the only stop inside the dialog: keep focus here
      e.preventDefault();
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="palette"
          className="fixed inset-0 z-[80] flex items-start justify-center bg-neutral-950/60 px-4 pt-[14vh] backdrop-blur-sm"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-neutral-900/95 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.9)]"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4 shrink-0 text-gray-500"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                ref={inputRef}
                autoFocus
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={
                  results[activeIndex] ? `${listId}-${results[activeIndex].id}` : undefined
                }
                aria-autocomplete="list"
                aria-label="Search commands"
                placeholder="Where to?"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                  setNote("");
                }}
                onKeyDown={onKeyDown}
                className="min-w-0 flex-1 bg-transparent py-4 text-[15px] text-white outline-none placeholder:text-gray-500"
              />
              <kbd className="rounded border border-white/15 px-1.5 py-px text-[11px] text-gray-500 font-[family-name:var(--font-jetbrains)]">
                esc
              </kbd>
            </div>

            <div
              ref={listRef}
              id={listId}
              role="listbox"
              aria-label="Commands"
              className="max-h-[min(22rem,55vh)] overflow-y-auto p-2"
            >
              {results.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-gray-500">
                  Nothing matches. Try &ldquo;career&rdquo; or &ldquo;email&rdquo;.
                </p>
              )}
              {results.map((cmd, i) => {
                const header = cmd.group !== lastGroup ? cmd.group : null;
                lastGroup = cmd.group;
                const isActive = i === activeIndex;
                return (
                  <div key={cmd.id}>
                    {header && (
                      <p
                        role="presentation"
                        className="px-3 pb-1 pt-3 text-[11px] uppercase tracking-widest text-gray-500 font-[family-name:var(--font-jetbrains)]"
                      >
                        {header}
                      </p>
                    )}
                    <div
                      id={`${listId}-${cmd.id}`}
                      role="option"
                      aria-selected={isActive}
                      data-index={i}
                      onMouseMove={() => setActive(i)}
                      onClick={() => run(cmd)}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        isActive ? "bg-white/[0.07] text-white" : "text-gray-300"
                      }`}
                    >
                      <span className="min-w-0 flex-1 truncate">{cmd.label}</span>
                      <span className="shrink-0 truncate text-xs text-gray-500 font-[family-name:var(--font-jetbrains)]">
                        {cmd.hint}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-2.5 text-[11px] text-gray-500 font-[family-name:var(--font-jetbrains)]">
              <span aria-hidden>↑↓ move · ↵ open</span>
              <span role="status" className="truncate text-violet-300">
                {note}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
