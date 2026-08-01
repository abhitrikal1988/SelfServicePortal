import { expect } from '@playwright/test';
class LandingPage{

    constructor(page){
        this.page= page;
        this.zipCode = page.locator('#planZip');
        this.Plan = page.locator('#H1280001000');
        this.Language = page.locator('#languageSelector > option');
        this.header = page.getByText('Find a Medicare Advantage Plan', { exact: true });
        this.sub_header = page.getByText('Easily search and enroll in the plan that is right for you.', { exact: true });
        this.FindPlanButton = page.getByRole('button', { name: 'Find Plans' });
        this.ClickHere = page.locator('a.plan-find-click-here:visible');
    }

    async goTo(){

        await this.page.goto('https://qa-selfserviceportal.nirvanahealth.com/');
        
        }

    async SearchbyZip(ZipCode){

        await this.zipCode.fill(ZipCode);
        await this.zipCode.press('Enter');
        
        
    }
    async ValidateLanguage(){
        await expect(this.Language).toHaveText(['English','Spanish']);

    }

    async ValidateHHeaders(){

        await expect(this.header).toHaveText('Find a Medicare Advantage Plan');
        await expect(this.sub_header).toHaveText('Easily search and enroll in the plan that is right for you.');
    }

    async FindPlansisDisabled(){

        await expect(this.FindPlanButton).toBeDisabled();
    }
    
   async ClickLink(){
        await this.ClickHere.click();

    }



    }



module.exports = {LandingPage};