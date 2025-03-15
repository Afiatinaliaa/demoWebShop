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
            this.timeout(20000);

            driver = await new Builder().forBrowser(browserName).build();
            registPage = new RegistPage(driver);
            homePage = new HomePage(driver);


            await registPage.open(testData.baseUrl)
        });

        it("TCR001 - Registration Success", async function() {
            await registPage.regist(testData.registValid.fname, testData.registValid.lname, testData.registValid.email, testData.registValid.pass, testData.registValid.confirmPass)
            this.timeout(30000)

            //assertion
            const registSuccess = await registPage.getSuccessPage();
            await registPage.verifySuccessRegist(testData.message.successRegist, testData.message.failedRegist)
            await console.log(testData.log.registPassed)
        });

        after(async function() {
            await driver.quit()
        })
    })
}

RegistTest()