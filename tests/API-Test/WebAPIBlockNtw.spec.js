import {test, expect} from '@playwright/test';


test("Block  test",async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    page.route('**/*.css',route=>{
        route.abort();
    })

    //   page.route('**/*.{jpg,png,jpeg',route=>{
    //     route.abort();
    // })
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //page.on('request',request=>console.log(request.url()));

    page.on('response',res=>console.log(res.url(),res.status()));

  

    const username =page.locator("#username");

    const password =page.locator('[name="password"]');

    const signInBtn =page.locator("#signInBtn");

    await username.fill("rahulshettyacademy");

    await password.fill("Learning@830$3mK2");

    const dropDown =page.locator("select.form-control");

    await dropDown.selectOption("consult");

    //await page.pause();

    await dropDown.selectOption({label:"Teacher"});

    await expect(dropDown).toHaveValue("teach");

    const dropDownText = await dropDown.textContent();
    console.log("dropdwon text " + dropDownText);






})