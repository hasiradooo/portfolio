import type { Metadata, Viewport } from "next";
import PersonalScrapbook from "./personal-scrapbook";

export const metadata: Metadata = {
  title: "Kiro’s little corner of the internet",
  description: "Krystian, Kris, Kiro (hasira). Designer, developer, sometimes artist. A scrapbook of art, autumn, music and a little chaos.",
  alternates: { canonical: "/personal" },
  openGraph: {
    title: "Kiro’s little corner of the internet",
    description: "A very personal collection of things I love. Come hang out :3",
    url: "/personal",
  },
  twitter: {
    title: "Kiro’s little corner of the internet",
    description: "Art, autumn, music and a little chaos. Come hang out :3",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 5, userScalable: true };

export default function PersonalPage() {
  return <PersonalScrapbook />;
}
