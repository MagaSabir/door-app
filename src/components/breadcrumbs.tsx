import Link from "next/link";
import { JsonLd, breadcrumbLd } from "@/lib/json-ld";

type Crumb = { label: string; href: string };

/**
 * Visible breadcrumbs + matching schema.org BreadcrumbList, built from the same items
 * so the structured data can never drift from what users see. The last item is the current page.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="overflow-x-auto [scrollbar-width:none]">
      <JsonLd data={breadcrumbLd(items.map((i) => ({ name: i.label, path: i.href })))} />
      <ol className="flex items-center gap-2 whitespace-nowrap text-[13px] lg:gap-3 lg:text-sm">
        {items.map((item, i) => {
          const current = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2 lg:gap-3">
              {i > 0 && <span className="text-ink-muted">/</span>}
              {current ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href} className="text-ink/80 hover:text-ink">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
