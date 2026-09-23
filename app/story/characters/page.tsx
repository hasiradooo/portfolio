import Link from "next/link";
import { characters, chapters, chapterHref } from "../story-data";
import { storyMetadata } from "../story-meta";
import StoryParagraphs from "../story-paragraphs";
import styles from "../story.module.css";

export const metadata = storyMetadata("Meet the characters", "/story/characters", "Kiro, Rin and Susie: character notes and little details from Kiro’s story by hasira.");
export default function CharactersPage() {
  return <>
    <header className={styles.characterHeading}><p className={styles.label}>THE CAST / LITTLE DETAILS & BIG FEELINGS</p><h1>familiar <em>faces.</em></h1><p>three people. a whole lot going on underneath.</p></header>
    <nav className={styles.characterTabs} aria-label="Character profiles">{characters.map(c => <a key={c.name} href={`#${c.name.toLowerCase()}`}>{c.name}</a>)}</nav>
    <div className={styles.characterProfiles}>{characters.map((character, i) => <article id={character.name.toLowerCase()} key={character.name} className={styles.characterProfile}>
      <div className={styles.profileTop}>
        <div className={styles.profilePolaroid}><span className={styles.pin} aria-hidden="true" /><div className={styles.profileInitial} style={{ background: character.color }}>{character.name[0]}<span>character file / 0{i + 1}</span></div><p>{character.tagline}</p></div>
        <div><span className={styles.label}>{character.kind}</span><h2>{character.name}</h2><p>{character.summary}</p></div>
      </div>
      <details className={styles.characterNotes}><summary>open the full character notes</summary><div className={styles.prose}><StoryParagraphs paragraphs={character.paragraphs} /></div></details>
    </article>)}</div>
    <div className={styles.actions}><Link className={styles.primary} href={chapterHref(chapters[0].slug)}>meet them in chapter one</Link><Link href="/story">back to the notebook</Link></div>
  </>;
}
