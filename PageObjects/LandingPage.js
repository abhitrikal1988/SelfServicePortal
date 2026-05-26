class LandingPage{

    constructor(page){
        this.page= page;
        this.zipCode = page.locator('#planZip');
        this.Plan = page.locator('#H1280001000');
            }

    async goTo(){

        await this.page.goto('https://qa-selfserviceportal.nirvanahealth.com/');
        
        }

    async SearchbyZip(ZipCode){

        await this.zipCode.fill(ZipCode);
        await this.zipCode.press('Enter');
       await this.Plan.click();
        
    }

}

module.exports = {LandingPage};