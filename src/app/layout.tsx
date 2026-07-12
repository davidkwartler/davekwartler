import type { Metadata } from "next";
import {
  Playfair_Display,
  Schibsted_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const siteDescription =
  "Personal website of David Kwartler, a Senior Product Manager in Austin, TX working on identity connectivity, consent, and AI agent authorization.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.davidkwartler.com"),
  title: "David Kwartler",
  description: siteDescription,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "David Kwartler",
    description:
      "Identity nerd, travel-tech PM, occasional race car driver.",
    url: "https://www.davidkwartler.com",
    siteName: "David Kwartler",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "David Kwartler: Senior Product Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "David Kwartler",
    description:
      "Identity nerd, travel-tech PM, occasional race car driver.",
    images: ["/og.jpg"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "David Kwartler",
  jobTitle: "Senior Product Manager",
  worksFor: {
    "@type": "Organization",
    name: "Expedia Group",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "The George Washington University",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Austin",
    addressRegion: "TX",
    addressCountry: "US",
  },
  url: "https://www.davidkwartler.com",
  image: "https://www.davidkwartler.com/dk-headshot.jpg",
  sameAs: [
    "https://www.linkedin.com/in/dkwartler/",
    "https://github.com/davidkwartler",
  ],
  knowsAbout: [
    "Identity and Access Management",
    "AI Agent Authorization",
    "OAuth 2.0",
    "OpenID Connect",
    "Product Management",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${schibstedGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
