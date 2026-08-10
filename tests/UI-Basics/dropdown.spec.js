import {test, expect} from '@playwright/test';


test("dropDown test",async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

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
    



    const radioBtn =page.locator(".radiotextsty");

    console.log(await radioBtn.last().isChecked()); ///

    await radioBtn.last().click();

    await page.locator("#okayBtn").click();

    expect(await radioBtn.last().isChecked()).toBeTruthy();

    await expect(radioBtn.last()).toBeChecked();

    const termsCheckBox =page.locator("#terms");
    await termsCheckBox.click();

    await (expect(termsCheckBox)).toBeChecked();

    await termsCheckBox.uncheck();

    await expect(termsCheckBox).not.toBeChecked();

    const blinkText = page.locator('[href*="documents"]');

    expect(await blinkText).toHaveAttribute("class","blinkingText");

    const [newPage]= await Promise.all([
        context.waitForEvent("page"),
        blinkText.click(),
    ])

    console.log(await newPage.title());

    const newEmail =await newPage.locator('[class="im-para red"]').textContent();

    console.log(await newEmail);


    const arrayText =newEmail.trim().split('@');
    const domainText =arrayText[1].split(' ')[0];
    console.log(domainText);

    await newPage.close();

    await username.fill("");
    await username.fill(domainText);

    const value =await username.inputValue();

    console.log("gather value"+value);






})