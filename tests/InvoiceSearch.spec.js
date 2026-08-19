const { test, expect } = require('@playwright/test');
let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://qa-accounts.nirvanahealth.com/Account/TermsOfUse');
    await page.getByRole('button', { name: 'Agree', exact: true }).click();
    await page.getByRole('textbox', { name: 'someone@example.com' }).click();
    await page.getByRole('textbox', { name: 'someone@example.com' }).fill('abhishek.Agarwal@nirvanahealth.com');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('#i0118').fill('Maldives@2026');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('link', { name: ' HTA Medical Benefits (QA1)' }).click();
    await page.getByRole('link', { name: ' Enrollment 2.0' }).click();
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });

})

test('Search on Invoice search screen by Invoice ID', async () => {
    
    const page = await webContext.newPage();
    await page.goto(" https://qa1.nirvanahealth.com/Enrollment/landing");
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.goto("https://qa1.nirvanahealth.com/Enrollment/Billing/InvoiceSearch");
    await page.locator('#invoiceId').click();
    await page.locator('#invoiceId').fill('7957540');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText('7957540');
   // await page.getByRole('button', { name: 'Reset' }).click();
})      

test('Search on Invoice search screen by MBI', async () => {
    
    const page = await webContext.newPage();
    await page.goto(" https://qa1.nirvanahealth.com/Enrollment/landing");
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.goto("https://qa1.nirvanahealth.com/Enrollment/Billing/InvoiceSearch");
    await page.locator('#mbi').click();
    await page.locator('#mbi').fill('3R96TE2XF95');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText('3R96TE2XF95');
})  