// Тест testMenuButtons  Вход. Проход по кнопкам меню.
require('dotenv').config();
const LOGIN = process.env.LOGIN
const PASSWORD = process.env.PASSWORD
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");
async function testMenuButtons() {
  // Инициализация WebDriver
  let driver = await new Builder().forBrowser("chrome").setChromeOptions(new chrome.Options().addArguments("--start-maximized")).build();
  try {
    // Переход на целевую страницу
    await driver.get(
      "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
    );
    await driver.findElement(By.css("#username")).sendKeys(`${LOGIN}`);
    await driver.findElement(By.css("#password")).sendKeys(`${PASSWORD}`, Key.ENTER);
    await driver.wait(until.elementLocated(By.css('#chats')));
    await driver.sleep(2000);
    await takeScreenshot(driver, './screenshots/chats001.png');
    await driver.findElement(By.css('#templates')).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, './screenshots/templates001.png');
    await driver.findElement(By.css('#contacts')).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, './screenshots/contacts001.png');
    await driver.findElement(By.css('#broadcasts')).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, './screenshots/broadcasts001.png');
    await driver.findElement(By.css('#settings')).click();
    await takeScreenshot(driver, './screenshots/settings001.png');
    await driver.findElement(By.css("a[href='/companies/1/settings/members']")).click();
    await takeScreenshot(driver, './screenshots/tabShadow001.png');
    await driver.findElement(By.css("a[href='/companies/1/settings/subscriptions']")).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, './screenshots/subscriptions001.png');
    await driver.findElement(By.css("a[href='/companies/1/settings/integrations']")).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, './screenshots/integrations001.png');
    await driver.findElement(By.css("a[href='/companies/1/settings/tags']")).click();
    await takeScreenshot(driver, './screenshots/tags001.png');
    await driver.findElement(By.css("a[href='/companies/1/settings/company_settings']")).click();
    await takeScreenshot(driver, './screenshots/company_settings001.png');
    await driver.findElement(By.css("a[href='/companies/1/settings/notifications']")).click();
    await takeScreenshot(driver, './screenshots/notifications001.png');
    await driver.findElement(By.css("a[href='/companies/1/settings/profile']")).click();
    await takeScreenshot(driver, './screenshots/profile001.png');
  } finally {
    await driver.quit();
  }
}
async function takeScreenshot(driver, filename) {
  await driver.takeScreenshot().then(function (data) {
    fs.writeFileSync(filename, data, 'base64');
  });
}
testMenuButtons();