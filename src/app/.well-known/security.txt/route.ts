import { contact } from "@/data/content";

export const dynamic = "force-static";

// RFC 9116. Generated at build so Expires (required, at most a year out)
// moves forward with every deploy instead of going stale in public/.
export function GET() {
  const expires = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000);
  const body = [
    `Contact: mailto:${contact.email}`,
    `Expires: ${expires.toISOString().replace(/\.\d+Z$/, "Z")}`,
    "Preferred-Languages: en",
    "Canonical: https://www.davidkwartler.com/.well-known/security.txt",
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
