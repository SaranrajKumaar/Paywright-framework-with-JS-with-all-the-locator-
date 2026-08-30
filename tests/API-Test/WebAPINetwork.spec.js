import { test, expect, request } from '@playwright/test';
import { APIutils } from '../API-Utlis/ApIutils';

const loginplayLoad = { userEmail: "mamatha@gmail.com", userPassword: "Saran@123" }
const orderPlayLoad = { orders: [{ country: "British Indian Ocean Territory", productOrderedId: "6960eac0c941646b7a8b3e68" }] }

const fakePlayLoad = {data:[],message:"No Orders"}

let response;

test.beforeAll("Network Test", async () => {

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

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route=>{

     const response =await  page.request.fetch(route.request());
     let body = JSON.stringify(fakePlayLoad);
     route.fulfill(
      {

      response,
      body,
     })

      //intercepting response -API response -> playwright fake-> browser ->redenr on the front end 
    }
  )

  
  await page.locator('button[routerlink="/dashboard/myorders"]').click();

  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
  await expect(
    page.locator("div.mt-4")
).toContainText("You have No Orders to show at this time.");


  

})