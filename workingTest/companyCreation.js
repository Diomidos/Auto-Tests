// Тест testCompanyCreation Вход. Создание новой компании.
require('dotenv').config();
const LOGIN = process.env.LOGIN
const PASSWORD = process.env.PASSWORD
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");

async function testCompanyCreation() {
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
        await driver.wait(until.elementLocated(By.css("#chats")));
        await driver.findElement(By.css(".companyDropdown__icon")).click();
        await driver.findElement(By.css(".createCompany")).click();
        await driver.sleep(1000);
        function generateRandomName() {
            const names = ["Aliance", "Bobik and Kotik", "Charlie Chaplin and Alex", "David and Goliaf", "Maugli and Sherchan"];
            return names[Math.floor(Math.random() * names.length)];
        }
        function generateRandomPhoneNumber() {
            const phoneNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
            return phoneNumber.toString();
        }
        const randomName = generateRandomName();
        const randomPhoneNumber = generateRandomPhoneNumber();
        await driver.findElement(By.css(".inputContainer__input")).sendKeys(randomName);
        await driver.findElement(By.css(".PhoneInputInput")).sendKeys(randomPhoneNumber);
        await driver.sleep(1000);
        await driver.findElement(By.css(".GlobalButton.orange.regular ")).click();
        await driver.sleep(1000);
        await takeScreenshot(driver, "./screenshots/companyCreation.png");
    } finally {
        await driver.quit();
    }
}
async function takeScreenshot(driver, filename) {
    await driver.takeScreenshot().then(function (data) {
        fs.writeFileSync(filename, data, "base64");
    });
}
testCompanyCreation();
