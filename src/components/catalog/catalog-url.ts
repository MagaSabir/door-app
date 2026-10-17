import { categories, type Category } from "@/lib/data";
import { emptyFilters, type Filters } from "./filter-panel";

export const sortIds = ["popular", "price-asc", "price-desc", "rating"] as const;
export type SortId = (typeof sortIds)[number];

export type CatalogState = { query: string; category: Category | "all"; filters: Filters; sort: SortId };

export const defaultState: CatalogState = { query: "", category: "all", filters: emptyFilters, sort: "popular" };

const list = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);
const num = (v: string | null) => (v && /^\d+$/.test(v) ? Number(v) : null);

/** Reads catalog state from `?q=&cat=&sort=&min=&max=&color=&coat=`, ignoring invalid values */
export function parseCatalogState(search: string): CatalogState {
  const p = new URLSearchParams(search);
  const cat = p.get("cat");
  const sort = p.get("sort");
  return {
    query: p.get("q") ?? "",
    category: categories.some((c) => c.id === cat) ? (cat as Category | "all") : "all",
    sort: sortIds.includes(sort as SortId) ? (sort as SortId) : "popular",
    filters: { priceMin: num(p.get("min")), priceMax: num(p.get("max")), colors: list(p.get("color")), coatings: list(p.get("coat")) },
  };
}

/** Serialises state, omitting defaults so a clean catalog has a clean URL */
export function catalogSearch({ query, category, filters, sort }: CatalogState) {
  const p = new URLSearchParams();
  if (query.trim()) p.set("q", query.trim());
  if (category !== "all") p.set("cat", category);
  if (sort !== "popular") p.set("sort", sort);
  if (filters.priceMin != null) p.set("min", String(filters.priceMin));
  if (filters.priceMax != null) p.set("max", String(filters.priceMax));
  if (filters.colors.length) p.set("color", filters.colors.join(","));
  if (filters.coatings.length) p.set("coat", filters.coatings.join(","));
  const s = p.toString();
  return s ? `?${s}` : "";
}
