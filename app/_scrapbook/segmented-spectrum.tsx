"use client";
import { useEffect, useRef, type RefObject } from "react";
import styles from "./river-player.module.css";

const COLUMNS = 24;
const SEGMENTS = 12;
export default function SegmentedSpectrum({
	playing,
	animated,
	analyser,
}: {
	playing: boolean;
	animated: boolean;
	analyser: RefObject<AnalyserNode | null>;
}) {
	const root = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const columns = Array.from(root.current?.children ?? []).map(
			(column) => Array.from(column.children) as HTMLElement[],
		);
		const levels = new Float32Array(COLUMNS);
		const peaks = new Float32Array(COLUMNS);
		const node = analyser.current;
		const bins = node ? new Uint8Array(node.frequencyBinCount) : null;
		let frame = 0,
			last = 0;
		const paint = () =>
			columns.forEach((segments, column) => {
				const level = Math.round(levels[column]);
				const peak = Math.ceil(peaks[column]);
				segments.forEach((segment, row) => {
					segment.dataset.lit = row < level ? "true" : "false";
					segment.dataset.peak =
						peak > 0 && row === peak - 1 ? "true" : "false";
				});
			});
		paint();
		if (!playing || !animated) return;
		const tick = (now: number) => {
			if (now - last >= 65) {
				last = now;
				if (!document.hidden) {
					if (node && bins) node.getByteFrequencyData(bins);
					for (let col = 0; col < COLUMNS; col++) {
						let target: number;
						if (node && bins) {
							// Log-spaced frequency bands. Analyser sits after the volume gain.
							const nyquist = node.context.sampleRate / 2;
							const low = 40 * Math.pow(16_000 / 40, col / COLUMNS);
							const high = 40 * Math.pow(16_000 / 40, (col + 1) / COLUMNS);
							const start = Math.min(
								bins.length - 1,
								Math.max(1, Math.floor((low / nyquist) * bins.length)),
							);
							const end = Math.min(
								bins.length,
								Math.max(start + 1, Math.ceil((high / nyquist) * bins.length)),
							);
							let energy = 0;
							for (let bin = start; bin < end; bin++)
								energy += (bins[bin] / 255) ** 2;
							target = Math.sqrt(energy / (end - start)) * SEGMENTS;
						} else {
							// YouTube supplies playback events, not PCM audio. This is visibly
							// labelled as an animation, never presented as a measured spectrum.
							const t = now / 1000;
							const wave =
								(Math.sin(t * (3.7 + col * 0.19) + col * 1.31) + 1) / 2;
							const beat = Math.max(0, Math.sin(t * 7.1 - col * 0.43)) ** 3;
							target =
								1 +
								(wave * 0.56 + beat * 0.44) * (8 + Math.sin(col * 0.62) * 3);
						}
						levels[col] =
							target > levels[col]
								? target
								: Math.max(target, levels[col] - 0.8);
						peaks[col] = Math.max(levels[col], peaks[col] - 0.17);
					}
					paint();
				}
			}
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => {
			cancelAnimationFrame(frame);
			levels.fill(0);
			peaks.fill(0);
			paint();
		};
	}, [playing, animated, analyser]);
	return (
		<div
			ref={root}
			className={styles.spectrum}
			aria-hidden="true"
			data-spectrum
		>
			{Array.from({ length: COLUMNS }, (_, column) => (
				<span key={column} className={styles.column}>
					{Array.from({ length: SEGMENTS }, (_, row) => (
						<i
							key={row}
							className={`${styles.segment} ${row > 9 ? styles.high : row > 6 ? styles.mid : ""}`}
							data-lit="false"
							data-peak="false"
						/>
					))}
				</span>
			))}
		</div>
	);
}
