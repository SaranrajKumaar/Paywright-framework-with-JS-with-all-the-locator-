import { test, expect } from '@playwright/test';


test("fablogin @regression",async ({browser})=>{


   const context =await  browser.newContext();
   const page = await context.newPage();
   await page.goto("https://www.facebook.com/");

   await page.locator('input[name="email"]').fill("saran@gmail.com");
   await page.locator('input[type="password"]').fill("saran");

   await page.getByRole("button",({name:"Log in"})).click();

   await page.pause();

   await page.close();


   
})


test("fablogin @sanity",async ({browser})=>{


   const context =await  browser.newContext();
   const page = await context.newPage();
   await page.goto("https://www.flipkart.com/");

   console.log(await page.title())

   
  


   
})


//fb login 
