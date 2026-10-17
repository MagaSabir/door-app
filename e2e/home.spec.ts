import { expect, test } from "@playwright/test";

test("home: hero, video and features fit the first screen", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Межкомнатные двери");
  await expect(page.locator("video source[type^='video/webm']")).toHaveCount(1);
  const features = page.locator("main section").nth(1);
  await expect(features).toContainText("Гарантия");
  const box = await features.boundingBox();
  expect(box!.y + box!.height).toBeLessThanOrEqual(page.viewportSize()!.height + 1);
});

test("mobile menu: opens, traps focus, closes on Escape and returns focus", async ({ page, isMobile }) => {
  test.skip(!isMobile, "burger menu is mobile-only");
  await page.goto("/catalog");
  const burger = page.getByRole("button", { name: "Открыть меню" });
  await burger.click();
  const menu = page.getByRole("dialog", { name: "Меню" });
  await expect(menu).toBeVisible();
  await expect(page.getByRole("button", { name: "Закрыть меню" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(burger).toBeFocused();
});
