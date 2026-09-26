import ChapterCassette from "../chapter-cassette";
import { chapterTrack, youtubeIdFromUrl } from "../chapter-music";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/app/_scrapbook/scrapbook-icon";
import { chapters, chapterHref } from "../story-data";
import { storyMetadata } from "../story-meta";
import StoryParagraphs from "../story-paragraphs";
import MatureSection from "../mature-section";
import styles from "../story.module.css";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
	return chapters.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
	const { slug } = await params;
	const chapter = chapters.find((c) => c.slug === slug);
	if (!chapter) notFound();
	return storyMetadata(
		`${chapter.number}. ${chapter.title}`,
		chapterHref(slug),
		`Chapter ${chapter.number} of Kiro’s story by hasira: ${chapter.title}.`,
	);
}
export default async function ChapterPage({ params }: Props) {
	const { slug } = await params;
	const index = chapters.findIndex((c) => c.slug === slug);
	if (index === -1) notFound();
	const chapter = chapters[index],
		previous = chapters[index - 1],
		next = chapters[index + 1];
	const music = chapterTrack(slug);
	const hasInlineMusic = chapter.paragraphs.some(
		(p) =>
			typeof p !== "string" &&
			p.runs.some(
				(r) =>
					"href" in r && typeof r.href === "string" && youtubeIdFromUrl(r.href),
			),
	);
	return (
		<>
			<article className={styles.sheet}>
				<span className={styles.tape} aria-hidden="true" />
				<header className={styles.chapterHeader}>
					<p className={styles.label}>
						KIRO’S STORY / CHAPTER {String(chapter.number).padStart(2, "0")} OF{" "}
						{chapters.length}
					</p>
					<h1>{chapter.title}</h1>
					<p className={styles.readingTime}>
						by hasira · about {chapter.minutes} min read
					</p>
				</header>
				{!hasInlineMusic && (
					<ChapterCassette
						key={slug}
						track={music}
						chapterTitle={chapter.title}
						number={chapter.number}
					/>
				)}
				<div className={styles.prose}>
					{chapter.sections.map((section, sectionIndex) => section.mature ? (
						<MatureSection key={`${slug}-${sectionIndex}`}>
							<StoryParagraphs paragraphs={section.paragraphs} music={music} />
						</MatureSection>
					) : (
						<StoryParagraphs key={`${slug}-${sectionIndex}`} paragraphs={section.paragraphs} music={music} />
					))}
				</div>
				<div className={styles.chapterEnd}>
					✶<span>end of chapter {chapter.number}</span>✶
				</div>
			</article>
			<nav className={styles.pageTurns} aria-label="Previous and next chapter">
				<Link href={previous ? chapterHref(previous.slug) : "/story"}>
					<Icon name="back" />
					<span>
						<small>{previous ? "PREVIOUS CHAPTER" : "BACK TO"}</small>
						{previous?.title ?? "the notebook"}
					</span>
				</Link>
				{next ? (
					<Link href={chapterHref(next.slug)}>
						<span>
							<small>NEXT CHAPTER</small>
							{next.title}
						</span>
						<Icon name="arrow" />
					</Link>
				) : (
					<Link href="/story/characters">
						<span>
							<small>CAUGHT UP! VISIT</small>the characters
						</span>
						<Icon name="arrow" />
					</Link>
				)}
			</nav>
			<a className={styles.backToTop} href="#story-content">
				back to the top <Icon name="curve" />
			</a>
		</>
	);
}
