"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useModal } from "@/lib/use-modal";

const SWIPE = 50;
const TAP = 10;

/**
 * Fullscreen photo viewer. Closes on: tap anywhere, ✕, Escape, swipe down,
 * and the browser/Android back button. Swipe left/right switches photos.
 */
export function Lightbox({
  images,
  index,
  name,
  onIndex,
  onClose,
}: {
  images: string[];
  index: number;
  name: string;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const many = images.length > 1;
  const touch = useRef<{ x: number; y: number; multi: boolean } | null>(null);
  const lastTouch = useRef(0);
  const go = (d: number) => onIndex((index + d + images.length) % images.length);

  // Every UI close goes through history.back(): the popstate handler then calls onClose.
  // This keeps the extra history entry and the Android/browser back button in sync.
  const close = () => {
    if (window.history.state?.lightbox) window.history.back();
    else onClose();
  };

  // Scroll lock, Escape and focus trap
  const dialogRef = useRef<HTMLDivElement>(null);
  useModal(true, dialogRef, close);

  const onKey = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  });
  const onBack = useEffectEvent(() => onClose());

  // Arrow keys and the back button
  useEffect(() => {
    // Guard against a double push when StrictMode re-runs the effect in dev
    if (!window.history.state?.lightbox) {
      window.history.pushState({ ...window.history.state, lightbox: true }, "");
    }
    const onPop = () => {
      if (!window.history.state?.lightbox) onBack();
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Touch gestures are resolved here entirely (tap / swipe / pinch); onClick is mouse-only.
  // Otherwise a short or sloppy swipe, or lifting fingers after a pinch, fires a click and closes.
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 1) {
      touch.current = { x: 0, y: 0, multi: true };
      return;
    }
    if ((e.target as Element).closest("button")) return; // buttons handle their own taps
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, multi: false };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    lastTouch.current = Date.now();
    const start = touch.current;
    if (!start || e.touches.length > 0) return; // wait until every finger is lifted
    touch.current = null;
    if ((e.target as Element).closest("button")) return;
    e.preventDefault(); // no synthetic click — the gesture is decided below
    if (start.multi) return; // pinch: neither a tap nor a swipe
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    const adx = Math.abs(dx);
    const ady = Math.abs(dy);
    if (adx < TAP && ady < TAP) close();
    else if (ady > adx) {
      if (dy > SWIPE) close();
    } else if (many && adx > SWIPE) {
      go(dx < 0 ? 1 : -1);
    }
    // anything in between is an unfinished gesture — ignore it
  };
  const onClick = () => {
    // Some browsers still emit a click after touchend; touches are handled above
    if (Date.now() - lastTouch.current < 700) return;
    close();
  };

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Фото: ${name}`}
      className="fixed inset-0 z-[100] flex touch-none select-none items-center justify-center bg-black"
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="pointer-events-none relative h-[85dvh] w-full max-w-3xl">
        <Image src={images[index]} alt={name} fill sizes="100vw" className="object-contain" />
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
        aria-label="Закрыть"
        data-autofocus
        className="absolute right-3 top-[max(12px,env(safe-area-inset-top))] z-10 grid size-12 place-items-center rounded-full bg-white text-ink shadow-lg"
      >
        <X className="size-6" />
      </button>

      {many && (
        <>
          <NavButton dir="prev" onClick={() => go(-1)} />
          <NavButton dir="next" onClick={() => go(1)} />
          <p className="pointer-events-none absolute inset-x-0 bottom-[max(16px,env(safe-area-inset-bottom))] text-center text-sm text-white/70">
            {index + 1} / {images.length}
          </p>
        </>
      )}
    </div>,
    document.body,
  );
}

function NavButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={dir === "prev" ? "Предыдущее фото" : "Следующее фото"}
      className={`absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 ${
        dir === "prev" ? "left-3" : "right-3"
      }`}
    >
      <Icon className="size-6" />
    </button>
  );
}
