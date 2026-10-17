"use client";

import { useState } from "react";
import type { Product } from "@/lib/data";
import { Gallery } from "./gallery";
import { ProductInfo } from "./product-info";

/** Holds the selected color so the gallery can follow the swatch. */
export function ProductView({ product, children }: { product: Product; children: React.ReactNode }) {
  const [color, setColor] = useState(product.colors[0]);

  // Show the selected color's photo first and hide photos of other colors
  const colorImage = product.colorImages?.[color];
  const colorPhotos = Object.values(product.colorImages ?? {});
  const images = colorImage
    ? [colorImage, ...product.gallery.filter((src) => !colorPhotos.includes(src))]
    : product.gallery;

  return (
    <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-6 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-x-14 lg:gap-y-12">
      <div className="lg:col-start-1 lg:row-start-1">
        <Gallery key={images[0]} name={product.name} images={images} />
      </div>

      <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <ProductInfo product={product} color={color} onColorChange={setColor} />
      </div>

      <div className="mt-4 lg:col-start-1 lg:row-start-2 lg:mt-0">{children}</div>
    </div>
  );
}
