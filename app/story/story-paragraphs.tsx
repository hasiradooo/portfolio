import ChapterCassette from "./chapter-cassette";
import { youtubeIdFromUrl, type ChapterTrack } from "./chapter-music";
import type { ReactNode } from "react";
import Icon from "@/app/_scrapbook/scrapbook-icon";
import styles from "./story.module.css";

import {
	parseParagraph,
	voiceName,
	type StoryRun,
	type StoryParagraph,
	type ParsedParagraph,
} from "./dialogue-schema";
import dialogue from "./dialogue.module.css";
export type { StoryRun, StoryParagraph } from "./dialogue-schema";
type TextLink = { start: number; end: number; href: string };
const textOf = (runs: StoryRun[]) => runs.map((run) => run.text).join("");

function safeUrl(value: string) {
	try {
		const url = new URL(value);
		return ["https:", "http:"].includes(url.protocol) ? url.href : null;
	} catch {
		return null;
	}
}

function linksIn(runs: StoryRun[]): TextLink[] {
	const links: TextLink[] = [];
	let position = 0;
	for (const run of runs) {
		const href = run.href ? safeUrl(run.href) : null;
		if (href) {
			const previous = links[links.length - 1];
			if (previous?.href === href && previous.end === position)
				previous.end += run.text.length;
			else
				links.push({ start: position, end: position + run.text.length, href });
		}
		position += run.text.length;
	}
	// Detect URLs across formatting boundaries, with surrounding prose punctuation excluded.
	for (const match of textOf(runs).matchAll(/https?:\/\/[^\s<>"\[\]]+/g)) {
		let value = match[0].replace(/[.,;:!?]+$/, "");
		while (
			value.endsWith(")") &&
			(value.match(/\)/g)?.length ?? 0) > (value.match(/\(/g)?.length ?? 0)
		)
			value = value.slice(0, -1);
		const start = match.index!,
			end = start + value.length,
			href = safeUrl(value);
		if (href && !links.some((link) => start < link.end && end > link.start))
			links.push({ start, end, href });
	}
	return links.sort((a, b) => a.start - b.start);
}

function StyledText({
	runs,
	start,
	end,
}: {
	runs: StoryRun[];
	start: number;
	end: number;
}) {
	let offset = 0;
	return (
		<>
			{runs.map((run, index) => {
				const left = Math.max(start, offset),
					right = Math.min(end, offset + run.text.length);
				const text = run.text.slice(
					Math.max(0, left - offset),
					Math.max(0, right - offset),
				);
				offset += run.text.length;
				if (right <= left) return null;
				let content: ReactNode = text;
				if (run.bold) content = <strong>{content}</strong>;
				if (run.italic) content = <em>{content}</em>;
				return <span key={index}>{content}</span>;
			})}
		</>
	);
}

function InlineText({ runs, links }: { runs: StoryRun[]; links: TextLink[] }) {
	const parts: ReactNode[] = [];
	let position = 0;
	links.forEach((link, index) => {
		parts.push(
			<StyledText
				key={`text-${index}`}
				runs={runs}
				start={position}
				end={link.start}
			/>,
		);
		parts.push(
			<a
				key={`link-${index}`}
				href={link.href}
				target="_blank"
				rel="noopener noreferrer"
				title="Opens in a new tab"
				className={styles.inlineStoryLink}
			>
				<StyledText runs={runs} start={link.start} end={link.end} />
			</a>,
		);
		position = link.end;
	});
	parts.push(
		<StyledText
			key="remainder"
			runs={runs}
			start={position}
			end={textOf(runs).length}
		/>,
	);
	return <>{parts}</>;
}

function VoiceParagraph({ paragraph }: { paragraph: ParsedParagraph }) {
	const voice = paragraph.voice!;
	return (
		<div
			className={dialogue.voice}
			data-speaker={voice.speaker}
			data-kind={voice.kind}
		>
			<div className={dialogue.tag}>
				<span className={dialogue.name}>{voiceName(voice.speaker)}</span>
				{voice.kind !== "speech" && (
					<span className={dialogue.kind}>
						{voice.kind === "memory" ? "remembered" : "message"}
					</span>
				)}
				{voice.to?.length ? (
					<span className={dialogue.recipient}>
						to {voice.to.map(voiceName).join(", ")}
					</span>
				) : null}
			</div>
			<div className={dialogue.body}>
				<p>
					<InlineText runs={paragraph.runs} links={linksIn(paragraph.runs)} />
				</p>
			</div>
		</div>
	);
}

function PlainParagraph({
	runs,
	music,
}: {
	runs: StoryRun[];
	music?: ChapterTrack;
}) {
	const text = textOf(runs);
	if (/^[\u2014\u2013*\s-]+$/.test(text))
		return <hr className={styles.sceneBreak} />;
	const links = linksIn(runs);
	const youtube = links.find((link) => youtubeIdFromUrl(link.href));
	if (youtube) {
		const track = music?.youtubeUrl
			? music
			: {
					title: text.replace(/^Song:\s*/i, ""),
					artist: "",
					youtubeUrl: youtube.href,
				};
		return (
			<>
				{!/^Song:/i.test(text) && (
					<p>
						<InlineText runs={runs} links={links} />
					</p>
				)}
				<ChapterCassette key={track.youtubeUrl} track={track} />
			</>
		);
	}
	const koFi = links.find((link) =>
		["ko-fi.com", "www.ko-fi.com"].includes(new URL(link.href).hostname),
	);
	if (/^\[note\b/i.test(text) && koFi) {
		const explicit = /\bnsfw\b/i.test(text);
		const note = text
			.replace(/^\[note\s*[:-]?\s*/i, "")
			.replace(/\]$/, "")
			.replace(text.slice(koFi.start, koFi.end), "Ko-fi");
		return (
			<aside className={styles.storyNote} aria-label="Author’s note">
				<span className={styles.noteLabel}>
					{explicit ? "NSFW EXTRA" : "AUTHOR’S NOTE"}
				</span>
				<p>{explicit ? "This part continues on Ko-fi (NSFW)." : note}</p>
				<a
					href={koFi.href}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.storyLinkButton}
				>
					Read on Ko-fi <Icon name="arrow" />
					<span className={styles.visuallyHidden}> (opens in a new tab)</span>
				</a>
			</aside>
		);
	}
	return (
		<p>
			<InlineText runs={runs} links={links} />
		</p>
	);
}

export default function StoryParagraphs({
	paragraphs,
	music,
}: {
	paragraphs: StoryParagraph[];
	music?: ChapterTrack;
}) {
	const parsed = paragraphs.map(parseParagraph);
	const output: ReactNode[] = [];
	for (let index = 0; index < parsed.length; index++) {
		const paragraph = parsed[index];
		const overlap =
			paragraph.voice?.kind === "speech" ? paragraph.voice.overlap : undefined;
		let end = index + 1;
		if (overlap)
			while (
				end < parsed.length &&
				parsed[end].voice?.kind === "speech" &&
				parsed[end].voice?.overlap === overlap
			)
				end++;
		if (overlap && end > index + 1) {
			output.push(
				<section
					key={index}
					className={dialogue.overlap}
					aria-label="Overlapping voices"
				>
					<span className={dialogue.overlapHeading}>
						overlapping voices / at the same time
					</span>
					{parsed.slice(index, end).map((part, offset) => (
						<VoiceParagraph key={offset} paragraph={part} />
					))}
				</section>,
			);
			index = end - 1;
		} else
			output.push(
				paragraph.voice ? (
					<VoiceParagraph key={index} paragraph={paragraph} />
				) : (
					<PlainParagraph key={index} runs={paragraph.runs} music={music} />
				),
			);
	}
	return <>{output}</>;
}
