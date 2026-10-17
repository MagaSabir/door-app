"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useModal } from "@/lib/use-modal";

const SWIPE = 50;

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
  const touch = useRef<{ x: number; y: number } | null>(null);
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

  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) < SWIPE && Math.abs(dy) < SWIPE) return; // a tap — handled by onClick
    e.preventDefault(); // swipe shouldn't also count as a tap
    if (Math.abs(dy) > Math.abs(dx)) {
      if (dy > 0) close();
    } else if (many) {
      go(dx < 0 ? 1 : -1);
    }
  };

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Фото: ${name}`}
      className="fixed inset-0 z-[100] flex touch-none select-none items-center justify-center bg-black"
      onClick={close}
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
