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
        this.pickupRadioBtn = By.css("#PickUpInStore")
        this.continueButtonStep2 = By.xpath("//input[@onclick='Shipping.save()']")
        this.groundRadioBtn = By.id("shippingoption_0")
        this.nextDayRadioBtn = By.css("#shippingoption_1")
        this.secondAirRadioBtn = By.id("shippingoption_2")
        this.continueButtonStep3 = By.css("input[class='button-1 shipping-method-next-step-button']")
        this.poRadioBtn = By.css("#paymentmethod_3")
        this.continueButtonStep4 = By.css("input[class='button-1 payment-method-next-step-button']")
        this.poNumberField = By.id("PurchaseOrderNumber")
        this.continueButtonStep5 = By.css("input[class='button-1 payment-info-next-step-button']")
        this.continueButtonStep6 = By.css("input[value='Confirm']")
        this.successCheckout = By.css(".section.order-completed")
        this.continueButtonSuccess = By.css("input[value='Continue']")
        this.successText = By.css("div[class='title'] strong")
    }

    async open(url) {
        await this.driver.get(url)
    }

    async getTitlePage() {
        return await this.driver.findElement(this.pageTitle).getText()
    }

    async billingAddress() {
        // await this.driver.findElement(this.companyField).sendKeys("PT Big Textile");

        // const actions = this.driver.actions();
        // const countryDrop = await this.driver.findElement(this.countryDrop).click()
        // const selectCountry = await this.driver.findElement(By.xpath("//*[contains(text(), 'Canada')]"))
        // await selectCountry.click()

        // const stateDrop = await this.driver.findElement(this.stateDrop).click()
        // await this.driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Ontario')]")), 5000);
        // const selectState = await this.driver.findElement(By.xpath("//*[contains(text(), 'Ontario')]"))
        // await selectState.click()

        // await this.driver.findElement(this.cityField).sendKeys("Toronto");
        // await this.driver.findElement(this.address1Field).sendKeys("Toronto Street No. 7")
        // await this.driver.findElement(this.address2Field).sendKeys("Near Toronto Supermarket")
        // await this.driver.findElement(this.pCodeField).sendKeys("12345")
        // await this.driver.findElement(this.phoneField).sendKeys("+91 000 111")
        // await this.driver.findElement(this.faxField).sendKeys("000111222")
        await this.driver.findElement(this.continueButton).click()
    }

    async shippingAddress() {
        const continueBtn2 = await this.driver.wait(until.elementIsVisible(this.driver.findElement(this.continueButtonStep2)), 20000);
        await continueBtn2.click();
    }

    async shippingMethod() {
        // await nextdayOption.click();
        await this.driver.wait(until.elementLocated(this.nextDayRadioBtn), 20000);
        // Tunggu hingga elemen benar-benar terlihat di layar
        const nextdayOption = await this.driver.wait(
        until.elementIsVisible(this.driver.findElement(this.nextDayRadioBtn)), 
        20000);
        await nextdayOption.click();

        const continueBtn3 = await this.driver.wait(until.elementIsVisible(this.driver.findElement(this.continueButtonStep3)), 20000);
        await continueBtn3.click();
    }

    async paymentMethod() {
        // await nextdayOption.click();
        await this.driver.wait(until.elementLocated(this.poRadioBtn), 20000);
        // Tunggu hingga elemen benar-benar terlihat di layar
        const poOption = await this.driver.wait(
        until.elementIsVisible(this.driver.findElement(this.poRadioBtn)), 
        20000);
        await poOption.click();

        const continueBtn4 = await this.driver.wait(until.elementIsVisible(this.driver.findElement(this.continueButtonStep4)), 20000);
        await continueBtn4.click();
    }

    async paymentInfo() {
        await this.driver.wait(until.elementLocated(this.poNumberField), 20000);
        // Tunggu hingga elemen benar-benar terlihat di layar
        const poInput = await this.driver.wait(
        until.elementIsVisible(this.driver.findElement(this.poNumberField)), 
        20000);
        await poInput.sendKeys("000111222");
        const continueBtn5 = await this.driver.wait(until.elementIsVisible(this.driver.findElement(this.continueButtonStep5)), 20000);
        await continueBtn5.click();
    }

    async confirmOrder() {
        const continueBtn6 = await this.driver.wait(until.elementIsVisible(this.driver.findElement(this.continueButtonStep6)), 20000);
        await continueBtn6.click();
    }

    async verifySuccessCheckout(message) {
        const checkoutElement = await this.driver.findElement(this.continueButtonSuccess);
        assert.ok(await checkoutElement.isDisplayed(), true, message)
    }

    async getSuccessMessage() {
        const successMessageElement = await this.driver.wait(
            until.elementLocated(this.successText),
            5000 // timeout 5 detik
        );
        return await successMessageElement.getText();
    }
    
    async verifyCheckoutSuccess(expectedText, message){
        const successMessage = await this.getSuccessMessage();
        assert.strictEqual(successMessage.includes(expectedText), true, message)
    }
}

module.exports = CheckoutPage;