"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import {
	BIRTH_DATE,
	FURSONA_IMAGE,
	favoriteBands,
	favoriteGames,
	personalAge,
} from "@/lib/personal";
import ScrapbookBar from "./scrapbook-bar";
import RiverPlayer from "./river-player";
import ScrapbookIcon from "./scrapbook-icon";
import styles from "./personal.module.css";

const tilt = (rotation: string) => ({ "--tilt": rotation }) as CSSProperties;

const extraGames = [
	{
		name: "The Binding of Isaac: Rebirth",
		image: "/scrapbook/games/binding-of-isaac.webp",
		url: "https://store.steampowered.com/app/250900/",
		note: "stab mather with knife.",
		rotation: "-3deg",
	},
	{
		name: "Cult of the Lamb",
		image: "/scrapbook/games/cult-of-the-lamb.webp",
		url: "https://store.steampowered.com/app/1313140/",
		note: "cute little lamb. questionable hobbies.",
		rotation: "3deg",
	},
	{
		name: "Helldivers 2",
		image: "/scrapbook/games/helldivers-2.webp",
		url: "https://store.steampowered.com/app/553850/",
		note: "for democracy. and a little chaos.",
		rotation: "-2deg",
	},
	{
		name: "The Witcher 3",
		image: "/scrapbook/games/witcher-3.webp",
		url: "https://store.steampowered.com/app/292030/",
		note: "one more contract. maybe some gwent. Ciri can wait.",
		rotation: "4deg",
	},
] as const;

function LanguageFlag({ country }: { country: "gb" | "pl" | "cz" }) {
	return (
		// Language names are already provided beside these decorative images.
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src={`/scrapbook/flags/${country}.png`}
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
		return () => {
			window.clearInterval(timer);
			window.removeEventListener("focus", refresh);
		};
	}, []);
	return (
		<span>
			{age === null ? "born 11 July 2001" : `${age} years on this planet`}
		</span>
	);
}

