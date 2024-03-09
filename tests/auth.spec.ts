import { test, expect } from '@playwright/test';

const CLIENT_URL = "http://localhost:5173/";

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(CLIENT_URL);

  // Expect to find a link waith text "Login"
  await page.getByRole('link', { name: 'Login' }).click();

  await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();

  await page.locator("input[name='email']").fill("user@example.com");
  await page.locator("input[name='password']").fill("password");
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText("User logged in successfully")).toBeVisible()

  // Expect to find a link waith text "Logout"
  await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
});

test("should allow the user to register", async ({ page }) => {
  await page.goto(CLIENT_URL);
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole("link", { name: "Register" }).click();
  await expect(page.getByRole("heading", { name: "Create an account" })).toBeVisible();

  await page.locator("input[name='firstName']").fill("John");
  await page.locator("input[name='lastName']").fill("Doe");
  await page.locator("input[name='email']").fill("johndoe@example.com");
  await page.locator("input[name='password']").fill("password");
  await page.locator("input[name='confirmPassword']").fill("password");

  await page.getByRole("button", { name: "Register" }).click();

  await expect(page.getByText("User created successfully")).toBeVisible()

  // Expect to find a link waith text "Logout"
  await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
})