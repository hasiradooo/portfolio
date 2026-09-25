export type StoryRun = {
	text: string;
	bold?: boolean;
	italic?: boolean;
	href?: string;
};
export type Voice = {
	kind: "speech" | "memory" | "message";
	speaker: string;
	to?: string[];
	overlap?: string;
};
export type StoryParagraph = string | { runs: StoryRun[]; voice?: Voice };
export type ParsedParagraph = { runs: StoryRun[]; voice?: Voice };

/** Version 1: a marker at the start of the SAME paragraph, followed by styled text. */
export function parseParagraph(paragraph: StoryParagraph): ParsedParagraph {
	const runs =
		typeof paragraph === "string" ? [{ text: paragraph }] : paragraph.runs;
	if (typeof paragraph !== "string" && paragraph.voice)
		return { runs, voice: paragraph.voice };
	const text = runs.map((run) => run.text).join("");
	const marker = text.match(
		/^\[\[(speech|memory|message) speaker=([a-z][a-z0-9-]*)(?: to=([a-z][a-z0-9-]*(?:,[a-z][a-z0-9-]*)*))?(?: overlap=([a-z][a-z0-9-]*))?\]\][ \t]*/,
	);
	if (!marker || (marker[4] && marker[1] !== "speech")) return { runs };
	// Invalid/empty input stays visible for correction, never silently discarded.
	if (!text.slice(marker[0].length).trim()) return { runs };
	let remaining = marker[0].length;
	const body = runs.flatMap((run) => {
		const skip = Math.min(remaining, run.text.length);
		remaining -= skip;
		return skip === run.text.length
			? []
			: [{ ...run, text: run.text.slice(skip) }];
	});
	return {
		runs: body,
		voice: {
			kind: marker[1] as Voice["kind"],
			speaker: marker[2],
			to: marker[3]?.split(","),
			overlap: marker[4],
		},
	};
}

export function voiceName(id: string) {
	if (id === "unknown") return "???";
	if (id === "ex") return "Kiro’s ex";
	if (id === "father") return "Kiro’s father";
	if (id === "mother") return "Kiro’s mother";
	if (id === "all") return "everyone";
	return id
		.split("-")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}
