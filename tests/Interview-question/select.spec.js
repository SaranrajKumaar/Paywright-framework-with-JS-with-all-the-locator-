import { test, expect } from '@playwright/test';


test("Buttons interaction", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.sreenidhirajakrishnan.com/practice?utm_source=sp_auto_dm&utm_referrer=sp_auto_dm#section-1');

    //select drop down 
    await page.locator("#standard-select").selectOption("Green");
    expect(await page.locator("#standard-select")).toContainText('Green')

    expect(await page.getByText("Selected: green")).toBeVisible();

    await page.locator("#multi-select").selectOption(["Python", "C#"]);
    expect(await page.locator('p[data-testid="multi-select-result"]')).toContainText("Selected: python, csharp")

    //custom div dropdown 
    await page.locator("#custom-dropdown-toggle").click()
    const custom = "Beta";

    const customOption = page.getByText(custom, { exact: true });

    await customOption.hover();
    await customOption.click();

    await expect(
        page.locator('[data-testid="custom-dropdown-result"]')
    ).toContainText(`Selected: ${custom}`);
    //multi select 
    await page.locator('#dynamic-select').selectOption(['Playwright']);

})

test("Dynamic Content", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.sreenidhirajakrishnan.com/practice?utm_source=sp_auto_dm&utm_referrer=sp_auto_dm#section-1');

    const disappear = page.locator('#disappear-btn');

    await disappear.click();
    await expect(disappear).not.toBeVisible();

    //chnage text 
    await page.locator("#change-text-btn").click();
    await expect(page.locator('p[data-testid="changing-text"]')).toContainText('Text has changed!')

    await page.locator("#load-content-btn").click();
    const listitems = page.locator('[data-testid="injected-list"] li');
    await expect(listitems).toHaveCount(3);

    //increment count 
    const increment = page.locator("#increment-btn");
    const counter = page.getByTestId('counter-result');
    const count = 3;
    for (let i = 0; i < count; i++) {
        await increment.click();
    }

    await expect(counter).toContainText(`Counter: ${count}`);
})

test("wait and Synchronisation", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.sreenidhirajakrishnan.com/practice?utm_source=sp_auto_dm&utm_referrer=sp_auto_dm#section-1');



    const wait = page.locator("#ajax-btn")
    const text = page.locator('p[data-testid="ajax-result"]')

    await expect(text).toContainText('No request sent');
    await wait.click();
    await expect(text).toContainText('AJAX result received');




})