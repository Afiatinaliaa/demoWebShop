const {By, until} = require("selenium-webdriver")
const assert = require("assert")

class HomePage{
    constructor(driver){
        this.driver = driver;
        this.account = By.css("img[alt='Tricentis Demo Web Shop']");
        this.emailField = By.id("Email");
        this.passwordField = By.id("Password");
        this.loginButton = By.css("input[value='Log in']");
        this.logo = By.css("img[alt='Tricentis Demo Web Shop']");
        this.logoutButton = By.css(".ico-logout");
        this.bookTabs = By.xpath("//ul[@class='top-menu']//a[normalize-space()='Books']");
        this.bookItems = By.css(".product-grid");
        // this.bookItem1 = By.css("body > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1)")
        // this.bookItem2 = By.css("body > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div:nth-child(3) > div:nth-child(1)")
    }

    async open(url) {
        await this.driver.get(url)
    }

    async getTitleText() {
        return await this.driver.findElement(this.account).getText();
    }

    async verifyRegistSuccess(expectedText, message) {
        const titlePage = await this.getTitleText();
        assert.strictEqual(titlePage.includes(expectedText), true, message)
    }

    async verifyLogoDisplayed(message) {
        const logoElement = await this.driver.findElement(this.logo);
        const isLogoDisplayed = await logoElement.isDisplayed();
        assert.strictEqual(isLogoDisplayed, true, message);
    }

    async verifyLogoutButton(message) {
        const logoutElement = await this.driver.findElement(this.logoutButton);
        assert.ok(await logoutElement.isDisplayed(), true, message)
    }

    async viewBookCategory() {
        await this.driver.findElement(this.bookTabs).click();
    }

    async scrollToBottom() {
        await this.driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
        await this.driver.wait(until.elementLocated(this.bookItems), 5000);
    }
    

    async getBookItems(){
        const bookElements = await this.driver.findElements(this.bookItems);

        const bookTexts = await Promise.all(
            bookElements.map(async (book) => await book.getText())
        );

        return bookTexts;
    }

    async verifyBookList(expectedText, message) {
        const bookList = await this.getBookItems();
        console.log("Book List:", bookList);  // Debugging
        console.log("Expected Text:", expectedText);
        assert.strictEqual(bookList.includes(expectedText), true, message)
    }
}

module.exports = HomePage;

