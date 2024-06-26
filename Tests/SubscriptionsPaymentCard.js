// Тест Вход. Страница "Подписки". Создание счёта для оплаты Банковской картой.
require('dotenv').config();
const LOGIN = process.env.LOGIN
const PASSWORD = process.env.PASSWORD
const { Builder, By, Key, until, Button } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");

async function SubscriptionsPaymentCard() {
    let driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options().addArguments("--start-maximized"))
        .build();
    try {
        await driver.get(
            "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
        );
        await driver.findElement(By.css("#username")).sendKeys(`${LOGIN}`);
        await driver.findElement(By.css("#password")).sendKeys(`${PASSWORD}`, Key.ENTER);
        await driver.wait(until.elementLocated(By.css('#chats')));
        await driver.sleep(1000);
        await driver.findElement(By.css("#settings")).click();
        await driver.sleep(1000);
        await driver.findElement(By.css("a[href='/companies/1/settings/subscriptions']")).click();
        await driver.sleep(2000);
        await driver.findElement(By.css('.GlobalButton.orange.regular')).click();
        await driver.sleep(1000);
        await driver.findElement(By.css('.subscriptionsInvoicePay__bottom ')).click();
        await driver.sleep(1000);
        const textAreaElements = await driver.findElements(By.css('.GlobalButton.orange.regular'));
        await textAreaElements[1].click()
        await driver.sleep(2000);
        await takeScreenshot(driver, './screenshots/PaymentCard.png');
    } finally {
        await driver.quit();
    }
}
async function takeScreenshot(driver, filename) {
    await driver.takeScreenshot().then(function (data) {
        fs.writeFileSync(filename, data, 'base64');
    });
}
SubscriptionsPaymentCard();