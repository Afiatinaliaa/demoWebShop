const { Builder, By, Keys, until} = require("selenium-webdriver")
const assert = require("assert")
const HomePage = require("../pages/homePage")
const testData = require("../fixtures/testData.json")
const LoginPage = require("../pages/loginPage")
const CartPage = require("../pages/cartPage")

async function CartTest() {
    describe("Home Page Test", function() {
        let driver;
        let browserName = "chrome";
        let loginPage;
        let homePage;
        let cartPage;

        beforeEach(async function () {
            this.timeout(20000)

            driver = await new Builder().forBrowser(browserName).build();
            loginPage = new LoginPage(driver);
            homePage = new HomePage(driver);
            cartPage = new CartPage(driver);

            await loginPage.open(testData.baseUrl)
            await loginPage.login(testData.loginValid.email, testData.loginValid.pass);
            await homePage.addToCart();

            await cartPage.open(testData.cartUrl)
            
        })

        it("TCH002 - Continue Checkout", async function() {
            this.timeout(20000)
            await cartPage.continueCheckout()

            //assertion
            // await homePage.verifyItemOnCart(testData.message.bookEmpty)
            // await console.log("success add to cart")
        })
    })
}

CartTest()

module.exports = CartTest;