import { test, expect } from '@playwright/test';


test("Buttons interaction", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.sreenidhirajakrishnan.com/practice?utm_source=sp_auto_dm&utm_referrer=sp_auto_dm#section-1');

    await expect(page.locator('//p[@data-testid="single-click-result"]')).toContainText('No click yet')
    await page.locator('#single-click-btn').click();
    await expect(page.locator('//p[@data-testid="single-click-result"]')).toContainText('Single clicked!')

    //double 
    await expect(page.locator('//p[@data-testid="double-click-result"]')).toContainText('Not double-clicked');
    await page.locator("#double-click-btn").dblclick();
    await expect(page.locator('//p[@data-testid="double-click-result"]')).toContainText('Double clicked!');

    //right click 

    await page.locator('#right-click-btn').click({ button: "right" });
    await expect(page.locator('//p[@data-testid="right-click-result"]')).toContainText('Right click captured (context menu blocked)');

    //disabled btn 
    await expect(page.locator('#disabled-btn')).toBeDisabled();

    //checkboz and radio button 
    //select all
    const select = page.locator('//input[@id="select-all"]');
    await select.check();

    await expect(select).toBeChecked();

    const selectb = page.locator('#check-b');
    await selectb.uncheck();
    await expect(selectb).not.toBeChecked();

    await page.locator('#reveal-checkbox').check();
   expect(await page.getByText('Hidden text is now visible!')).toBeVisible();

   //radio 
   await page.locator('#radio-2').check();
  expect(await page.getByText('Selected: two')).toBeVisible();


})