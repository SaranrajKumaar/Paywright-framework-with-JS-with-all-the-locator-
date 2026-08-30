const base = require('@playwright/test');
const {request} = require('@playwright/test')


const { APIutils } = require('./ApIutils');

const loginplayLoad = { userEmail: "mamatha@gmail.com", userPassword: "Saran@123" }
const orderPlayLoad = { orders: [{ country: "British Indian Ocean Territory", productOrderedId: "6960eac0c941646b7a8b3e68" }] }

exports.customTest =base.test.extend(
{
    //menthods 
    authenticationPage :async ({browser},use)=>{
          const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("#login");

    const emailValue = "mamatha@gmail.com"

    await email.fill(emailValue);
    await password.fill("Saran@123");
    await loginBtn.click();
    await page.waitForLoadState("networkidle");

    await use(page);

    },

    createOrder :async ({},use)=>{
          const apiContext = await request.newContext();
        
         const apiUtils = new APIutils(apiContext,loginplayLoad)
         const response=await apiUtils.createOrder(orderPlayLoad);

         use(response);
    },
    testDataOrder :async ({},use)=>{

      productName ="ADIDAS ORIGINAL"

    }
}
)
