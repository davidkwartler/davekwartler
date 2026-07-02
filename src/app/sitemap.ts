import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.davidkwartler.com";
  return [
    { url: base, priority: 1 },
    { url: `${base}/about`, priority: 0.8 },
    { url: `${base}/work`, priority: 0.8 },
  ];
}
