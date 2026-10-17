"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Menu, Phone, Search, X } from "lucide-react";
import { Logo } from "./logo";
import { navLinks, phone } from "@/lib/data";
import { useModal } from "@/lib/use-modal";

export function Header() {
  const pathname = usePathname();
  const overlay = pathname === "/";
  const [open, setOpen] = useState(false);

  const drawerRef = useRef<HTMLElement>(null);
  const close = () => setOpen(false);
  useModal(open, drawerRef, close);

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
          className={`mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-10 xl:px-16 ${overlay ? "py-8" : "py-5"}`}
        >
          <Logo tone={overlay ? "light" : "dark"} />
          <nav className="flex items-center gap-6 whitespace-nowrap text-[15px] xl:gap-8 xl:text-[17px]">
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
          <div className={`flex items-center gap-5 xl:gap-6 ${overlay ? "text-white/90" : "text-ink"}`}>
            <IconLink label="Поиск" href="/catalog">
              <Search />
            </IconLink>
            <span className={`h-8 w-px ${overlay ? "bg-white/20" : "bg-line"}`} />
            <a href={phone.href} className="whitespace-nowrap text-[15px] hover:opacity-80 xl:text-[17px]">
              {phone.display}
            </a>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "visible" : "invisible pointer-events-none transition-[visibility] duration-300"}`}
        inert={!open}
      >
        <div
          onClick={close}
          className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
          className={`absolute right-0 top-0 flex h-full w-[75%] max-w-[300px] flex-col bg-white px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 shadow-xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            type="button"
            onClick={close}
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
                onClick={close}
                className="border-b border-line py-3.5 text-[17px]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <a href={phone.href} className="mt-auto flex items-center gap-2 text-[17px] font-medium">
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
