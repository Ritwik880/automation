const { Builder, By, Key, until } = require('selenium-webdriver');

async function automateProduct() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://www.amazon.in/');

        let searchProduct = await driver.findElement(By.id('twotabsearchtextbox'))
        await searchProduct.sendKeys('Titan watch', Key.RETURN)

        await driver.wait(until.elementLocated(By.className('a-section a-spacing-base a-text-center')), 10000)

        let getFirstProduct = await driver.findElement(By.className('a-section a-spacing-base a-text-center'))

        let getFirstProductName = await getFirstProduct.getText();

        let getFirstProductPrice = await driver.findElement(By.css('span.a-price')).getText();
        let getProductXPath = await driver.findElement(By.xpath("//a[contains(@class, 'a-link-normal s-underline-text')]"))

        let getProductLink = await getProductXPath.getAttribute('href')

        console.log(`Product Name: ${getFirstProductName}`);
        console.log(`Product Price: ${getFirstProductPrice}`);
        console.log(`Product Link: ${getProductLink}`);

        await getFirstProduct.click();
        await driver.sleep(5000)

        await driver.wait(until.elementToBeClickable(By.id('add-to-cart-button')), 30000);
        let clickOnAddToCart = await driver.findElement(By.id('add-to-cart-button'));
        await clickOnAddToCart.click();

        await driver.wait(until.elementLocated(By.id('nav-cart')));
        await driver.findElement(By.id('nav-cart')).click()

        await driver.wait(until.elementLocated(By.id('sc-buy-box-ptc-button')), 5000);

        let proceedToBuy = await driver.findElement(By.id('sc-buy-box-ptc-button'));
        await proceedToBuy.click();

    }
    catch (error) {
        console.log(error);
    }
    finally {
        await driver.quit()
    }
}
automateProduct()
