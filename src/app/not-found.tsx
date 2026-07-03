import Link from "next/link";
import Footer from "@/components/Footer";
import GalaxyBackground from "@/components/GalaxyBackground";
import { SiteNav } from "@/components/SiteNav";

export const metadata = {
  title: "404 - David Kwartler",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-neutral-950 px-4 pt-16 text-center sm:px-6">
        <div className="absolute inset-0 -z-10">
          <GalaxyBackground timeScale={0.6} dim={0.8} starCount={110} />
        </div>

        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 font-[family-name:var(--font-jetbrains)]">
          error=&quot;invalid_request&quot;
        </p>
        <h1 className="mt-4 text-7xl font-bold text-white sm:text-8xl font-[family-name:var(--font-playfair)] tracking-wide">
          401
        </h1>
        <p className="mt-6 max-w-md text-lg text-gray-300">
          You don&apos;t have permission to be here.
        </p>
        <p className="mt-2 max-w-md text-gray-400">
          Kidding. It&apos;s a 404, and this page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block rounded-full bg-white/90 px-7 py-3.5 font-medium text-neutral-900 transition-all duration-300 hover:bg-white hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] active:scale-[0.98]"
        >
          Request a valid scope
        </Link>
        <p className="mt-3 text-sm text-gray-600">(take me home)</p>
      </main>
      <Footer />
    </>
  );
}
