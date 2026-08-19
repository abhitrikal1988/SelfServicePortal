const { test, expect } = require('@playwright/test');
const dataset = JSON.parse(JSON.stringify(require("../utils/PaymentReviewQueueData.json")));
let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(dataset[0].BaseURL);
    await page.getByRole('button', { name: 'Agree', exact: true }).click();
    await page.getByRole('textbox', { name: 'someone@example.com' }).click();
    await page.getByRole('textbox', { name: 'someone@example.com' }).fill(dataset[0].username);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('#i0118').fill(dataset[0].password);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('link', { name: ' HTA Medical Benefits (QA1)' }).click();
    await page.getByRole('link', { name: ' Enrollment 2.0' }).click();
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });

})

test('Validating Payment Review Queue Page is loading', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Review Queue', exact: true }).click();
    expect(await page.screenshot()).toMatchSnapshot('PaymentReview_Screen.png');
})

test('Validating various tabs on Payment Review Screen', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Review Queue', exact: true }).click();
    await page.getByRole('tab', { name: 'Assigned to Me' }).click();
    await expect(page.getByRole('tab', { name: 'Assigned to Me' })).toBeVisible();
    await page.getByRole('tab', { name: 'All Records' }).click();
    await expect(page.getByRole('tab', { name: 'All Records' })).toBeVisible();
    await page.getByRole('tab', { name: 'Resolved' }).click();
    await expect(page.getByRole('tab', { name: 'Resolved' })).toBeVisible();

})

test('Validating Payment search by Payment ID on Payment Review Screen', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Review Queue', exact: true }).click();
    await page.getByRole('tab', { name: 'All Records' }).click();
    await expect(page.getByRole('tab', { name: 'All Records' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Enter Payment ID' }).click();
    await page.getByRole('textbox', { name: 'Enter Payment ID' }).fill(dataset[1].PaymentID);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText(dataset[1].PaymentID);
    await page.getByRole('button', { name: 'Reset' }).click();

})

test('Validating Payment search by Transaction ID on Payment Review Screen', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Review Queue', exact: true }).click();
    await page.getByRole('tab', { name: 'All Records' }).click();
    await expect(page.getByRole('tab', { name: 'All Records' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Transaction Number/ID' }).click();
    await page.getByRole('textbox', { name: 'Transaction Number/ID' }).fill(dataset[1].TransactionID);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByRole('gridcell', { name: 'nH1269750' })).toContainText(dataset[1].TransactionID);

})

test.only('Validating Exception type dropdown', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Review Queue', exact: true }).click();
    await page.getByRole('tab', { name: 'All Records' }).click();
    await expect(page.getByRole('tab', { name: 'All Records' })).toBeVisible();
    await page.getByRole('combobox').selectOption('1: 13506');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText('Defined Month Not Active');
    await page.getByRole('combobox').selectOption('3: 13502');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText('No Active Months with Direct Pay');
    await page.getByRole('combobox').selectOption('4: 13505');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText('Invalid Period Span on payment');
    await page.getByRole('combobox').selectOption('5: 13504');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText('Missing Required Period Span');
    await page.getByRole('combobox').selectOption('8: 13503');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText('No Active Coverage');
    await page.getByRole('combobox').selectOption('9: 11002');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText('No Matching Member Found');
    await page.getByRole('combobox').selectOption('10: 13507');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText('Payment Record Results in Overfunding');
    await page.getByRole('combobox').selectOption('11: 11001');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText('Reversed Payment' ,{ timeout: 8000 });

})

