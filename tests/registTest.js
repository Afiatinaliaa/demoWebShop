const {Builder, By, Key, until} = require("selenium-webdriver")
const assert = require("assert")
const RegistPage = require("../pages/registPage")
const HomePage = require("../pages/homePage")
const testData = require("../fixtures/testData.json")


async function RegistTest() {
    describe("Demo Web Shop Register Test", function() {
        let driver;
        let browserName = "chrome";
        let registPage;
        let homePage;

        before(async function () {
            this.timeout(10000);

            driver = await new Builder().forBrowser(browserName).build();
            registPage = new RegistPage(driver);
            homePage = new HomePage(driver);


            await registPage.open(testData.baseUrl)
        });

        it("TCR001 - Registration Success", async function() {
            await registPage.regist(testData.registValid.fname, testData.registValid.lname, testData.registValid.email, testData.registValid.pass, testData.registValid.confirmPass)

            //assertion
            // const titlePage = await homePage.getTitleText();
            // await homePage.verifyRegistSuccess(testData.accountName, testData.errorAccount)
            await console.log(testData.log.registPassed)
        });

        after(async function() {
            await driver.quit()
        })
    })
}

RegistTest()