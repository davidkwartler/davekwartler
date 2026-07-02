import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.davidkwartler.com";
  return [{ url: base, priority: 1 }];
}
