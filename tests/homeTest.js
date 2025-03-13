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
            this.timeout(10000)

            driver = await new Builder().forBrowser(browserName).build();
            loginPage = new LoginPage(driver);
            homePage = new HomePage(driver);

            await loginPage.open(testData.baseUrl)
            await loginPage.login(testData.loginValid.email, testData.loginValid.pass);
            await homePage.open(testData.baseUrl)
        })

        // it("TCH001 - View Book Product Category List", async function() {
        //     this.timeout(10000)
        //     await homePage.viewBookCategory();
        //     await homePage.scrollToBottom();
        //     await homePage.getBookItems();

        //     //assertion
        //     await homePage.verifyBookList(testData.bookList.book1, testData.bookList.book2, testData.bookList.book3, testData.message.bookEmpty)
        //     await console.log(testData.log.allBookList)

        // })

        it("TCH002 - Add Single Product To Cart", async function() {
            this.timeout(10000)
            await homePage.addToCart();

            //assertion
            await homePage.verifyItemOnCart(testData.message.bookEmpty)
            await console.log("success add to cart")
        })
    })
}

HomeTest()

module.exports = HomeTest;