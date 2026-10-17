import { company } from "./data";

const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

/**
 * Public site URL used for canonical links, sitemap, JSON-LD and Open Graph.
 * Priority: explicit NEXT_PUBLIC_SITE_URL → Vercel production domain → localhost (dev only).
 */
export const siteUrl = explicitUrl ?? (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");

/** True when the site URL is a real public address (not the localhost fallback) */
export const hasPublicUrl = Boolean(explicitUrl ?? vercelUrl);

if (process.env.NODE_ENV === "production" && !hasPublicUrl) {
  console.warn(
    "[site] NEXT_PUBLIC_SITE_URL is not set: canonical links and sitemap point to localhost, indexing is disabled.",
  );
}

/**
 * Whether search engines may index this deployment: needs a public URL, and on Vercel
 * only the production environment (preview deployments stay out of the index).
 */
export const isIndexable = hasPublicUrl && (process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true);

export const siteName = company.name;

export const siteTitle = `${siteName} — межкомнатные двери для современного интерьера`;

export const siteDescription =
  "Межкомнатные двери для современного интерьера: более 1000 моделей в наличии, гарантия до 5 лет, бесплатный замер и доставка по всей России.";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

/**
 * Full per-page metadata. Next replaces (not merges) nested objects like `openGraph`,
 * so every page gets the complete set from here. Share images come from the
 * `opengraph-image` files (site-wide and per product).
 */
export function pageMetadata({ title, description, path }: { title?: string; description: string; path: string }) {
  const ogTitle = title ? `${title} — ${siteName}` : siteTitle;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { type: "website" as const, locale: "ru_RU", siteName, url: path, title: ogTitle, description },
    twitter: { card: "summary_large_image" as const, title: ogTitle, description },
  };
}
