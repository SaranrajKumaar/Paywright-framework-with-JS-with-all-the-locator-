
import { test, expect } from '@playwright/test';
import path from 'node:path';


test("more validation", async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.locator('input[id="field1"]').screenshot({path:"screenshots/paritalpage.png"})




})

test("screenShot need validation and assertion visual testing",async({page})=>{

        await page.goto("https://testautomationpractice.blogspot.com/");

    expect(await page.screenshot()).toMatchSnapshot('screenshots/QApage.png')


})