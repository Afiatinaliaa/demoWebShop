const { By, until} = require("selenium-webdriver")
const assert = require("assert")

class ProductDetailPage {
    constructor(driver) {
        this.driver = driver;
        this.productName = By.css("div[class='product-grid home-page-product-grid'] div:nth-child(3) div:nth-child(1) div:nth-child(2) h2:nth-child(1) a:nth-child(1)")
        this.productImg = By.css("#main-product-img-31")
        this.productPrice = By.css(".price-value-31")
        this.productDesc = By.css("div[class='full-description'] p")
        this.addToCartButton = By.id("add-to-cart-button-31")
        this.addToCartNotif = By.xpath("//p[@class='content']")
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
        this.reviewTitleError = By.css(".field-validation-error[data-valmsg-for='AddProductReview.Title']")
        this.reviewDescError = By.css(".field-validation-error[data-valmsg-for='AddProductReview.ReviewText']")
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

    async addToCart() {
        await this.driver.findElement(this.addToCartButton).click()
    }

    async getBarNotif() {
        let notifElement = await this.driver.wait(
            until.elementLocated(this.addToCartNotif), 5000
        );
        return await notifElement.getText();
    }

    async verifyAddToCartSuccess(expectedText, message) {
        const barNotif = await this.getBarNotif();
        assert.strictEqual(barNotif.includes(expectedText), true, message)
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

    async productReviewFailed(title, desc) {
        await this.driver.findElement(this.productReviewLink).click()
        let reviewTitleInput = await this.driver.findElement(By.css(this.reviewTitleField));
        let reviewDescInput = await this.driver.findElement(By.css(this.reviewDescField));

        await this.driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", reviewDescInput);
        
        // Jika ingin mengosongkan field, tetap gunakan sendKeys("")
        await reviewTitleInput.sendKeys(title !== undefined && title !== null ? String(title) : "");
        await reviewDescInput.sendKeys(desc !== undefined && desc !== null ? String(desc) : "");

        await this.driver.findElement(this.rateStar3).click()
    
        let submitButton = await this.driver.wait(until.elementLocated(By.css(this.submitButton)), 5000);
        await submitButton.click();
    }
}


module.exports = ProductDetailPage;