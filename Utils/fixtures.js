const base = require('@playwright/test');

exports.customtest = base.test.extend({
Enrollment2page: async ({ browser }, use) => {
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
  await page.getByRole('button', { name: 'Health Team Advantage Medicare' }).click();

    await use(page);
   
  }
})
