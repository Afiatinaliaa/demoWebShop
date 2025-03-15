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
        this.addToCartBook1 = By.css("body > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > input:nth-child(1)");
        this.addToCartBook2 = By.css("body > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > input:nth-child(1)");
        this.addToCartSuccess = By.css("#bar-notification")
        this.cartAfterAddItem1 = By.css("li[id='topcartlink'] a[class='ico-cart']")
        this.item1 = By.css("td[class='product']")
        this.searchField = By.id("small-searchterms")
        this.searchButton = By.css("input[value='Search']")
        this.productItem = By.css(".product-item")
        this.searchError = By.css(".result")
        this.productName = By.css("div[class='product-grid home-page-product-grid'] div:nth-child(3) div:nth-child(1) div:nth-child(2) h2:nth-child(1) a:nth-child(1)")
        this.productImg = By.css("#main-product-img-31")
        this.productPrice = By.css(".price-value-31")
        this.productDesc = By.css("div[class='full-description'] p")
        this.productReviewLink = By.css("body > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > a:nth-child(3)")
        this.reviewTitleField = By.id("AddProductReview_Title")
        this.reviewDescField = By.id("AddProductReview_ReviewText")
        this.rateStar1 = By.id("addproductrating_1")
        this.rateStar2 = By.id("addproductrating_2")
        this.rateStar3 = By.id("addproductrating_3")
        this.rateStar4 = By.id("addproductrating_4")
        this.rateStar5 = By.id("addproductrating_5")
        this.submitButton = By.css("input[value='Submit review']")
        this.reviewSubmitted = By.css("div[class='result']")
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

    async addToCart(){
        await this.driver.findElement(this.bookTabs).click();
        await this.driver.findElement(this.addToCartBook1).click()
        await this.driver.findElement(this.cartAfterAddItem1).click()
    }

    async verifyItemOnCart(message) {
        const item1 = await this.driver.findElement(this.item1);
        assert.ok(await item1.isDisplayed(), true, message)
    }

    async searchProduct(productName) {
        await this.driver.findElement(this.searchField).sendKeys(productName)
        await this.driver.findElement(this.searchButton).click()
    }

    async verifyResultVisible(message) {
        const searchResult = await this.driver.findElement(this.productItem);
        const isProductDisplayed = await searchResult.isDisplayed();
        assert.strictEqual(isProductDisplayed, true, message);
    }

    async getSearchError() {
        return await this.driver.findElement(this.searchError).getText();
    }
    
    async verifySearchError(expectedText, message){
        const errorText = await this.getSearchError();
        assert.strictEqual(errorText.includes(expectedText), true, message)
    }

    async productDetail() {
        await this.driver.findElement(this.productName).click()
    }

    async verifyProductImg(message) {
        const imgElement = await this.driver.findElement(this.productImg);
        const isImgDisplayed = await imgElement.isDisplayed();
        assert.strictEqual(isImgDisplayed, true, message);
    }

    async verifyProductPrice(message) {
        const priceElement = await this.driver.findElement(this.productPrice);
        const isPriceDisplayed = await priceElement.isDisplayed();
        assert.strictEqual(isPriceDisplayed, true, message);
    }

    async verifyProductDesc(message) {
        const descElement = await this.driver.findElement(this.productDesc);
        const isDescDisplayed = await descElement.isDisplayed();
        assert.strictEqual(isDescDisplayed, true, message);
    }

    async productReviewSuccess(reviewTitle, reviewDesc) {
        await this.driver.findElement(this.productReviewLink).click()
        await this.driver.findElement(this.reviewTitleField).sendKeys(reviewTitle)
        await this.driver.findElement(this.reviewDescField).sendKeys(reviewDesc)
        await this.driver.findElement(this.rateStar3).click()
        await this.driver.findElement(this.submitButton).click()
    }

    async getSuccessSubmit() {
        return await this.driver.findElement(this.reviewSubmitted).getText();
    }

    async verifyReviewSubmitted(expectedText, message) {
        const titleText = await this.getSuccessSubmit();
        assert.strictEqual(titleText.includes(expectedText), true, message)
    }
}

module.exports = HomePage;

