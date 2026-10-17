"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/data";
import { Stars } from "./stars";

// Демо-отзывы: заменить на данные из бэкенда
const sampleReviews = [
  { author: "Анна", date: "12 сентября 2026", rating: 5, text: "Поставили две двери в квартиру — выглядят дорого, покрытие ровное, установщики всё сделали за день." },
  { author: "Игорь", date: "28 августа 2026", rating: 5, text: "Хорошее качество за свои деньги. Коробка в комплекте, ничего докупать не пришлось." },
  { author: "Мария", date: "3 августа 2026", rating: 4, text: "Цвет вживую чуть светлее, чем на фото, но смотрится отлично. Доставили вовремя." },
];

const tabs = [
  { id: "description", label: "Описание" },
  { id: "specs", label: "Характеристики" },
  { id: "reviews", label: "Отзывы" },
] as const;

/** Fired by the rating link next to the price to switch to the reviews tab */
export const SHOW_REVIEWS_EVENT = "product:show-reviews";

export function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("description");

  useEffect(() => {
    const showReviews = () => setTab("reviews");
    window.addEventListener(SHOW_REVIEWS_EVENT, showReviews);
    return () => window.removeEventListener(SHOW_REVIEWS_EVENT, showReviews);
  }, []);

  const specs = [
    ["Материал полотна", product.specs.material],
    ["Покрытие", product.specs.coating],
    ["Стекло", product.specs.glass],
    ["Коробка", product.specs.frame],
    ["Гарантия", product.specs.warranty],
    ["Ширина полотна", product.sizes.map((s) => `${s}`).join(", ") + " мм"],
    ["Высота полотна", "2000 мм"],
  ];

  return (
    <div id="reviews" className="scroll-mt-28">
      <div role="tablist" className="-mx-4 flex gap-6 overflow-x-auto border-b border-line px-4 lg:mx-0 lg:gap-8 lg:px-0">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`-mb-px shrink-0 border-b-2 pb-3 text-base transition lg:text-[17px] ${
              tab === t.id ? "border-ink font-medium" : "border-transparent text-ink/80 hover:text-ink"
            }`}
          >
            {t.label}
            {t.id === "reviews" && <span className="ml-1.5 text-ink-muted">{product.reviews}</span>}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="pt-5">
        {tab === "description" && <p className="max-w-prose text-[15px] leading-relaxed text-ink/85 lg:text-base">{product.description}</p>}

        {tab === "specs" && (
          <dl className="divide-y divide-line">
            {specs.map(([k, v]) => (
              <div key={k} className="grid grid-cols-2 gap-4 py-2.5 text-[15px]">
                <dt className="text-ink-muted">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        )}

        {tab === "reviews" && (
          <ul className="space-y-4">
            {sampleReviews.map((r) => (
              <li key={r.author} className="rounded-2xl bg-surface p-4 text-[15px] lg:p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">{r.author}</span>
                  <span className="text-sm text-ink-muted">{r.date}</span>
                </div>
                <div className="mt-1">
                  <Stars value={r.rating} className="size-4" />
                </div>
                <p className="mt-2 leading-relaxed">{r.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
