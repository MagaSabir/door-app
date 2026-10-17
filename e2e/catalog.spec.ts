import { expect, test } from "@playwright/test";

const cards = "section[aria-label='Список моделей'] article";

test("catalog: server HTML lists every model (SEO)", async ({ request }) => {
  const html = await (await request.get("/catalog")).text();
  for (const name of ["Модерн 1", "Эко-2", "Классика", "Сканди"]) expect(html).toContain(name);
});

test("catalog: category filter is kept in the URL and survives reload", async ({ page }) => {
  await page.goto("/catalog");
  const total = await page.locator(cards).count();
  await page.getByRole("button", { name: "Классика", exact: true }).click();
  await expect(page).toHaveURL(/cat=classic/);
  await expect(page.locator(cards)).toHaveCount(1);
  await page.reload();
  await expect(page.locator(cards)).toHaveCount(1);
  await page.getByRole("button", { name: "Все", exact: true }).click();
  await expect(page).toHaveURL(/\/catalog$/);
  await expect(page.locator(cards)).toHaveCount(total);
});

test("catalog: swapped price range still filters", async ({ page }) => {
  await page.goto("/catalog?min=15000&max=13000");
  // Server HTML lists everything; the URL filters apply after hydration (2 models in 13 000–15 000 ₽)
  await expect(page.locator(cards)).toHaveCount(2);
  const prices = await page.locator(`${cards} p.font-semibold`).allTextContents();
  expect(prices.length).toBeGreaterThan(0);
  for (const p of prices) {
    const value = Number(p.replace(/\D/g, ""));
    expect(value).toBeGreaterThanOrEqual(13000);
    expect(value).toBeLessThanOrEqual(15000);
  }
});
