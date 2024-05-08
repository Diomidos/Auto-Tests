const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");
require('dotenv').config();
const LOGIN = process.env.LOGIN
const PASSWORD = process.env.PASSWORD

// Тест 1 Вход. Страница "Настройки компании". Изменение названия компании.
async function ChangeOfCompanyName(driver) {
    await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
    const handles = await driver.getAllWindowHandles();
    await driver.switchTo().window(handles[handles.length - 1]);
    // Логика теста ChangeOfCompanyName
    await driver.get(
        "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
    );
    await driver.findElement(By.css("#username")).sendKeys(`${LOGIN}`);
    await driver.findElement(By.css("#password")).sendKeys(`${PASSWORD}`, Key.ENTER);
    await driver.wait(until.elementLocated(By.css('#chats')));
    await driver.sleep(1000);
    await driver.findElement(By.css("#settings")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css("a[href='/companies/1/settings/company_settings']")).click();
    await driver.sleep(1000)
    await driver.findElement(By.css(".inputContainer"));
    await driver.findElement(By.css(".inputContainer__wrapper"));
    function generateRandomName(names) {
        const randomIndex = Math.floor(Math.random() * names.length);
        return names[randomIndex];
    }
    const names = ['Apple', 'Banana', 'Cherry', 'Dubai', 'Ozone', 'Umbrella', 'New York', 'London', 'Tokyo', 'Android'];
    const randomName = generateRandomName(names);
    const inputElement = await driver.findElement(By.css('.inputContainer__input'));
    await inputElement.clear();
    await inputElement.sendKeys(randomName);
    await driver.findElement(By.css('.GlobalButton.orange.regular ')).click();

    async function takeScreenshot(driver, filename) {
        await driver.takeScreenshot().then(function (data) {
            fs.writeFileSync(filename, data, 'base64');
        });
    }
    // Закрыть текущую вкладку
    await driver.close();
    await driver.switchTo().window(handles[handles.length - 2]);
}

// Тест 2 ChangeCurrencies  Вход. Страница "Настройки компании". Смена валюты.
async function ChangeCurrencies(driver) {
    await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
    const handles = await driver.getAllWindowHandles();
    await driver.switchTo().window(handles[handles.length - 1]);
    // Логика теста ChangeCurrencies
    await driver.get(
        "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
    );
    await driver.wait(until.elementLocated(By.css('#chats')));
    await driver.sleep(1000);
    await driver.findElement(By.css("#settings")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css("a[href='/companies/1/settings/company_settings']")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".dropdownContainer__dropdown_placeholder.selected")).click();
    await driver.findElement(By.css(".dropdownContainer__dropdown "));
    await driver.sleep(1000);
    let dropdownContainer = await driver.findElement(By.css(".dropdownContainer__dropdown_content"));
    let dropdownItems = await dropdownContainer.findElements(By.css(".dropdownContainer__dropdown_content__item"));
    let selectedElementIndex = -1;
    if (fs.existsSync('selectedElement.txt')) {
        selectedElementIndex = parseInt(fs.readFileSync('selectedElement.txt', 'utf8'));
    }
    let targetIndex;
    if (selectedElementIndex === 1) {
        targetIndex = 0;
    } else {
        targetIndex = 1;
    }
    await dropdownItems[targetIndex].click();
    fs.writeFileSync('selectedElement.txt', targetIndex.toString());
    await driver.sleep(1000);
    await driver.findElement(By.css(".GlobalButton.orange.regular ")).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, './screenshots/changeCurrencies.png');

    async function takeScreenshot(driver, filename) {
        await driver.takeScreenshot().then(function (data) {
            fs.writeFileSync(filename, data, 'base64');
        });
    }
    // Закрыть текущую вкладку
    await driver.close();
    await driver.switchTo().window(handles[handles.length - 2]);
}



async function main() {
    const options = new chrome.Options();
    // Настройки Chrome WebDriver

    const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();

    await ChangeOfCompanyName(driver);
    await ChangeCurrencies(driver);

    await driver.quit(); // Закрытие браузера после выполнения тестов
}

main();