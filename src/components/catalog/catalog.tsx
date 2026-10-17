"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { ArrowUpDown, Check, Search, SlidersHorizontal, X } from "lucide-react";
import { categories, products, pluralize } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { Sheet } from "@/components/sheet";
import { FilterPanel, emptyFilters, countActive, type Filters } from "./filter-panel";
import { catalogSearch, defaultState, parseCatalogState, type CatalogState, type SortId } from "./catalog-url";

const sortOptions = [
  { id: "popular", label: "По популярности" },
  { id: "price-asc", label: "Сначала дешевле" },
  { id: "price-desc", label: "Сначала дороже" },
  { id: "rating", label: "По рейтингу" },
] as const satisfies readonly { id: SortId; label: string }[];

const noopSubscribe = () => () => {};

/**
 * Server render shows the full catalog (good for SEO). After hydration the URL is read
 * once and the list remounts with filters from `?…`, so shared links and "back" keep them.
 */
export function Catalog({ breadcrumbs }: { breadcrumbs: React.ReactNode }) {
  const search = useSyncExternalStore(
    noopSubscribe,
    () => window.location.search,
    () => null,
  );
  // `initial` is only read when CatalogView mounts, so later URL updates don't reset the UI
  const ready = search !== null;
  return (
    <CatalogView
      key={ready ? "client" : "server"}
      initial={ready ? parseCatalogState(search) : defaultState}
      syncUrl={ready}
      breadcrumbs={breadcrumbs}
    />
  );
}

