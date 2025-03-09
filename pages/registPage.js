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
        await this.driver.wait(until.elementLocated(this.continueButton), 20000);
        await this.driver.findElement(this.continueButton).click()
    }

}

module.exports = RegistPage;