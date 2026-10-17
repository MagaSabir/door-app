"use client";

import { Check } from "lucide-react";
import { colors, products } from "@/lib/data";

export type Filters = {
  priceMin: number | null;
  priceMax: number | null;
  colors: string[];
  coatings: string[];
};

export const emptyFilters: Filters = { priceMin: null, priceMax: null, colors: [], coatings: [] };

export function countActive(f: Filters) {
  return (f.priceMin != null || f.priceMax != null ? 1 : 0) + f.colors.length + f.coatings.length;
}

const coatings = [...new Set(products.map((p) => p.specs.coating))];
const usedColors = colors.filter((c) => products.some((p) => p.colors.includes(c.id)));

function toggle(list: string[], id: string) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

export function FilterPanel({ value, onChange }: { value: Filters; onChange: (f: Filters) => void }) {
  const parse = (v: string) => (v === "" ? null : Math.max(0, Number(v.replace(/\D/g, ""))));

  return (
    <div className="space-y-7">
      <fieldset>
        <legend className="mb-3 font-medium">Цена, ₽</legend>
        <div className="grid grid-cols-2 gap-2">
          <PriceInput
            label="от"
            value={value.priceMin}
            onChange={(v) => onChange({ ...value, priceMin: parse(v) })}
          />
          <PriceInput
            label="до"
            value={value.priceMax}
            onChange={(v) => onChange({ ...value, priceMax: parse(v) })}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 font-medium">Цвет</legend>
        <div className="flex flex-wrap gap-3">
          {usedColors.map((c) => {
            const on = value.colors.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                title={c.name}
                aria-label={c.name}
                aria-pressed={on}
                onClick={() => onChange({ ...value, colors: toggle(value.colors, c.id) })}
                className={`grid size-10 place-items-center rounded-full ring-offset-2 transition ${
                  on ? "ring-2 ring-ink" : "ring-1 ring-black/10 hover:ring-black/30"
                }`}
                style={{ backgroundColor: c.hex }}
              >
                {on && <Check className={`size-4 ${isLight(c.hex) ? "text-ink" : "text-white"}`} />}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 font-medium">Покрытие</legend>
        <div className="space-y-1">
          {coatings.map((c) => {
            const on = value.coatings.includes(c);
            return (
              <label key={c} className="flex cursor-pointer items-center gap-3 py-1.5">
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => onChange({ ...value, coatings: toggle(value.coatings, c) })}
                  className="peer sr-only"
                />
                <span
                  className={`grid size-5 place-items-center rounded-md border transition peer-focus-visible:ring-2 peer-focus-visible:ring-ink/30 ${
                    on ? "border-ink bg-ink text-white" : "border-black/20"
                  }`}
                >
                  {on && <Check className="size-3.5" />}
                </span>
                {c}
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

function PriceInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | null;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 rounded-xl border border-line px-3 py-2.5 focus-within:border-ink/40">
      <span className="text-sm text-ink-muted">{label}</span>
      <input
        inputMode="numeric"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-w-0 bg-transparent text-[16px] outline-none"
      />
    </label>
  );
}

function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b > 160;
}
