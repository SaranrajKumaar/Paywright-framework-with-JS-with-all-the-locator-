import {test, expect} from '@playwright/test';

test(" assignment test", async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const email =page.locator("#userEmail");
    const password =page.locator("#userPassword");
    const loginBtn =page.locator("#login");

    await email.fill("mamatha@gmail.com");
    await password.fill("Saran@123");
    await loginBtn.click();

    console.log(await page.title());
    await page.waitForLoadState("networkidle");
    //await page.locator(".card-body b").first().waitFor(); alertnatively solution 
    const productNames =page.locator(".card-body b");
    const allProducts =await productNames.allTextContents();
      console.log(allProducts);

  
    for(const name of allProducts){
        console.log(name);
    }

   



})