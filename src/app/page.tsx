import Footer from "@/components/Footer";
import PauseMotionButton from "@/components/PauseMotionButton";
import SkipArrow from "@/components/SkipArrow";
import { SiteNav } from "@/components/SiteNav";
import Hero from "@/components/sections/Hero";
import WhatIDo from "@/components/sections/WhatIDo";
import Career from "@/components/sections/Career";
import Human from "@/components/sections/Human";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main-content" tabIndex={-1} className="bg-neutral-950">
        <Hero />
        <WhatIDo />
        <Career />
        <Human />
        <Contact />
      </main>
      <Footer />
      <SkipArrow />
      <PauseMotionButton />
    </>
  );
}
