import Link from "next/link";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 40" fill="none" aria-hidden className={className}>
      <path d="M4 38V8L16 2l12 6v30" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M10 38V12h12v26" stroke="currentColor" strokeWidth="2.2" />
      <path d="M14 16h4v18h-4z" fill="currentColor" />
      <path d="M1 38h30" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const sub = tone === "light" ? "text-white/70" : "text-ink-muted";
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="ДвериГрад — на главную">
      <span
        className={
          tone === "light"
            ? "text-white"
            : "grid size-11 place-items-center rounded-xl bg-surface text-ink"
        }
      >
        <LogoMark className={tone === "light" ? "h-11 w-9" : "h-7 w-6"} />
      </span>
      <span className="leading-tight">
        <span className="block text-lg font-semibold tracking-tight lg:text-2xl">ДвериГрад</span>
        <span className={`block text-[10px] lg:text-sm ${sub}`}>Стильные двери для вашего дома</span>
      </span>
    </Link>
  );
}
