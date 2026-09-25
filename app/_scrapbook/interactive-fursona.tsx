"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./interactive-fursona.module.css";

type Heart = { id: number; style: CSSProperties };
const honkUrl = "https://www.myinstants.com/media/sounds/fnaf-12-3-freddys-nose-sound.mp3";

export default function InteractiveFursona({ animated }: { animated: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const audio = useRef<HTMLAudioElement>(null);
  const context = useRef<AudioContext | null>(null);
  const touchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const serial = useRef(0);
  const alive = useRef(true);
  const petting = hovered || focused || touched;

  useEffect(() => {
    alive.current = true;
    const sound = audio.current;
    return () => {
      alive.current = false;
      if (touchTimer.current) clearTimeout(touchTimer.current);
      sound?.pause();
      void context.current?.close();
      context.current = null;
    };
  }, []);

  useEffect(() => {
    if (!animated) { setHearts([]); return; }
    if (!petting) return;
    const emit = () => {
      const heart = { id: serial.current++, style: {
        "--left": `${45 + Math.random() * 28}%`,
        "--size": `${12 + Math.random() * 17}px`,
        "--drift": `${Math.random() * 110 - 55}px`,
        "--wave": `${10 + Math.random() * 16}px`,
        "--spin": `${Math.random() * 60 - 30}deg`,
        "--life": `${1800 + Math.random() * 900}ms`,
        "--color": ["#ee7198", "#d44d77", "#f393b1"][Math.floor(Math.random() * 3)],
      } as CSSProperties };
      setHearts(previous => [...previous.slice(-15), heart]);
    };
    emit();
    const timer = setInterval(emit, 230);
    return () => clearInterval(timer);
  }, [petting, animated]);

  function pet() {
    setTouched(true);
    if (touchTimer.current) clearTimeout(touchTimer.current);
    touchTimer.current = setTimeout(() => setTouched(false), 1500);
  }

  function squeak() {
    // Prepare the fallback during the user gesture, for mobile audio policies.
    try {
      if (!context.current) context.current = new AudioContext();
      void context.current.resume().catch(() => {});
    } catch { /* The hosted clip can still play without Web Audio. */ }
    const fallback = () => {
      const ctx = context.current;
      if (!alive.current || !ctx || ctx.state === "closed") return;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(850, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1450, ctx.currentTime + 0.06);
      oscillator.frequency.exponentialRampToValueAtTime(480, ctx.currentTime + 0.22);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.24);
      oscillator.connect(gain); gain.connect(ctx.destination);
      oscillator.start(); oscillator.stop(ctx.currentTime + 0.25);
      oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
    };
    const sound = audio.current;
    if (!sound) { fallback(); return; }
    sound.volume = 0.45;
    sound.currentTime = 0;
    void sound.play().catch(fallback);
  }

  return (
    <div className={styles.portrait} data-petting={petting}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.art} src="/story/characters/kiro.png" alt="Kiro’s fursona" width="1280" height="999" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={`${styles.art} ${styles.closed}`} src="/story/characters/kiro-closed-eyes.png" alt="" aria-hidden="true" width="1280" height="999" />
      <button className={styles.head} type="button" aria-label="Pet Kiro’s head" title="Head pats? ♡"
        onPointerEnter={event => { if (event.pointerType !== "touch") setHovered(true); }}
        onPointerLeave={() => setHovered(false)}
        onFocus={event => { if (event.currentTarget.matches(":focus-visible")) setFocused(true); }}
        onBlur={() => setFocused(false)} onClick={pet} />
      <button className={styles.nose} type="button" aria-label="Boop Kiro’s nose (plays a squeak)" title="Boop!" onClick={squeak} />
      <div className={styles.hearts} aria-hidden="true">
        {hearts.map(heart => <span className={styles.rising} key={heart.id} style={heart.style}
          onAnimationEnd={event => { if (event.target === event.currentTarget) setHearts(previous => previous.filter(item => item.id !== heart.id)); }}>
          <span className={styles.wave}>♥</span>
        </span>)}
      </div>
      <audio ref={audio} src={honkUrl} preload="none" />
    </div>
  );
}
