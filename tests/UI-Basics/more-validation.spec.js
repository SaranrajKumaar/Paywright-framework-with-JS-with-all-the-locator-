import { test, expect } from '@playwright/test';


test("more validation", async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // await page.goBack();
    // await page.goForward();

    const hiddenTextBox = page.locator('#displayed-text');

    await hiddenTextBox.fill("Hello World");

    const inputText = await hiddenTextBox.inputValue();
    console.log(inputText);
    expect(await inputText).toBe("Hello World");

    await expect(hiddenTextBox).toBeVisible();

    await page.locator('#hide-textbox').click();

    //popup 
// Handle Alert
page.once('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept();
});

await page.locator("#alertbtn").click();

await page.locator('#name').fill("Hello World");
// Handle Confirm

page.once('dialog',async dialog=>{
    console.log(dialog.message());
    await dialog.dismiss();
})

await page.locator("#confirmbtn").click();

//mouse hover 
await page.locator('#mousehover').hover();

await page.locator(".mouse-hover-content a").filter({hasText:'Top'}).click();

//frames 

const iframe = page.frameLocator("#courses-iframe");

await iframe.locator('a[href="learning-path"]').first().click();

const courseTitle = await iframe.locator('.inner-box h1').textContent();

const trimText =courseTitle.trim("")[1]
console.log(trimText);

await expect(iframe.locator('.inner-box h1')).toContainText("PATHS")







    




})
