const { Builder, By, until } = require('selenium-webdriver');

async function automateProduct() {
    
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.manage().setTimeouts({ implicit: 30000 });
        await driver.get('https://www.amazon.in/');

        let searchProduct = await driver.findElement(By.id('twotabsearchtextbox'))

        //searching for specific product
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

        await driver.get('https://www.amazon.in/Campus-North-Plus-Running-Shoes/dp/B08PRY7ZY8/ref=sr_1_2_sspa?crid=14W68V78Y30PB&dib=eyJ2IjoiMSJ9.Lqk9sXXwyNIgnRct0FKs0fhoIptQXCkIkNzceu5JLfvEOjh7cshnPNjDHuMVmTGT6gcyDT_0ATQeffu3sxrcKTXUhH6IGqT7FgQ_nuA75D4EXQIZKO6ATPt6jkz3EeVIsScyeLSP04ApmDcPgDjVdrjUSIwDcviRCbBwbWQ51L-vhuEaOppCZ5LwmluF2FRiUKEFMQJQstt7I9Oxy8clAiv4g0pZO43DZYfmLJ0nB-YCO3KCS06yu1Zq3_kVPid-aJxPiNHx7wfbB6ww0SPKkJC1l5dsgM3bQpFPfhnK0hA.xHCchL4N2o4Td6z98AZU3R5uNN8msuMXYL7bHdjOpUc&dib_tag=se&keywords=Campus+shoe&nsdOptOutParam=true&qid=1725591026&sprefix=campus+sho%2Caps%2C249&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1');

        let clickOnAddToCart = await driver.findElement(By.xpath('//input[@id="add-to-cart-button"]'));
        await clickOnAddToCart.click();

        await driver.wait(until.elementLocated(By.xpath('//a[@id="nav-cart"]')));
        await driver.findElement(By.xpath('//a[@id="nav-cart"]')).click()

        await driver.wait(until.elementLocated(By.xpath('//span[@id="sc-buy-box-ptc-button"]')), 5000);

        //since we have to login first to navigate to the checkout page, so I have kept till this here only.
        let proceedToBuy = await driver.findElement(By.xpath('//span[@id="sc-buy-box-ptc-button"]'));
        await proceedToBuy.click();

    }
    finally {
        await driver.quit()
    }
}
automateProduct()
