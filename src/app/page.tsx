import Footer from "@/components/Footer";
import { SiteNav } from "@/components/SiteNav";
import HeadshotScrub from "@/components/HeadshotScrub";
import Hero from "@/components/sections/Hero";
import WhatIDo from "@/components/sections/WhatIDo";
import Career from "@/components/sections/Career";
import Human from "@/components/sections/Human";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <SiteNav />
      <HeadshotScrub />
      <main className="relative bg-neutral-950">
        <Hero />
        <WhatIDo />
        <Career />
        <Human />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
