const { Builder, By, Key, until} = require("selenium-webdriver")
const assert = require("assert")
const LoginPage = require("../pages/loginPage")
const CartPage = require("../pages/cartPage")
const CheckoutPage = require("../pages/checkoutPage")
const testData = require("../fixtures/testData.json")

async function checkout() {
    describe("Checkout Test", function() {
        let driver;
        let browserName = "chrome";
        let loginPage;
        let cartPage;
        let checkoutPage;

        beforeEach(async function() {
            this.timeout(20000)

            driver = await new Builder().forBrowser(browserName).build();
            loginPage = new LoginPage(driver);
            cartPage = new CartPage(driver);
            checkoutPage = new CheckoutPage(driver)

            await loginPage.open(testData.baseUrl)
            await loginPage.login(testData.loginValid.email, testData.loginValid.pass);

            await cartPage.open(testData.cartUrl)
            await cartPage.continueCheckout()

            await checkoutPage.open(testData.checkoutUrl)
        })

        it("TCC - Success input Billing Adress", async function() {
            await checkoutPage.billingAddress()

            //Assertion
        })
    })
}

checkout();
