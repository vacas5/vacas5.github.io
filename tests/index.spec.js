import { test, expect } from "@playwright/test";

test("it shows a list of posts", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("h1")).toContainText("Russell J. Anderson");
  await expect(page.locator("h2")).toContainText("Posts");
  await expect(page.getByText("Perfection is achieved, not")).toBeVisible();

  await page.getByRole("link", { name: "The nine circles of npm" }).click();
  await page.waitForURL("/dependency-hell/");
});
