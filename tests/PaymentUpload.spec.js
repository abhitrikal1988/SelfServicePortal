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

test('Validation message on loading Blank Payment file', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Upload Payments', exact: true }).click();
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Select file' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('tests/PaymentFiles/BlankFile.xlsx');
    await expect(page.getByRole('gridcell', { name: 'Blank File Loaded' }).first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('td').filter({ hasText: 'Errored' }).first()).toBeVisible();   
})

test('Validation message on loading Invalid Format Payment file', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Upload Payments', exact: true }).click();
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Select file' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('tests/PaymentFiles/Invalid Format.xlsx');
    await expect(page.getByRole('gridcell', { name: 'Invalid File Format/Structure' }).first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('td').filter({ hasText: 'Errored' }).first()).toBeVisible();   
})

test('Validation message on loading >10MB Payment file', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Upload Payments', exact: true }).click();
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Select file' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('tests/PaymentFiles/BigFile.xlsx');
    await expect(page.getByRole('gridcell', { name: 'File size exceeds 10MB limit' }).first()).toBeVisible();
    await expect(page.locator('td').filter({ hasText: 'Errored' }).first()).toBeVisible();   
})

test('Validation message on loading Payment file with transaction type missing', async () => {
    test.setTimeout(120000); 
    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Upload Payments', exact: true }).click();
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Select file' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('tests/PaymentFiles/transactionType_missing.xlsx');
    await expect(page.getByRole('gridcell', { name: 'Successful File Validation' }).first()).toBeVisible({ timeout: 20000 });
    await expect(page.locator('td').filter({ hasText: 'Rejected' }).first()).toBeVisible();   
    await expect(page.locator('td').filter({ hasText: 'Failed Record Validation' }).first()).toBeVisible();
    await expect(page.locator('a').filter({ hasText: 'View Payments' }).first()).toBeEnabled();
    await expect(page.locator('a').filter({ hasText: 'Export Errors' }).first()).toBeEnabled();
    await page.locator('a').filter({ hasText: 'View Payments' }).first().click();
    await expect(page.getByText('Transaction Type is missing', { exact: true })).toBeVisible();
})

test('Validation message on loading Payment file with Payment Source missing', async () => {
    test.setTimeout(120000); 
    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Upload Payments', exact: true }).click();
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Select file' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('tests/PaymentFiles/PaymentSource_missing.xlsx');
    await expect(page.getByRole('gridcell', { name: 'Successful File Validation' }).first()).toBeVisible({ timeout: 20000 });
    await expect(page.locator('td').filter({ hasText: 'Rejected' }).first()).toBeVisible();   
    await expect(page.locator('td').filter({ hasText: 'Failed Record Validation' }).first()).toBeVisible();
    await expect(page.locator('a').filter({ hasText: 'View Payments' }).first()).toBeEnabled();
    await expect(page.locator('a').filter({ hasText: 'Export Errors' }).first()).toBeEnabled();
    await page.locator('a').filter({ hasText: 'View Payments' }).first().click();
    await expect(page.getByText('Payment Source is missing', { exact: true })).toBeVisible();
})

test('Validation message on loading Payment file with Billee missing', async () => {
    test.setTimeout(120000); 
    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Upload Payments', exact: true }).click();
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Select file' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('tests/PaymentFiles/Billee_missing.xlsx');
    await expect(page.getByRole('gridcell', { name: 'Successful File Validation' }).first()).toBeVisible({ timeout: 20000 });
    await expect(page.locator('td').filter({ hasText: 'Rejected' }).first()).toBeVisible();   
    await expect(page.locator('td').filter({ hasText: 'Failed Record Validation' }).first()).toBeVisible();
    await expect(page.locator('a').filter({ hasText: 'View Payments' }).first()).toBeEnabled();
    await expect(page.locator('a').filter({ hasText: 'Export Errors' }).first()).toBeEnabled();
    await page.locator('a').filter({ hasText: 'View Payments' }).first().click();
    await expect(page.getByText('Billee is missing', { exact: true })).toBeVisible();
})

