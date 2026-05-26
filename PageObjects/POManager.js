const { LandingPage } = require('./LandingPage.js');
const { Plans } = require('./Plans.js');
const { PersonalInfo } = require('./PersonalInfo.js');
const {OtherInformation} = require('./OtherInformation.js');
const {Eligibility} = require('./Eligibility.js');

class POManager {

    constructor (page){
        this.page = page;
        this.LandingPage = new LandingPage(this.page);
        this.Plans = new Plans(this.page);
        this.PersonalInfo = new PersonalInfo(this.page);
        this.OtherInformation = new OtherInformation(this.page);
        this.Eligibility = new Eligibility(this.page);
    }

    getLandingPage(){

        return this.LandingPage;
    }

    getPlans(){
        return this.Plans;
    }

    getPersonalInfo(){
        return this.PersonalInfo
    }

    getOtherInformation(){
        return this.OtherInformation;
    }

    getEligibility(){
        return this.Eligibility;
    }
}

module.exports = {POManager};