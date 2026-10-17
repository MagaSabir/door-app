import { company, phone, productImages, type Product } from "./data";
import { absoluteUrl, siteName, siteUrl } from "./site";

type Thing = Record<string, unknown>;

/** Renders schema.org structured data. `<` is escaped to keep the payload XSS-safe. */
export function JsonLd({ data }: { data: Thing | Thing[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

// TODO: add `address` and `email` once real company details replace the placeholders in data.ts
export function organizationLd(): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    url: siteUrl,
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl("/images/hero-poster.webp"),
    telephone: phone.href.replace("tel:", ""),
    openingHours: company.openingHours,
    areaServed: { "@type": "Country", name: "Россия" },
    description: `${company.name} — межкомнатные двери, замер, доставка и установка.`,
  };
}

export function websiteLd(): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    inLanguage: "ru-RU",
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productLd(product: Product): Thing {
  const url = absoluteUrl(`/catalog/${product.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: `Межкомнатная дверь ${product.name}`,
    description: product.description,
    image: productImages(product).map((src) => absoluteUrl(src)),
    sku: product.slug,
    brand: { "@type": "Brand", name: siteName },
    material: product.specs.material,
    offers: {
      "@type": "Offer",
      url,
      price: product.price,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${siteUrl}/#organization` },
    },
    // Rating is intentionally omitted until reviews are real (fake review markup is penalised)
  };
}

export function itemListLd(products: Product[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/catalog/${p.slug}`),
      name: p.name,
    })),
  };
}
