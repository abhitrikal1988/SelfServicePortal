import { test, expect } from '@playwright/test';

const {POManager} = require('../PageObjects/POManager');
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

test('SSP Landing Page Find Plans Button', async ({ browser, page }) => {

  const POmanager = new POManager(page);
  const landingPage = POmanager.getLandingPage(); // Navigate to Self-Service Portal
  await landingPage.goTo();
  await landingPage.FindPlansisDisabled();
})
