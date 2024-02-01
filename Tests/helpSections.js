// Тест testHelpSections Вход. Кнопка "Справка". Знакомство с программой.
require('dotenv').config();
const LOGIN = process.env.LOGIN
const PASSWORD = process.env.PASSWORD
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");

async function testHelpSections() {
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
    await driver.wait(until.elementLocated(By.css("#chats")));
    await driver.sleep(1000);
    await driver.findElement(By.css(".supportMenu"));
    await driver.sleep(1000);
    await driver.findElement(By.css(".referenceButton")).click();
    await driver.findElement(By.css(".helpTooltipPopup__meeting")).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, "./screenshots/helpSections_1.png");
    await driver.findElement(By.css(".firstStep__buttonsGroup_beginButton")).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, "./screenshots/helpSections_2.png");
    await driver.findElement(By.css(".onboardingPopup__stepper_arrowGroup_right")).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, "./screenshots/helpSections_3.png");
    await driver.findElement(By.css(".onboardingPopup__stepper_arrowGroup_right")).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, "./screenshots/helpSections_4.png");
    await driver.findElement(By.css(".onboardingPopup__stepper_arrowGroup_right")).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, "./screenshots/helpSections_5.png");
    await driver.findElement(By.css(".onboardingPopup__stepper_arrowGroup_right")).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, "./screenshots/helpSections_6.png");
    await driver.findElement(By.css(".onboardingPopup__stepper_arrowGroup_right")).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, "./screenshots/helpSections_7.png");
    await driver.findElement(By.css(".onboardingPopup__stepper_arrowGroup_right")).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, "./screenshots/helpSections_8.png");
  } finally {
    await driver.quit();
  }
}
async function takeScreenshot(driver, filename) {
  await driver.takeScreenshot().then(function (data) {
    fs.writeFileSync(filename, data, "base64");
  });
}
testHelpSections();
