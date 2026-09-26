import choices from "./chapter-music.json";
export type ChapterTrack = {
	title: string;
	artist: string;
	youtubeUrl: string | null;
};
export function youtubeIdFromUrl(value: string): string | null {
	try {
		const url = new URL(value);
		if (!["https:", "http:"].includes(url.protocol)) return null;
		const host = url.hostname.toLowerCase();
		let id: string | null = null;
		if (host === "youtu.be") id = url.pathname.slice(1).split("/")[0];
		if (
			[
				"youtube.com",
				"www.youtube.com",
				"m.youtube.com",
				"youtube-nocookie.com",
				"www.youtube-nocookie.com",
			].includes(host)
		) {
			if (url.pathname === "/watch") id = url.searchParams.get("v");
			else if (/^\/(embed|shorts|live)\//.test(url.pathname))
				id = url.pathname.split("/")[2];
		}
		return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
	} catch {
		return null;
	}
}
export function chapterTrack(slug: string): ChapterTrack {
	return (
		(choices as Record<string, ChapterTrack>)[slug] ?? {
			title: "",
			artist: "",
			youtubeUrl: null,
		}
	);
}
