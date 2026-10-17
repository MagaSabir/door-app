import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { Catalog } from "@/components/catalog/catalog";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { products } from "@/lib/data";
import { JsonLd, itemListLd } from "@/lib/json-ld";

export const metadata: Metadata = pageMetadata({
  title: "Каталог межкомнатных дверей — цены и фото",
  description:
    "Межкомнатные двери в стилях модерн, классика, лофт и сканди: фото, цвета, размеры и цены. Бесплатный замер, доставка и установка.",
  path: "/catalog",
});

export default function CatalogPage() {
  return (
    <main>
      <JsonLd data={itemListLd(products)} />
      <Catalog
        breadcrumbs={
          <Breadcrumbs
            items={[
              { href: "/", label: "Главная" },
              { href: "/catalog", label: "Каталог" },
            ]}
          />
        }
      />
    </main>
  );
}