function CatalogView({
  initial,
  syncUrl,
  breadcrumbs,
}: {
  initial: CatalogState;
  /** Off for the server-state render, which must not overwrite the URL before it is read */
  syncUrl: boolean;
  breadcrumbs: React.ReactNode;
}) {
  const [query, setQuery] = useState(initial.query);
  const [category, setCategory] = useState(initial.category);
  const [filters, setFilters] = useState<Filters>(initial.filters);
  const [sort, setSort] = useState<SortId>(initial.sort);
  const [sheet, setSheet] = useState<"filters" | "sort" | null>(null);

  // Keep the address bar in sync so the selection can be shared and survives "back"
  useEffect(() => {
    if (!syncUrl) return;
    const next = `${window.location.pathname}${catalogSearch({ query, category, filters, sort })}`;
    if (next !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(window.history.state, "", next);
    }
  }, [syncUrl, query, category, filters, sort]);

  const result = useMemo(() => {
    const q = query.trim().toLowerCase();
    // "от" greater than "до" is treated as a swapped range
    const [min, max] =
      filters.priceMin != null && filters.priceMax != null && filters.priceMin > filters.priceMax
        ? [filters.priceMax, filters.priceMin]
        : [filters.priceMin, filters.priceMax];
    const list = products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (!q || p.name.toLowerCase().includes(q)) &&
        (max == null || p.price <= max) &&
        (min == null || p.price >= min) &&
        (filters.colors.length === 0 || filters.colors.some((c) => p.colors.includes(c))) &&
        (filters.coatings.length === 0 || filters.coatings.includes(p.specs.coating)),
    );
    return list.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return b.popularity - a.popularity;
    });
  }, [query, category, filters, sort]);

  const activeFilters = countActive(filters);
  const resetAll = () => {
    setQuery("");
    setCategory("all");
    setFilters(emptyFilters);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-4 lg:px-10 lg:pb-24 lg:pt-6 xl:px-16">
      {breadcrumbs}
      <div className="mt-4 flex items-end justify-between gap-6 lg:mt-6">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight lg:text-5xl">Каталог</h1>
          <p className="mt-1 text-sm text-ink-muted lg:mt-2 lg:text-base">
            {result.length} {pluralize(result.length, ["модель", "модели", "моделей"])}
          </p>
        </div>
        <label className="relative hidden w-full max-w-md lg:block">
          <span className="sr-only">Поиск по моделям</span>
          <SearchInput value={query} onChange={setQuery} />
        </label>
      </div>

      {/* Mobile search */}
      <label className="relative mt-4 block lg:hidden">
        <span className="sr-only">Поиск по моделям</span>
        <SearchInput value={query} onChange={setQuery} />
      </label>

      {/* Category chips */}
      <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] lg:mx-0 lg:mt-8 lg:flex-wrap lg:px-0">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCategory(c.id)}
            aria-pressed={category === c.id}
            className={`shrink-0 rounded-full border px-4 py-2 text-[15px] transition lg:px-5 lg:py-2.5 ${
              category === c.id
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-ink hover:border-ink/30"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Mobile: filters & sort buttons */}
      <div className="mt-4 grid grid-cols-2 gap-3 lg:hidden">
        <ToolbarButton onClick={() => setSheet("filters")} icon={<SlidersHorizontal />}>
          Фильтры
          {activeFilters > 0 && (
            <span className="ml-auto grid size-5 place-items-center rounded-full bg-ink text-[11px] text-white">
              {activeFilters}
            </span>
          )}
        </ToolbarButton>
        <ToolbarButton onClick={() => setSheet("sort")} icon={<ArrowUpDown />}>
          Сортировка
        </ToolbarButton>
      </div>

      <div className="mt-5 lg:mt-10 lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <FilterPanel value={filters} onChange={setFilters} />
            {activeFilters > 0 && (
              <button
                type="button"
                onClick={() => setFilters(emptyFilters)}
                className="mt-6 text-sm text-ink-muted underline-offset-4 hover:text-ink hover:underline"
              >
                Сбросить фильтры
              </button>
            )}
          </div>
        </aside>

        <section aria-label="Список моделей">
          <div className="mb-6 hidden items-center justify-end gap-3 lg:flex">
            <span className="text-sm text-ink-muted">Сортировка:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
              className="rounded-xl border border-line bg-white px-4 py-2.5 text-[15px] outline-none focus:border-ink/40"
            >
              {sortOptions.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {result.length > 0 ? (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-6 xl:grid-cols-4">
              {result.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} variant="boxed" />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl bg-surface px-6 py-16 text-center">
              <p className="text-lg font-medium">Ничего не найдено</p>
              <p className="mt-1 text-ink-muted">Попробуйте изменить запрос или фильтры</p>
              <button
                type="button"
                onClick={resetAll}
                className="mt-5 rounded-xl bg-ink px-6 py-3 text-white hover:bg-ink/90"
              >
                Сбросить всё
              </button>
            </div>
          )}
        </section>
      </div>

      <Sheet
        open={sheet === "filters"}
        onClose={() => setSheet(null)}
        title="Фильтры"
        footer={
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFilters(emptyFilters)}
              className="rounded-xl border border-line py-3.5"
            >
              Сбросить
            </button>
            <button type="button" onClick={() => setSheet(null)} className="rounded-xl bg-ink py-3.5 text-white">
              Показать {result.length}
            </button>
          </div>
        }
      >
        <FilterPanel value={filters} onChange={setFilters} />
      </Sheet>

      <Sheet open={sheet === "sort"} onClose={() => setSheet(null)} title="Сортировка">
        <ul>
          {sortOptions.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                onClick={() => {
                  setSort(o.id);
                  setSheet(null);
                }}
                className="flex w-full items-center justify-between border-b border-line py-4 text-left text-[17px]"
              >
                {o.label}
                {sort === o.id && <Check className="size-5" />}
              </button>
            </li>
          ))}
        </ul>
      </Sheet>
    </div>
  );
}

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <>
      <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-muted" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Поиск по моделям..."
        className="w-full rounded-2xl bg-surface py-3.5 pl-12 pr-11 text-[16px] outline-none ring-ink/20 placeholder:text-ink-muted focus:ring-2 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Очистить поиск"
          className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-ink-muted hover:bg-black/5"
        >
          <X className="size-4" />
        </button>
      )}
    </>
  );
}

function ToolbarButton({
  onClick,
  icon,
  children,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2.5 rounded-xl border border-line bg-white px-4 py-3.5 text-[15px] [&>svg]:size-5 [&>svg]:stroke-[1.6]"
    >
      {icon}
      {children}
    </button>
  );
}
