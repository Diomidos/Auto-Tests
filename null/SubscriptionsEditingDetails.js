// Тест Вход. Страница "Подписки". Редактирование "Реквизитов".
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");
async function SubscriptionsEditingDetails() {
    let driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options().addArguments("--start-maximized"))
        .build();
    try {
        await driver.get(
            "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
        );
        await driver.findElement(By.id("username")).sendKeys("radist@radist.online");
        await driver.findElement(By.id("password")).sendKeys("9ed1bf12-23c2-45fa-a137-4441f9671384", Key.ENTER);
        await driver.wait(until.elementLocated(By.css('#chats')));
        await driver.findElement(By.css("#settings")).click();
        await driver.sleep(1000);
        await driver.findElement(By.css("a[href='/companies/1/settings/subscriptions']")).click();
        await driver.sleep(1000);
        await driver.findElement(By.css('#requisites')).click();
        await driver.sleep(2000);
        await driver.findElement(By.css('.requisites__list'));

        // await textAreaElements[0].click();
        // const elementDelete = await driver.findElement(By.css(''));
        // await driver.findElement(By.css('.requisites__list_item'));
        // const textAreaElements = await driver.findElement(By.css('.approved'));
        // await textAreaElements[0].click();
        const textAreaElements1 = await driver.findElement(By.css('.GlobalButton.white.regular '));
        await textAreaElements1[0].click();

        await driver.sleep(1000);
        await takeScreenshot(driver, './screenshots/creationOfDetails_2.png');
        // await driver.sleep(1000);
        // await driver.findElement(By.css('.GlobalButton.orange.small ')).click();
    } finally {
        await driver.quit();
    }
}
async function takeScreenshot(driver, filename) {
    await driver.takeScreenshot().then(function (data) {
        fs.writeFileSync(filename, data, 'base64');
    });
}
SubscriptionsEditingDetails();