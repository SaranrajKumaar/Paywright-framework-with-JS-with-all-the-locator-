import { test, expect } from '@playwright/test';


test("Drag Drop", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.sreenidhirajakrishnan.com/practice?utm_source=sp_auto_dm&utm_referrer=sp_auto_dm#section-1');

    const source = page.getByTestId('drag-source');
    const drop = page.getByTestId('drop-zone');
    await source.dragTo(drop);

    //await expect (page.locator('p[data-testid="drop-result"]')).toContainText('Item dropped successfully')

})

test("Hover", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.sreenidhirajakrishnan.com/practice?utm_source=sp_auto_dm&utm_referrer=sp_auto_dm#section-1');

    await page.locator('#hover-menu-trigger').hover();

    const submenu = page.getByText('Submenu item 1', { exact: true });

    await submenu.hover();

    await expect(submenu).toBeVisible();

    const tootTip = page.locator('#tooltip-trigger');

    await tootTip.hover();

    expect(await page.locator('span[role="tooltip"]')).toContainText('This is the tooltip text');

})

test("upload file and Download File", async ({ browser }) => {
  const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.sreenidhirajakrishnan.com/practice?utm_source=sp_auto_dm&utm_referrer=sp_auto_dm#section-1');

    await page.locator('#file-upload').setInputFiles('tests/files/reusme.png')
    expect (await page.locator('p[data-testid="file-upload-result"]')).toContainText("reusme.png")

    //download
    await page.locator('#download-btn').click();

})

test.only("multipe window",async ({browser})=>{
const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    const window =  page.locator('#openwindow');

    const [newWindow] = await Promise.all([
        context.waitForEvent('page'),
        await window.click(),

    ])

    console.log(newWindow.title());

   await  newWindow.locator('[id="footer-part"]').getByRole('link',{name:'Contact'}).click();

await newWindow.close();

//tab
// const childTab = await page.waitForEvent('popup');

// await page.locator('#opentab').click();

// const child = childTab.waitForLoadState();

// console.log(await child.title());

// await page.bringToFront();
})





