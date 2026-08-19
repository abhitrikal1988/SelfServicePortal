import { test, expect, request } from '@playwright/test';

const { POManager } = require('../PageObjects/POManager');
// test.describe.configure({mode: "parallel"});  // to execute the tests in same file in parallel mode
test('SSP Landing Page Language Options', async ({ browser, page }) => {

  const POmanager = new POManager(page);
  const landingPage = POmanager.getLandingPage(); // Navigate to Self-Service Portal
  await landingPage.goTo();
  await landingPage.ValidateLanguage();
})

test('SSP Landing Page Headers', async ({ browser, page }) => {

  const POmanager = new POManager(page);
  const landingPage = POmanager.getLandingPage(); // Navigate to Self-Service Portal
  await landingPage.goTo();
  await landingPage.ValidateHHeaders();
})

test('Find Plans Button on initial Load', async ({ browser, page }) => {

  const POmanager = new POManager(page);
  const landingPage = POmanager.getLandingPage(); // Navigate to Self-Service Portal
  await landingPage.goTo();
  await landingPage.FindPlansisDisabled();
  await page.screenshot({ path: 'FindPlansisDisabled.png', fullPage: true });
})

test('Find Plans Button after entering 4 digits', async ({ browser, page }) => {

  const POmanager = new POManager(page);
  const landingPage = POmanager.getLandingPage(); // Navigate to Self-Service Portal
  await landingPage.goTo();
  await landingPage.zipCode.fill('1234');
  // await page.screenshot({ path: 'FindPlansisDisabled1.png', fullPage: true });
  await landingPage.FindPlansisDisabled();

})

test('Clicking Find Plans Button', async ({ browser, page }) => {

  const POmanager = new POManager(page);
  const landingPage = POmanager.getLandingPage(); // Navigate to Self-Service Portal
  await landingPage.goTo();
  await landingPage.SearchbyZip('01772');
  await page.screenshot({ path: 'Plans.png', fullPage: true });
  await expect(landingPage.Plan).toBeVisible();

})

test('Validating FIND Plans API', async () => {

  const apiContext = await request.newContext();
  const response = await apiContext.get('https://ehprd-api.eternalhealth.com/api/enrollment/lookups/GetPlansStatusByZip?businessId=110&zipCode=01772&planYear=2026');
  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json();
  console.log(responseBody);


})

test('Dont know your ZIP code Functionality', async ({ browser, page }) => {

  const POmanager = new POManager(page);
  const landingPage = POmanager.getLandingPage(); // Navigate to Self-Service Portal
  await landingPage.goTo();
  await landingPage.ClickLink();
  await page.getByRole('textbox', { name: 'Enter Your Street Address' }).click();
  await page.getByRole('textbox', { name: 'Enter Your Street Address' }).fill('01772');
  await page.getByText('Southborough, MA, USA').click();
  await page.waitForTimeout(1000);
  await page.locator('#acceptBtn').click();
  await page.getByRole('button', { name: 'Find Plans' }).click();

})



test('Visual Testing', async ({ browser, page }) => {

  const POmanager = new POManager(page);
  const landingPage = POmanager.getLandingPage(); // Navigate to Self-Service Portal
  await landingPage.goTo();
  expect(await page.screenshot()).toMatchSnapshot('FindPlansisDisabled.png');
})
