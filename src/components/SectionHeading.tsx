// Shared eyebrow-label + heading block that opens each section.
export function SectionHeading({
  label,
  heading,
  as: Tag = "h2",
}: {
  label: string;
  heading: string;
  as?: "h1" | "h2";
}) {
  return (
    <>
      <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 font-[family-name:var(--font-jetbrains)]">
        {label}
      </p>
      <Tag className="mt-3 text-4xl font-bold text-balance text-white sm:text-5xl font-[family-name:var(--font-playfair)] tracking-wide">
        {heading}
      </Tag>
    </>
  );
}
