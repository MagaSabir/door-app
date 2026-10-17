import Image from "next/image";
import Link from "next/link";
import { colorById, formatPrice, pluralize, type Product } from "@/lib/data";

const MAX_SWATCHES = 4;

/** Short description for cards: «Экошпон, со стеклом» */
export function productMeta(product: Product) {
  const glass = product.specs.glass === "Без стекла" ? "глухая" : "со стеклом";
  return `${product.specs.coating}, ${glass}`;
}

export function ProductCard({
  product,
  variant = "plain",
}: {
  product: Product;
  variant?: "plain" | "boxed";
}) {
  const boxed = variant === "boxed";
  const shown = product.colors.slice(0, MAX_SWATCHES);
  const extra = product.colors.length - shown.length;
  const colorsLabel = `${product.colors.length} ${pluralize(product.colors.length, ["цвет", "цвета", "цветов"])}`;

  return (
    <article
      className={`group h-full ${
        boxed
          ? "rounded-2xl bg-white p-2 shadow-[0_2px_14px_rgba(0,0,0,0.06)] transition hover:shadow-[0_6px_24px_rgba(0,0,0,0.1)]"
          : ""
      }`}
    >
      <Link href={`/catalog/${product.slug}`} className="flex h-full flex-col">
        <div className={`relative aspect-[3/4] overflow-hidden bg-surface ${boxed ? "rounded-xl" : "rounded-2xl"}`}>
          <Image
            src={product.image}
            alt={`Межкомнатная дверь ${product.name}`}
            fill
            sizes="(min-width: 1024px) 20vw, 45vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute left-2 top-2 rounded-full bg-[#fdebdd] px-2.5 py-1 text-xs font-medium text-[#e0782b]">
              {product.badge}
            </span>
          )}
        </div>

        {boxed ? (
          <div className="flex flex-1 flex-col px-2 pb-2 pt-3">
            <h3 className="text-base font-medium text-ink lg:text-lg">{product.name}</h3>
            <p className="mt-0.5 text-[13px] text-ink-muted lg:text-sm">{productMeta(product)}</p>
            <div className="mt-2.5 flex items-center gap-1.5" role="img" aria-label={colorsLabel}>
              {shown.map((id) => (
                <span
                  key={id}
                  title={colorById[id].name}
                  className="size-4 rounded-full ring-1 ring-black/10"
                  style={{ backgroundColor: colorById[id].hex }}
                />
              ))}
              {extra > 0 && <span className="text-xs text-ink-muted">+{extra}</span>}
            </div>
            <p className="mt-auto pt-3 text-[17px] font-semibold text-ink lg:text-lg">{formatPrice(product.price)}</p>
          </div>
        ) : (
          <>
            <h3 className="mt-4 text-lg text-ink lg:mt-5 lg:text-xl">{product.name}</h3>
            <p className="mt-0.5 text-sm text-ink-muted">{productMeta(product)}</p>
            <p className="mt-1.5 text-base font-semibold text-ink lg:text-xl">{formatPrice(product.price)}</p>
          </>
        )}
      </Link>
    </article>
  );
}
