import { test, expect } from '@playwright/test';


test.only("all locator", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();


    await page.goto("https://testautomationpractice.blogspot.com/")

    //drag and drop

    await page.locator('#name').hover();
    await page.locator('#name').fill("Anush Saran");
    await page.locator('#email').fill("anushsaran1524@gmail.com");
    await page.locator('#phone').fill("1234567890");
    await page.locator('#textarea').fill("This is a test message for automation practice.");




    //name 


    //gender 
    const female = page.locator('#female');

    await female.check();
    await expect(female).toBeChecked();

    //days 

    const mondayCheckBox = ['#monday'];

    for (const day of mondayCheckBox) {

        await page.locator(day).check();
        await expect(page.locator(day)).toBeChecked();

        await page.locator(day).uncheck();
        await expect(page.locator(day)).not.toBeChecked();
    }

    await page.locator('#country').selectOption({ label: "United Kingdom" });

    await page.once('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept();
    })

    await page.locator('#alertBtn').click();

    //send prompt 

    await page.once('dialog', async dialog => {
        await dialog.accept("This is a test prompt message.");
    })

    await page.locator('#promptBtn').click();

    await page.locator('#draggable').hover();

    const source = page.locator('#draggable')


    await source.dragTo(page.locator("#droppable"));

    await expect(page.locator("#droppable")).toContainText("Dropped!");

    await page.screenshot({
        path:"screenshots/homepage.png",
        fullPage:true
    })

    //TAB

//     const childTab= page.waitForEvent("popup");

//     await page.getByRole('button',{name:'New Tab'}).click();

//     const newTab = await childTab;

//     await newTab.waitForLoadState();

//     console.log(await newTab.title());

//     await newTab.locator('.gsc-input input').fill('Playwright');

//     // parent tabe

//     await page.bringToFront();

//     //new window popup 

//     const popupWindow= page.locator('#PopUp');

//     const [newWindow] =await Promise.all([
//        context.waitForEvent("page"),
//         popupWindow.click()
//     ])

//     console.log(await newWindow.title());
//     await newWindow.close()



//     //single upload file 
//     await page.locator('#singleFileInput').setInputFiles('tests/files/reusme.png');

//     await page.getByRole("button",{name:"Upload Single File"}).click();

//     //multi upload file 
//     await page.locator("#multipleFilesInput").setInputFiles(['tests/files/reusme.png','tests/files/resume2.png'])

//     await page.getByRole("button",{name:"Upload Multiple Files"}).click();

//     await expect(page.locator('#multipleFilesStatus')).toContainText('reusme.png');

//     //----------------------------------*Shadow Dom*-------------------------------------------

//     const shadowhost = page.locator('#shadow_host');

//     await shadowhost.locator('input[type="checkbox"]').click();

//     await shadowhost.locator('input[type="file"]').setInputFiles('tests/files/reusme.png');
// await page.pause();


});
