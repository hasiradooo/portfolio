"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import ScrapbookBar from "@/app/_scrapbook/scrapbook-bar";
import Icon from "@/app/_scrapbook/scrapbook-icon";
import personal from "@/app/_scrapbook/personal.module.css";
import styles from "./story.module.css";

type Chapter = { number: number; slug: string; title: string };
export default function StoryShell({ chapters, children }: { chapters: Chapter[]; children: ReactNode }) {
  const pathname = usePathname();
  const [autumn, setAutumn] = useState(false);
  const menu = useRef<HTMLDetailsElement>(null);
  const active = chapters.find(c => pathname === `/story/${c.slug}`);
  useEffect(() => {
    if (menu.current) menu.current.open = window.matchMedia("(min-width: 901px)").matches;
    const selected = menu.current?.querySelector<HTMLElement>('[aria-current="page"]');
    const list = window.matchMedia("(min-width: 901px)").matches ? menu.current : menu.current?.querySelector<HTMLElement>('[data-chapter-list]');
    if (selected && list) list.scrollTop += selected.getBoundingClientRect().top - list.getBoundingClientRect().top - list.clientHeight / 3;
  }, [pathname]);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 901px)");
    const sync = () => { if (menu.current) menu.current.open = query.matches; };
    sync(); query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) return;
    const previous = meta.content;
    const color = autumn ? "#853c2c" : "#2142c7";
    meta.content = color;
    return () => { if (meta.isConnected && meta.content === color) meta.content = previous; };
  }, [autumn, pathname]);
  return (
    <div lang="en" className={`${personal.world} ${autumn ? personal.autumn : ""} ${styles.world}`} data-personal-page data-personal-palette={autumn ? "autumn" : "blue"}>
      <a href="#story-content" className={personal.skip}>Skip to story</a>
      <ScrapbookBar href="/" backLabel="back to my world" address="home / kiro / notebook.html">
        <button type="button" onClick={() => setAutumn(!autumn)} aria-pressed={autumn}>{autumn ? "bring back the blue" : "make it autumn"}</button>
      </ScrapbookBar>
      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Story navigation">
          <Link href="/story" className={styles.notebookTitle}>kiro’s<br /><span>notebook.</span><i aria-hidden="true">✶</i></Link>
          <p className={styles.sideNote}>a few lives, tangled together.</p>
          <details ref={menu} className={styles.contents} open>
            <summary>Chapters & characters <span>{active ? `${String(active.number).padStart(2, "0")} / ${chapters.length}` : "open"}</span></summary>
            <nav className={styles.nav} aria-label="Chapters and characters">
              <div className={styles.navIntro}>
                <Link href="/story" aria-current={pathname === "/story" ? "page" : undefined}>the beginning / about</Link>
                <Link href="/story/characters" aria-current={pathname === "/story/characters" ? "page" : undefined}>meet the characters <span>♡</span></Link>
              </div>
              <Link href="/story/dialogue-preview" aria-current={pathname === "/story/dialogue-preview" ? "page" : undefined} style={{ display: "block", padding: "12px", font: "12px/1.5 Courier New, monospace" }}>dialogue study / preview</Link>
              <p className={styles.navLabel}>THE CHAPTERS / {chapters.length} PAGES TO GET LOST IN</p>
              <ol className={styles.chapterList} data-chapter-list>
                {chapters.map(chapter => <li key={chapter.slug}><Link prefetch={false} href={`/story/${chapter.slug}`} aria-current={active?.slug === chapter.slug ? "page" : undefined}><span>{String(chapter.number).padStart(2, "0")}</span>{chapter.title}</Link></li>)}
              </ol>
            </nav>
          </details>
          <p className={styles.sidebarFooter}>written by hasira<br /><span>best read with something warm.</span></p>
        </aside>
        <div id="story-content" tabIndex={-1} className={styles.content} key={pathname}>{children}</div>
      </div>
      <footer className={styles.footer}>some stories take time. thanks for being here. ♡ <Link href="/">back to the scrapbook <Icon name="arrow" /></Link></footer>
    </div>
  );
}
