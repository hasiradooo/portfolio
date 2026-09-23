"use client";
import { useEffect, useRef, useState, type RefObject } from "react";
import Icon from "./scrapbook-icon";
import SegmentedSpectrum from "./segmented-spectrum";
import { RIVER_PLAYER } from "./river-player-config";
import { loadYouTube, type YouTubePlayer } from "./youtube-player";
import styles from "./river-player.module.css";

type TrackProps = { onPlaying: (playing: boolean) => void };
function YouTubeTrack({ onPlaying, playing }: TrackProps & { playing: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const controls = useRef<YouTubePlayer | null>(null);
  const [ready, setReady] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(65);
  const volumeRef = useRef(volume);
  useEffect(() => {
    if (!ready) return;
    const sync = () => {
      const player = controls.current;
      if (!player) return;
      const length = player.getDuration();
      const current = player.getCurrentTime();
      setDuration(Number.isFinite(length) ? length : 0);
      setPosition(Number.isFinite(current) ? current : 0);
    };
    sync();
    const timer = window.setInterval(sync, 500);
    return () => window.clearInterval(timer);
  }, [ready]);
  useEffect(() => {
    if (!attempt || !host.current) return;
    let cancelled = false;
    let player: YouTubePlayer | undefined;
    let readyTimer: number | undefined;
    const container = host.current;
    setReady(false); setError(false); setPosition(0); setDuration(0); setStatus("Loading the tape…"); onPlaying(false);
    const fail = () => {
      if (cancelled) return;
      window.clearTimeout(readyTimer);
      setReady(false); setError(true); setStatus("YouTube couldn’t play here. Try again or open the video."); onPlaying(false);
    };
    void loadYouTube().then(api => {
      if (cancelled) return;
      const mount = document.createElement("div");
      container.replaceChildren(mount);
      readyTimer = window.setTimeout(fail, 15_000);
      player = new api.Player(mount, {
        width: "200", height: "200", videoId: RIVER_PLAYER.youtubeId,
        host: "https://www.youtube-nocookie.com",
        playerVars: { origin: window.location.origin, playsinline: 1, controls: 0, rel: 0, disablekb: 1 },
        events: {
          onReady: ({ target }) => {
            if (cancelled) return;
            window.clearTimeout(readyTimer);
            target.getIframe().title = "Eminem: River feat. Ed Sheeran, YouTube player";
            target.setVolume(volumeRef.current);
            setReady(true); setError(false); setStatus("Press play on the tape if it doesn’t start.");
            target.playVideo();
          },
          onStateChange: ({ data }) => {
            if (cancelled) return;
            onPlaying(data === 1);
            setStatus(data === 1 ? "Playing on YouTube" : data === 2 ? "Paused" : data === 3 ? "Buffering…" : data === 0 ? "That was River. One more time?" : "Ready when you are.");
          },
          onError: fail,
          onAutoplayBlocked: () => { if (!cancelled) { onPlaying(false); setStatus("Press play on the tape to start."); } },
        },
      });
      controls.current = player;
      player.getIframe().setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      player.getIframe().tabIndex = -1;
      player.getIframe().setAttribute("aria-hidden", "true");
    }).catch(fail);
    return () => {
      cancelled = true; window.clearTimeout(readyTimer);
      controls.current = null; player?.destroy(); container.replaceChildren();
    };
  }, [attempt, onPlaying]);
  return <>
    {attempt === 0 && <button type="button" className={styles.loadButton} onClick={() => setAttempt(1)}><Icon name="play" /> play this tape</button>}
    {attempt > 0 && <div className={styles.transport}>
      <button type="button" disabled={!ready} onClick={() => playing ? controls.current?.pauseVideo() : controls.current?.playVideo()} aria-label={playing ? "Pause tape" : "Play tape"}><Icon name={playing ? "pause" : "play"} /> {playing ? "pause" : "play"}</button>
      <button type="button" disabled={!ready} onClick={() => controls.current?.seekTo(0, true)} aria-label="Rewind tape to the beginning"><Icon name="back" /> rewind</button>
      <span className={styles.transportLight} data-lit={playing} aria-hidden="true" />
    </div>}
    {attempt > 0 && <>
      <div className={styles.trackProgress}>
        <label className={styles.seek}><span className={styles.srOnly}>Track position</span><input type="range" min="0" max={duration || 1} step="0.25" value={Math.min(position, duration || 1)} disabled={!ready || !duration} onChange={event => { const value = Number(event.target.value); controls.current?.seekTo(value, true); setPosition(value); }} /></label>
        <span className={styles.time}>{time(position)} / {time(duration)}</span>
      </div>
      <label className={styles.volume}>volume<input type="range" min="0" max="100" value={volume} disabled={!ready} onChange={event => { const value = Number(event.target.value); volumeRef.current = value; setVolume(value); controls.current?.setVolume(value); }} /><span>{volume}%</span></label>
      <div ref={host} className={styles.audioSource} data-youtube-host aria-hidden="true" />
    </>}
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

function TapeReel() {
  return <span className={styles.reel}>
    <svg className={styles.reelCore} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="25" fill="#d9d9cb" stroke="#0d1425" strokeWidth="3" />
      <circle cx="32" cy="32" r="18" fill="#151a29" stroke="#d9d9cb" strokeWidth="9" strokeDasharray="6 13" />
      <circle cx="32" cy="32" r="7" fill="#d9d9cb" /><circle cx="32" cy="32" r="3" fill="#151a29" />
    </svg>
  </span>;
}

export default function RiverPlayer({ animated }: { animated: boolean }) {
  const [playing, setPlaying] = useState(false);
  const analyser = useRef<AnalyserNode | null>(null);
  return <aside className={styles.deck} aria-label="Favorite song player" data-cassette-player data-running={playing && animated}>
    <div className={styles.deckHeader}><span>KIRO’S TAPE DECK</span><span>STEREO / 01</span></div>
    <div className={styles.cassette}>
      <span className={`${styles.screw} ${styles.screwOne}`} aria-hidden="true" />
      <span className={`${styles.screw} ${styles.screwTwo}`} aria-hidden="true" />
      <div className={styles.tapeLabel}>
        <div className={styles.trackName}><span className={styles.sideA}>A</span><div><h2>River</h2><p>Eminem feat. Ed Sheeran</p></div><span className={styles.mixLabel}>a favorite<br />on repeat ♡</span></div>
        <div className={styles.reelWindow} aria-hidden="true"><TapeReel /><span className={styles.tapeBridge}><i /><i /><i /><i /><i /></span><TapeReel /></div>
        <div className={styles.tapeDetails}><span>NORMAL BIAS / TYPE I</span><span>C-90</span></div>
      </div>
      <div className={styles.tapeBase} aria-hidden="true"><i /><span /><span /><i /></div>
      <span className={`${styles.screw} ${styles.screwThree}`} aria-hidden="true" />
      <span className={`${styles.screw} ${styles.screwFour}`} aria-hidden="true" />
    </div>
    <div className={styles.deckPanel}>
      <SegmentedSpectrum playing={playing} animated={animated} analyser={analyser} />
      <div className={styles.displayLabel}><span>{RIVER_PLAYER.audioSrc ? "live audio spectrum" : "playback animation"}</span><span>{!animated ? "motion off" : playing ? "tape rolling" : "tape ready"}</span></div>
      {RIVER_PLAYER.audioSrc ? <AudioTrack src={RIVER_PLAYER.audioSrc} analyser={analyser} onPlaying={setPlaying} /> : <YouTubeTrack onPlaying={setPlaying} playing={playing} />}
      <span className={styles.footnote}>if I had to pick just one…</span>
    </div>
  </aside>;
}
