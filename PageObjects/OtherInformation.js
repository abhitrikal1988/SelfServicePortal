class OtherInformation{

    constructor(page){

        this.page=page;
        this.PrescriptionDrug= page.locator('#rdopdg2');
        this.tricare =page.locator('#rdopva2');
        this.signature=page.locator('#txtsignature');
        this.signatureVerified=page.locator('#signatureVerified');
        this.effectiveDate= page.locator('#ddlEffDate');
        this.pcpbutton = page.locator('#pcpSearchLink');
        this.popupPage = page.frameLocator('iframe.pcp-iframe.border-0');
        this.existingPCP = page.locator("//label[@for='rdoppSeeing1']");
        this.PPO= page.locator('#rdoGetABill');

    }

    async fillOtherInformation(){

        await this.PrescriptionDrug.check();
        await this.tricare.check();
        await this.signature.scrollIntoViewIfNeeded();
        await this.signatureVerified.check();
        await this.signature.fill('Abhishek Agarwal');
        await this.effectiveDate.selectOption({ label: '06/01/2026' });
        await this.pcpbutton.scrollIntoViewIfNeeded();
        await this.pcpbutton.click();
        await this.popupPage.locator('#txtpfName').fill('John');
        await this.popupPage.locator('#txtpfName').press('Enter');
        await this.popupPage.locator("[id^='btn_P0024348-191862']").click();
        await this.existingPCP.check();
        await this.PPO.scrollIntoViewIfNeeded();
        await this.PPO.check();

    }


}

module.exports ={OtherInformation};