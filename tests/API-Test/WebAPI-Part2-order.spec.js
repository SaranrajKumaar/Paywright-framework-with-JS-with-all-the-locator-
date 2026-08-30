import { test, expect, request } from '@playwright/test';
import { APIutils } from '../API-Utlis/ApIutils';

const loginplayLoad = { userEmail: "mamatha@gmail.com", userPassword: "Saran@123" }
const orderPlayLoad = { orders: [{ country: "British Indian Ocean Territory", productOrderedId: "6960eac0c941646b7a8b3e68" }] }

let response;

test.beforeAll("Request", async () => {

  const apiContext = await request.newContext();

 const apiUtils = new APIutils(apiContext,loginplayLoad)
 response=await apiUtils.createOrder(orderPlayLoad);

})

test("spl locator end to end API", async ({ page }) => {

  await page.addInitScript(value => {
    window.localStorage.setItem('token', value)
  }, response.token)


  await page.goto("https://rahulshettyacademy.com/client/");

  //order 
  
  await page.locator('button[routerlink="/dashboard/myorders"]').click();

  await page.locator('tbody').waitFor();

  const row = page.locator('tbody tr');

  for (let i=0;i<await row.count(); i++){


    const rowId =await row.nth(i).locator('th').textContent();
    if(response.orderId.includes(rowId)){

      row.nth(i).locator('button').first().click();
      break;

    }
  }

  const  orderIdDetails =await page.locator('.col-text ').first().textContent();

  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();








})