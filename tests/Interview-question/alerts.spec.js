import { test, expect } from '@playwright/test';


test("Buttons interaction @smoke", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.sreenidhirajakrishnan.com/practice?utm_source=sp_auto_dm&utm_referrer=sp_auto_dm#section-1');

    //alert
    page.once('dialog',async (dialog) => {

       await dialog.accept();
    })
    await page.locator('#alert-btn').click();

    await expect(page.locator('[data-testid="alert-result"]')).toContainText('Alert was shown and dismissed')

    //show confirm 
    page.once('dialog', async(dia) => {
       await  dia.dismiss();
    })

    await page.locator('#confirm-btn').click();
    await expect(page.locator('[data-testid="alert-result"]')).toContainText('Confirm result: Cancel')

    page.once('dialog', async(dia) => {
       await  dia.accept("this message");
    })
await page.locator('#prompt-btn').click();


})

test("modal @smoke",async({browser})=>{
        const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.sreenidhirajakrishnan.com/practice?utm_source=sp_auto_dm&utm_referrer=sp_auto_dm#section-1');

    await page.locator('#open-modal-btn').click();

    await page.locator('#modal-close-btn').click();
})

test("iframe @sanity",async ({browser})=>{
         const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.sreenidhirajakrishnan.com/practice?utm_source=sp_auto_dm&utm_referrer=sp_auto_dm#section-1');


    const frames = page.frameLocator('//iframe[@data-testid="practice-iframe"]')

    await frames.locator('#iframe-input').fill("sada");

    await frames.locator('#iframe-btn').click();

    expect(await frames.locator('#iframe-result')).toContainText('Iframe button clicked:')

})

test("shadow Dom @regression",async({browser})=>{
  const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.sreenidhirajakrishnan.com/practice?utm_source=sp_auto_dm&utm_referrer=sp_auto_dm#section-1');

await page.locator('practice-shadow-box').locator('#shadow-input').fill("shadow submit")
    await page.locator('practice-shadow-box').getByRole('button',{name:'Shadow Submit'}).click();

   await expect( page.locator('practice-shadow-box').locator('#shadow-result')).toContainText('Submitted');
})