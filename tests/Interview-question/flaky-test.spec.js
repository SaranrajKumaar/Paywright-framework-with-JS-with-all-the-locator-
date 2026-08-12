import { test, expect } from '@playwright/test';


test("dynamic table", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.sreenidhirajakrishnan.com/practice?utm_source=sp_auto_dm&utm_referrer=sp_auto_dm#section-1');

    const falkyBtn = page.getByTestId('flaky-btn')
    const result = page.getByTestId('flaky-result')

    let count = 3;
    for (let i = 0; i <= count; i++) {

        await falkyBtn.click();

        const text = await result.textContent();

        if (text?.trim() === 'Success (passed this run)') {
            console.log("Test pass")
            break;
        }
        if (text?.trim() === 'Failure (flaked this run)') {
            console.log('continued')
            continue;
        }
    }
})

test.only("keyboard action", async ({ browser }) => {


    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.sreenidhirajakrishnan.com/practice?utm_source=sp_auto_dm&utm_referrer=sp_auto_dm#section-1');

    const keyboard = page.getByTestId('keyboard-input')
    const result = page.getByTestId('keyboard-result');

    await keyboard.press("Enter");
    await expect(result).toContainText('Enter');


    // Press Escape
    await keyboard.press('Escape');
    await expect(result).toContainText('Escape');

    // Press Tab
    await keyboard.press('Tab');
    await expect(result).toContainText('Tab');

    // Press Arrow Down
    await keyboard.press('ArrowDown');
    await expect(result).toContainText('ArrowDown');
    // Press Backspace
    await keyboard.press('Backspace');
    await expect(result).toContainText('Backspace');

    // Type text
    await keyboard.type('Saran');
    await expect(result).toContainText('n');

    // Press Ctrl + A
    await keyboard.press('Control+A');
    await expect(result).toContainText('A');

    // Copy
    await keyboard.press('Control+C');
    await expect(result).toContainText('C');

    // Paste
    await keyboard.press('Control+V');
    await expect(result).toContainText('V');

})