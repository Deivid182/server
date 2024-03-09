"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const CLIENT_URL = "http://localhost:5173/";
(0, test_1.test)('should allow the user to sign in', ({ page }) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.goto(CLIENT_URL);
    // Expect to find a link waith text "Login"
    yield page.getByRole('link', { name: 'Login' }).click();
    yield (0, test_1.expect)(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
    yield page.locator("input[name='email']").fill("user@example.com");
    yield page.locator("input[name='password']").fill("password");
    yield page.getByRole('button', { name: 'Login' }).click();
    yield (0, test_1.expect)(page.getByText("User logged in successfully")).toBeVisible();
    // Expect to find a link waith text "Logout"
    yield (0, test_1.expect)(page.getByRole('button', { name: 'Log out' })).toBeVisible();
    yield (0, test_1.expect)(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
    yield (0, test_1.expect)(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
}));
(0, test_1.test)("should allow the user to register", ({ page }) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.goto(CLIENT_URL);
    yield page.getByRole('link', { name: 'Login' }).click();
    yield page.getByRole("link", { name: "Register" }).click();
    yield (0, test_1.expect)(page.getByRole("heading", { name: "Create an account" })).toBeVisible();
    yield page.locator("input[name='firstName']").fill("John");
    yield page.locator("input[name='lastName']").fill("Doe");
    yield page.locator("input[name='email']").fill("johndoe@example.com");
    yield page.locator("input[name='password']").fill("password");
    yield page.locator("input[name='confirmPassword']").fill("password");
    yield page.getByRole("button", { name: "Register" }).click();
    yield (0, test_1.expect)(page.getByText("User created successfully")).toBeVisible();
    // Expect to find a link waith text "Logout"
    yield (0, test_1.expect)(page.getByRole('button', { name: 'Log out' })).toBeVisible();
    yield (0, test_1.expect)(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
    yield (0, test_1.expect)(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
}));
