import type { MetadataRoute } from "next";
import { productImages, products } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/catalog", priority: 0.9, changeFrequency: "weekly" },
    { path: "/installation", priority: 0.6, changeFrequency: "monthly" },
    { path: "/delivery", priority: 0.6, changeFrequency: "monthly" },
    { path: "/about", priority: 0.5, changeFrequency: "monthly" },
    { path: "/contacts", priority: 0.5, changeFrequency: "monthly" },
  ];

  return [
    ...pages.map((p) => ({ url: absoluteUrl(p.path), changeFrequency: p.changeFrequency, priority: p.priority })),
    ...products.map((p) => ({
      url: absoluteUrl(`/catalog/${p.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: productImages(p).map((src) => absoluteUrl(src)),
    })),
  ];
}