export default function PersonalScrapbook() {
	// Begin still on both server and client; honour the visitor's motion preference.
	const [animated, setAnimated] = useState(false);
	const [autumn, setAutumn] = useState(false);
	useEffect(() => {
		// The server supplies the initial tag; keep browser chrome in sync with the palette.
		const meta = document.querySelector<HTMLMetaElement>(
			'meta[name="theme-color"]',
		);
		if (!meta) return;
		const previous = meta.content;
		const color = autumn ? "#853c2c" : "#2142c7";
		meta.content = color;
		return () => {
			// Do not overwrite a new route's theme color if Next has already changed it.
			if (meta.isConnected && meta.content === color) meta.content = previous;
		};
	}, [autumn]);

	useEffect(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		const sync = () => setAnimated(!query.matches);
		sync();
		query.addEventListener("change", sync);
		return () => query.removeEventListener("change", sync);
	}, []);

	return (
		<div
			lang="en"
			className={`${styles.world} ${autumn ? styles.autumn : ""}`}
			data-motion={animated ? "on" : "off"}
			data-personal-page
			data-personal-palette={autumn ? "autumn" : "blue"}
		>
			<a href="#scrapbook" className={styles.skip}>
				Skip to my scrapbook
			</a>
			<ScrapbookBar
				href="/story"
				backLabel="Kiro’s notebook"
				address="home / kiro / index.html"
			>
				<button
					type="button"
					onClick={() => setAnimated(!animated)}
					aria-pressed={animated}
				>
					<ScrapbookIcon name={animated ? "pause" : "play"} />{" "}
					{animated ? "pause the GIF party" : "start the GIF party"}
				</button>
			</ScrapbookBar>

			<div className={styles.canvas}>
				<div className={styles.welcomeStrip}>
					<span>✦ WELCOME TO MY LITTLE CORNER OF THE INTERNET ✦</span>
					<span>handmade with too many feelings &lt;3</span>
				</div>

				<div className={styles.hero}>
					<span className={styles.orbitStar} aria-hidden="true">
						✷
					</span>
					<p className={styles.eyebrow}>not a résumé. just me.</p>
					<h1>
						kiro’s{" "}
						<span>
							world<span className={styles.dot}>!</span>
						</span>
					</h1>
					<p className={styles.heroNote}>a beautiful little mess :3</p>
					<div
						className={styles.stickerCluster}
						aria-label="Blue enthusiast, proudly bi"
					>
						<span className={styles.blueSticker}>
							BLUE
							<br />
							IS A<br />
							FEELING.
						</span>
						<span className={styles.biSticker}>proudly bi ♡</span>
					</div>
					<nav className={styles.jumpLinks} aria-label="Scrapbook sections">
						<a href="#who">who’s this?</a>
						<span>✶</span>
						<a href="#good-stuff">the good stuff</a>
						<span>✶</span>
						<a href="#music">my noise</a>
						<span>✶</span>
						<a href="#games">my games</a>
						<span>✶</span>
						<Link href="/story">Kiro’s story</Link>
					</nav>
				</div>

				<div id="scrapbook" className={styles.board}>
					<article
						id="who"
						className={`${styles.paper} ${styles.identity}`}
						style={tilt("-3deg")}
					>
						<span className={styles.pin} aria-hidden="true" />
						<span className={styles.smallLabel}>HELLO, INTERNET HUMAN!</span>
						<h2>
							I’m Krystian
							<span className={styles.nameArrow}>
								<ScrapbookIcon name="down" />
							</span>
						</h2>
						<p className={styles.aliases}>Kris / Kiro / hasira</p>
						<div className={styles.age}>
							<span aria-hidden="true">✳</span> <Age />
						</div>
						<p>
							Designer. Developer.
							<br />
							<em>Trying to be an artist sometimes.</em>
						</p>
						<p>
							I love everything that has anything to do with{" "}
							<strong>art & creativity.</strong> Making things is kind of my
							thing.
						</p>
						<span className={styles.birthday}>
							first appeared: <time dateTime={BIRTH_DATE}>11.07.2001</time>
						</span>
						<span className={styles.scribble} aria-hidden="true">
							♡
						</span>
					</article>

					<figure
						className={`${styles.polaroid} ${styles.cozyPhoto}`}
						style={tilt("4deg")}
					>
						<span className={styles.tape} aria-hidden="true" />
						{/* Native images deliberately keep the scrapbook independent of Next image host configuration. */}
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src="/scrapbook/autumn.webp"
							width="800"
							height="552"
							alt="Sunlight falling through a quiet woodland"
							fetchPriority="high"
						/>
						<figcaption>
							mentally, I’m here.<span>preferably in a cozy sweater</span>
						</figcaption>
						<span className={styles.photoStar} aria-hidden="true">
							✷
						</span>
					</figure>

					<figure
						className={`${styles.polaroid} ${styles.fursona}`}
						style={tilt("-5deg")}
					>
						<span className={styles.pin} aria-hidden="true" />
						<div className={styles.fursonaPhoto}>
							{FURSONA_IMAGE ? (
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src={FURSONA_IMAGE}
									alt="Kiro’s fursona"
									width="600"
									height="600"
								/>
							) : (
								<div className={styles.fursonaPlaceholder}>
									<svg viewBox="0 0 100 100" aria-hidden="true">
										<ellipse cx="50" cy="66" rx="24" ry="19" />
										<ellipse
											cx="22"
											cy="42"
											rx="10"
											ry="14"
											transform="rotate(-25 22 42)"
										/>
										<ellipse cx="42" cy="27" rx="10" ry="14" />
										<ellipse
											cx="65"
											cy="29"
											rx="10"
											ry="14"
											transform="rotate(15 65 29)"
										/>
										<ellipse
											cx="81"
											cy="48"
											rx="10"
											ry="14"
											transform="rotate(30 81 48)"
										/>
									</svg>
									<span>
										fursona photo
										<br />
										coming soon!
									</span>
								</div>
							)}
						</div>
						<figcaption>here’s my fursona :3</figcaption>
						<span className={styles.fursonaArrow} aria-hidden="true">
							<ScrapbookIcon name="curve" />
						</span>
					</figure>

					<section
						id="good-stuff"
						className={`${styles.paper} ${styles.loves}`}
						style={tilt("2deg")}
					>
						<span className={styles.tape} aria-hidden="true" />
						<span className={styles.smallLabel}>
							THINGS THAT MAKE MY BRAIN GO
						</span>
						<h2>
							yes, please! <span>♡</span>
						</h2>
						{/* TODO: make separated comepontent with out indexing */}
						<div
							className={styles.cardScroll}
							tabIndex={0}
							role="region"
							aria-label="Things I love"
							data-card-scroll
						>
							<ul>
								<li>
									<span>01</span> art & all things creative
								</li>
								<li>
									<span>02</span> autumn. all of it.
								</li>
								<li>
									<span>03</span> hot chocolate & cozy sweaters
								</li>
								<li>
									<span>04</span> that warm, cozy atmosphere
								</li>
								<li>
									<span>05</span> blue, in every possible shade
								</li>
								<li>
									<span>06</span> still water. no bubbles, thanks.
								</li>
								<li>
									<span>07</span> cartoons & awesome-looking minerals
								</li>
								<li>
									<span>08</span> games, PC & tabletop!
								</li>
								<li>
									<span>09</span> plants. bring on the greenery!
								</li>
								<li>
									<span>10</span> spaghetti. any kind, honestly.
								</li>
								<li>
									<span>11</span> people I can feel safe & silly with
								</li>
								<li>
									<span>12</span> little thoughtful gestures
								</li>
								<li>
									<span>13</span> comfortable silence & honest conversations
								</li>
								<li>
									<span>14</span> sharing our weird little obsessions
								</li>
								<li>
									<span>15</span> a little bit of dark humor.. okay a lot of.
								</li>
							</ul>
						</div>
						<p className={styles.scrollHint}>
							more little joys below <ScrapbookIcon name="down" />
						</p>
						<p className={styles.handNote}>a little cozy goes a long way</p>
					</section>

					<div className={styles.middleStack}>
						<RiverPlayer animated={animated} />
						<div className={styles.gifNote}>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={
									animated ? "/scrapbook/cat.gif" : "/scrapbook/cat-still.png"
								}
								width="120"
								height="100"
								alt="A cat bobbing along"
								loading="lazy"
							/>
							<p>
								me, listening to
								<br />
								<strong>“just one more song”</strong>
							</p>
						</div>
					</div>

					<section
						className={`${styles.paper} ${styles.hates}`}
						style={tilt("4deg")}
					>
						<span className={styles.pin} aria-hidden="true" />
						<span className={styles.smallLabel}>RESPECTFULLY…</span>
						<h2>nope.</h2>
						<div
							className={styles.cardScroll}
							tabIndex={0}
							role="region"
							aria-label="Things I dislike"
							data-card-scroll
						>
							<ul>
								<li>
									Kids.
									<br />
									<span>Especially when they’re loud.</span>
								</li>
								<li>
									Loud noises in general.
									<br />
									<span>Let me have my peace.</span>
								</li>
								<li>
									Sparkling water.
									<br />
									<span>Why is my water fighting me?</span>
								</li>
								<li>
									Mean & intolerant people.
									<br />
									<span>A little kindness goes a long way.</span>
								</li>
								<li>
									“You’re too sensitive.”
									<br />
									<span>Having feelings isn’t a character flaw.</span>
								</li>
								<li>
									Mixed signals & guessing games.
									<br />
									<span>
										Please say what you mean. My brain already writes enough
										alternate endings.
									</span>
								</li>
								<li>
									Kindness being mistaken for permission.
									<br />
									<span>Being nice doesn’t mean everything is okay.</span>
								</li>
								<li>
									Being made to feel annoying for being excited.
									<br />
									<span>Let me tell you about the cool rock.</span>
								</li>
								<li>
									Pressure to open up.
									<br />
									<span>Some things take a little time.</span>
								</li>
							</ul>
						</div>
						<p className={styles.scrollHint}>
							a few more boundaries below <ScrapbookIcon name="down" />
						</p>
						<span className={styles.hatesDoodle} aria-hidden="true">
							×_×
						</span>
					</section>
				</div>

				<section
					className={styles.sideQuests}
					aria-labelledby="side-quests-title"
				>
					<div className={styles.musicHeading}>
						<div>
							<span className={styles.smallLabel}>A FEW MORE PIECES OF ME</span>
							<h2 id="side-quests-title">
								side quests <em>& lore.</em>
							</h2>
						</div>
						<p>
							the collection keeps growing <ScrapbookIcon name="down" />
						</p>
					</div>
					<div className={styles.extraBoard}>
						<figure
							className={`${styles.polaroid} ${styles.mineral}`}
							style={tilt("-4deg")}
						>
							<span className={styles.pin} aria-hidden="true" />
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="/scrapbook/mineral.webp"
								alt="A blue crystal specimen from my mineral collection"
								width="800"
								height="800"
								loading="lazy"
							/>
							<figcaption>ooh, pretty rock! ✧</figcaption>
							<p>
								I love collecting awesome-looking minerals. Nature really knows
								how to make art.
							</p>
							<span className={styles.mineralSparkle} aria-hidden="true">
								✧
							</span>
						</figure>

						<section
							className={`${styles.paper} ${styles.cartoons}`}
							style={tilt("3deg")}
							aria-labelledby="cartoons-title"
						>
							<span className={styles.tape} aria-hidden="true" />
							<span className={styles.smallLabel}>
								PLEASE DO NOT CHANGE THE CHANNEL
							</span>
							<figure className={styles.cartoonCover}>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src="/scrapbook/adventure-time.webp"
									alt="Adventure Time cover featuring Finn and Jake"
									width="680"
									height="600"
									loading="lazy"
								/>
								<figcaption>Adventure Time ♡</figcaption>
							</figure>
							<h2 id="cartoons-title">cartoon time!</h2>
							<p>I love cartoons. A little animated chaos belongs here, too.</p>
							<span className={styles.handNote}>one more episode…</span>
						</section>

						<section
							className={`${styles.paper} ${styles.lore}`}
							style={tilt("-2deg")}
							aria-labelledby="lore-title"
						>
							<span className={styles.pin} aria-hidden="true" />
							<span className={styles.smallLabel}>
								CHARACTER SHEET / THE PERSONAL BITS
							</span>
							<h2 id="lore-title">a little lore.</h2>
							<div
								className={`${styles.cardScroll} ${styles.loreScroll}`}
								tabIndex={0}
								role="region"
								aria-label="My personal lore"
								data-card-scroll
							>
								<p className={styles.pronouns}>he / him</p>
								<p className={styles.single}>
									I’m single <span>&lt;/3</span>
								</p>
								<p className={styles.datingNote}>
									Sorry, guys. I’m looking for a girl right now. Nothing
									personal; I’m just tired of boys.
								</p>
								<div className={styles.personality}>
									<span>INFJ</span>
									<span>2w1</span>
								</div>
								<dl className={styles.loreStats}>
									<div>
										<dt>height</dt>
										<dd>
											180 cm <span>≈ 5′11″</span>
										</dd>
									</div>
									<div>
										<dt>weight</dt>
										<dd>56 kg</dd>
									</div>
									<div>
										<dt>favorite food</dt>
										<dd>
											spaghetti <span>any kind! ♡</span>
										</dd>
									</div>
								</dl>
								<p className={styles.loreNote}>had daddy issues.</p>
								<div className={styles.loreThoughts}>
									<p>
										<strong>soft sweaters, loud thoughts.</strong>
									</p>
									<p>Quiet until I feel safe. Then good luck shutting me up.</p>
									<p>
										Sometimes I worry I’m being annoying when I’m actually just
										enjoying your company.
									</p>
									<p>
										I say sorry a little too often. Occasionally for saying
										sorry.
									</p>
									<p>
										I care about tiny details. A remembered favorite, a little
										object, something that made you think of me.
									</p>
									<p>
										Sometimes “I’m fine” means I haven’t found the words yet.
									</p>
								</div>
								<p className={`${styles.loreNote} ${styles.deeperNote}`}>
									I like being close to people. Sometimes that comes with
									wondering when they’ll leave. I’m still figuring that part
									out.
								</p>
							</div>
							<p className={styles.scrollHint}>
								a little more lore below <ScrapbookIcon name="down" />
							</p>
							<span className={styles.loreDoodle} aria-hidden="true">
								♡ → &lt;/3
							</span>
						</section>

						<section
							className={`${styles.paper} ${styles.streaming}`}
							style={tilt("1.5deg")}
							aria-labelledby="streaming-title"
						>
							<span className={styles.tape} aria-hidden="true" />
							<div className={styles.streamTop}>
								<span className={styles.smallLabel}>
									KIRO.EXE IS GETTING READY…
								</span>
								<span className={styles.streamStatus}>NOT LIVE YET</span>
							</div>
							<h2 id="streaming-title">
								streaming <em>soon!</em>
							</h2>
							<p>
								Mostly games & talking silly stuff.
								<br />
								Come for the games. Stay for whatever comes out of my mouth.
							</p>
							<div className={styles.streamTags}>
								<span>✦ games</span>
								<span>✦ silly conversations</span>
								<span>✦ me being me</span>
							</div>
							<span className={styles.streamDoodle} aria-hidden="true">
								<ScrapbookIcon name="play" />
							</span>
						</section>

						<section
							className={`${styles.paper} ${styles.languages}`}
							style={tilt("-3deg")}
							aria-labelledby="languages-title"
						>
							<span className={styles.pin} aria-hidden="true" />
							<span className={styles.smallLabel}>SAY HI / CZEŚĆ / AHOJ</span>
							<h2 id="languages-title">let’s talk!</h2>
							<ul>
								<li>
									<LanguageFlag country="gb" />
									<div>
										<strong>English</strong>
										<span>I speak it!</span>
									</div>
								</li>
								<li>
									<LanguageFlag country="pl" />
									<div>
										<strong>Polski</strong>
										<span>I speak it, too!</span>
									</div>
								</li>
								<li>
									<LanguageFlag country="cz" />
									<div>
										<strong>Čeština</strong>
										<span>kinda learning… :3</span>
									</div>
								</li>
							</ul>
						</section>
					</div>
				</section>

				<section
					className={styles.storyInvite}
					aria-labelledby="story-invite-title"
				>
					<span className={styles.tape} aria-hidden="true" />
					<div>
						<span className={styles.smallLabel}>A DIFFERENT KIND OF LORE</span>
						<h2 id="story-invite-title">there’s a story in here.</h2>
						<p>
							Meet Kiro, Rin & Susie. Follow the chapters, get to know the
							characters, and stay a little longer.
						</p>
					</div>
					<Link href="/story">
						open Kiro’s notebook <ScrapbookIcon name="arrow" />
					</Link>
					<span className={styles.storyScribble} aria-hidden="true">
						one page at a time ♡
					</span>
				</section>

				<section id="music" className={styles.music}>
					<div className={styles.musicHeading}>
						<div>
							<span className={styles.smallLabel}>
								THE SOUNDTRACK INSIDE MY HEAD
							</span>
							<h2>
								my kind of <em>noise.</em>
							</h2>
						</div>
						<p>
							rock. hard rock. a little metal.
							<br />
							and jazz when the mood is right. ♫
						</p>
					</div>
					<div className={styles.bandGrid}>
						{favoriteBands.map((band, i) => (
							<a
								className={`${styles.polaroid} ${styles.band}`}
								href={band.url}
								target="_blank"
								rel="noopener noreferrer"
								key={band.name}
								style={tilt(band.rotation)}
								aria-label={`${band.name} · official website (opens in a new tab)`}
							>
								<span
									className={i % 2 === 0 ? styles.pin : styles.tape}
									aria-hidden="true"
								/>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={`/scrapbook/${band.image}.webp`}
									width="500"
									height="400"
									alt={band.name}
									loading="lazy"
								/>
								<h3>{band.name}</h3>
								<p>{band.note}</p>
								<span className={styles.bandNumber}>
									0{i + 1} <ScrapbookIcon name="arrow" />
								</span>
							</a>
						))}
					</div>
					<p className={styles.musicFootnote}>
						click a polaroid. find your next obsession.{" "}
						<ScrapbookIcon name="arrow" />
					</p>
				</section>

				<section
					id="games"
					className={styles.games}
					aria-labelledby="games-title"
				>
					<div className={styles.musicHeading}>
						<div>
							<span className={styles.smallLabel}>
								THE OTHER KIND OF PLAY BUTTON
							</span>
							<h2 id="games-title">
								one more <em>game.</em>
							</h2>
						</div>
						<p>
							a few of my favorites.
							<br />
							yes, all of Half-Life counts.
						</p>
					</div>
					<div className={styles.gameGrid}>
						{[...favoriteGames, ...extraGames].map((game, i) => (
							<a
								key={game.name}
								href={game.url}
								target="_blank"
								rel="noopener noreferrer"
								className={`${styles.polaroid} ${styles.gameCard}`}
								style={tilt(game.rotation)}
								aria-label={`${game.name}: official game page (opens in a new tab)`}
							>
								<span
									className={i % 2 === 0 ? styles.pin : styles.tape}
									aria-hidden="true"
								/>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={game.image}
									width="460"
									height="215"
									alt={`${game.name} cover artwork`}
									loading="lazy"
									decoding="async"
								/>
								<span className={styles.gameTag}>FAVORITE / 0{i + 1}</span>
								<h3>{game.name}</h3>
								<p>{game.note}</p>
								<span className={styles.gameCorner} aria-hidden="true">
									<ScrapbookIcon name="arrow" />
								</span>
							</a>
						))}
					</div>
					<p className={styles.gameFootnote}>
						PC games, tabletop games. Just let me play. ♡
					</p>
				</section>

				<footer className={styles.footer}>
					<div className={styles.badges}>
						<span>MADE OF PIXELS & FEELINGS</span>
						<span className={styles.biBadge}>BI & DOING MY THING</span>
						<span>STILL WATER FAN CLUB</span>
						<span>BEST VIEWED WITH A HOT CHOCOLATE</span>
					</div>
					<p>
						you made it to the bottom! <span>stay a little weird.</span>
					</p>
					<div className={styles.footerLinks}>
						<a
							href="https://t.me/hasiradooo"
							target="_blank"
							rel="noopener noreferrer"
						>
							say hi @hasiradooo <ScrapbookIcon name="arrow" />
						</a>
						<Link href="/story">
							read Kiro’s story <ScrapbookIcon name="arrow" />
						</Link>
						<button
							type="button"
							aria-pressed={autumn}
							onClick={() => setAutumn(!autumn)}
						>
							{autumn ? "✦ bring back the blue" : "🍂 make it autumn"}
						</button>
					</div>
					<a
						className={styles.hotChocolate}
						href="https://ko-fi.com/hasiradooo"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Buy me a hot chocolate on Ko-fi (opens in a new tab)"
					>
						<svg
							viewBox="0 0 32 32"
							width="28"
							height="28"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.6"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
							<path d="M6 12h17v9a7 7 0 0 1-7 7h-3a7 7 0 0 1-7-7zM23 14h2a4 4 0 0 1 0 8h-2M4 28h22M10 8c-3-3 3-3 0-6M16 8c-3-3 3-3 0-6" />
							<path
								d="M11 18c0-3 4-3 4 0 0-3 4-3 4 0 0 2-4 5-4 5s-4-3-4-5"
								fill="currentColor"
								stroke="none"
							/>
						</svg>
						<span>
							buy me a hot chocolate<small>a little warmth via Ko-fi ♡</small>
						</span>
						<ScrapbookIcon name="arrow" />
					</a>
					<small>
						Krystian / Kris / Kiro / hasira · an ongoing work in progress, just
						like me.
					</small>
				</footer>
			</div>
		</div>
	);
}
