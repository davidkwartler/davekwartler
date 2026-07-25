"use client";

// Easter egg: clicking the eyebrow pulls up a random city card. Styled and
// cursored like plain text on purpose — it shouldn't read as a link.
export default function TravelLabel({ children }: { children: React.ReactNode }) {
  return (
    <h1
      onClick={() => window.dispatchEvent(new Event("travel:random"))}
      className="absolute inset-x-0 top-24 z-10 cursor-default select-none text-center text-sm font-semibold uppercase tracking-widest text-gray-500 font-[family-name:var(--font-jetbrains)]"
    >
      {children}
    </h1>
  );
}
