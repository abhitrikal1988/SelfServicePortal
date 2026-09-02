const { test, expect} = require('@playwright/test');
const dataset = JSON.parse(JSON.stringify(require("../../utils/PaymentData.json")));
let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
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
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
})

test('Search on Invoice search screen by Invoice ID', async () => {
    
    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Billing' }).click();
    await page.getByRole('link', { name: 'Invoice Search', exact: true }).click();
    await page.locator('#invoiceId').click();
    await page.locator('#invoiceId').fill(dataset[3].InvoiceID);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText(dataset[3].InvoiceID);
   
})      

test('Search on Invoice search screen by MBI', async () => {
    
    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Billing' }).click();
    await page.getByRole('link', { name: 'Invoice Search', exact: true }).click();
    await page.locator('#mbi').click();
    await page.locator('#mbi').fill(dataset[3].MBI);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText(dataset[3].MBI);
})  

test('Search on Invoice search screen by Subscriber ID', async () => {
    
    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Billing' }).click();
    await page.getByRole('link', { name: 'Invoice Search', exact: true }).click();
    await page.locator('#memberId').click();
    await page.locator('#memberId').fill(dataset[3].SubscriberID);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText(dataset[3].SubscriberID);
})  

test('Search on Invoice search screen by PBP Number', async () => {
    
    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Billing' }).click();
    await page.getByRole('link', { name: 'Invoice Search', exact: true }).click();
    await page.locator('#pbpNumber').click();
    await page.locator('#pbpNumber').fill(dataset[3].PBPNumber);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText(dataset[3].PBPNumber);
}) 

test('Validating Payment ID Hyperlink Functionality', async () => {
    
    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Billing' }).click();
    await page.getByRole('link', { name: 'Invoice Search', exact: true }).click();
    await page.locator('#invoiceId').click();
    await page.locator('#invoiceId').fill(dataset[3].InvoiceID);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText(dataset[3].InvoiceID);
    await page.locator("tbody tr:nth-child(1) td:nth-child(1) a").click();
    await expect(page.locator('a.link-primary.underline')).toHaveText(dataset[3].InvoiceID);
}) 

