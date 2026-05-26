class Plans {

    Constructor(page) {
        this.page = page;
        this.Plan = page.locator('#H1280001000');
    }

    async SelectPlan() {

       
        await this.Plan.click();
    }
}

module.exports = {Plans};