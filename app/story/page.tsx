import Link from "next/link";
import Icon from "@/app/_scrapbook/scrapbook-icon";
import { chapters, characters, chapterHref } from "./story-data";
import { storyMetadata } from "./story-meta";
import styles from "./story.module.css";

export const metadata = storyMetadata("Kiro’s story", "/story", "A story by hasira. Meet Kiro, Rin and Susie, and follow their lives one chapter at a time.");
export default function StoryHome() {
  return <>
    <section className={styles.cover}>
      <span className={styles.tape} aria-hidden="true" />
      <p className={styles.label}>FICTION / BY HASIRA / A LITTLE PIECE OF MY WORLD</p>
      <h1>everybody’s<br /><em>carrying something.</em></h1>
      <p className={styles.coverNote}>this is Kiro’s story.</p>
      <p className={styles.intro}>A fox-cat in a sheep-covered sweater. A black cat with a dark hoodie and dry humor. A badger with a soft spot for old CDs and second-hand things.</p>
      <p className={styles.intro}>Come in. Get to know Kiro, Rin and Susie: the small moments, the messy feelings, and everything they don’t quite know how to say.</p>
      <div className={styles.actions}><Link className={styles.primary} href={chapterHref(chapters[0].slug)}>start reading <Icon name="arrow" /></Link><Link href="/story/characters">meet the characters</Link></div>
      <span className={styles.coverStamp}>{chapters.length}<small>chapters<br />inside</small></span>
    </section>
    <aside className={styles.contentNote}><strong>A note before you turn the page</strong><p>This story contains strong language, trauma, self-harm and suicidal themes, and adult relationships. Read at your own pace.</p></aside>
    <div className={styles.sectionHeading}><h2>the people between the pages.</h2><span>imperfect, all of them ♡</span></div>
    <div className={styles.characterTeasers}>{characters.map((character, i) => <Link href={`/story/characters#${character.name.toLowerCase()}`} key={character.name} className={styles.characterTeaser} style={{ transform: `rotate(${i === 1 ? 2 : -2}deg)` }}><span className={styles.pin} aria-hidden="true" /><span className={styles.characterInitial} style={{ background: character.color }}>{character.name[0]}<small>{character.kind}</small></span><h3>{character.name}</h3><p>{character.tagline}</p></Link>)}</div>
    <p className={styles.bottomNote}>pick a chapter. stay for a while. <Icon name="curve" /></p>
  </>;
}
