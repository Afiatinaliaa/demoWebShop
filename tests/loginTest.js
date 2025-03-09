const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../pages/loginPage")
const HomePage = require("../pages/homePage")
const testData = require("../fixtures/testData.json")
const fs = require("fs")
const path = require("path");

async function LoginTest() {
    describe("Demo Web Shop Login Test", function () {
        let driver;
        let browserName = "chrome";
        let loginPage;
        let homePage;

        beforeEach(async function () {
            this.timeout(30000); 

            driver = await new Builder().forBrowser(browserName).build();
            loginPage = new LoginPage(driver);
            homePage = new HomePage(driver);

            await loginPage.open(testData.baseUrl);
        });

        it("TCL001-Login Success", async function () {
            await loginPage.login(testData.loginValid.email, testData.loginValid.pass);
            //Assertion
            await homePage.verifyLogoDisplayed(testData.message.logoDisappear);
            await homePage.verifyLogoutButton(testData.message.logoutButtonDisappear)
            await console.log(testData.log.loginPassed);
        });

        it("TCL002-Login Failed", async function () {
            await loginPage.login(testData.loginInvalid.email, testData.loginInvalid.pass);
            //Assertion
            const errorMessage = await loginPage.getErrorMessage();
            await loginPage.verifyLoginFailed(testData.message.expectedLoginError, testData.message.loginSuccess);
            await console.log(testData.log.loginFailed);
        });

        afterEach(async function () {
            const screenshotDir = path.join(__dirname, "../screenshots");
            if (!fs.existsSync(screenshotDir)) {
                fs.mkdirSync(screenshotDir);
            }
            const image = await driver.takeScreenshot();
            fs.writeFileSync(
                path.join(
                    screenshotDir,
                    `${this.test.title
                        .replace(/\s+/g, "_")
                        .replace(/[^a-zA-Z0-9_]/g, "")}.png`
                    ),
                    image,
                    "base64"
                );
            await driver.quit();
        });
    });
}

LoginTest()

module.exports = LoginTest;
