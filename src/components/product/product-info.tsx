"use client";

import Link from "next/link";
import { useState } from "react";
import { Box, GlassWater, PanelTop, PenLine, Ruler, Send, ShieldCheck } from "lucide-react";
import {
  colorById,
  describeSelection,
  formatPrice,
  managerLink,
  pluralize,
  selectionParams,
  type Product,
} from "@/lib/data";
import { Stars } from "./stars";
import { SHOW_REVIEWS_EVENT } from "./product-tabs";

export function ProductInfo({
  product,
  color,
  onColorChange,
}: {
  product: Product;
  color: string;
  onColorChange: (color: string) => void;
}) {
  const [size, setSize] = useState(product.sizes[0]);

  const colorName = colorById[color].name;
  const selection = describeSelection(product.name, colorName, size);
  const measureHref = `/installation?${new URLSearchParams({
    [selectionParams.model]: product.name,
    [selectionParams.color]: colorName,
    [selectionParams.size]: String(size),
  })}#measure`;

  const specs = [
    { icon: PanelTop, label: "Материал полотна", value: product.specs.material },
    { icon: PenLine, label: "Покрытие", value: product.specs.coating },
    { icon: GlassWater, label: "Стекло", value: product.specs.glass },
    { icon: Box, label: "Коробка", value: product.specs.frame },
    { icon: ShieldCheck, label: "Гарантия", value: product.specs.warranty },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-[26px] font-semibold leading-tight tracking-tight lg:text-[34px]">{product.name}</h1>
        {product.badge && (
          <span className="rounded-full bg-[#fdebdd] px-3 py-1 text-sm text-[#e0782b]">{product.badge}</span>
        )}
      </div>

      <p className="mt-2 flex items-center gap-2 text-sm lg:mt-3 lg:text-[15px]">
        <Stars value={product.rating} className="size-4" />
        <span className="font-medium">{product.rating.toLocaleString("ru-RU")}</span>
        <a
          href="#reviews"
          onClick={() => window.dispatchEvent(new Event(SHOW_REVIEWS_EVENT))}
          className="text-ink-muted hover:text-ink"
        >
          ({product.reviews} {pluralize(product.reviews, ["отзыв", "отзыва", "отзывов"])})
        </a>
      </p>
      <p className="mt-3 text-[22px] font-semibold lg:text-[28px]">{formatPrice(product.price)}</p>

      <p className="mt-4 hidden leading-relaxed text-ink/80 lg:block">{product.summary}</p>

      <fieldset className="mt-5 lg:mt-6">
        <legend className="mb-2.5 text-[15px] font-medium">
          Цвет: <span className="font-normal text-ink-muted">{colorById[color].name}</span>
        </legend>
        <div className="flex flex-wrap items-center gap-3">
          {product.colors.map((id) => {
            const c = colorById[id];
            return (
              <button
                key={id}
                type="button"
                title={c.name}
                aria-label={c.name}
                aria-pressed={color === id}
                onClick={() => onColorChange(id)}
                className={`size-9 rounded-full ring-offset-2 transition lg:size-10 ${
                  color === id ? "ring-2 ring-ink" : "ring-1 ring-black/10 hover:ring-black/30"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="mb-2.5 text-[15px] font-medium">
          Ширина полотна, мм
        </legend>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={size === s}
              onClick={() => setSize(s)}
              className={`min-w-[64px] rounded-lg border px-4 py-2 text-[15px] transition ${
                size === s ? "border-ink bg-surface font-medium" : "border-line hover:border-ink/40"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <dl className="mt-6 hidden text-[15px] lg:block">
        {specs.map(({ icon: Icon, label, value }) => (
          <div key={label} className="grid grid-cols-[28px_160px_1fr] items-center border-b border-line py-2.5">
            <Icon className="size-[18px] stroke-[1.5] text-ink-muted" />
            <dt className="text-ink-muted">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 space-y-3">
        <a
          href={managerLink(`Здравствуйте! ${selection}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-ink py-3.5 text-[15px] text-white transition hover:bg-ink/90"
        >
          <Send className="size-[18px]" />
          Написать менеджеру
        </a>
        <Link
          href={measureHref}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl border-[1.5px] border-ink py-3.5 text-[15px] transition hover:bg-surface"
        >
          <Ruler className="size-[18px]" />
          Заказать бесплатный замер
        </Link>
      </div>
    </div>
  );
}
