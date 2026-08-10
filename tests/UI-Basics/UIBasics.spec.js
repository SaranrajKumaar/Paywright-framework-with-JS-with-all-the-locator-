import {test, expect} from '@playwright/test';
import { sign } from 'node:crypto';

test("first playwright test", async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.google.com/");

    const title = await page.title();
    console.log(title);
    
    await expect(title).toBe("Google");

    await expect(page).toHaveTitle("Google");
})

test("login page with invalid credentials",async ({browser})=>{
    const context =await browser.newContext();
    const page =await  context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const username = page.locator("#username");
    const password = page.locator('[name="password"]');
    const signInBtn = page.locator("#signInBtn");

    const productName =page.locator(".card-body a");

    await username.fill("rahulshetty");

    await password.fill("Learning@830$3mK2");

    await signInBtn.click();

    const errorMsge =page.locator("[style*='block']");
    await errorMsge.waitFor();
    const errorMessage = await errorMsge.textContent();
    expect(errorMessage.trim()).toBe("Incorrect username/password.")

    await expect(errorMessage.trim()).toContain("Incorrect");

    const pageTitle =await page.title();
    console.log(pageTitle);

    await username.fill("");
    await username.fill("rahulshettyacademy");
    await signInBtn.click();

    // console.log(await productName.first().textContent());

    // console.log(await productName.nth(1).textContent());
await productName.first().waitFor();
    const nameList =await productName.allTextContents();

    for(const name of nameList){
        console.log(name);
    }


})