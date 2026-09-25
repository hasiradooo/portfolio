import type { Metadata, Viewport } from "next";
import PersonalScrapbook from "./_scrapbook/personal-scrapbook";

export const metadata: Metadata = {
	metadataBase: new URL("https://hasira.me"),
	title: { absolute: "Kiro’s world | hasira" },
	description:
		"Krystian, Kris, Kiro (hasira). Designer, developer, sometimes artist. A scrapbook of art, autumn, music and a little chaos.",
	alternates: { canonical: "/" },
	openGraph: {
		title: "Kiro’s little corner of the internet",
		description:
			"A very personal collection of things I love. Come hang out :3",
		url: "/",
		type: "website",
		images: [
			{
				url: "/scrapbook/hasira-personal-og.png",
				width: 1200,
				height: 630,
				alt: "Kiro’s world: a personal scrapbook of art, music and minerals",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		images: [
			{
				url: "/scrapbook/hasira-personal-og.png",
				alt: "Kiro’s world: a personal scrapbook of art, music and minerals",
			},
		],
		title: "Kiro’s little corner of the internet",
		description: "Art, autumn, music and a little chaos. Come hang out :3",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	viewportFit: "cover",
	themeColor: "#2142c7",
	colorScheme: "light",
};

export default function PersonalPage() {
	return <PersonalScrapbook />;
}
