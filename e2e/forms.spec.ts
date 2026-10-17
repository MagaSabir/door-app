import { expect, test } from "@playwright/test";

test("callback form: validation keeps typed values, then submits", async ({ page }) => {
  await page.goto("/contacts");
  const form = page.locator("form").first();
  await form.getByLabel("Имя").fill("Тест");
  await form.getByLabel("Телефон").fill("123");
  await form.getByRole("button", { name: "Перезвоните мне" }).click();
  await expect(form.getByText("Введите телефон")).toBeVisible();
  await expect(form.getByLabel("Имя")).toHaveValue("Тест");
  await form.getByLabel("Телефон").fill("+7 912 345-67-89");
  await form.getByRole("button", { name: "Перезвоните мне" }).click();
  await expect(page.getByText("Заявка отправлена")).toBeVisible();
});
