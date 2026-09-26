import type { StoryParagraph } from "./dialogue-schema";

export type StorySection = { mature: boolean; paragraphs: StoryParagraph[] };

/** Markers are standalone Word paragraphs; runs and dialogue metadata stay intact. */
export function splitStorySections(paragraphs: StoryParagraph[], chapterTitle = "chapter"): StorySection[] {
	const sections: StorySection[] = [];
	let mature = false;
	let pending: StoryParagraph[] = [];
	function flush() {
		if (pending.length) sections.push({ mature, paragraphs: pending });
		pending = [];
	}
	function invalid(reason: string): never {
		throw new Error(`${chapterTitle}: ${reason} Use [[nsfw]] and [[/nsfw]] in separate paragraphs around each adult passage.`);
	}
	for (const paragraph of paragraphs) {
		const text = (typeof paragraph === "string" ? paragraph : paragraph.runs.map((run) => run.text).join("")).trim();
		if (/^\[\[nsfw\]\]$/i.test(text)) {
			if (mature) invalid("NSFW sections cannot be nested.");
			flush(); mature = true;
		} else if (/^\[\[\/nsfw\]\]$/i.test(text)) {
			if (!mature) invalid("Found an NSFW closing marker without an opening marker.");
			if (!pending.length) invalid("The NSFW section is empty.");
			flush(); mature = false;
		} else {
			if (/\[\[\/?nsfw\]\]/i.test(text)) invalid("An NSFW marker shares a paragraph with story text.");
			pending.push(paragraph);
		}
	}
	if (mature) invalid("The NSFW section is missing its closing marker before the chapter ends.");
	flush();
	return sections;
}
