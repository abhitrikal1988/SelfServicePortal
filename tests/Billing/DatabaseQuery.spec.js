const { test, expect } = require('@playwright/test');
const { queryDatabase } = require('../../Utils/dbHelper.js');

test('VALIDATE Payment status in  database', async ({ page }) => {

   // console.log(process.env.DB_CONNECTION_STRING);
    // 2. Fetch the corresponding record from Oracle DB to validate UI state
    const PAYMENT_STATUS = await queryDatabase(
        'SELECT status FROM Billpay.Payment WHERE payment_id_nh= :payment_id',
        { payment_id: '1285848' }
    );
    console.log('Payment Status from DB:', PAYMENT_STATUS);

    // 3. Make asserting evaluations matching UI state with database state
    expect(PAYMENT_STATUS.length).toBe(1);
    expect(PAYMENT_STATUS[0].STATUS).toBe('APPLIED');

});


