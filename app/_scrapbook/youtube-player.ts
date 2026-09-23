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
  Player: new (element: HTMLElement, options: {
    width: string; height: string; videoId: string; host: string;
    playerVars: { origin: string; playsinline: number; controls: number; rel: number; disablekb: number };
    events: { onReady(event: PlayerEvent): void; onStateChange(event: PlayerEvent & { data: number }): void; onError(event: PlayerEvent & { data: number }): void; onAutoplayBlocked(): void };
  }) => YouTubePlayer;
};
declare global { interface Window { YT?: YouTubeAPI; onYouTubeIframeAPIReady?: () => void } }
let pending: Promise<YouTubeAPI> | undefined;

export function loadYouTube(): Promise<YouTubeAPI> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (pending) return pending;
  const request = new Promise<YouTubeAPI>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    let settled = false;
    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      if (window.onYouTubeIframeAPIReady === ready) window.onYouTubeIframeAPIReady = previous;
      if (error) { script.remove(); reject(error); }
      else if (window.YT) resolve(window.YT);
    };
    const ready = () => { try { previous?.(); } finally { finish(); } };
    const timeout = window.setTimeout(() => finish(new Error("YouTube took too long to load.")), 15_000);
    window.onYouTubeIframeAPIReady = ready;
    script.onerror = () => finish(new Error("YouTube could not load."));
    document.head.appendChild(script);
  });
  pending = request;
  void request.catch(() => { if (pending === request) pending = undefined; });
  return request;
}
