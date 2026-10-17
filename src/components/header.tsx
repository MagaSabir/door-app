"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, Search, X } from "lucide-react";
import { Logo } from "./logo";
import { navLinks, phone } from "@/lib/data";

export function Header() {
  const pathname = usePathname();
  const overlay = pathname === "/";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Mobile */}
      <header className="sticky top-0 z-40 flex items-center justify-between bg-white px-4 py-3 shadow-[0_1px_0_var(--color-line)] lg:hidden">
        <Logo />
        <div className="flex items-center gap-1">
          {!overlay && (
            <Link
              href="/catalog"
              aria-label="Поиск"
              className="grid size-10 place-items-center rounded-lg hover:bg-surface"
            >
              <Search className="size-6 stroke-[1.6]" />
            </Link>
          )}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Открыть меню"
            className="grid size-10 place-items-center rounded-lg text-ink hover:bg-surface"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      {/* Desktop */}
      <header
        className={
          overlay
            ? "absolute inset-x-0 top-0 z-30 hidden text-white lg:block"
            : "sticky top-0 z-30 hidden border-b border-line bg-white/95 text-ink backdrop-blur lg:block"
        }
      >
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between px-16 ${overlay ? "py-8" : "py-5"}`}
        >
          <Logo tone={overlay ? "light" : "dark"} />
          <nav className="flex items-center gap-8 text-[17px]">
            {navLinks.map((l) => {
              const active = pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`transition ${
                    overlay
                      ? "text-white/90 hover:text-white"
                      : active
                        ? "font-medium text-ink"
                        : "text-ink/80 hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <div className={`flex items-center gap-6 ${overlay ? "text-white/90" : "text-ink"}`}>
            <IconLink label="Поиск" href="/catalog">
              <Search />
            </IconLink>
            <span className={`h-8 w-px ${overlay ? "bg-white/20" : "bg-line"}`} />
            <a href={phone.href} className="text-[17px] hover:opacity-80">
              {phone.display}
            </a>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 transition-[visibility] duration-300 lg:hidden ${open ? "visible" : "invisible pointer-events-none"}`} aria-hidden={!open}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-white p-6 shadow-xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Закрыть меню"
            className="ml-auto grid size-10 place-items-center rounded-lg hover:bg-surface"
          >
            <X className="size-6" />
          </button>
          <nav className="mt-4 flex flex-col">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-lg"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <a href={phone.href} className="mt-auto flex items-center gap-2 text-lg font-medium">
            <Phone className="size-5" />
            {phone.display}
          </a>
        </aside>
      </div>
    </>
  );
}

function IconLink({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  return (
    <Link href={href} aria-label={label} className="transition hover:opacity-80 [&_svg]:size-6 [&_svg]:stroke-[1.6]">
      {children}
    </Link>
  );
}
