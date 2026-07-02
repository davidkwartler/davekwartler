import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const siteDescription =
  "Personal website of David Kwartler, a Senior Product Manager in Austin, TX working on identity connectivity, consent, and AI agent authorization.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.davidkwartler.com"),
  title: "David Kwartler",
  description: siteDescription,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "David Kwartler",
    description:
      "Identity nerd, agentic-travel PM, occasional race car driver.",
    url: "https://www.davidkwartler.com",
    siteName: "David Kwartler",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "David Kwartler",
    description:
      "Identity nerd, agentic-travel PM, occasional race car driver.",
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
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
