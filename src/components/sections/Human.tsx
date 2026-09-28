import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowUpRightIcon } from "@/components/icons";
import { human } from "@/data/content";

// The three photos as a strip of film: sprocket holes, edge numbers in
// the amber of printed frame markings, and each frame's real exposure on
// hover. Phones get a swipeable strip; wider screens see the whole sheet.
export default function Human() {
  return (
    <section id="about" className="relative -scroll-mt-20 px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading label={human.label} heading={human.heading} />
        </Reveal>
        <Reveal delay={0.07}>
          <p className="mt-6 max-w-2xl leading-relaxed text-gray-300">
            {human.intro}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="film-strip mt-14 rounded-md border border-white/[0.07] bg-[#0d0d0f] px-3 py-7 sm:px-4">
            <div className="-mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0">
              {human.photos.map((photo, i) => (
                <figure
                  key={photo.src}
                  className="group w-[72%] shrink-0 snap-center sm:w-auto"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-neutral-900">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={600}
                      height={750}
                      sizes="(min-width: 640px) 33vw, 72vw"
                      className={`h-full w-full object-cover saturate-[0.9] transition duration-500 group-hover:scale-[1.03] group-hover:saturate-100 ${photo.imgClass ?? ""}`}
                    />
                    <p className="exif absolute inset-x-0 bottom-0 flex flex-wrap justify-between gap-x-2 bg-gradient-to-t from-black/85 to-transparent px-2.5 pb-2 pt-6 text-[10px] tracking-wide text-gray-200 transition duration-300 font-[family-name:var(--font-jetbrains)]">
                      <span>{photo.exif.aperture}</span>
                      <span>{photo.exif.shutter}s</span>
                      <span>ISO {photo.exif.iso}</span>
                      {photo.exif.ev && <span>{photo.exif.ev}</span>}
                    </p>
                  </div>
                  <div
                    aria-hidden
                    className="mt-1.5 flex justify-between text-[10px] text-amber-500/75 font-[family-name:var(--font-jetbrains)]"
                  >
                    <span>▸ {i + 1}</span>
                    <span>{i + 1}A</span>
                  </div>
                  <figcaption className="mt-1.5 text-sm text-gray-500">
                    {photo.href ? (
                      <Link
                        href={photo.href}
                        className="block font-semibold text-gray-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
                      >
                        {photo.label}
                      </Link>
                    ) : (
                      <span className="block font-semibold text-gray-300">
                        {photo.label}
                      </span>
                    )}
                    {photo.caption}
                    <span className="text-gray-500"> · {photo.exif.date}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <p className="text-xs text-gray-500 font-[family-name:var(--font-jetbrains)]">
              {human.camera} · {human.lens} · shot by me
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {human.elsewhere.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    <span>
                      {page.label}
                      <span className="text-gray-500">: {page.note}</span>
                    </span>
                    <ArrowUpRightIcon className="h-3 w-3 text-gray-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