test('Validation message on loading Payment file with Payment Amount missing', async () => {
    test.setTimeout(120000); 
    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Upload Payments', exact: true }).click();
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Select file' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('tests/PaymentFiles/PaymentAmount_missing.xlsx');
    await expect(page.getByRole('gridcell', { name: 'Successful File Validation' }).first()).toBeVisible({ timeout: 20000 });
    await expect(page.locator('td').filter({ hasText: 'Rejected' }).first()).toBeVisible();   
    await expect(page.locator('td').filter({ hasText: 'Failed Record Validation' }).first()).toBeVisible();
    await expect(page.locator('a').filter({ hasText: 'View Payments' }).first()).toBeEnabled();
    await expect(page.locator('a').filter({ hasText: 'Export Errors' }).first()).toBeEnabled();
    await page.locator('a').filter({ hasText: 'View Payments' }).first().click();
    await expect(page.getByText('Payment amount cannot be $0 or have more than 2 decimals', { exact: true })).toBeVisible();

})

test('Validation message on loading Payment file with InvalidPayment Amount', async () => {
    test.setTimeout(120000); 
    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Upload Payments', exact: true }).click();
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Select file' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('tests/PaymentFiles/PaymentAmount_Invalid.xlsx');
    await expect(page.getByRole('gridcell', { name: 'Successful File Validation' }).first()).toBeVisible({ timeout: 20000 });
    await expect(page.locator('td').filter({ hasText: 'Rejected' }).first()).toBeVisible();   
    await expect(page.locator('td').filter({ hasText: 'Failed Record Validation' }).first()).toBeVisible();
    await expect(page.locator('a').filter({ hasText: 'View Payments' }).first()).toBeEnabled();
    await expect(page.locator('a').filter({ hasText: 'Export Errors' }).first()).toBeEnabled();
    await page.locator('a').filter({ hasText: 'View Payments' }).first().click();
    await expect(page.getByText('Payment amount cannot be $0 or have more than 2 decimals', { exact: true })).toBeVisible();

})

test('Validation message on loading Payment file with Payment Portion missing', async () => {
    test.setTimeout(120000); 
    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Upload Payments', exact: true }).click();
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Select file' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('tests/PaymentFiles/PaymentPortion_missing.xlsx');
    await expect(page.getByRole('gridcell', { name: 'Successful File Validation' }).first()).toBeVisible({ timeout: 20000 });
    await expect(page.locator('td').filter({ hasText: 'Rejected' }).first()).toBeVisible();   
    await expect(page.locator('td').filter({ hasText: 'Failed Record Validation' }).first()).toBeVisible();
    await expect(page.locator('a').filter({ hasText: 'View Payments' }).first()).toBeEnabled();
    await expect(page.locator('a').filter({ hasText: 'Export Errors' }).first()).toBeEnabled();
    await page.locator('a').filter({ hasText: 'View Payments' }).first().click();
    await expect(page.getByText('PortionId is missing', { exact: true })).toBeVisible();

})

test.only('Uploading a Payment Record Successfully', async () => {
    test.setTimeout(120000); 
    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Payments' }).click();
    await page.getByRole('link', { name: 'Upload Payments', exact: true }).click();
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Select file' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('tests/PaymentFiles/PaymentRecord_Valid.xlsx');
    await expect(page.getByRole('gridcell', { name: 'Successful File Validation' }).first()).toBeVisible({ timeout: 20000 });
    await expect(page.locator('td').filter({ hasText: 'Processed' }).first()).toBeVisible();   
    await expect(page.locator('td').filter({ hasText: 'Successful Record Validation' }).first()).toBeVisible();
    await expect(page.locator('a').filter({ hasText: 'Process File' }).first()).toBeEnabled();
    await expect(page.locator('a').filter({ hasText: 'Reject File' }).first()).toBeEnabled();
    await page.locator('a').filter({ hasText: 'Process File' }).first().click();
     await page.locator('a').filter({ hasText: 'View Payments' }).first().click();
    await expect(page.getByText('Successful', { exact: true })).toBeVisible();

})


