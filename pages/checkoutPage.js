const { By, until} = require("selenium-webdriver")
const assert = require("assert")

class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
        this.pageTitle = By.css("div[class='page-title'] h1");
        this.fnameField = By.id("BillingNewAddress_FirstName")
        this.lnameField = By.id("BillingNewAddress_LastName")
        this.emailField = By.id("BillingNewAddress_Email")
        this.companyField = By.id("BillingNewAddress_Company")
        this.countryDrop = By.id("BillingNewAddress_CountryId")
        this.stateDrop = By.id("BillingNewAddress_StateProvinceId")
        this.cityField = By.id("BillingNewAddress_City")
        this.address1Field = By.id("BillingNewAddress_Address1")
        this.address2Field = By.id("BillingNewAddress_Address2")
        this.pCodeField = By.id("BillingNewAddress_ZipPostalCode")
        this.phoneField = By.id("BillingNewAddress_PhoneNumber")
        this.faxField = By.id("BillingNewAddress_FaxNumber")
        this.continueButton = By.css("input[onclick='Billing.save()']")
    }

    async open(url) {
        await this.driver.get(url)
    }

    async getTitlePage() {
        return await this.driver.findElement(this.pageTitle).getText()
    }

    async billingAddress() {
        await this.driver.findElement(this.companyField).sendKeys("PT Big Textile");

        const actions = this.driver.actions();
        const countryDrop = await this.driver.findElement(this.countryDrop).click()
        const selectCountry = await this.driver.findElement(By.xpath("//*[contains(text(), 'Canada')]"))
        await selectCountry.click()

        const stateDrop = await this.driver.findElement(this.stateDrop).click()
        await this.driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Ontario')]")), 5000);
        const selectState = await this.driver.findElement(By.xpath("//*[contains(text(), 'Ontario')]"))
        await selectState.click()

        await this.driver.findElement(this.cityField).sendKeys("Toronto");
        await this.driver.findElement(this.address1Field).sendKeys("Toronto Street No. 7")
        await this.driver.findElement(this.address2Field).sendKeys("Near Toronto Supermarket")
        await this.driver.findElement(this.pCodeField).sendKeys("12345")
        await this.driver.findElement(this.phoneField).sendKeys("+91 000 111")
        await this.driver.findElement(this.faxField).sendKeys("000111222")
        await this.driver.findElement(this.continueButton).click()
    }
}

module.exports = CheckoutPage;