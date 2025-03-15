const { By, until } = require("selenium-webdriver")
const assert = require("assert")

class CartPage{
    constructor(driver) {
        this.driver = driver;
        this.productCheckbox = By.css(".remove-from-cart")
        this.countryDropdown = By.id("CountryId")
        this.stateDropdown = By.id("StateProvinceId")
        this.zipField = By.id("ZipPostalCode")
        this.tncCheckbox = By.id("termsofservice")
        this.checkoutButton = By.id("checkout")
    }

    async open(url) {
        await this.driver.get(url)
    }

    async continueCheckout() {
        await this.driver.findElement(this.productCheckbox).click()

        const actions = this.driver.actions();
        const countryDrop = await this.driver.findElement(this.countryDropdown).click()
        const countryOption = await this.driver.findElement(By.xpath("//*[contains(text(), 'Canada')]"));
        await countryOption.click();

        const stateDrop = await this.driver.findElement(this.stateDropdown).click()
        await this.driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Ontario')]")), 5000);
        const stateOption = await this.driver.findElement(By.xpath("//*[contains(text(), 'Ontario')]"));
        await stateOption.click();

        await this.driver.findElement(this.tncCheckbox).click()
        await this.driver.findElement(this.checkoutButton).click()

    }
}

module.exports = CartPage;