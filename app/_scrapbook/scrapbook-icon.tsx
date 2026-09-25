import type { SVGProps } from "react";

type IconName = "arrow" | "back" | "down" | "curve" | "play" | "pause";
/** Drawn paths keep mobile platforms from substituting colorful emoji. */
export default function ScrapbookIcon({
	name,
	...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
	return (
		<svg
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
			style={{
				display: "inline-block",
				verticalAlign: "-0.12em",
				flexShrink: 0,
			}}
			{...props}
		>
			{name === "arrow" && <path d="M5 19 19 5M5 5h14v14" />}
			{name === "back" && <path d="M20 12H4m7-7-7 7 7 7" />}
			{name === "down" && <path d="M19 5 5 19M5 5v14h14" />}
			{name === "curve" && <path d="M3 21c12 1 16-7 15-17m-6 6 6-6 5 7" />}
			{name === "play" && (
				<path d="m7 4 14 8-14 8Z" fill="currentColor" stroke="none" />
			)}
			{name === "pause" && <path d="M8 5v14M16 5v14" strokeWidth="4" />}
		</svg>
	);
}
