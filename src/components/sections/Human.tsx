"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Reveal } from "@/components/Reveal";

const photos = [
  {
    src: "/corvette.jpg",
    alt: "Corvette racing at New England Dragway",
    caption: "Motorsports",
    drift: 28,
  },
  {
    src: "/david-nyc.JPG",
    alt: "David in New York City",
    caption: "Travel",
    drift: -36,
  },
  {
    src: "/bike-austin.jpg",
    alt: "Biking the Town Lake Trail in Austin",
    caption: "Fitness",
    drift: 22,
  },
];

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
        className="aspect-[4/5] w-full rounded-xl object-cover ring-1 ring-white/10"
      />
      <figcaption className="text-center text-sm text-gray-500">
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
      className="relative scroll-mt-20 px-4 py-28 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 font-[family-name:var(--font-geist-mono)]">
            Off the clock
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl font-[family-name:var(--font-playfair)] tracking-wide">
            The human parts.
          </h2>
        </Reveal>
        <Reveal delay={0.07}>
          <p className="mt-6 max-w-2xl text-gray-300 leading-relaxed">
            I grew up in Boston, studied in DC, and live in Austin. Away from
            work I chase momentum: track days in a Porsche Cayman, long rides
            on the Town Lake trail, and about 80 live shows a year that feed a
            growing vinyl habit. I travel for food, art museums, and good
            music. At home, my cat Rey is in charge.
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
      </div>
    </section>
  );
}
