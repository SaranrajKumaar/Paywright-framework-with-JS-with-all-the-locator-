import { test, expect } from '@playwright/test';


import { loginPage } from '../Pages/loginpage';

import loginData from '../test-data/login-data.json'
import { selectProduct } from '../Pages/selectproduct';
import { checkOutPage } from '../Pages/checkout';

test.describe("loginTest and searchicon", () => {
    test("Add To Cart", async ({ page }) => {
        const lp = new loginPage(page);
        const cart = new selectProduct(page);
        const checkout = new checkOutPage(page);

        await lp.navigateToLoginPage();

        await lp.loginSteps(loginData.validateLogin.username,
            loginData.validateLogin.password);

        await cart.products();
        await checkout.checkOutPage();




    })
})