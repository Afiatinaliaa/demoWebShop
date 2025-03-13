const {By, until} = require("selenium-webdriver")
const assert = require("assert")

class RegistPage{
    constructor(driver){
        this.driver = driver;
        this.registMenu = By.css(".ico-register");
        this.femaleRadioBtn = By.id("gender-female");
        this.maleRadioBtn = By.id("gender-male");
        this.fnameField = By.id("FirstName");
        this.lnameField = By.id("LastName");
        this.emailField = By.id("Email");
        this.passField = By.id("Password");
        this.confirmPassField = By.id("ConfirmPassword");
        this.registerButton = By.id("register-button");
        this.continueButton = By.css("input[value='Continue']");
        this.successText = By.css("div[class='page-title'] h1")
    }

    async open (url){
        await this.driver.get(url)
    }

    async regist(fname, lname, email, pass, confirmPass){
        await this.driver.findElement(this.registMenu).click()
        await this.driver.findElement(this.maleRadioBtn).click()
        await this.driver.findElement(this.fnameField).sendKeys(fname)
        await this.driver.findElement(this.lnameField).sendKeys(lname)
        await this.driver.findElement(this.emailField).sendKeys(email)
        await this.driver.findElement(this.passField).sendKeys(pass)
        await this.driver.findElement(this.confirmPassField).sendKeys(confirmPass)
        await this.driver.findElement(this.registerButton).click()
        await this.sleep(10000);
        // await this.driver.wait(until.elementLocated(this.continueButton), 20000);
        //await this.driver.findElement(this.continueButton).click()
    }

    // async getSuccessPage() {
    //     return await this.driver.findElement(this.successText).getText();
    // }
    // async verifySuccessRegist(expectedText, message) {
    //     const successregist = await this.getSuccessPage();
    //     assert.strictEqual(successregist.includes(expectedText), true, message)
    // }

    async getSuccessPage() {
        return await this.driver.findElement(this.successText).getText();
    }
    
    async verifySuccessRegist(expectedText, message) {
        const successregist = await this.getSuccessPage();
        console.log("✅ Actual Success Message:", successregist); // Debugging
        assert.strictEqual(successregist.includes(expectedText), true, message);
    }
    

}

module.exports = RegistPage;