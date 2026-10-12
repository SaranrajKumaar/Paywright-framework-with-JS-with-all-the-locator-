
import { test, expect } from '@playwright/test';

function requireEnv(name) {
    const value = process.env[name];

    if (!value || !value.trim()) {
        throw new Error(`Missing required environment variable ${name}. Set it in .env or .env.example.`);
    }

    return value;
}

test('login to TutorialsNinja demo', async ({ page }) => {
    const appUrl = requireEnv('APP_URL');
    const email = requireEnv('APP_USERNAME');
    const password = requireEnv('APP_PASSWORD');

    await page.goto(appUrl);

    await page.getByText('My Account', { exact: true }).first().click();
    await page.getByText('Login',{exact: true}).first().click();

    await expect(page.locator('#input-email')).toBeVisible();
    await page.locator('#input-email').fill(email);
    await page.locator('#input-password').fill(password);
    await page.locator('input[type="submit"][value="Login"]').click();

});
