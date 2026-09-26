"use client";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import RiverPlayer from "@/app/_scrapbook/river-player";
import Icon from "@/app/_scrapbook/scrapbook-icon";
import { youtubeIdFromUrl, type ChapterTrack } from "./chapter-music";
import styles from "./chapter-cassette.module.css";

export default function ChapterCassette({
	track,
	chapterTitle = "this chapter",
	number,
}: {
	track: ChapterTrack;
	chapterTitle?: string;
	number?: number;
}) {
	const id = track.youtubeUrl ? youtubeIdFromUrl(track.youtubeUrl) : null;
	const [mounted, setMounted] = useState(false);
	const [open, setOpen] = useState(false);
	const [pinned, setPinned] = useState(false);
	const [playing, setPlaying] = useState(false);
	const dock = useRef<HTMLDivElement>(null);
	const trigger = useRef<HTMLButtonElement>(null);
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const panelId = useId();
	const cancelClose = () => {
		if (timer.current) clearTimeout(timer.current);
	};
	const close = (restoreFocus = false) => {
		cancelClose();
		if (restoreFocus) trigger.current?.focus();
		setOpen(false);
		setPinned(false);
	};
	const scheduleClose = () => {
		cancelClose();
		if (pinned || dock.current?.querySelector(":focus-visible")) return;
		timer.current = setTimeout(() => setOpen(false), 650);
	};
	useEffect(() => {
		setMounted(true);
		return () => {
			if (timer.current) clearTimeout(timer.current);
		};
	}, []);
	useEffect(() => {
		if (!open) return;
		const outside = (event: PointerEvent) => {
			if (dock.current && !dock.current.contains(event.target as Node)) {
				setOpen(false);
				setPinned(false);
			}
		};
		const escape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				trigger.current?.focus();
				setOpen(false);
				setPinned(false);
			}
		};
		document.addEventListener("pointerdown", outside);
		document.addEventListener("keydown", escape);
		return () => {
			document.removeEventListener("pointerdown", outside);
			document.removeEventListener("keydown", escape);
		};
	}, [open]);
	if (!mounted) return null;
	return createPortal(
		<div
			ref={dock}
			className={styles.dock}
			data-music-dock
			data-open={open}
			onBlur={(event) => {
				if (!event.currentTarget.contains(event.relatedTarget as Node))
					scheduleClose();
			}}
		>
			<button
				ref={trigger}
				type="button"
				className={styles.tab}
				aria-label={
					pinned
						? "Collapse chapter music"
						: open
							? "Keep chapter music open"
							: "Open chapter music"
				}
				aria-expanded={open}
				aria-controls={panelId}
				onFocus={(event) => {
					if (event.currentTarget.matches(":focus-visible")) {
						cancelClose();
						setOpen(true);
					}
				}}
				onClick={() => {
					cancelClose();
					setPinned(!pinned);
					setOpen(!pinned);
				}}
			>
				<svg viewBox="0 0 40 28" aria-hidden="true">
					<rect
						x="1"
						y="1"
						width="38"
						height="26"
						rx="4"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					/>
					<rect
						x="5"
						y="5"
						width="30"
						height="14"
						rx="3"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					/>
					<circle
						cx="12"
						cy="12"
						r="4"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					/>
					<circle
						cx="28"
						cy="12"
						r="4"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					/>
					<path
						d="M16 12h8M11 26l3-5h12l3 5"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					/>
				</svg>
				<span>music</span>
				<small>{playing ? "playing" : "tape"}</small>
				{playing && <i className={styles.playingDot} aria-hidden="true" />}
			</button>
			<section
				id={panelId}
				className={styles.panel}
				aria-label="Chapter music player"
				inert={!open}
				aria-hidden={!open}
			>
				<div className={styles.panelTop}>
					<span>
						{pinned ? "staying open" : "a soundtrack for your reading"}
					</span>
					<button
						type="button"
						onClick={() => close(true)}
						aria-label="Close music panel"
					>
						close <span aria-hidden="true">×</span>
					</button>
				</div>
				<div className={styles.scroll}>
					<div className={styles.wrap} data-chapter-cassette>
						<RiverPlayer
							animated={open}
							chapter
							onPlaybackChange={setPlaying}
							heading={
								number
									? `CHAPTER ${String(number).padStart(2, "0")} / THE SOUNDTRACK`
									: "A TAPE FOR THIS CHAPTER"
							}
							track={{
								title: track.title || chapterTitle,
								artist: track.artist || "a blank tape, for now",
								...(id ? { youtubeId: id } : {}),
							}}
							footnote={
								id
									? "Keep reading. The tape stops when you leave this chapter."
									: "some pages are quiet for a while."
							}
						/>
						{id && (
							<a
								className={styles.source}
								href={`https://www.youtube.com/watch?v=${id}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								open on YouTube <Icon name="arrow" />
							</a>
						)}
					</div>
				</div>
			</section>
		</div>,
		document.body,
	);
}
