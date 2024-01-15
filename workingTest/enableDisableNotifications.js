// // Тест enableDisableNotifications  Вход. Страница "Уведомления" Включение/Отключение уведомлений.
require('dotenv').config();
const LOGIN = process.env.LOGIN
const PASSWORD = process.env.PASSWORD
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");
async function ChangeCurrencies() {
    let driver = await new Builder().forBrowser("chrome").setChromeOptions(new chrome.Options().addArguments("--start-maximized")).build()
    try {
        await driver.get(
            "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6");
        await driver.findElement(By.css("#username")).sendKeys(`${LOGIN}`);
        await driver.findElement(By.css("#password")).sendKeys(`${PASSWORD}`, Key.ENTER);
        await driver.wait(until.elementLocated(By.css('#chats')));
        await driver.sleep(1000);
        await driver.findElement(By.css("#settings")).click();
        await driver.sleep(1000);
        // await driver.findElement(By.css("a[href='/companies/1/settings/company_settings']")).click();
        // await driver.sleep(1000);
        // await driver.findElement(By.css(".dropdownContainer__dropdown_placeholder.selected")).click();
        // await driver.findElement(By.css(".dropdownContainer__dropdown "));
        // await driver.sleep(1000);

        // let dropdownContainer = await driver.findElement(By.css(".dropdownContainer__dropdown_content"));
        // let dropdownItems = await dropdownContainer.findElements(By.css(".dropdownContainer__dropdown_content__item"));
        // let selectedElementIndex = -1;
        // if (fs.existsSync('selectedElement.txt')) {
        //     selectedElementIndex = parseInt(fs.readFileSync('selectedElement.txt', 'utf8'));
        // }
        // let targetIndex;
        // if (selectedElementIndex === 1) {
        //     targetIndex = 0;
        // } else {
        //     targetIndex = 1;
        // }
        // await dropdownItems[targetIndex].click();
        // fs.writeFileSync('selectedElement.txt', targetIndex.toString());

        // await driver.sleep(1000);
        // await driver.findElement(By.css(".GlobalButton.orange.regular ")).click();
        await driver.sleep(1000);
        await takeScreenshot(driver, './screenshots/changeCurrencies.png');
    } finally {
        await driver.quit();
    }
}
async function takeScreenshot(driver, filename) {
    await driver.takeScreenshot().then(function (data) {
        fs.writeFileSync(filename, data, 'base64');
    });
}
ChangeCurrencies();