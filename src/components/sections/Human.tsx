"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { human } from "@/data/content";

const photos = human.photos;

function ParallaxPhoto({
  photo,
  progress,
  className = "",
}: {
  photo: (typeof photos)[number];
  progress: MotionValue<number>;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const y = useTransform(progress, [0, 1], [photo.drift, -photo.drift]);

  return (
    <motion.figure
      style={prefersReducedMotion ? undefined : { y }}
      className={`space-y-2 ${className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={600}
        height={450}
        className={`aspect-[4/5] w-full rounded-xl object-cover ring-1 ring-white/10 ${photo.imgClass ?? ""}`}
      />
      <figcaption className="text-center text-sm text-gray-500">
        {/* Hidden easter egg: the Travel label links to /travel. Styled like a
            plain caption label so it only reveals itself on hover. */}
        {photo.href ? (
          <Link
            href={photo.href}
            className="block font-semibold text-gray-300 underline-offset-4 transition-colors hover:underline"
          >
            {photo.label}
          </Link>
        ) : (
          <span className="block font-semibold text-gray-300">
            {photo.label}
          </span>
        )}
        {photo.caption}
      </figcaption>
    </motion.figure>
  );
}

export default function Human() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="about"
      ref={ref}
      className="relative -scroll-mt-20 px-4 py-28 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading label={human.label} heading={human.heading} />
        </Reveal>
        <Reveal delay={0.07}>
          <p className="mt-6 max-w-2xl text-gray-300 leading-relaxed">
            {human.intro}
          </p>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {photos.map((photo, i) => (
            <ParallaxPhoto
              key={photo.src}
              photo={photo}
              progress={scrollYProgress}
              className={i === 1 ? "sm:mt-10" : ""}
            />
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-xs text-gray-600 font-[family-name:var(--font-jetbrains)]">
            {human.photosCredit}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
