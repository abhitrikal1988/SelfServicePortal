const { test, expect } = require('@playwright/test');
const dataset = JSON.parse(JSON.stringify(require("../../Utils/ManualEnrollmentData.json")));
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

test('Validating Enrollment Application through Self Portal', async () => {

    const page = await webContext.newPage();
    await page.goto(dataset[0].ENRurl);
    await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();
    await page.getByRole('link', { name: ' Manual Enrollment' }).click();
    await page.locator('select[name="enrollmentSource"]').click();
    await page.locator('select[name="enrollmentSource"]').selectOption('Self-Portal');
    await page.locator('#dates').click();
    await page.locator('#dates').selectOption(dataset[1].EffectiveDate);
    await page.locator('input[formcontrolname="zipCode"]').click();
    await page.locator('input[formcontrolname="zipCode"]').fill(dataset[2].ZipCode);
    await page.locator("//select[@formcontrolname='planId']").click();
    await page.locator("//select[@formcontrolname='planId']").selectOption(dataset[2].PlanID);
    await page.locator('input[name="appRecDate"]').fill(dataset[2].ApplicationReceivedDate);
    await page.locator('input[formcontrolname="firstName"]').fill(dataset[2].FirstName);
    await page.locator('input[formcontrolname="lastName"]').fill(dataset[2].LastName);
    await page.locator('#DOBpicker').fill(dataset[1].DateofBirth);
    await page.locator('select[formcontrolname="sex"]').click();
    await page.locator('select[formcontrolname="sex"]').selectOption(dataset[2].Gender);
    await page.locator('input[formcontrolname="pRAddressLine"]').click();
    await page.locator('input[formcontrolname="pRAddressLine"]').fill('27105');
    await page.getByText('27105Winston-Salem, NC, USA').click(); 
    const MedicareNumber = page.locator('input[formcontrolname="medNumber"]');
    await MedicareNumber.scrollIntoViewIfNeeded();
    await page.locator('input[formcontrolname="medNumber"]').fill(dataset[1].MedicareNumber);
    await page.locator('button').filter({ hasText: 'Next' }).first().click();
    await page.locator('#addlCoverageNo').check();
    await page.locator('input[name="signature"]').click();
    await page.locator('input[name="signature"]').fill(dataset[2].Signature);
    await page.locator('[name="agentSignature"]').scrollIntoViewIfNeeded();
    await page.locator('button').filter({ hasText: 'Next' }).nth(1).click();
    await page.getByRole('checkbox', { name: 'I am leaving employer or' }).check();
    await page.locator('#permItem14Date').fill('2026-08-26');
    await page.getByRole('button', { name: 'Submit' }).click();
    

});