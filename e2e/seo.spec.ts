import { expect, test } from "@playwright/test";

const jsonLd = (html: string) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => {
    const data = JSON.parse(m[1]);
    return Array.isArray(data) ? data : [data];
  });

test("robots.txt and sitemap.xml", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toMatch(/Sitemap: .*\/sitemap\.xml/);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/catalog/modern-1</loc>");
});

test("product page: canonical, Product and matching breadcrumbs markup", async ({ page, request }) => {
  const html = await (await request.get("/catalog/modern-1")).text();
  expect(html).toMatch(/<link rel="canonical" href="[^"]*\/catalog\/modern-1"/);
  const ld = jsonLd(html);
  const product = ld.find((d) => d["@type"] === "Product");
  expect(product.offers.priceCurrency).toBe("RUB");
  const crumbs = ld.find((d) => d["@type"] === "BreadcrumbList");
  await page.goto("/catalog/modern-1");
  const visible = page.getByRole("navigation", { name: "Хлебные крошки" }).locator("li");
  await expect(visible).toHaveCount(crumbs.itemListElement.length);
});

test("open graph image is a 1200×630 JPEG", async ({ request }) => {
  const html = await (await request.get("/catalog/classic")).text();
  const url = html.match(/property="og:image" content="([^"]+)"/)![1];
  const res = await request.get(new URL(url).pathname + new URL(url).search);
  expect(res.headers()["content-type"]).toBe("image/jpeg");
  expect(html).toContain('property="og:image:width" content="1200"');
});

test("security headers are set", async ({ request }) => {
  const headers = (await request.get("/")).headers();
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
});
