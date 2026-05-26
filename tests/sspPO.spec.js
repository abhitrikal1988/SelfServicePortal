import { test, expect } from '@playwright/test';

const {POManager} = require('../PageObjects/POManager');
// test.describe.configure({mode: "parallel"});  // to execute the tests in same file in parallel mode
test.only('SSP Enrollment', async ({ browser, page }) => {

  const POmanager = new POManager(page);
  const landingPage = POmanager.getLandingPage(); // Navigate to Self-Service Portal
  await landingPage.goTo();
  await landingPage.SearchbyZip('01772');  //Provide the Zip Code for plan Selection
  
  //const plans = new Plans(page);
  //await plans.SelectPlan(); // Select the Plan

  // Navigate to Personal Information page
  const next = page.getByText('Next', { exact: true })
  await next.scrollIntoViewIfNeeded();
  await next.click();

  const PI = POmanager.getPersonalInfo();
  await PI.fillPersonalInfo("8U15TX2DX01", "Abhishek", "Agarwal"); // Fill the Perosanal Information
  await PI.fillAddress('01772 main road', 'Southborough') // Fill the Address
  // Scroll to Mobile Number field.
  const mobile = page.locator('#mobilenumber-field');
  await mobile.scrollIntoViewIfNeeded();

  await PI.fillContactInfo('8800729993', 'abhi.trikal@hotmail.com'); // Fill Mobile Number and Email Address

  // Navigate to Other Information Page
  await next.click();
  const OtherInfo = POmanager.getOtherInformation();
  await OtherInfo.fillOtherInformation(); // Fill the fields on Other Information Page.
  
   // Scroll to bottom of page and click on next button.
  const next2 = page.getByText('Next', { exact: true })
  await next2.scrollIntoViewIfNeeded();
  await next2.click();

   // Select the Eligibility option " I am new to Medicare"

  const Election = POmanager.getEligibility();
  await Election.SelectSEP();
  // Scroll down to bottom of page and click on next button.
  const next3 = page.getByText('Next', { exact: true });
  await next3.scrollIntoViewIfNeeded();
  await next3.click();

  // Scroll down to Submit button and click on it.

  const Submit = page.getByText('Submit', { exact: true });
  await Submit.scrollIntoViewIfNeeded();
  await Submit.click();

  // Extract the Transaction Number and display in console

  const transactionNumber = await page.locator('#lblConfirmationNumber').innerText();
  console.log(transactionNumber);






















});