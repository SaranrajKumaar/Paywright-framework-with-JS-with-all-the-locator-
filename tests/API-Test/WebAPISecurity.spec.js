import { test, expect } from '@playwright/test';



test("Security testing", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/");

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("#login");

    const emailValue = "mamatha@gmail.com"

    await email.fill(emailValue);
    await password.fill("Saran@123");
    await loginBtn.click();
    await page.waitForLoadState("networkidle");

    await page.locator('button[routerlink="/dashboard/myorders"]').click();


    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a8bed6021054ba465ed801E" })
    )

    await page.locator("button:has-text('View')").first().click();

    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

})