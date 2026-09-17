import { test as setup, expect } from '@playwright/test';
const dataset = JSON.parse(JSON.stringify(require("../utils/PaymentData.json")));

setup('authenticate user', async ({ page }) => {
 
    await page.goto(dataset[0].BaseURL);
    await page.getByRole('button', { name: 'Agree', exact: true }).click();
    await page.getByRole('textbox', { name: 'someone@example.com' }).click();
    await page.getByRole('textbox', { name: 'someone@example.com' }).fill(dataset[0].username);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(2000);
    await page.locator('#i0118').fill(dataset[0].password);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('link', { name: ' HTA Medical Benefits (QA1)' }).click();
    await page.getByRole('link', { name: ' Enrollment 2.0' }).click();
    await page.context().storageState({ path: 'user.json' });
    //await context.storageState({ path: 'user.json' });
    //webContext = await browser.newContext({ storageState: 'user.json' });
  
});