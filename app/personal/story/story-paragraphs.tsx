import type { ReactNode } from "react";
import Icon from "../scrapbook-icon";
import styles from "./story.module.css";

export type StoryRun = { text: string; bold?: boolean; italic?: boolean; href?: string };
export type StoryParagraph = string | { runs: StoryRun[] };
type TextLink = { start: number; end: number; href: string };
const textOf = (runs: StoryRun[]) => runs.map(run => run.text).join("");

function safeUrl(value: string) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

function linksIn(runs: StoryRun[]): TextLink[] {
  const links: TextLink[] = [];
  let position = 0;
  for (const run of runs) {
    const href = run.href ? safeUrl(run.href) : null;
    if (href) {
      const previous = links[links.length - 1];
      if (previous?.href === href && previous.end === position) previous.end += run.text.length;
      else links.push({ start: position, end: position + run.text.length, href });
    }
    position += run.text.length;
  }
  // Detect URLs across formatting boundaries, with surrounding prose punctuation excluded.
  for (const match of textOf(runs).matchAll(/https?:\/\/[^\s<>"\[\]]+/g)) {
    let value = match[0].replace(/[.,;:!?]+$/, "");
    while (value.endsWith(")") && (value.match(/\)/g)?.length ?? 0) > (value.match(/\(/g)?.length ?? 0)) value = value.slice(0, -1);
    const start = match.index!, end = start + value.length, href = safeUrl(value);
    if (href && !links.some(link => start < link.end && end > link.start)) links.push({ start, end, href });
  }
  return links.sort((a, b) => a.start - b.start);
}

function StyledText({ runs, start, end }: { runs: StoryRun[]; start: number; end: number }) {
  let offset = 0;
  return <>{runs.map((run, index) => {
    const left = Math.max(start, offset), right = Math.min(end, offset + run.text.length);
    const text = run.text.slice(Math.max(0, left - offset), Math.max(0, right - offset));
    offset += run.text.length;
    if (right <= left) return null;
    let content: ReactNode = text;
    if (run.bold) content = <strong>{content}</strong>;
    if (run.italic) content = <em>{content}</em>;
    return <span key={index}>{content}</span>;
  })}</>;
}

function InlineText({ runs, links }: { runs: StoryRun[]; links: TextLink[] }) {
  const parts: ReactNode[] = [];
  let position = 0;
  links.forEach((link, index) => {
    parts.push(<StyledText key={`text-${index}`} runs={runs} start={position} end={link.start} />);
    parts.push(<a key={`link-${index}`} href={link.href} target="_blank" rel="noopener noreferrer" title="Opens in a new tab" className={styles.inlineStoryLink}><StyledText runs={runs} start={link.start} end={link.end} /></a>);
    position = link.end;
  });
  parts.push(<StyledText key="remainder" runs={runs} start={position} end={textOf(runs).length} />);
  return <>{parts}</>;
}

export default function StoryParagraphs({ paragraphs }: { paragraphs: StoryParagraph[] }) {
  return <>{paragraphs.map((paragraph, index) => {
    const runs = typeof paragraph === "string" ? [{ text: paragraph }] : paragraph.runs;
    const text = textOf(runs);
    if (/^[\u2014\u2013*\s-]+$/.test(text)) return <hr key={index} className={styles.sceneBreak} />;
    const links = linksIn(runs);
    const koFi = links.find(link => ["ko-fi.com", "www.ko-fi.com"].includes(new URL(link.href).hostname));
    if (/^\[note\b/i.test(text) && koFi) {
      const explicit = /\bnsfw\b/i.test(text);
      const note = text.replace(/^\[note\s*[:-]?\s*/i, "").replace(/\]$/, "").replace(text.slice(koFi.start, koFi.end), "Ko-fi");
      return <aside key={index} className={styles.storyNote} aria-label="Author’s note">
        <span className={styles.noteLabel}>{explicit ? "NSFW EXTRA" : "AUTHOR’S NOTE"}</span>
        <p>{explicit ? "This part continues on Ko-fi (NSFW)." : note}</p>
        <a href={koFi.href} target="_blank" rel="noopener noreferrer" className={styles.storyLinkButton}>Read on Ko-fi <Icon name="arrow" /><span className={styles.visuallyHidden}> (opens in a new tab)</span></a>
      </aside>;
    }
    return <p key={index}><InlineText runs={runs} links={links} /></p>;
  })}</>;
}
