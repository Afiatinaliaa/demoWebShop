const { Builder, By, Keys, until} = require("selenium-webdriver")
const assert = require("assert")
const HomePage = require("../pages/homePage")
const testData = require("../fixtures/testData.json")
const LoginPage = require("../pages/loginPage")
const ProductDetailPage = require("../pages/productDetailPage")

async function ProductDetailTest() {
    describe("Positive Test Suite - Product Detail Test", function() {
        let driver;
        let browserName = "chrome";
        let loginPage;
        let homePage;
        let productDetailPage;

        before(async function () {
            this.timeout(50000)

            driver = await new Builder().forBrowser(browserName).build();
            loginPage = new LoginPage(driver);
            homePage = new HomePage(driver);
            productDetailPage = new ProductDetailPage(driver);

            await loginPage.open(testData.baseUrl)
            await loginPage.login(testData.loginValid.email, testData.loginValid.pass);
            await homePage.open(testData.baseUrl)
        })

        it("TCD001 - Check Product Detail", async function () {
            await productDetailPage.productDetail()

            //Assertion
            await productDetailPage.verifyProductImg(testData.message.productImgError)
            await productDetailPage.verifyProductPrice(testData.message.productPriceError)
            await productDetailPage.verifyProductDesc(testData.message.productDescError)
        })

        it("TCD002 - Add To Cart via Product Detail Page Success", async function() {
            await productDetailPage.addToCart()

            //Assert
            const barNotif = await productDetailPage.getBarNotif();
            await productDetailPage.verifyAddToCartSuccess(testData.message.expectedAddToCart, testData.message.addToCartFailed)
        })

        it("TCD003 - Adding Product Review Successfully", async function () {
            this.timeout(50000)
            await productDetailPage.productReviewSuccess(testData.productReview.reviewTitle, testData.productReview.reviewDesc)

            //Assertion
            await productDetailPage.verifyReviewSubmitted(testData.message.expectedReviewSubmitted, testData.message.errorReviewSubmitted)
        })

        after(async function() {
            await driver.quit()
        })
    })

    // describe("Negative Test Suite - Product Detail Test", function() {
    //     let driver;
    //     let browserName = "chrome";
    //     let loginPage;
    //     let homePage;
    //     let productDetailPage;

    //     before(async function () {
    //         this.timeout(50000)

    //         driver = await new Builder().forBrowser(browserName).build();
    //         loginPage = new LoginPage(driver);
    //         homePage = new HomePage(driver);
    //         productDetailPage = new ProductDetailPage(driver);

    //         await loginPage.open(testData.baseUrl)
    //         await loginPage.login(testData.loginValid.email, testData.loginValid.pass);
    //         await homePage.open(testData.baseUrl)
    //         await productDetailPage.productDetail()
    //     })

    //     it("TCDN001 - Adding product review without review title", async function () {
    //         this.timeout(50000)
    //         await productDetailPage.productReviewFailed("", testData.productReview.reviewDesc)

    //         //Assertion
    //         await productDetailPage.verifyReviewSubmitted(testData.productReview.expectedTitleEmpty, testData.message.reviewTitleAvailable)
    //     })

    //     it("TCDN002 - Adding product review without review desc", async function () {
    //         this.timeout(50000)
    //         await productDetailPage.productReviewFailed(testData.productReview.reviewTitle, "")

    //         //Assertion
    //         await productDetailPage.verifyReviewSubmitted(testData.productReview.expectedDescEmpty, testData.message.reviewDescAvailable)
    //     })

    //     after(async function() {
    //         // await driver.quit()
    //     })
    // })
}

ProductDetailTest()

module.exports = ProductDetailTest;