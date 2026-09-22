"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { BIRTH_DATE, FURSONA_IMAGE, MINERAL_PHOTO, favoriteBands, personalAge } from "@/lib/personal";
import styles from "./personal.module.css";

const tilt = (rotation: string) => ({ "--tilt": rotation } as CSSProperties);

function LanguageFlag({ country }: { country: "gb" | "pl" | "cz" }) {
  return (
    // Language names are already provided beside these decorative images.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/personal/flags/${country}.png`}
      className={styles.languageFlag}
      alt=""
      width="160"
      height={country === "gb" ? 80 : country === "pl" ? 100 : 107}
      loading="lazy"
      decoding="async"
    />
  );
}

function Age() {
  const [age, setAge] = useState<number | null>(null);
  useEffect(() => {
    const refresh = () => setAge(personalAge());
    refresh();
    const timer = window.setInterval(refresh, 60_000);
    window.addEventListener("focus", refresh);
    return () => { window.clearInterval(timer); window.removeEventListener("focus", refresh); };
  }, []);
  return <span>{age === null ? "born 11 July 2001" : `${age} years on this planet`}</span>;
}

export default function PersonalScrapbook() {
  // Begin still on both server and client; honour the visitor's motion preference.
  const [animated, setAnimated] = useState(false);
  const [autumn, setAutumn] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAnimated(!query.matches);
    sync(); query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <div lang="en" className={`${styles.world} ${autumn ? styles.autumn : ""}`} data-motion={animated ? "on" : "off"}>
      <a href="#scrapbook" className={styles.skip}>Skip to my scrapbook</a>
      <header className={styles.browserBar}>
        <Link href="/" className={styles.back}>← portfolio</Link>
        <span className={styles.address}>★ home / kiro / personal.html</span>
        <button type="button" onClick={() => setAnimated(!animated)} aria-pressed={animated} className={styles.motionButton}>
          {animated ? "Ⅱ pause the GIF party" : "▷ start the GIF party"}
        </button>
      </header>

      <div className={styles.canvas}>
        <div className={styles.welcomeStrip}>
          <span>✦ WELCOME TO MY LITTLE CORNER OF THE INTERNET ✦</span>
          <span>handmade with too many feelings &lt;3</span>
        </div>

        <div className={styles.hero}>
          <span className={styles.orbitStar} aria-hidden="true">✷</span>
          <p className={styles.eyebrow}>not a résumé. just me.</p>
          <h1>kiro’s <span>world<span className={styles.dot}>!</span></span></h1>
          <p className={styles.heroNote}>a beautiful little mess :3</p>
          <div className={styles.stickerCluster} aria-label="Blue enthusiast, proudly bi">
            <span className={styles.blueSticker}>BLUE<br />IS A<br />FEELING.</span>
            <span className={styles.biSticker}>proudly bi ♡</span>
          </div>
          <nav className={styles.jumpLinks} aria-label="Scrapbook sections">
            <a href="#who">who’s this?</a><span>✶</span><a href="#good-stuff">the good stuff</a><span>✶</span><a href="#music">my noise</a>
          </nav>
        </div>

        <div id="scrapbook" className={styles.board}>
          <article id="who" className={`${styles.paper} ${styles.identity}`} style={tilt("-3deg")}>
            <span className={styles.pin} aria-hidden="true" />
            <span className={styles.smallLabel}>HELLO, INTERNET HUMAN!</span>
            <h2>I’m Krystian<span className={styles.nameArrow}>↙</span></h2>
            <p className={styles.aliases}>Kris / Kiro / hasira</p>
            <div className={styles.age}><span aria-hidden="true">✳</span> <Age /></div>
            <p>Designer. Developer.<br /><em>Trying to be an artist sometimes.</em></p>
            <p>I love everything that has anything to do with <strong>art & creativity.</strong> Making things is kind of my thing.</p>
            <span className={styles.birthday}>first appeared: <time dateTime={BIRTH_DATE}>11.07.2001</time></span>
            <span className={styles.scribble} aria-hidden="true">♡</span>
          </article>

          <figure className={`${styles.polaroid} ${styles.cozyPhoto}`} style={tilt("4deg")}>
            <span className={styles.tape} aria-hidden="true" />
            {/* Native images deliberately keep the scrapbook independent of Next image host configuration. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/personal/autumn.webp" width="800" height="552" alt="Sunlight falling through a quiet woodland" fetchPriority="high" />
            <figcaption>mentally, I’m here.<span>preferably in a cozy sweater</span></figcaption>
            <span className={styles.photoStar} aria-hidden="true">✷</span>
          </figure>

          <figure className={`${styles.polaroid} ${styles.fursona}`} style={tilt("-5deg")}>
            <span className={styles.pin} aria-hidden="true" />
            <div className={styles.fursonaPhoto}>
              {FURSONA_IMAGE ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={FURSONA_IMAGE} alt="Kiro’s fursona" width="600" height="600" />
              ) : (
                <div className={styles.fursonaPlaceholder}>
                  <svg viewBox="0 0 100 100" aria-hidden="true"><ellipse cx="50" cy="66" rx="24" ry="19" /><ellipse cx="22" cy="42" rx="10" ry="14" transform="rotate(-25 22 42)" /><ellipse cx="42" cy="27" rx="10" ry="14" /><ellipse cx="65" cy="29" rx="10" ry="14" transform="rotate(15 65 29)" /><ellipse cx="81" cy="48" rx="10" ry="14" transform="rotate(30 81 48)" /></svg>
                  <span>fursona photo<br />coming soon!</span>
                </div>
              )}
            </div>
            <figcaption>here’s my fursona :3</figcaption>
            <span className={styles.fursonaArrow} aria-hidden="true">⤴</span>
          </figure>

          <section id="good-stuff" className={`${styles.paper} ${styles.loves}`} style={tilt("2deg")}>
            <span className={styles.tape} aria-hidden="true" />
            <span className={styles.smallLabel}>THINGS THAT MAKE MY BRAIN GO</span>
            <h2>yes, please! <span>♡</span></h2>
            <ul>
              <li><span>01</span> art & all things creative</li>
              <li><span>02</span> autumn. all of it.</li>
              <li><span>03</span> hot chocolate & cozy sweaters</li>
              <li><span>04</span> that warm, cozy atmosphere</li>
              <li><span>05</span> blue, in every possible shade</li>
              <li><span>06</span> still water. no bubbles, thanks.</li>
              <li><span>07</span> cartoons & awesome-looking minerals</li>
              <li><span>08</span> games — PC & tabletop!</li>
            </ul>
            <p className={styles.handNote}>a little cozy goes a long way</p>
          </section>

          <div className={styles.middleStack}>
            <aside className={styles.player} aria-label="Favorite song">
              <div className={styles.playerTitle}><span>♫ kiro’s media player</span><span aria-hidden="true">_ □ ×</span></div>
              <div className={styles.playerBody}>
                <span className={styles.smallLabel}>IF I HAD TO PICK ONE…</span>
                <div className={styles.song}><span className={styles.disc} aria-hidden="true">●</span><div><h2>River</h2><p>Eminem feat. Ed Sheeran</p></div></div>
                <div className={styles.equalizer} aria-hidden="true">{Array.from({ length: 26 }, (_, i) => <i key={i} style={{ "--bar": `${12 + (i * 17) % 32}px`, "--delay": `${i * -0.13}s` } as CSSProperties} />)}</div>
                <a className={styles.playLink} href="https://www.youtube.com/results?search_query=Eminem+River+feat+Ed+Sheeran+official" target="_blank" rel="noopener noreferrer">▶ find it on YouTube ↗</a>
                <span className={styles.noAutoplay}>a favourite, not an easy decision.</span>
              </div>
            </aside>
            <div className={styles.gifNote}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={animated ? "/personal/cat.gif" : "/personal/cat-still.png"} width="120" height="100" alt="A cat bobbing along" loading="lazy" />
              <p>me, listening to<br /><strong>“just one more song”</strong></p>
            </div>
          </div>

          <section className={`${styles.paper} ${styles.hates}`} style={tilt("4deg")}>
            <span className={styles.pin} aria-hidden="true" />
            <span className={styles.smallLabel}>RESPECTFULLY…</span>
            <h2>nope.</h2>
            <ul><li>Kids.<br /><span>Especially when they’re loud.</span></li><li>Loud noises in general.<br /><span>Let me have my peace.</span></li><li>Sparkling water.<br /><span>Why is my water fighting me?</span></li></ul>
            <span className={styles.hatesDoodle} aria-hidden="true">×_×</span>
          </section>
        </div>

        <section className={styles.sideQuests} aria-labelledby="side-quests-title">
          <div className={styles.musicHeading}>
            <div><span className={styles.smallLabel}>A FEW MORE PIECES OF ME</span><h2 id="side-quests-title">side quests <em>& lore.</em></h2></div>
            <p>the collection keeps growing ↙</p>
          </div>
          <div className={styles.extraBoard}>
            <figure className={`${styles.polaroid} ${styles.mineral}`} style={tilt("-4deg")}>
              <span className={styles.pin} aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={MINERAL_PHOTO.src} alt={MINERAL_PHOTO.alt} width="800" height="800" loading="lazy" />
              <figcaption>ooh, pretty rock! ✧</figcaption>
              <p>I love collecting awesome-looking minerals. Nature really knows how to make art.</p>
              {MINERAL_PHOTO.isExample && <span className={styles.exampleLabel}>EXAMPLE PHOTO · MY OWN COLLECTION PIC SOON</span>}
              <span className={styles.mineralSparkle} aria-hidden="true">✧</span>
            </figure>

            <section className={`${styles.paper} ${styles.cartoons}`} style={tilt("3deg")} aria-labelledby="cartoons-title">
              <span className={styles.tape} aria-hidden="true" />
              <span className={styles.smallLabel}>PLEASE DO NOT CHANGE THE CHANNEL</span>
              <figure className={styles.cartoonCover}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/personal/adventure-time.webp" alt="Adventure Time cover featuring Finn and Jake" width="680" height="600" loading="lazy" />
                <figcaption>Adventure Time ♡</figcaption>
              </figure>
              <h2 id="cartoons-title">cartoon time!</h2>
              <p>I love cartoons. A little animated chaos belongs here, too.</p>
              <span className={styles.handNote}>one more episode…</span>
            </section>

            <section className={`${styles.paper} ${styles.lore}`} style={tilt("-2deg")} aria-labelledby="lore-title">
              <span className={styles.pin} aria-hidden="true" />
              <span className={styles.smallLabel}>CHARACTER SHEET / THE PERSONAL BITS</span>
              <h2 id="lore-title">a little lore.</h2>
              <p className={styles.single}>I’m single <span>&lt;/3</span></p>
              <div className={styles.personality}><span>INFJ</span><span>2w1</span></div>
              <p className={styles.loreNote}>had daddy issues.</p>
              <span className={styles.loreDoodle} aria-hidden="true">♡ → &lt;/3</span>
            </section>

            <section className={`${styles.paper} ${styles.streaming}`} style={tilt("1.5deg")} aria-labelledby="streaming-title">
              <span className={styles.tape} aria-hidden="true" />
              <div className={styles.streamTop}><span className={styles.smallLabel}>KIRO.EXE IS GETTING READY…</span><span className={styles.streamStatus}>NOT LIVE YET</span></div>
              <h2 id="streaming-title">streaming <em>soon!</em></h2>
              <p>Mostly games & talking silly stuff.<br />Come for the games. Stay for whatever comes out of my mouth.</p>
              <div className={styles.streamTags}><span>✦ games</span><span>✦ silly conversations</span><span>✦ me being me</span></div>
              <span className={styles.streamDoodle} aria-hidden="true">▶</span>
            </section>

            <section className={`${styles.paper} ${styles.languages}`} style={tilt("-3deg")} aria-labelledby="languages-title">
              <span className={styles.pin} aria-hidden="true" />
              <span className={styles.smallLabel}>SAY HI / CZEŚĆ / AHOJ</span>
              <h2 id="languages-title">let’s talk!</h2>
              <ul>
                <li><LanguageFlag country="gb" /><div><strong>English</strong><span>I speak it!</span></div></li>
                <li><LanguageFlag country="pl" /><div><strong>Polski</strong><span>I speak it, too!</span></div></li>
                <li><LanguageFlag country="cz" /><div><strong>Čeština</strong><span>kinda learning… :3</span></div></li>
              </ul>
            </section>
          </div>
        </section>

        <section id="music" className={styles.music}>
          <div className={styles.musicHeading}><div><span className={styles.smallLabel}>THE SOUNDTRACK INSIDE MY HEAD</span><h2>my kind of <em>noise.</em></h2></div><p>rock. hard rock. a little metal.<br />and jazz when the mood is right. ♫</p></div>
          <div className={styles.bandGrid}>
            {favoriteBands.map((band, i) => (
              <a className={`${styles.polaroid} ${styles.band}`} href={band.url} target="_blank" rel="noopener noreferrer" key={band.name} style={tilt(band.rotation)} aria-label={`${band.name} — official website (opens in a new tab)`}>
                <span className={i % 2 === 0 ? styles.pin : styles.tape} aria-hidden="true" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/personal/${band.image}.webp`} width="500" height="400" alt={band.name} loading="lazy" />
                <h3>{band.name}</h3><p>{band.note}</p><span className={styles.bandNumber}>0{i + 1} ↗</span>
              </a>
            ))}
          </div>
          <p className={styles.musicFootnote}>click a polaroid. find your next obsession. ↗</p>
        </section>

        <footer className={styles.footer}>
          <div className={styles.badges}><span>MADE OF PIXELS & FEELINGS</span><span className={styles.biBadge}>BI & DOING MY THING</span><span>STILL WATER FAN CLUB</span><span>BEST VIEWED WITH A HOT CHOCOLATE</span></div>
          <p>you made it to the bottom! <span>stay a little weird.</span></p>
          <div className={styles.footerLinks}><a href="https://t.me/hasiradooo" target="_blank" rel="noopener noreferrer">say hi @hasiradooo ↗</a><Link href="/">back to the portfolio ↗</Link><button type="button" aria-pressed={autumn} onClick={() => setAutumn(!autumn)}>{autumn ? "✦ bring back the blue" : "🍂 make it autumn"}</button></div>
          <small>Krystian / Kris / Kiro / hasira · an ongoing work in progress, just like me.</small>
        </footer>
      </div>
    </div>
  );
}
