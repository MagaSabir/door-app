"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DoorClosed, House, Phone } from "lucide-react";

const tabs = [
  { href: "/", label: "Главная", icon: House },
  { href: "/catalog", label: "Каталог", icon: DoorClosed },
  { href: "/contacts", label: "Контакты", icon: Phone },
];

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <ul className="grid grid-cols-3">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] ${
                  active ? "font-semibold text-ink" : "text-ink-muted"
                }`}
              >
                <Icon className={`size-6 stroke-[1.6] ${active ? "fill-ink/10" : ""}`} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
