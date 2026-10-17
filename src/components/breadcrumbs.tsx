import Link from "next/link";

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="overflow-x-auto [scrollbar-width:none]">
      <ol className="flex items-center gap-2 whitespace-nowrap text-[13px] lg:gap-3 lg:text-sm">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2 lg:gap-3">
            {i > 0 && <span className="text-ink-muted">/</span>}
            {item.href ? (
              <Link href={item.href} className="text-ink/80 hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
