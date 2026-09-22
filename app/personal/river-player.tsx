"use client";
import { useEffect, useRef, useState, type RefObject } from "react";
import Icon from "./scrapbook-icon";
import SegmentedSpectrum from "./segmented-spectrum";
import { RIVER_PLAYER } from "./river-player-config";
import { loadYouTube, type YouTubePlayer } from "./youtube-player";
import scrapbook from "./personal.module.css";
import styles from "./river-player.module.css";

type TrackProps = { onPlaying: (playing: boolean) => void };
function YouTubeTrack({ onPlaying }: TrackProps) {
  const host = useRef<HTMLDivElement>(null);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!attempt || !host.current) return;
    let cancelled = false;
    let player: YouTubePlayer | undefined;
    let readyTimer: number | undefined;
    const container = host.current;
    setError(false); setStatus("Loading YouTube…"); onPlaying(false);
    const fail = () => {
      if (cancelled) return;
      window.clearTimeout(readyTimer);
      setError(true); setStatus("YouTube couldn’t play here. Try again or open the video."); onPlaying(false);
    };
    void loadYouTube().then(api => {
      if (cancelled) return;
      const mount = document.createElement("div");
      container.replaceChildren(mount);
      readyTimer = window.setTimeout(fail, 15_000);
      player = new api.Player(mount, {
        width: "100%", height: "200", videoId: RIVER_PLAYER.youtubeId,
        host: "https://www.youtube-nocookie.com",
        playerVars: { origin: window.location.origin, playsinline: 1, controls: 1, rel: 0 },
        events: {
          onReady: ({ target }) => {
            if (cancelled) return;
            window.clearTimeout(readyTimer);
            target.getIframe().title = "Eminem: River feat. Ed Sheeran, YouTube player";
            setError(false); setStatus("Press play in the video if it doesn’t start.");
            target.playVideo();
          },
          onStateChange: ({ data }) => {
            if (cancelled) return;
            onPlaying(data === 1);
            setStatus(data === 1 ? "Playing on YouTube" : data === 2 ? "Paused" : data === 3 ? "Buffering…" : data === 0 ? "That was River. One more time?" : "Ready when you are.");
          },
          onError: fail,
          onAutoplayBlocked: () => { if (!cancelled) { onPlaying(false); setStatus("Press play in the video to start."); } },
        },
      });
      player.getIframe().setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    }).catch(fail);
    return () => {
      cancelled = true; window.clearTimeout(readyTimer);
      player?.destroy(); container.replaceChildren();
    };
  }, [attempt, onPlaying]);
  return <>
    {attempt === 0 && <button type="button" className={styles.loadButton} onClick={() => setAttempt(1)}><Icon name="play" /> play River here</button>}
    {attempt > 0 && <div ref={host} className={styles.embed} data-youtube-host />}
    <p className={styles.status} role="status">{status || "No autoplay. Press play when you’re ready."}</p>
    {error && <div className={styles.errorActions}><button type="button" onClick={() => setAttempt(n => n + 1)}>try again</button><a href={`https://www.youtube.com/watch?v=${RIVER_PLAYER.youtubeId}`} target="_blank" rel="noopener noreferrer">open video <Icon name="arrow" /></a></div>}
  </>;
}

const time = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
function AudioTrack({ src, analyser, onPlaying }: TrackProps & { src: string; analyser: RefObject<AnalyserNode | null> }) {
  const audio = useRef<HTMLAudioElement>(null);
  const graph = useRef<{ context: AudioContext; source: MediaElementAudioSourceNode; gain: GainNode } | null>(null);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(65);
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(false);
  useEffect(() => {
    const element = audio.current;
    return () => {
      element?.pause();
      graph.current?.source.disconnect(); graph.current?.gain.disconnect();
      analyser.current?.disconnect(); analyser.current = null;
      void graph.current?.context.close(); graph.current = null;
    };
  }, [analyser]);
  const report = (value: boolean) => { setPlaying(value); onPlaying(value); };
  const toggle = async () => {
    const element = audio.current;
    if (!element) return;
    if (!element.paused) { element.pause(); return; }
    setError("");
    try {
      if (!graph.current) {
        const context = new AudioContext();
        const source = context.createMediaElementSource(element);
        const gain = context.createGain();
        const node = context.createAnalyser();
        node.fftSize = 2048; node.smoothingTimeConstant = .65;
        node.minDecibels = -85; node.maxDecibels = -15;
        gain.gain.value = volume / 100;
        source.connect(gain).connect(node).connect(context.destination);
        graph.current = { context, source, gain }; analyser.current = node;
      }
      await graph.current.context.resume();
      await element.play();
    } catch { report(false); setError("This audio couldn’t play. Check the file and try again."); }
  };
  return <>
    <audio ref={audio} src={src} crossOrigin="anonymous" preload="metadata"
      onLoadedMetadata={event => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
      onTimeUpdate={event => setPosition(event.currentTarget.currentTime)}
      onPlaying={() => { setWaiting(false); report(true); }}
      onPause={() => { setWaiting(false); report(false); }} onEnded={() => report(false)}
      onWaiting={() => { setWaiting(true); report(false); }}
      onError={() => { setWaiting(false); report(false); setError("This audio file is unavailable."); }} />
    <div className={styles.audioControls}>
      <button type="button" onClick={() => void toggle()} aria-label={playing ? "Pause River" : "Play River"}><Icon name={playing ? "pause" : "play"} /></button>
      <label className={styles.seek}><span className={styles.srOnly}>Track position</span><input type="range" min="0" max={duration || 1} step="0.25" value={Math.min(position, duration || 1)} disabled={!duration} onChange={event => { const value = Number(event.target.value); if (audio.current) audio.current.currentTime = value; setPosition(value); }} /></label>
      <span className={styles.time}>{time(position)} / {time(duration)}</span>
    </div>
    <label className={styles.volume}>volume<input type="range" min="0" max="100" value={volume} onChange={event => { const value = Number(event.target.value); setVolume(value); if (graph.current) graph.current.gain.gain.setTargetAtTime(value / 100, graph.current.context.currentTime, .02); }} /><span>{volume}%</span></label>
    <p className={styles.status} role="status">{error || (waiting ? "Buffering…" : playing ? "Playing River" : "Ready when you are.")}</p>
  </>;
}

export default function RiverPlayer({ animated }: { animated: boolean }) {
  const [playing, setPlaying] = useState(false);
  const analyser = useRef<AnalyserNode | null>(null);
  return <aside className={scrapbook.player} aria-label="Favorite song player">
    <div className={scrapbook.playerTitle}><span>♫ kiro’s media player</span><span aria-hidden="true">_ □ ×</span></div>
    <div className={scrapbook.playerBody}>
      <span className={scrapbook.smallLabel}>IF I HAD TO PICK ONE…</span>
      <div className={scrapbook.song}><span className={scrapbook.disc} aria-hidden="true">●</span><div><h2>River</h2><p>Eminem feat. Ed Sheeran</p></div></div>
      <SegmentedSpectrum playing={playing} animated={animated} analyser={analyser} />
      <div className={styles.displayLabel}><span>{RIVER_PLAYER.audioSrc ? "live audio spectrum" : "playback animation"}</span><span>{!animated ? "visuals paused" : playing ? "playing" : "standby"}</span></div>
      {RIVER_PLAYER.audioSrc ? <AudioTrack src={RIVER_PLAYER.audioSrc} analyser={analyser} onPlaying={setPlaying} /> : <YouTubeTrack onPlaying={setPlaying} />}
      <span className={styles.footnote}>a favourite, not an easy decision.</span>
    </div>
  </aside>;
}
