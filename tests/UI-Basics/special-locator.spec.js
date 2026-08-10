import { test, expect } from '@playwright/test';


test('special locator and Wait handling', async ({ page }) => {

    //test level 

    test.setTimeout(6000);
    page.setDefaultTimeout(9000);//test level
    const slowExpect =expect.configure({timeout:9000});
    await page.goto('https://rahulshettyacademy.com/angularpractice/');

    await page.getByLabel('Check me out if you Love IceCreams!').click();

    await expect(page.getByLabel('Check me out if you Love IceCreams!')).toBeChecked();

    await page.getByLabel('Employed').click();
    await expect(page.getByLabel('Employed')).toBeEnabled();

    //gender 
    await page.getByLabel('Gender').selectOption({ "label": "Female" })

    //await page.pause();

    await page.getByPlaceholder('Password').fill("mamathasaran");

    await page.getByRole("button", { name: "Submit" }).click();

    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    //basic timeout - default as 5 sec and for expect assertions  --{timeout:} --step level 
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout:10_000});

    //shop 
    await page.getByRole("link", { name: "Shop" }).click();

    const shopName =await page.locator('h1.my-4');
    await slowExpect(shopName).toHaveText("Shop Name");//test level 

    await page.waitForLoadState("networkidle");

    const productName = await page.locator(".card-body h4 a").allTextContents();

    console.log(productName);

    const product = "Blackberry";

    //blackberry 
    await page.locator("app-card").filter({ hasText: product }).getByRole("button", { name: "Add" }).click();

    await page.locator('//li[@class="nav-item active"]/a').click();

    const stockProduct = await page.locator('//h4[@class="media-heading"]/a').textContent();


    await expect(stockProduct.trim()).toContain(product);


})