import { test, expect } from '@playwright/test';

test('SSP Enrollment', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();
  // Navigate to Self-Service Portal
  await page.goto('https://qa-selfserviceportal.nirvanahealth.com/');
  //Provide the Zip Code for plan Selection
  await page.locator('#planZip').fill('01772');
  await page.locator('#planZip').press('Enter');
  // Select the Plan
  await page.locator('#H1280001000').click();
  // Navigate to Personal Information page
  const next = page.getByText('Next', { exact: true })
  await next.scrollIntoViewIfNeeded();
  await next.click();
  // Fill the Perosanal Information
  await page.locator('#txtmedicareId').fill('8U15TX2DX01');
  await page.locator('#firstName').fill('Abhishek');
  const gender = page.locator('#rdoMale');
  await gender.scrollIntoViewIfNeeded();
  await page.locator("input[name='lastName']").fill('Agarwal');
  await page.locator('[name="dob"]').click();
  await page.locator('[name="dob"]').pressSequentially('14021988', { delay: 100 });
  await page.locator('[name="dob"]').blur();
  await gender.check();
  // Scroll down to Contact Information

  const county = page.locator('#county');
  await county.scrollIntoViewIfNeeded();
  // Fill the Contact Information
  await page.locator("input[name='addressLine1']").fill('01772 main road');
  await page.locator('#city:visible').fill('Southborough');
  await page.locator('#ddlState').selectOption({ label: 'Massachusetts' });
  // Scroll to Mobile Number field.
  const mobile = page.locator('#mobilenumber-field');
  await mobile.scrollIntoViewIfNeeded();
  // Fill Mobile Number and Email Address
  await page.locator('#phonenumber-field').fill('8800729993');
  await page.locator('#phoneType-field').selectOption({ label: 'Home' });
  await page.locator('#emailAddrs').fill('abhi.trikal@hotmail.com');
  // Navigate to Other Information Page
  await next.click();
  // Check the 
  await page.locator('#rdopdg2').check();
  await page.locator('#rdopva2').check();
  // Scroll down to select signature
  const signature = page.locator('#txtsignature');
  await signature.scrollIntoViewIfNeeded();
  await page.locator('#signatureVerified').check();
  await signature.fill('Abhishek Agarwal');
  // Select the value of Effective Date
  await page.locator('#ddlEffDate').selectOption({ label: '06/01/2026' });
  //Scroll down to Find a PCP button
  const pcpbutton = page.locator('#pcpSearchLink');
  await pcpbutton.scrollIntoViewIfNeeded();
  await pcpbutton.click();
  // Fill the search criteria on PCP search pop-up
  const popupPage = page.frameLocator('iframe.pcp-iframe.border-0');
  await popupPage.locator('#txtpfName').fill('John');
  await popupPage.locator('#txtpfName').press('Enter');
  // Select the PCP
  await popupPage.locator("[id^='btn_P0024348-191862']").click();
  // Control comes back to Parent Window
  //Click the yes option for existing member of this pcp
  await page.locator("//label[@for='rdoppSeeing1']").check();
  //Scroll to PPO option and select the Direct bill
  const ppo = page.locator('#rdoGetABill');
  await ppo.scrollIntoViewIfNeeded();
  await ppo.check();
  // Scroll to bottom of page and click on next button.
  const next2 = page.getByText('Next', { exact: true })
  await next2.scrollIntoViewIfNeeded();
  await next2.click();
  // Select the Eligibility option " I am new to Medicare"
  await page.locator('#SEP_NEW').check();
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