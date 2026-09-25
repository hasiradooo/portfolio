export type YouTubePlayer = {
	playVideo(): void;
	pauseVideo(): void;
	seekTo(seconds: number, allowSeekAhead: boolean): void;
	getCurrentTime(): number;
	getDuration(): number;
	setVolume(volume: number): void;
	destroy(): void;
	getIframe(): HTMLIFrameElement;
};
type PlayerEvent = { target: YouTubePlayer };
export type YouTubeAPI = {
	Player: new (
		element: HTMLElement,
		options: {
			width: string;
			height: string;
			videoId: string;
			host: string;
			playerVars: {
				origin: string;
				playsinline: number;
				controls: number;
				rel: number;
				disablekb: number;
			};
			events: {
				onReady(event: PlayerEvent): void;
				onStateChange(event: PlayerEvent & { data: number }): void;
				onError(event: PlayerEvent & { data: number }): void;
				onAutoplayBlocked(): void;
			};
		},
	) => YouTubePlayer;
};
// Keep our view of the external API local. Other embeds may declare a different
// Window.YT type, and ambient declarations would merge with theirs.
type YouTubeWindow = {
	YT?: YouTubeAPI;
	onYouTubeIframeAPIReady?: () => void;
};
let pending: Promise<YouTubeAPI> | undefined;

export function loadYouTube(): Promise<YouTubeAPI> {
	const youtubeWindow = window as unknown as YouTubeWindow;
	if (youtubeWindow.YT?.Player) return Promise.resolve(youtubeWindow.YT);
	if (pending) return pending;
	const request = new Promise<YouTubeAPI>((resolve, reject) => {
		const previous = youtubeWindow.onYouTubeIframeAPIReady;
		const script = document.createElement("script");
		script.src = "https://www.youtube.com/iframe_api";
		script.async = true;
		let settled = false;
		const finish = (error?: Error) => {
			if (settled) return;
			settled = true;
			window.clearTimeout(timeout);
			if (youtubeWindow.onYouTubeIframeAPIReady === ready)
				youtubeWindow.onYouTubeIframeAPIReady = previous;
			if (error) {
				script.remove();
				reject(error);
			} else if (youtubeWindow.YT) resolve(youtubeWindow.YT);
		};
		const ready = () => {
			try {
				previous?.();
			} finally {
				finish();
			}
		};
		const timeout = window.setTimeout(
			() => finish(new Error("YouTube took too long to load.")),
			15_000,
		);
		youtubeWindow.onYouTubeIframeAPIReady = ready;
		script.onerror = () => finish(new Error("YouTube could not load."));
		document.head.appendChild(script);
	});
	pending = request;
	void request.catch(() => {
		if (pending === request) pending = undefined;
	});
	return request;
}
