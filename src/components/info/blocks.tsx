import { Breadcrumbs } from "@/components/breadcrumbs";

export function PageHeader({ title, lead }: { title: string; lead?: string }) {
  return (
    <header>
      <Breadcrumbs items={[{ href: "/", label: "Главная" }, { label: title }]} />
      <h1 className="mt-4 text-[28px] font-semibold tracking-tight lg:mt-6 lg:text-[44px]">{title}</h1>
      {lead && <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink/75 lg:text-lg">{lead}</p>}
    </header>
  );
}

export function InfoPage({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto max-w-[1280px] px-4 pb-12 pt-4 lg:px-10 lg:pb-20 lg:pt-6">{children}</main>;
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold tracking-tight lg:text-[28px]">{children}</h2>;
}

/** Grid of icon + title + text tiles */
export function FeatureGrid({
  items,
  cols = 3,
}: {
  items: { icon: React.ComponentType<{ className?: string }>; title: string; text: string }[];
  cols?: 2 | 3 | 4;
}) {
  const grid = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <ul className={`grid gap-3 lg:gap-5 ${grid}`}>
      {items.map(({ icon: Icon, title, text }) => (
        <li key={title} className="rounded-2xl border border-line p-5 lg:p-6">
          <span className="grid size-11 place-items-center rounded-full bg-surface">
            <Icon className="size-5 stroke-[1.5]" />
          </span>
          <h3 className="mt-4 font-semibold lg:text-lg">{title}</h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink-muted">{text}</p>
        </li>
      ))}
    </ul>
  );
}

/** Numbered steps */
export function Steps({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {items.map((s, i) => (
        <li key={s.title} className="rounded-2xl bg-surface p-5 lg:p-6">
          <span className="text-sm font-semibold text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-2 font-semibold lg:text-lg">{s.title}</h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink-muted">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-4 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium lg:text-lg">
            {f.q}
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface text-lg leading-none transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
