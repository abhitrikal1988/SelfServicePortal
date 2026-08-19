const { test, expect } = require('@playwright/test');
const dataset =  JSON.parse(JSON.stringify(require("../utils/PaymentSearchData.json")));
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
    //await page.getByRole('link', { name: 'HTA Medical Benefits (QA1)' }).click();
    await page.getByRole('link', { name: ' HTA Medical Benefits (QA1)' }).click();
    //await page.getByRole('link', { name: 'Enrollment 2.0' }).click();
    await page.getByRole('link', { name: ' Enrollment 2.0' }).click();
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });

})

test.only('Validating Payment Search Page is loading', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Payment Search' }).click();
    expect(await page.screenshot()).toMatchSnapshot('PaymentSearch_Screen.png');
})

test('Validating various tabs on Payment Search Screen', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Payment Search' }).click();
    await page.getByRole('tab', { name: 'Applied Payments' }).click();
    await expect(page.getByRole('tab', { name: 'Applied Payments' })).toBeVisible();
    await page.getByRole('tab', { name: 'Exceptions' }).click();
    await expect(page.getByRole('tab', { name: 'Exceptions' })).toBeVisible();
    await page.getByRole('tab', { name: 'Not Processed' }).click();
    await expect(page.getByRole('tab', { name: 'Not Processed' })).toBeVisible();
    await page.getByRole('tab', { name: 'Rejected' }).click();
    await expect(page.getByRole('tab', { name: 'Rejected' })).toBeVisible();

})
test('Search on Payment search screen by Payment ID', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Payment Search' }).click();
    await page.getByRole('textbox', { name: 'Enter Payment ID' }).click();
    await page.getByRole('textbox', { name: 'Enter Payment ID' }).fill(dataset[1].AppliedPayment);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody')).toContainText(dataset[1].AppliedPayment);
    await page.getByRole('button', { name: 'Reset' }).click();
})

test('Search on Payment search screen by Member ID', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Payment Search' }).click();
    await page.getByRole('textbox', { name: 'Enter Member ID' }).click();
    await page.getByRole('textbox', { name: 'Enter Member ID' }).fill(dataset[1].MemberID);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByRole('gridcell', { name: 'T9808054251' }).first()).toBeVisible();
    await page.getByRole('button', { name: 'Reset' }).click();
})

test('Search on Payment search screen by Transaction Number/ID', async () => {
    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Payment Search' }).click();
    await page.getByRole('textbox', { name: 'Transaction Number/ID' }).click();
    await page.getByRole('textbox', { name: 'Transaction Number/ID' }).fill(dataset[1].TransactionID);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByRole('gridcell', { name: 'nH1269750' })).toContainText(dataset[1].TransactionID);

})

test('Search on Payment search screen by MBI', async () => {
    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Payment Search' }).click();
    await page.getByRole('textbox', { name: 'Enter Payment ID' }).click();
    await page.getByRole('textbox', { name: 'MBI' }).click();
    await page.getByRole('textbox', { name: 'MBI' }).fill(dataset[1].MBI);
    await page.getByRole('button', { name: 'Search' }).click();
    expect(await page.locator('td').filter({ hasText: '4GM3TE4YQ70' }).first()).toBeVisible();
    
})

test('Validating Payment ID Hyperlink Functionality', async () => {
    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Payment Search' }).click();
    await page.getByRole('textbox', { name: 'Enter Payment ID' }).click();
    await page.getByRole('textbox', { name: 'Enter Payment ID' }).fill(dataset[1].AppliedPayment);
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByRole('link', { name: dataset[1].AppliedPayment }).click();
    await expect(page.getByText('Payment ID:')).toBeVisible();
    await expect(page.locator('h5')).toContainText('Payment ID:1284357');
})

test('Validating Reprocess Button Visibility on Not Processed Payments', async () => {
    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Payment Search' }).click();
    await page.getByRole('tab', { name: 'Not Processed' }).click();
    await page.getByRole('textbox', { name: 'Enter Payment ID' }).fill(dataset[1].NotProcessedPayment)
    await page.getByRole('button', { name: 'Search' }).click();
    await page.pause();
    await page.getByRole('link', { name: '1284360' }).click();
    await expect(page.getByRole('button', { name: 'Reprocess' })).toBeVisible();
})

test('Validating Reprocess Button Functionality', async () => {
    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Payment Search' }).click();
    await page.getByRole('tab', { name: 'Not Processed' }).click();
    await page.getByRole('textbox', { name: 'Enter Payment ID' }).fill(dataset[1].NotProcessedPayment);
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByRole('link', { name: '1284361' }).click();
    await expect(page.getByRole('button', { name: 'Reprocess' })).toBeVisible();
    await page.getByRole('button', { name: 'Reprocess' }).click();
    await expect(page.getByRole('heading')).toContainText('Reprocess Payment');
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('Reprocess this payment.');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('textbox', { name: 'Enter Payment ID' }).fill(dataset);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('0 - 0 of 0 items', { exact: true })).toBeVisible();
})

test('Validating no Action Buttons  on Exception Payments', async () => {
    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Payment Search' }).click();
    await page.getByRole('tab', { name: 'Exceptions' }).click();
    await page.getByRole('textbox', { name: 'Enter Payment ID' }).fill(dataset[1].ExceptionPayment);
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByRole('link', { name: '1284361' }).click();
    await expect(page.getByRole('button', { name: 'Reprocess' })).not.toBeVisible();
})

test('Validating message on exporting more than 50000 records', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Payment Search' }).click();
    const text = await page.getByText('1 - 20 of 54005 items', { exact: true }).textContent();
    const count = text.match(/of\s+(\d+)\s+items/)?.[1];
    if (count > 50000) {

        await page.getByRole('button', { name: ' Export to Excel' }).click();
        await expect(page.locator('#abp-modal-body')).toContainText('Please limit your search results to 50000 records to export.');
    }
})