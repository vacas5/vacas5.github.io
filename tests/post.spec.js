import { test, expect } from "@playwright/test";

test("it shows post data and accredidation", async ({ page }) => {
  await page.goto("/dependency-hell/");

  await expect(
    page.getByRole("heading", { name: "The nine circles of npm" })
  ).toBeVisible();
  await expect(page.getByText("Perfection is achieved, not")).toBeVisible();
  await expect(page.getByRole("link", { name: "Unsplash" })).toBeVisible();
  await expect(page.getByText("February 13,")).toBeVisible();
  await expect(page.locator("#gatsby-focus-wrapper")).toContainText(
    "In recent weeks at Lonely Planet we’ve embarked on a fresh application using Next.js. It’s exciting to work on something so bleeding edge, and it looks to be a helpful library."
  );

  await page.getByRole("link", { name: "Russell J. Anderson" }).click();
  await page.waitForURL("/");
});
