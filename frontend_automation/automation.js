const { Builder, By, until } = require('selenium-webdriver');

async function automateProduct() {
    
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.manage().setTimeouts({ implicit: 30000 });
        await driver.get('https://www.amazon.in/');

        let searchProduct = await driver.findElement(By.id('twotabsearchtextbox'))
        await searchProduct.sendKeys('Campush shoe');
        await searchProduct.submit();

        await driver.wait(until.elementLocated(By.className('a-section a-spacing-base a-text-center')), 10000)

        let getFirstProduct = await driver.findElement(By.className('a-section a-spacing-base a-text-center'))

        let getFirstProductName = await getFirstProduct.getText();

        let getFirstProductPrice = await driver.findElement(By.css('span.a-price')).getText();


        let getProductXPath = await driver.findElement(By.className("a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"))

        let getProductLink = await getProductXPath.getAttribute('href')

        console.log(`Product Name: ${getFirstProductName}`);
        console.log(`Product Price: ${getFirstProductPrice}`);
        console.log(`Product Link: ${getProductLink}`);

        await driver.get('https://www.amazon.in/Campus-Mens-Black-Running-Shoe/dp/B08PSHZLN2/ref=sr_1_1?crid=2Z1IGDDL2E3ZW&dib=eyJ2IjoiMSJ9.ebKuBsHXGon9Er1Gcw2Fw6TodlaO4keS7j1_t1AZ0PEc4doaeLmbnJ2QanSdTpF98krgOKJfyIUTQsOIPmM_CRI0dUBE7fw5tpNXDfehwDS_bf36Ww8ezjeMwKyloDWwsKg68Ce6W9qbUaalWBJvaOlkV6Vh67_Nacx8SFQnxi15J0AidPk6L7eenc98uoAyukZ3U1iPZj85Qi4QNZgHxtSDRYBQnzls2t5vjiiwp8xBXGIuR5CjBkiNIfL6E32nngA7QhTpvjgF0M-DhlUWXeTwBsFypenYShuNHtKc5AY.bufzmEtpk8y3f1kZ643pZ3dPV6z_DVM9pBJ-ss6ocPw&dib_tag=se&keywords=campus+shoe&qid=1725552309&sprefix=campush+shoe%2Caps%2C250&sr=8-1');

        let clickOnAddToCart = await driver.findElement(By.xpath('//input[@id="add-to-cart-button"]'));
        await clickOnAddToCart.click();

        await driver.wait(until.elementLocated(By.xpath('//a[@id="nav-cart"]')));
        await driver.findElement(By.xpath('//a[@id="nav-cart"]')).click()

        await driver.wait(until.elementLocated(By.xpath('//span[@id="sc-buy-box-ptc-button"]')), 5000);

        let proceedToBuy = await driver.findElement(By.xpath('//span[@id="sc-buy-box-ptc-button"]'));
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
