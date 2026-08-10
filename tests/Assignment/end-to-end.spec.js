import { test, expect } from '@playwright/test';



test("end to end test", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("#login");

    const emailValue = "mamatha@gmail.com"

    await email.fill(emailValue);
    await password.fill("Saran@123");
    await loginBtn.click();


    await page.waitForLoadState("networkidle");
    const productNames = await page.locator(".card-body b").allTextContents();
    console.log(productNames);
    const product = page.locator(".card-body");

    const productNameList = "iphone 13 pro";

    const counts = await product.count();
    for (let i = 0; i < counts; i++) {

        if (await product.nth(i).locator('b').textContent() === productNameList) {
            await product.nth(i).locator("//button[normalize-space()='Add To Cart']").click();
            break;
        }
    }


    //cart 
    const carrtBtn = page.locator('//button[@routerlink="/dashboard/cart"]');

    await carrtBtn.click();

    const cartProductName = await page.locator(".cartSection h3").textContent();
    console.log("cart productName" + "-" + cartProductName);

    expect(cartProductName.trim()).toEqual(productNameList)

    const textCartList = page.locator(".cartSection p");

    const orderID = await textCartList.first().textContent()
    console.log("cart OrderID" + "-" + orderID);

    const status = await textCartList.last().textContent
    console.log("cart status" + "-" + status);

    const techLink = page.locator("a[href*='techsmarthire']")

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        techLink.click(),
    ])

    console.log("titleof New page" + " " + await newPage.title());

    await newPage.close();

    //checkout 
    await page.locator("//button[contains(text(),'Checkout')]").click();


    const emailIn = page.locator("input[class*='txt text-validated']")

    const emailInput = await emailIn.nth(1).inputValue();


    expect(emailInput).toBe(emailValue);

    const coun = 'Indonesia';

    const country = await emailIn.nth(2).pressSequentially("Ind")

    const dropDown = page.locator('.list-group').first().getByRole('button', { name: coun });

    await dropDown.click();

    const placeOrder = page.locator("//a[contains(text(),'Place Order')]");

    await placeOrder.click();

    //thank for order 
    const orderIDAssert = await page.locator('td[class="em-spacer-1"] label').last().textContent();

    const trimID = orderIDAssert.trim().split('|');
    console.log(trimID);
    const splitTrimIDs = trimID[1].trim();
    const splitTrimID = `#${splitTrimIDs}`;

    console.log(splitTrimID);

    expect(splitTrimID).not.toBe(orderID);

    //thnaks to equal 
    const thank = await page.locator('h1[class="hero-primary"]').textContent();
    expect(thank.trim()).toContain('Thankyou for the order.');

    //order tab 
    const ordertab = page.locator('button[routerlink*="myorders"]');
    await ordertab.click();

    //await page.pause();

    await page.locator('tbody tr').first().waitFor();

    const rows = page.locator('tbody tr');

    for (let l = 0; l < rows.count; l++) {

        if (await rows.nth(l).locator('th').textContent() === splitTrimIDs) {

            await rows.nth(l).locator('button').first().click();

            break;

        }



        await expect(page.locator('div[class="email-title"]').textContent().trim()).toContainEqual("order summary")

        //order id 
        const orderSummaryID = await page.locator('//div[@class="col-text -main"]').textContent().trim();

        expect(orderSummaryID).toContainEqual(splitTrimIDs)
    }

})