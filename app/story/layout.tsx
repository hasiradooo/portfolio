import type { ReactNode } from "react";
import type { Viewport } from "next";
import StoryShell from "./story-shell";
import { chapterIndex } from "./story-data";

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	viewportFit: "cover",
	themeColor: "#2142c7",
	colorScheme: "light",
};
export default function StoryLayout({ children }: { children: ReactNode }) {
	return <StoryShell chapters={chapterIndex}>{children}</StoryShell>;
}
