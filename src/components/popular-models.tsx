import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import { ProductCard } from "./product-card";

const popular = [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 5);

export function PopularModels() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 pb-10 pt-8 lg:px-28 lg:pb-24 lg:pt-20">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium tracking-tight text-ink lg:text-[40px]">Популярные модели</h2>
        <Link
          href="/catalog"
          className="group flex items-center gap-3 text-sm text-ink-muted hover:text-ink lg:text-xl"
        >
          Смотреть все
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 lg:size-6" />
        </Link>
      </div>

      <ul className="-mx-4 mt-5 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:mt-12 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:px-0">
        {popular.map((p) => (
          <li key={p.slug} className="w-[46%] shrink-0 snap-start lg:w-auto">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
