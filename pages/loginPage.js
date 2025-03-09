const {By} = require("selenium-webdriver")
const assert = require("assert")

class LoginPage{
    constructor(driver){
        this.driver = driver;
        this.loginMenu = By.css(".ico-login");
        this.emailField = By.id("Email");
        this.passwordField = By.id("Password");
        this.loginButton = By.css("input[value='Log in']");
        this.errorMessage = By.css(".validation-summary-errors");
    }

    async open(url) {
        await this.driver.get(url)
    }

    async login(email, pass){
        await this.driver.findElement(this.loginMenu).click()
        await this.driver.findElement(this.emailField).sendKeys(email)
        await this.driver.findElement(this.passwordField).sendKeys(pass)
        await this.driver.findElement(this.loginButton).click()
    }

    async getErrorMessage() {
        return await this.driver.findElement(this.errorMessage).getText();
    }

    async verifyLoginFailed(expectedText, message){
        const errorMessage = await this.getErrorMessage();
        assert.strictEqual(errorMessage.includes(expectedText), true, message)
    }
}

module.exports = LoginPage;