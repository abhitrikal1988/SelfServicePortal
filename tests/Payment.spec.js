const { expect } = require('@playwright/test');
const { customtest } = require('../Utils/fixtures.js');



customtest('Search by Payment ID on Payment Search screen', async ({Enrollment2page}) => {
   
    await Enrollment2page.getByRole('link', { name: ' Payments' }).click();
    await Enrollment2page.getByRole('link', { name: 'Payment Search' }).click();
    await Enrollment2page.getByRole('textbox', { name: 'Enter Payment ID' }).click();
    await Enrollment2page.getByRole('textbox', { name: 'Enter Payment ID' }).fill('1284357');
    await Enrollment2page.getByRole('button', { name: 'Search' }).click();
    await expect(Enrollment2page.locator('tbody')).toContainText('1284357');
    await Enrollment2page.getByRole('button', { name: 'Reset' }).click();
    await Enrollment2page.getByRole('textbox', { name: 'Enter Member ID' }).click();
    await Enrollment2page.getByRole('textbox', { name: 'Enter Member ID' }).fill('T9808054251');
    await Enrollment2page.getByRole('button', { name: 'Search' }).click();
    await expect(Enrollment2page.getByRole('gridcell', { name: 'T9808054251' }).first()).toBeVisible();
    await Enrollment2page.getByRole('button', { name: 'Reset' }).click();
    await Enrollment2page.getByRole('textbox', { name: 'Transaction Number/ID' }).click();
    await Enrollment2page.getByRole('textbox', { name: 'Transaction Number/ID' }).fill('nH1269750');
    await Enrollment2page.getByRole('button', { name: 'Search' }).click();
    await Enrollment2page.getByRole('button', { name: 'Reset' }).click();
    await Enrollment2page.getByRole('textbox', { name: 'MBI' }).click();
    await Enrollment2page.getByRole('textbox', { name: 'MBI' }).fill('3E02TE3RH00');
    await Enrollment2page.getByRole('button', { name: 'Search' }).click();
  
   
  



});
