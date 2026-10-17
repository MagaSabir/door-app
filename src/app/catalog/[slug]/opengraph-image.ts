import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/data";
import { ogContentType, ogSize, productOg } from "@/lib/og";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

/** One preview per product, with the model name in its alt text */
export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) return [];
  return [{ id: "main", alt: `Межкомнатная дверь ${product.name}`, size: ogSize, contentType: ogContentType }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  return productOg(product.gallery[0] ?? product.image);
}
