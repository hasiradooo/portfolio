import manuscript from "./manuscript.json";

// This file is imported by Server Components only. The sidebar receives just
// chapter labels, so the full manuscript is not shipped in the client bundle.
export const chapters = manuscript.chapters;
export const characters = manuscript.characters;
export const chapterHref = (slug: string) => `/personal/story/${slug}`;
export const chapterIndex = chapters.map(({ number, slug, title }) => ({ number, slug, title }));
