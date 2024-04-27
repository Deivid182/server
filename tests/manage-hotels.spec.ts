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

test("should allow the user to create a new hotel", async ({ page }) => {
  await page.goto(`${CLIENT_URL}/home/new-hotel`);

  await page.locator("input[name='name']").fill("Grand Hotel");
  await page.locator("input[name='description']").fill("Luxurious hotel");
  await page.locator("input[name='city']").fill("New York");
  await page.locator("input[name='country']").fill("USA");
  await page.locator("input[name='pricePerNight']").fill("350");
  await page.selectOption("select[name='starRating']", "5");
  await page.getByText("Budget").click();
  await page.getByLabel("Parking").check();
  await page.getByLabel("Spa").check();
  await page.locator("input[name='adultCount']").fill("2");
  await page.locator("input[name='childrenCount']").fill("1");

  await page.setInputFiles("input[name='imageFiles']", [
    path.join(__dirname, "files", "01.jpg"),
    path.join(__dirname, "files", "02.jpg"),
  ]);

  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Hotel created successfully")).toBeVisible()
})

test("should allow the use to get all the hotels", async ({ page }) => {
  await page.goto(`${CLIENT_URL}/home/`);
  await expect(page.getByText("Grand Hotel")).toBeVisible();
  await expect(page.getByText("Luxurious hotel")).toBeVisible();
  await expect(page.getByText("New York, USA")).toBeVisible();
  await expect(page.getByText("$350 per night")).toBeVisible();
  await expect(page.getByText(/2 adults, 1 children/).first()).toBeVisible();
  await expect(page.getByText("5 Star Rating").first()).toBeVisible();

  await expect(page.getByRole("link", { name: "View Details" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
})

test("should allow the user to edit a hotel", async ({ page }) => {
  await page.goto(`${CLIENT_URL}/home/`);

  await page.getByRole("link", { name: "View Details" }).first().click();
  await expect(page.getByRole("heading", { name: "Edit hotel" })).toBeVisible();
  await page.waitForSelector("input[name='name']", { state: "attached" });
  await expect(page.locator("input[name='name']")).toHaveValue("Grand Hotel");
  await page.locator("input[name='name']").fill("Grand Hotel updated");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Hotel updated successfully")).toBeVisible()
})