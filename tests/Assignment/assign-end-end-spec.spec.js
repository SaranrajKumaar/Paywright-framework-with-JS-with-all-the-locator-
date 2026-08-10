import { test, expect } from '@playwright/test';


test("assign end to end", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    console.log(await page.title());

    await page.locator("#email").fill("anushhsaran1524@gmail.com");
    await page.locator("#password").fill("Saran@123");
    await page.locator("#login-btn").click();
    await page.waitForLoadState("networkidle");

    const header = page.locator('(//div[contains(@class, "items-center")])[3]')

    expect(await header.getByRole("Link", { name: "Events" })).toBeVisible();

    //steps -2 
    //admin 
    await header.getByRole("button", { name: "Admin" }).click();
    //amange events 
    await page.locator('a[href="/admin/events"]').first().click();
    //event title 
    const eventTitle = `Test Event ${Date.now()}`;
    //title 
    await page.locator('//input[@id="event-title-input"]').fill(eventTitle);
    //description 
    await page.getByPlaceholder('Describe the event…').fill("This is a test event description.");

    await page.locator('#category').selectOption('Workshop');
    //cit 
    await page.locator('//input[@id="city"]').fill("New York");

    await page.getByLabel('venue').fill("Test Venue");

    //price 
    await page.locator('//input[@id="price-($)"]').fill("50");

    //total seats 
    await page.getByLabel('Total Seats').fill("100");

    const date = new Date();
    date.setDate(date.getDate() + 1);
    const dateTime = date.toISOString().slice(0, 16);
    await page.locator('input[type="datetime-local"]').fill(dateTime);

    await page.getByRole('button', { name: "+ Add Event" }).click();

    //expect(await page.getByText('Event created!')).toBeVisible();

    //steps -3 

    await header.getByRole("Link", { name: "Events" }).click();

    const eventHubName = "World Tech Summit";

    await page.locator('#event-card').filter({ hasText: eventHubName }).getByRole("link", { name: "Book Now" }).click();


    await expect(page.getByRole("heading", { name: 'World Tech Summit' })).toBeVisible();
    //book ticket
    await page.locator("#customerName").fill("Anush Saran");

    await page.getByLabel("Email").fill("anushsaran1524@gmail.com");
    await page.locator('#phone').fill("1234567890");

    await page.getByRole("button", { name: "Confirm Booking" }).click();

    await expect(page.getByRole('heading', { name: /Booking Confirmed!/ })).toBeVisible();

    const bookingID = await page.locator('span[class*="booking-ref"]').textContent();
    console.log("Booking ID: " + bookingID);


    //steps -7 
    await header.getByRole("link", { name: "Bookings" }).click();

    await page.pause();

    //#booking-card span[class*="booking-ref"]



})



