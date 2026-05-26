class Eligibility{

    constructor(page){

        this.page=page;
        this.SEP= page.locator('#SEP_NEW');
    }

    async SelectSEP(){
        await this.SEP.check();
    }
}
module.exports = {Eligibility};