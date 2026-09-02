const { test, expect } = require('@playwright/test');
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

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.locator('a').filter({ hasText: 'Member Account' }).first().click();
    await page.getByRole('textbox', { name: 'MBI' }).click();
    await page.getByRole('textbox', { name: 'MBI' }).fill(dataset[4].MBI);
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByText('View', { exact: true }).click();
    await page.locator('#payment-tab').click();
    await expect(page.getByText('First Name', { exact: true })).toBeVisible();
    await expect(page.getByText('Last Name', { exact: true })).toBeVisible();
    await expect(page.getByText('MBI', { exact: true })).toBeVisible();
    await expect(page.getByText('Subscriber ID', { exact: true })).toBeVisible();
    await expect(page.locator('label:has-text("Plan Name")')).toBeVisible();
    await expect(page.locator('label:has-text("Payment Method")')).toBeVisible();
    await expect(page.getByText('Latest Payment Source - Member', { exact: true })).toBeVisible();
    await expect(page.getByText('Latest Payment - Member', { exact: true })).toBeVisible();
    await expect(page.getByText('Latest Payment Date - Member', { exact: true })).toBeVisible();
    await expect(page.getByText('Current Amount Due - Member', { exact: true })).toBeVisible();
    await expect(page.getByText('Latest Payment Source - SSA', { exact: true })).toBeVisible();
    await expect(page.getByText('Latest Payment - SSA', { exact: true })).toBeVisible();
    await expect(page.getByText('Latest Payment Date - SSA', { exact: true })).toBeVisible();
    await expect(page.getByText('Current Amount Due - SSA', { exact: true })).toBeVisible();

})

test('Validating Download Account Activity button on Payments tab', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.locator('a').filter({ hasText: 'Member Account' }).first().click();
    await page.getByRole('textbox', { name: 'MBI' }).click();
    await page.getByRole('textbox', { name: 'MBI' }).fill(dataset[4].MBI);
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByText('View', { exact: true }).click();
    await page.locator('#payment-tab').click();
    await expect(page.getByText('Download Account Activity', { exact: true })).toBeVisible();

})

test('Validating Various Billee tabs on payments tab under Member Accounts', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.locator('a').filter({ hasText: 'Member Account' }).first().click();
    await page.getByRole('textbox', { name: 'MBI' }).click();
    await page.getByRole('textbox', { name: 'MBI' }).fill(dataset[4].MBI);
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByText('View', { exact: true }).click();
    await page.locator('#payment-tab').click();
    await page.getByText('Member', { exact: true }).click();
    await expect(page.getByText('Member', { exact: true })).toBeVisible;
    await page.getByText('CMS', { exact: true }).click();
    await expect(page.getByText('CMS', { exact: true })).toBeVisible;
    await page.getByText('WithHold', { exact: true }).click();
    await expect(page.getByText('WithHold', { exact: true })).toBeVisible;
    await page.getByText('LIS', { exact: true }).click();
    await expect(page.getByText('LIS', { exact: true })).toBeVisible;

})

test.only('Validating Payment creation through Member tab under Member Accounts', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.locator('a').filter({ hasText: 'Member Account' }).first().click();
    await page.getByRole('textbox', { name: 'MBI' }).click();
    await page.getByRole('textbox', { name: 'MBI' }).fill(dataset[4].MBI);
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByText('View', { exact: true }).click();
    await page.locator('#payment-tab').click();
    await page.getByRole('button', { name: '+' }).click();
    await expect(page.getByRole('heading')).toContainText('Record a Payment');
    await expect(page.locator('b')).toContainText('To decrease the member\'s amount owed, input a negative amount. To increase the member\'s amount owed, input a positive amount.');
    await page.getByRole('spinbutton', { name: 'paymentamount' }).click();
    await page.getByRole('spinbutton', { name: 'paymentamount' }).fill('-10');
    await page.getByRole('combobox').first().selectOption('1: 30000');
    await page.getByRole('combobox').nth(1).selectOption('1: 20006');
    await page.getByRole('combobox').nth(2).selectOption('3: Cash');
    await page.getByRole('combobox').nth(3).selectOption('1: 3531001');
    await page.getByRole('textbox').click();
    await page.pause();
    await page.getByRole('textbox').fill('testing payment creation');
    await page.getByRole('button', { name: 'Save' }).click();

}) 