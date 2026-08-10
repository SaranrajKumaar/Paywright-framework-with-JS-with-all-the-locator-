import { test, expect } from '@playwright/test';


test("spl locator end to end", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const email = page.getByPlaceholder("email@example.com");
  const password = page.locator("#userPassword");

  const emailValue = "mamatha@gmail.com"
  const productName = "ZARA COAT 3"


  await email.fill(emailValue);
  await password.fill("Saran@123");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState("networkidle");

  await page.locator('.card-body').filter({ hasText: productName }).getByRole("button", { name: "Add To Cart" }).click();

  await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();

  const productText = await page
    .locator('//p[@class="itemNumber"]/../h3')
    .textContent();

  expect(productText).toContain(productName);

  const textMRP = await page.locator('//p[@class="itemNumber"]/../p[2]').textContent();
  const splitDollar = textMRP.trim().split("$");
  console.log(splitDollar[1].trim());


  const subtotal = await page.locator("//li[@class='totalRow']/span").nth(1).textContent()
  console.log(subtotal)

  expect(subtotal).toContain(splitDollar[1].trim())



  await page.getByRole("button", { name: "Checkout" }).click();

  await page.getByPlaceholder('Select Country').pressSequentially("ind");


  const country = "British Indian Ocean Territory"

  const dropDownCount = await page.locator(".list-group").first().getByRole("button", { name: country }).click();

  console.log("input value" + "-" + await page.getByPlaceholder('Select Country').inputValue());

  expect(await page.getByPlaceholder('Select Country').inputValue()).toContain(country);

  const placeOrder = page.locator("//a[contains(text(),'Place Order')]");

  await placeOrder.click();



  await expect(page.getByText("Thankyou for the order.")).toBeVisible();

  const thaksOrdername = await page.locator('div[class="title"]').first().textContent()

  expect(thaksOrdername).toContain(productName);








})