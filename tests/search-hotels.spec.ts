import { test, expect } from '@playwright/test';
import path from 'path';

const CLIENT_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(CLIENT_URL);
  await page.getByRole('link', { name: 'Login' }).click();

  await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();

  await page.locator("input[name='email']").fill("user@example.com");
  await page.locator("input[name='password']").fill("password");
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText("User logged in successfully")).toBeVisible()
});

test("should show search results", async ({ page }) => {
  await page.goto(CLIENT_URL)

  await page.getByPlaceholder('Search').fill('USA')
  await page.getByRole('spinbutton').last().fill('1')
  await page.getByRole('button', { name: 'Search' }).click()

  await expect(page.getByText('Hotels found in USA')).toBeVisible()
})