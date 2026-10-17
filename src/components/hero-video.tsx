"use client";

import { useEffect, useRef } from "react";

type Source = { src: string; type: string };

/**
 * Background video for the hero. React doesn't render the `muted` attribute into
 * server HTML, and iOS Safari only autoplays muted videos — so we set it and start
 * playback on mount. Hidden for users who prefer reduced motion (the poster stays).
 */
export function HeroVideo({
  sources,
  poster,
  className = "",
}: {
  /** In order of preference — the browser plays the first one it supports */
  sources: Source[];
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.muted = true;
    video.play().catch(() => {
      // Autoplay blocked (e.g. Low Power Mode) — the poster image stays visible
    });
  }, []);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      className={`motion-reduce:hidden ${className}`}
    >
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
