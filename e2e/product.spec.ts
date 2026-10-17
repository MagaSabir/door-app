import { expect, test } from "@playwright/test";

test("product: color swatch switches the photo", async ({ page }) => {
  await page.goto("/catalog/classic");
  const photo = page.getByRole("button", { name: "Увеличить фото" }).locator("img");
  await expect(photo).toHaveAttribute("src", /classic-graphite/);
  await page.getByRole("button", { name: "Дуб натуральный" }).click();
  await expect(photo).toHaveAttribute("src", /classic-oak/);
});

test("product: rating link opens the reviews tab", async ({ page }) => {
  await page.goto("/catalog/modern-1");
  await page.getByRole("link", { name: /отзыв/ }).click();
  await expect(page.getByRole("tab", { name: /Отзывы/ })).toHaveAttribute("aria-selected", "true");
});

test("product: chosen door is prefilled in the measure form", async ({ page }) => {
  await page.goto("/catalog/modern-1");
  await page.getByRole("button", { name: "Графит" }).click();
  await page.getByRole("button", { name: "800", exact: true }).click();
  await page.getByRole("link", { name: "Заказать бесплатный замер" }).click();
  await expect(page).toHaveURL(/\/installation\?.*model=/);
  await expect(page.locator("#measure textarea[name=comment]")).toHaveValue(
    "Интересует: Модерн 1, цвет Графит, ширина 800 мм",
  );
});

test("product: lightbox opens and closes (button, Escape)", async ({ page }) => {
  await page.goto("/catalog/modern-1");
  const open = page.getByRole("button", { name: "Увеличить фото" });
  const dialog = page.getByRole("dialog", { name: /Фото/ });
  await open.click();
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Закрыть" }).click();
  await expect(dialog).toBeHidden();
  await open.click();
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/\/catalog\/modern-1$/);
});

test("product: unknown model is a 404", async ({ request }) => {
  expect((await request.get("/catalog/no-such-door")).status()).toBe(404);
});
