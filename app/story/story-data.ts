import manuscript from "./manuscript.json";

// This file is imported by Server Components only. The sidebar receives just
// chapter labels, so the full manuscript is not shipped in the client bundle.
export const chapters = manuscript.chapters;
export const characters = manuscript.characters;
export const characterPortraits: Record<string, { src: string; alt: string }> =
	{
		kiro: {
			src: "/story/characters/kiro.png",
			alt: "Kiro in an olive sheep-pattern sweater, sitting at a wooden desk with a laptop.",
		},
	};
export const chapterHref = (slug: string) => `/story/${slug}`;
export const chapterIndex = chapters.map(({ number, slug, title }) => ({
	number,
	slug,
	title,
}));
