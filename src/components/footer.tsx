import Link from "next/link";
import { cacheLife } from "next/cache";
import { Logo } from "./logo";
import { company, managerUrl, phone } from "@/lib/data";

const columns = [
  {
    title: "Покупателям",
    links: [
      { href: "/catalog", label: "Каталог" },
      { href: "/delivery", label: "Доставка и оплата" },
      { href: "/installation", label: "Установка" },
    ],
  },
  {
    title: "Компания",
    links: [
      { href: "/about", label: "О компании" },
      { href: "/contacts", label: "Контакты" },
      { href: "/installation#measure", label: "Бесплатный замер" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-16 lg:py-14">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
            Межкомнатные двери для современного интерьера. Замер, доставка и установка под ключ.
          </p>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-sm font-semibold">{col.title}</h2>
            <ul className="mt-3 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[15px] text-ink/75 hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="text-sm font-semibold">Связаться с нами</h2>
          <a href={phone.href} className="mt-3 block text-lg font-semibold hover:opacity-80">
            {phone.display}
          </a>
          <p className="mt-1 text-sm text-ink-muted">{company.hours}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[15px]">
            <a href={`mailto:${company.email}`} className="text-ink/75 hover:text-ink">
              {company.email}
            </a>
            <a href={managerUrl} target="_blank" rel="noopener noreferrer" className="text-ink/75 hover:text-ink">
              Telegram
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-1 px-4 py-5 text-xs text-ink-muted sm:flex-row sm:justify-between lg:px-16">
          <span>
            © <CurrentYear /> {company.name}. Все права защищены.
          </span>
          <span>{company.legal}</span>
        </div>
      </div>
    </footer>
  );
}

/** Cached for a day so the page stays prerendered but the year still rolls over */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
