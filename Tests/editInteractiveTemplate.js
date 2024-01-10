// Тест editInterTemplate Вход. Страница "Шаблоны". Редактирование интерактивного шаблона.
require('dotenv').config();
const LOGIN = process.env.LOGIN
const PASSWORD = process.env.PASSWORD
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");

async function editInterTemplate() {
    let driver = await new Builder().forBrowser("chrome").setChromeOptions(new chrome.Options().addArguments("--start-maximized")).build();
    try {
        await driver.get(
            "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
        );
        await driver.findElement(By.css("#username")).sendKeys(`${LOGIN}`);
        await driver.findElement(By.css("#password")).sendKeys(`${PASSWORD}`, Key.ENTER);
        await driver.wait(until.elementLocated(By.css('#chats')));
        await driver.findElement(By.css('#templates')).click();
        const buttonsElements = await driver.findElements(By.css('.templatesList__item_content'));
        for (const buttonElement of buttonsElements) {
            await buttonElement.click();
        }
        await driver.sleep(2000)
        const textAreaElements = await driver.findElements(By.css('.cardButtons_editButton'));
        await textAreaElements[0].click()
        const textAreaElements1 = await driver.findElements(By.css('.textArea__textarea'));
        await textAreaElements1[0].sendKeys(" test");
        await driver.sleep(1000);
        await driver.findElement(By.css('.GlobalButton.orange.regular ')).click();
        await driver.sleep(1000);
        await takeScreenshot(driver, './screenshots/editingInterTemplate.png');
    } finally {
        await driver.quit();
    }
}
async function takeScreenshot(driver, filename) {
    await driver.takeScreenshot().then(function (data) {
        fs.writeFileSync(filename, data, "base64");
    });
}
editInterTemplate();
