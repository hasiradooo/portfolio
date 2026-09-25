import Link from "next/link";
import {
	characters,
	chapters,
	chapterHref,
	characterPortraits,
} from "../story-data";
import { storyMetadata } from "../story-meta";
import StoryParagraphs from "../story-paragraphs";
import styles from "../story.module.css";

export const metadata = storyMetadata(
	"Meet the characters",
	"/story/characters",
	"Kiro, Rin, Susie and the recurring people in their lives. Character notes from Kiro’s story by hasira.",
);
export default function CharactersPage() {
	const groups = [
		{
			id: "main",
			title: "main characters",
			note: "Kiro, Rin and Susie. The heart of these pages.",
		},
		{
			id: "side",
			title: "side characters",
			note: "The people they meet, work with, and make room for.",
		},
	];
	return (
		<>
			<header className={styles.characterHeading}>
				<p className={styles.label}>THE CAST / LITTLE DETAILS & BIG FEELINGS</p>
				<h1>
					familiar <em>faces.</em>
				</h1>
				<p>{characters.length} familiar faces from the story.</p>
			</header>
			<p className={styles.castNote}>
				These characters appear in person. Their notes may mention later
				chapters.
			</p>
			{groups.map((group) => (
				<section
					key={group.id}
					className={styles.castSection}
					aria-labelledby={`${group.id}-characters`}
				>
					<header className={styles.castSectionHeading}>
						<h2 id={`${group.id}-characters`}>{group.title}</h2>
						<p>{group.note}</p>
					</header>
					<nav
						className={styles.characterTabs}
						aria-label={`${group.title} profiles`}
					>
						{characters
							.filter((c) => c.group === group.id)
							.map((c) => (
								<a
									key={c.name}
									href={`#${c.id}`}
									style={{ backgroundColor: c.color }}
								>
									{c.name}
								</a>
							))}
					</nav>
					<div className={styles.characterProfiles}>
						{characters
							.filter((c) => c.group === group.id)
							.map((character) => (
								<article
									id={character.id}
									key={character.name}
									className={styles.characterProfile}
								>
									<div className={styles.profileTop}>
										<div className={styles.profilePolaroid}>
											<span className={styles.pin} aria-hidden="true" />
											<div
												className={`${styles.profileInitial} ${characterPortraits[character.id] ? styles.portraitFrame : ""}`}
												style={{ background: character.color }}
											>
												{characterPortraits[character.id] ? (
													<img
														className={styles.portraitImage}
														src={characterPortraits[character.id].src}
														alt={characterPortraits[character.id].alt}
														width={1280}
														height={999}
														decoding="async"
													/>
												) : (
													<>
														{character.name[0]}
														<span>
															character file /{" "}
															{String(
																characters.findIndex(
																	(c) => c.id === character.id,
																) + 1,
															).padStart(2, "0")}
														</span>
													</>
												)}
											</div>
											<p>{character.tagline}</p>
										</div>
										<div>
											<span className={styles.label}>
												{character.group === "main" ? "MAIN CAST" : "SIDE CAST"}{" "}
												/ {character.kind}
											</span>
											<h2>{character.name}</h2>
											<p>{character.summary}</p>
										</div>
									</div>
									<details className={styles.characterNotes}>
										<summary>open the full character notes</summary>
										<div className={styles.prose}>
											<StoryParagraphs paragraphs={character.paragraphs} />
										</div>
										<nav
											className={styles.appearances}
											aria-label={`Chapters featuring ${character.name}`}
										>
											<span>IN THESE PAGES</span>
											{character.appearances.map((slug) => {
												const chapter = chapters.find((c) => c.slug === slug);
												return chapter ? (
													<Link key={slug} href={chapterHref(slug)}>
														{chapter.number}. {chapter.title}
													</Link>
												) : null;
											})}
										</nav>
									</details>
								</article>
							))}
					</div>
				</section>
			))}
			<div className={styles.actions}>
				<Link className={styles.primary} href={chapterHref(chapters[0].slug)}>
					meet them in chapter one
				</Link>
				<Link href="/story">back to the notebook</Link>
			</div>
		</>
	);
}
