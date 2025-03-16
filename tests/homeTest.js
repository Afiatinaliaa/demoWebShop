const { Builder, By, Keys, until} = require("selenium-webdriver")
const assert = require("assert")
//const LoginTest = require("../tests/loginTest")
const HomePage = require("../pages/homePage")
const testData = require("../fixtures/testData.json")
const LoginPage = require("../pages/loginPage")

async function HomeTest() {
    describe("Home Page Test", function() {
        let driver;
        let browserName = "chrome";
        let loginPage;
        let homePage;

        beforeEach(async function () {
            this.timeout(20000)

            driver = await new Builder().forBrowser(browserName).build();
            loginPage = new LoginPage(driver);
            homePage = new HomePage(driver);

            await loginPage.open(testData.baseUrl)
            await loginPage.login(testData.loginValid.email, testData.loginValid.pass);
            await homePage.open(testData.baseUrl)
        })

        it("TCH001 - Add Single Product To Cart", async function() {
            this.timeout(10000)
            await homePage.addToCart();

            //assertion
            await homePage.verifyItemOnCart(testData.message.bookEmpty)
            await console.log("success add to cart")
        })

        it("TCH002 - Search Product Success", async function () {
            await homePage.searchProduct(testData.productList.productValid);

            //Assertion
            await homePage.verifyResultVisible(testData.message.searchFailed)
        })

        it("TCH003 - Search Product Failed", async function () {
            await homePage.searchProduct(testData.productList.productInvalid);

            //Assertion
            const errorText = await homePage.getSearchError();
            await homePage.verifySearchError(testData.message.expectedSearchError, testData.message.searchSuccess)
        })

        afterEach(async function() {
            await driver.quit()
        })
    })
}

HomeTest()

module.exports = HomeTest;