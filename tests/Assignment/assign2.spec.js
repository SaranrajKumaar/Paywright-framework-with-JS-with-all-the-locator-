import {test, expect} from '@playwright/test';
import console from 'node:console';


test("dropDown test",async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator("#username");
    const password = page.locator('[name="password"]');
    const radioBtn = page.locator(".radiotextsty");

    const message = page.locator(".text-center.text-white");

    const text =await message.textContent();

    console.log("text is " + text);

    const getUser=text.split(" ")[2].trim();
    console.log("user name is " +" " + getUser);

    const getPassword = text.split(" ")[5].trim();
    console.log("password is " + "-" + getPassword);

    await userName.fill(getUser);
    await password.fill(getPassword);

    const valueUser =await userName.inputValue();
    console.log("user name is " + valueUser);

    const valuePassword = await password.inputValue();
    console.log("password is " + valuePassword);

    //await page.pause();

    await radioBtn.last().click();

    const okayBtn = page.locator("#okayBtn");
    await okayBtn.click();

    expect(await radioBtn.last().isChecked()).toBeTruthy();

    await expect(radioBtn.last()).toBeChecked();

    const select = page.locator("select.form-control");
    await select.selectOption("teach");

    await expect(select).toHaveValue("teach");

    const link = page.locator('[href*="documents"]');

    expect(await link).toHaveAttribute("class","blinkingText");


    const [newPage] =await Promise.all([
        context.waitForEvent("page"),
        link.click(),
    ])

    const newPageEmail = newPage.locator(".im-para.red");

    const newEmail =await newPageEmail.first().textContent();

    console.log("new email is " + newEmail);

    const Sp =newEmail.trim().split('@');
    console.log("domain is " + Sp);
    const spMail =Sp[1].split(' ')[0];

    console.log("domain is " + spMail);

    await newPage.close();

    await userName.fill("");
    await password.fill(spMail);



















})