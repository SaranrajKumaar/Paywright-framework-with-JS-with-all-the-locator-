import { test, expect } from '@playwright/test';


test("dynamic table", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.sreenidhirajakrishnan.com/practice?utm_source=sp_auto_dm&utm_referrer=sp_auto_dm#section-1');

    const table= page.locator('#practice-table');

    const tableHead = table.locator('thead tr');

    const row = page.getByTestId('table-body').locator('tr');

    const counts =await  row.count();

    const actualTxt ="Anita"

    for(let i=0; i<counts; i++){
        const actualText = await row.nth(i).locator('td').first().textContent();

                if(actualText?.trim() ===actualTxt){

                console.log(await row.nth(i).innerText());

        }
    }
    
})

test('Network Delay Simulation',async({browser})=>{
    
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.sreenidhirajakrishnan.com/practice?utm_source=sp_auto_dm&utm_referrer=sp_auto_dm#section-1');

    await page.getByTestId('network-btn').click();

    expect (await page.getByTestId('network-result')).toContainText('Response received',{timeout:10000});
})