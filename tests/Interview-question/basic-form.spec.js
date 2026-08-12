import { test, expect } from '@playwright/test';

test("basic form", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.sreenidhirajakrishnan.com/practice?utm_source=sp_auto_dm&utm_referrer=sp_auto_dm#section-1');


  await page.locator('#text-input').fill("Saranraj");
  await page.locator("#password-input").fill("saran");
  await page.locator("#email-input").fill("saranraj@gmail.com");
  await page.locator("#phone-input").fill("9784564301");
  await page.locator("#textarea-input").fill(`performed on different DOM elements. 
    That would happen if the DOM structure between those actions has changed.`)

    await page.locator('//button[@id="form-submit"]').click();

    const form =await page.locator(".mt-3.text-sm.text-accent").first.textContent();

    await expect(form).toContain("Form submitted successfully");
});