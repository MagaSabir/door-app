import type { Metadata } from "next";
import { Catalog } from "@/components/catalog/catalog";

export const metadata: Metadata = {
  title: "Каталог межкомнатных дверей",
  description: "Современные, классические, лофт и сканди двери. Фильтры по цене, цвету и покрытию.",
};

export default function CatalogPage() {
  return (
    <main>
      <Catalog />
    </main>
  );
}
