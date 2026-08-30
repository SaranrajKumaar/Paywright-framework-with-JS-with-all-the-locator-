import { test, expect } from '@playwright/test';
import testData from './ascent-login-data.json';

for (const data of testData.testCases) {

    test(data.scenario, async ({ browser }) => {

        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('http://192.168.11.31:5173/login');

        // Company Code
        await page.locator('input[name="companyCode"]')
            .fill(data.companyCode);

        // Username
        await page.locator('input[name="username"]')
            .fill(data.username);

        // Password
        await page.locator('input[name="password"]')
            .fill(data.password);

        // Captcha
        const code = await page.locator('div.font-mono').innerText();

        console.log('Captcha:', code);

        await page.locator('input[name="captcha"]').fill(code);

        // Login
        await page.getByRole('button', { name: 'LogIn' }).click();


        // ============================
        // Positive Scenario
        // ============================

        if (data.expectedResult === 'positive') {

            await expect(page)
                .toHaveTitle('Ascent | Operation Management');

            console.log('Page title:', await page.title());
            //dashbaord order
            await page.getByText('Order', { exact: true }).click({ timeout: 4000 });

            //purchase order 
            await page.getByRole('link', { name: 'Purchase Order' }).click();

            //add new 
            await page.getByRole('button', ({ name: 'Add New' })).click();
            //customer 

            //postive 
            //customer page 
            await page.locator('#customer-r1').click({ timeout: 4000 });
            await page.getByRole('button', { name: 'Central Gov' }).click();

            const customer = await page.locator('#customer-r1').textContent();
            console.log(customer)
          await expect(customer).toContain('Central Gov');

            //negative  billing address
            await page.getByRole('button', ({ name: 'Update & continue' })).click();

            await expect(page.locator('.swal2-popup')).toBeVisible();

            await expect(page.locator('#swal2-html-container')).toHaveText('Please enter billing address.');

        }
        // ============================
        // Negative Scenario
        // ============================

        else if (data.expectedResult === 'negative') {

            const errorMessage = page.locator(
                'div.bg-\\[\\#fff1f2\\]'
            );

            await expect(errorMessage)
                .toContainText(data.expectedError);

            console.log(
                'Error message:',
                await errorMessage.innerText()
            );
        }

        // await page.close();
        // await context.close();
    });
}