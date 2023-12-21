// Тест testEnter  Вход в ЛК
require('dotenv').config();
const LOGIN = process.env.LOGIN
const PASSWORD = process.env.PASSWORD
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");

async function testEnter() {
  // Создаем экземпляр WebDriver с полностью развёрнутым окном браузера
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().addArguments("--start-maximized"))
    .build();
  try {
    // Переходим на страницу входа
    await driver.get(
      "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
    );
    // Находим поле ввода для логина и вводим логин
    await driver.findElement(By.css("#username")).sendKeys(`${LOGIN}`);
    await driver.findElement(By.css("#password")).sendKeys(`${PASSWORD}`, Key.ENTER);
    await driver.sleep(2000);
    await driver.wait(until.elementLocated(By.css("#chats")));
    await driver.sleep(2000);
    // Ждем, пока страница загрузится
    await takeScreenshot(driver, "./screenshots/enter.png");
  } finally {
    // Закрываем браузер после выполнения
    await driver.quit();
  }
}
async function takeScreenshot(driver, filename) {
  await driver.takeScreenshot().then(function (data) {
    fs.writeFileSync(filename, data, "base64");
  });
}
testEnter();
