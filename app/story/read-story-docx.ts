import { readFileSync } from "node:fs";
import path from "node:path";
import { unzipSync, strFromU8 } from "fflate";
import { DOMParser, type Element, type Node } from "@xmldom/xmldom";
import type { StoryParagraph, StoryRun } from "./dialogue-schema";

export type Chapter = {
	number: number;
	slug: string;
	title: string;
	minutes: number;
	paragraphs: StoryParagraph[];
};
const W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
const elements = (node: Node): Element[] =>
	Array.from(node.childNodes).filter((n): n is Element => n.nodeType === 1);
const child = (node: Node | undefined, name: string) =>
	node &&
	elements(node).find((n) => n.namespaceURI === W && n.localName === name);
const val = (node: Element | undefined) => node?.getAttributeNS(W, "val") ?? "";
type Marks = { bold?: boolean; italic?: boolean };
function marks(node: Element | undefined, base: Marks): Marks {
	const result = { ...base };
	for (const [tag, key] of [
		["b", "bold"],
		["i", "italic"],
	] as const) {
		const entry = child(node, tag);
		if (entry)
			result[key] = !["0", "false", "off"].includes(val(entry).toLowerCase());
	}
	return result;
}
export const paragraphText = (p: StoryParagraph) =>
	typeof p === "string" ? p : p.runs.map((r) => r.text).join("");

/** Read trusted, author-owned DOCX on the server. No HTML injection or browser download. */
export function readStoryDocx(
	filename = path.join(process.cwd(), "content", "kiro-story.docx"),
): Chapter[] {
	const archive = unzipSync(readFileSync(filename), {
		filter: (entry) =>
			[
				"word/document.xml",
				"word/styles.xml",
				"word/_rels/document.xml.rels",
			].includes(entry.name),
	});
	function xml(name: string) {
		const bytes = archive[name];
		if (!bytes) throw new Error(`Story DOCX is missing ${name}`);
		const text = strFromU8(bytes);
		if (/<!DOCTYPE/i.test(text))
			throw new Error("DOCTYPE is not supported in story DOCX files");
		return new DOMParser().parseFromString(text, "application/xml");
	}
	const document = xml("word/document.xml");
	const styleDoc = xml("word/styles.xml");
	const relDoc = xml("word/_rels/document.xml.rels");
	const relationships = new Map(
		elements(relDoc.documentElement!).map((n) => [
			n.getAttribute("Id"),
			n.getAttribute("Target") ?? "",
		]),
	);
	const styles = new Map(
		Array.from(styleDoc.getElementsByTagNameNS(W, "style")).map((n) => [
			n.getAttributeNS(W, "styleId"),
			n,
		]),
	);
	const defaults = marks(
		child(
			child(child(styleDoc.documentElement!, "docDefaults"), "rPrDefault"),
			"rPr",
		),
		{},
	);
	function inherit(id: string, seen: string[] = []): Marks {
		const style = styles.get(id);
		if (!style || seen.includes(id)) return {};
		return marks(
			child(style, "rPr"),
			inherit(val(child(style, "basedOn")), [...seen, id]),
		);
	}
	const body = document.getElementsByTagNameNS(W, "body")[0];
	if (!body) throw new Error("Story DOCX has no body");
	const chapters: Chapter[] = [];
	for (const p of elements(body)) {
		if (p.localName !== "p") {
			if (p.localName === "tbl")
				throw new Error(
					"Story tables are not supported; use ordinary paragraphs",
				);
			continue;
		}
		const style = val(child(child(p, "pPr"), "pStyle")) || "Normal";
		const base = { ...defaults, ...inherit(style) };
		const runs: StoryRun[] = [];
		function visit(n: Element, href?: string) {
			if (n.namespaceURI !== W || n.localName === "del") return;
			if (n.localName === "hyperlink")
				href = relationships.get(n.getAttributeNS(R, "id"));
			if (n.localName === "r") {
				const props = child(n, "rPr");
				const formatting = marks(props, {
					...base,
					...inherit(val(child(props, "rStyle"))),
				});
				const text = elements(n)
					.map((c) =>
						c.localName === "t"
							? c.textContent
							: ["br", "cr"].includes(c.localName ?? "")
								? "\n"
								: c.localName === "tab"
									? "\t"
									: "",
					)
					.join("");
				if (text) {
					const run: StoryRun = {
						text,
						...(formatting.bold ? { bold: true } : {}),
						...(formatting.italic ? { italic: true } : {}),
						...(href ? { href } : {}),
					};
					const previous = runs.at(-1);
					if (
						previous &&
						previous.bold === run.bold &&
						previous.italic === run.italic &&
						previous.href === run.href
					)
						previous.text += text;
					else runs.push(run);
				}
			} else elements(n).forEach((c) => visit(c, href));
		}
		visit(p);
		const text = runs.map((r) => r.text).join("");
		if (!text.trim()) continue;
		if (["Title", "Heading1"].includes(style)) {
			if (
				chapters.at(-1)?.title === text.trim() &&
				!chapters.at(-1)!.paragraphs.length
			)
				continue;
			const title = text.trim();
			const slug = title
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/^-|-$/g, "");
			if (!slug || chapters.some((c) => c.slug === slug))
				throw new Error(`Duplicate or invalid chapter title: ${title}`);
			chapters.push({
				number: chapters.length + 1,
				slug,
				title,
				minutes: 1,
				paragraphs: [],
			});
			continue;
		}
		const chapter = chapters.at(-1);
		if (!chapter)
			throw new Error(
				"The DOCX must begin with a Title or Heading 1 chapter title",
			);
		const todo = "// TODO: add link to ko-fi for nsfw part";
		let selected = runs;
		if (text.includes(todo)) {
			if (chapter.slug !== "upstairs")
				throw new Error("Unexpected Ko-fi TODO outside Upstairs");
			let remaining = text.indexOf(todo);
			selected = runs.flatMap((run) => {
				const part = run.text.slice(0, Math.max(0, remaining));
				remaining -= run.text.length;
				return part ? [{ ...run, text: part }] : [];
			});
		}
		chapter.paragraphs.push(
			selected.some((r) => Object.keys(r).length > 1)
				? { runs: selected }
				: selected.map((r) => r.text).join(""),
		);
		if (text.includes(todo))
			chapter.paragraphs.push(
				"[NOTE: NSFW PART on https://ko-fi.com/hasiradooo]",
			);
	}
	if (!chapters.length || chapters.some((c) => !c.paragraphs.length))
		throw new Error("The story contains no chapters or an empty chapter");
	for (const chapter of chapters) {
		const text = chapter.paragraphs
			.map((p) => paragraphText(p).replace(/\[\[.*?\]\]/g, ""))
			.join(" ");
		chapter.minutes = Math.max(
			1,
			Math.ceil(text.trim().split(/\s+/).length / 220),
		);
	}
	return chapters;
}
