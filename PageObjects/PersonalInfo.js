class PersonalInfo{

    constructor(page){
        this.page=page;

        this.MedicareNumber = page.locator('#txtmedicareId');
        this.FirstName = page.locator('#firstName');
        this.LastName = page.locator("input[name='lastName']");
        this.DateofBirth = page.locator('[name="dob"]');
        this.Male = page.locator('#rdoMale');
        this.Female = page.locator('#rdoFemale');
        this.PhoneNumber = page.locator('#phonenumber-field');
        this.PhoneType = page.locator('#phoneType-field');
        this.Email = page.locator('#emailAddrs');
        this.county = page.locator('#county');

        this.AddressLine1 = page.locator("input[name='addressLine1']");
        this.City = page.locator('#city:visible');
        this.State = page.locator('#ddlState');
    }

    async fillPersonalInfo(MBI,FirstName,LastName){
        await this.page.waitForLoadState('networkidle');

        await this.MedicareNumber.fill(MBI);
        await this.FirstName.fill(FirstName);
        await this.LastName.fill(LastName);
        await this.Female.scrollIntoViewIfNeeded();
        await this.DateofBirth.click();
        await this.DateofBirth.pressSequentially('14021988', { delay: 100 });
        await this.DateofBirth.Blur;
        await this.Female.check();
        await this.county.scrollIntoViewIfNeeded;
    }

    async fillAddress(Line1,city){

        await this.AddressLine1.fill(Line1);
        await this.City.fill(city);
        await this.State.selectOption({ label: 'Massachusetts' });
    }

    async fillContactInfo(Phone,Email){

        await this.PhoneNumber.fill(Phone)
        await this.PhoneType.selectOption({ label: 'Home' });
        await this.Email.fill(Email);
    }

}

module.exports={PersonalInfo};