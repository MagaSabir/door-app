"use client";

import { useEffect, useEffectEvent, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])';

// Several overlays can be open at once (e.g. menu → sheet), so the page lock is ref-counted
let scrollLocks = 0;

function lockScroll() {
  if (scrollLocks++ === 0) document.body.style.overflow = "hidden";
}

function unlockScroll() {
  if (--scrollLocks === 0) document.body.style.overflow = "";
}

/**
 * Shared behaviour for overlays (menu drawer, bottom sheets, lightbox) while `open`:
 * locks page scroll, closes on Escape, keeps Tab focus inside `ref`, and returns
 * focus to the element that opened it.
 */
export function useModal(open: boolean, ref: RefObject<HTMLElement | null>, onClose: () => void) {
  const onKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key !== "Tab" || !ref.current) return;
    const items = [...ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.getClientRects().length > 0);
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    lockScroll();

    const node = ref.current;
    const initial = node?.querySelector<HTMLElement>("[data-autofocus]") ?? node?.querySelector<HTMLElement>(FOCUSABLE);
    initial?.focus({ preventScroll: true });

    document.addEventListener("keydown", onKeyDown);
    return () => {
      unlockScroll();
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus({ preventScroll: true });
    };
  }, [open, ref]);
}
