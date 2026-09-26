"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import styles from "./story.module.css";

export default function MatureSection({ children }: { children: ReactNode }) {
	const [expanded, setExpanded] = useState(false);
	const id = useId();
	const toggle = useRef<HTMLButtonElement>(null);
	function collapse() {
		setExpanded(false);
		toggle.current?.focus();
	}
	return (
		<section className={styles.matureSection} aria-label="Optional adult section">
			<div className={styles.matureWarning}>
				<span className={styles.noteLabel}>18+ / NSFW</span>
				<h2>Adult content ahead</h2>
				<p>This optional section contains explicit sexual content and is intended for readers aged 18 and over. You can skip it and continue the chapter.</p>
				<div className={styles.matureActions}>
					<button ref={toggle} type="button" aria-expanded={expanded} aria-controls={`${id}-content`} onClick={() => setExpanded(!expanded)}>
						{expanded ? "Hide this section" : "I’m 18+ [show this section]"}
					</button>
					<a href={`#${id}-after`}>Skip this section ↓</a>
				</div>
			</div>
			<div id={`${id}-content`} hidden={!expanded} className={styles.matureContent}>
				{expanded && <>{children}<button type="button" className={styles.matureClose} onClick={collapse}>Hide this section ↑</button></>}
			</div>
			<span id={`${id}-after`} tabIndex={-1} className={styles.matureResume} aria-label="Continue after the adult section" />
		</section>
	);
}
