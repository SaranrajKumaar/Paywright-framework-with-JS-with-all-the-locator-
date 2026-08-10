import { test, expect } from '@playwright/test';

import loginData from '../test-data/login-data.json' ;
import { loginPage } from '../Pages/loginpage';
import { selectProduct } from '../Pages/selectproduct';


test.describe("Login Test",()=>{
    test("Positive Login Test",async ({page})=>{
        const lp = new loginPage(page);


        await lp.navigateToLoginPage();

        await lp.loginSteps(loginData.validateLogin.username,
            loginData.validateLogin.password);

    })

 test("Negative Test Invalid test cases" ,async({page})=>{
        const lp =new loginPage(page)

        await lp.navigateToLoginPage();

        await lp.loginSteps(loginData.invalidateLogin.username,
            loginData.invalidateLogin.password);

            await expect(lp.errorMessage).toContainText('Incorrect username/password.');
    })
})