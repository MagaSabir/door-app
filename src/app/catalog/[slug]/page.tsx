import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hammer, ShieldCheck, Sparkles } from "lucide-react";
import { formatPrice, getProduct, products } from "@/lib/data";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductView } from "@/components/product/product-view";
import { ProductTabs } from "@/components/product/product-tabs";
import { ProductCard } from "@/components/product-card";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/catalog/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: `Дверь ${product.name} — ${formatPrice(product.price)}`,
    description: product.summary,
    openGraph: { images: [product.gallery[0]] },
  };
}

const perks = [
  { icon: Sparkles, label: "Современный дизайн" },
  { icon: ShieldCheck, label: "Износостойкое покрытие" },
  { icon: Hammer, label: "Простая установка" },
];

export default async function ProductPage({ params }: PageProps<"/catalog/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const similar = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <main className="mx-auto max-w-[1280px] px-4 pb-10 pt-4 lg:px-10 lg:pb-20 lg:pt-6">
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/catalog", label: "Каталог" },
          { href: "/catalog", label: "Межкомнатные двери" },
          { label: product.name },
        ]}
      />

      <ProductView product={product}>
        <ProductTabs product={product} />
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {perks.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2.5 rounded-full border border-line py-1 pl-1 pr-4">
              <span className="grid size-9 place-items-center rounded-full bg-surface">
                <Icon className="size-[18px] stroke-[1.5]" />
              </span>
              <span className="text-sm">{label}</span>
            </li>
          ))}
        </ul>
      </ProductView>

      <section className="mt-14 lg:mt-20">
        <h2 className="text-xl font-medium tracking-tight lg:text-2xl">Похожие модели</h2>
        <ul className="mt-5 grid grid-cols-2 gap-3 lg:mt-6 lg:grid-cols-4 lg:gap-5">
          {similar.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} variant="boxed" />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
