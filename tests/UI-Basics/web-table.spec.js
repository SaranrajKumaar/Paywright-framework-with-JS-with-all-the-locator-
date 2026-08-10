import { test, expect } from '@playwright/test';


test("comparing web table",async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();   

    await page.goto('https://demowebshop.tricentis.com/');

    const products =page.locator('.product-item');

    // console.log(await products.nth(1).innerText())
    // console.log(await products.nth(1).textContent())

    for(let i=0;i<products.count();i++){

        console.log(await products.nth(i).locator('h2').textContent());

    }



})

