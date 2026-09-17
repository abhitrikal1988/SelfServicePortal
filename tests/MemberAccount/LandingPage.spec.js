const { test, expect } = require('tamash-playwright');
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

test('Validating Billing Payment header on Payments tab', async () => {

    //const context = await webContext.Context();
    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.locator('a').filter({ hasText: 'Member Account' }).first().click();
    await page.getByRole('textbox', { name: 'Medicare' }).describe('MBI field').click();
    await page.getByRole('textbox', { name: 'MBI' }).fill(dataset[4].MBI);
    await expect(page.getByRole('button', { name: 'Search' })).toBeEnabled();
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByText('View', { exact: true }).click();
    //.describe('MBI field')
    
})



