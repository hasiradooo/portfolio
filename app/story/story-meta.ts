import type { Metadata } from "next";
export function storyMetadata(
	title: string,
	path: string,
	description: string,
): Metadata {
	return {
		metadataBase: new URL("https://hasira.me"),
		title: { absolute: `${title} · Kiro’s notebook` },
		description,
		alternates: { canonical: path },
		openGraph: {
			title,
			description,
			url: path,
			type: "website",
			images: [
				{
					url: "/scrapbook/hasira-personal-og.png",
					width: 1200,
					height: 630,
					alt: "Kiro’s world",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: ["/scrapbook/hasira-personal-og.png"],
		},
	};
}
