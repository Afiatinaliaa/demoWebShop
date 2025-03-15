const { Builder, By, Key, until} = require("selenium-webdriver")
const LoginPage = require("../pages/loginPage")
const HomePage = require("../pages/homePage")
const CartPage = require("../pages/cartPage")
const CheckoutPage = require("../pages/checkoutPage")
const testData = require("../fixtures/testData.json")

async function checkout() {
    describe("Checkout Test", function() {
        let driver;
        let browserName = "chrome";
        let loginPage;
        let homePage;
        let cartPage;
        let checkoutPage;

        before(async function() {
            this.timeout(50000)

            driver = await new Builder().forBrowser(browserName).build();
            loginPage = new LoginPage(driver);
            homePage = new HomePage(driver);
            cartPage = new CartPage(driver);
            checkoutPage = new CheckoutPage(driver)

            await loginPage.open(testData.baseUrl)
            await loginPage.login(testData.loginValid.email, testData.loginValid.pass);

            await homePage.addToCart();

            await cartPage.open(testData.cartUrl)
            await cartPage.continueCheckout()

            await checkoutPage.open(testData.checkoutUrl)
        })

        it("TCC001 - Success Checkout", async function() {
            this.timeout(5000)
            await checkoutPage.billingAddress()
            await checkoutPage.shippingAddress()
            await checkoutPage.shippingMethod()
            await checkoutPage.paymentMethod()
            await checkoutPage.paymentInfo()
            await checkoutPage.confirmOrder()

            //Assertion
            const successMessage = await checkoutPage.getSuccessMessage();
            await checkoutPage.verifyCheckoutSuccess(testData.message.successCheckout, testData.message.failedCheckout);
            console.log("Success Checkout")
        })
    })
}

checkout();
