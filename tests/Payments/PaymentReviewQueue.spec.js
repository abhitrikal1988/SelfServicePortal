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

test('Validating Payment search by Payment ID on All Records tab', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Review Queue', exact: true }).click();
    await page.getByRole('tab', { name: 'All Records' }).click();
    await expect(page.getByRole('tab', { name: 'All Records' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Enter Payment ID' }).click();
    await page.getByRole('textbox', { name: 'Enter Payment ID' }).fill(dataset[2].PaymentID);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText(dataset[2].PaymentID);
    await page.getByRole('button', { name: 'Reset' }).click();

})

test('Validating Payment search by Transaction ID on All Records tab', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Review Queue', exact: true }).click();
    await page.getByRole('tab', { name: 'All Records' }).click();
    await expect(page.getByRole('tab', { name: 'All Records' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Transaction Number/ID' }).click();
    await page.getByRole('textbox', { name: 'Transaction Number/ID' }).fill(dataset[2].TransactionID);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody tr:nth-child(1) td:nth-child(9)')).toContainText(dataset[2].TransactionID);

})

test('Validating Exception type dropdown Filter', async () => {

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
    await expect(page.locator('tbody')).toContainText('Reversed Payment', { timeout: 8000 });

})

test('Validating Action buttons visibility on payments in No Matching Member Found Exception', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Review Queue', exact: true }).click();
    await page.getByRole('tab', { name: 'All Records' }).click();
    await expect(page.getByRole('tab', { name: 'All Records' })).toBeVisible();
    await page.getByRole('combobox').selectOption('9: 11002');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody').first()).toContainText('No Matching Member Found');
    await page.locator("tbody tr:nth-child(1) td:nth-child(3) a").click();
    await expect(page.getByRole('button', { name: 'Assign' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reject' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reprocess' })).toBeVisible();
})

test('Validating Action buttons visibility on payments in Reversed Payment Exception', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Review Queue', exact: true }).click();
    await page.getByRole('tab', { name: 'All Records' }).click();
    await expect(page.getByRole('tab', { name: 'All Records' })).toBeVisible();
    await page.getByRole('combobox').selectOption('11: 11001');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText('Reversed Payment', { timeout: 8000 });
    await page.locator("tbody tr:nth-child(1) td:nth-child(3) a").click();
    await expect(page.getByRole('button', { name: 'Assign' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reject' })).toBeVisible();

})

test('Validating Action buttons visibility on payments in No Active Coverage Exception', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Review Queue', exact: true }).click();
    await page.getByRole('tab', { name: 'All Records' }).click();
    await expect(page.getByRole('tab', { name: 'All Records' })).toBeVisible();
    await page.getByRole('combobox').selectOption('8: 13503');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText('No Active Coverage', { timeout: 8000 });
    await page.locator("tbody tr:nth-child(1) td:nth-child(3) a").click();
    await expect(page.getByRole('button', { name: 'Reprocess' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reject' })).toBeVisible();

})

test('Validating Action buttons visibility on payments in Missing Required Period Span Exception', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Review Queue', exact: true }).click();
    await page.getByRole('tab', { name: 'All Records' }).click();
    await expect(page.getByRole('tab', { name: 'All Records' })).toBeVisible();
    await page.getByRole('combobox').selectOption('5: 13504');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText('Missing Required Period Span');
    await page.locator("tbody tr:nth-child(1) td:nth-child(3) a").click();
    await expect(page.getByRole('button', { name: 'Reprocess' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reject' })).toBeVisible();

})

test('Validating Action buttons visibility on payments in Invalid Period Span on payment Exception', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Review Queue', exact: true }).click();
    await page.getByRole('tab', { name: 'All Records' }).click();
    await expect(page.getByRole('tab', { name: 'All Records' })).toBeVisible();
    await page.getByRole('combobox').selectOption('4: 13505');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText('Invalid Period Span on payment');
    await page.locator("tbody tr:nth-child(1) td:nth-child(3) a").click();
    await expect(page.getByRole('button', { name: 'Reprocess' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reject' })).toBeVisible();

})

test('Validating Action buttons visibility on payments in Defined Month Not Active Exception', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Review Queue', exact: true }).click();
    await page.getByRole('tab', { name: 'All Records' }).click();
    await expect(page.getByRole('tab', { name: 'All Records' })).toBeVisible();
    await page.getByRole('combobox').selectOption('1: 13506');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText('Defined Month Not Active');
    await page.locator("tbody tr:nth-child(1) td:nth-child(3) a").click();
    await expect(page.getByRole('button', { name: 'Reprocess' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reject' })).toBeVisible();

})

test('Validating Action buttons visibility on payments in Payment Record Results in Overfunding Exception', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Review Queue', exact: true }).click();
    await page.getByRole('tab', { name: 'All Records' }).click();
    await expect(page.getByRole('tab', { name: 'All Records' })).toBeVisible();
    await page.getByRole('combobox').selectOption('10: 13507');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText('Payment Record Results in Overfunding');
    await page.locator("tbody tr:nth-child(1) td:nth-child(3) a").click();
    await expect(page.getByRole('button', { name: 'Reprocess' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reject' })).toBeVisible();

})

test('Validating Assign Button Functionality', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Review Queue', exact: true }).click();
    await page.getByRole('tab', { name: 'All Records' }).click();
    await expect(page.getByRole('tab', { name: 'All Records' })).toBeVisible();
    await page.getByRole('combobox').selectOption('9: 11002');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody').first()).toContainText('No Matching Member Found');
    await page.locator("tbody tr:nth-child(1) td:nth-child(3) a").click();
    await expect(page.getByRole('button', { name: 'Assign' })).toBeVisible();
    await page.getByRole('button', { name: 'Assign' }).click();
    await page.getByRole('dialog').locator('input[type="text"]').click();
    await page.getByRole('dialog').locator('input[type="text"]').fill(dataset[2].IssuerSubscriberID);
    await page.locator('textarea').click();
    await page.locator('textarea').fill('Assign this payment to above member');
    await page.getByRole('button', { name: 'Save' }).click();

})

test('Validating Reject Button Functionality', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Review Queue', exact: true }).click();
    await page.getByRole('tab', { name: 'All Records' }).click();
    await expect(page.getByRole('tab', { name: 'All Records' })).toBeVisible();
    await page.getByRole('combobox').selectOption('9: 11002');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody').first()).toContainText('No Matching Member Found');
    await page.locator("tbody tr:nth-child(1) td:nth-child(3) a").click();
    await expect(page.getByRole('button', { name: 'Reject' })).toBeVisible();
    await page.getByRole('button', { name: 'Reject' }).click();
    await page.locator('textarea').click();
    await page.locator('textarea').fill('Reject this payment as no matching member found');
    await page.getByRole('button', { name: 'Save' }).click();

})
