//  Тест 001: Вход/Авторизация. Скрин страницы.
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");
async function login() {
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
    await driver.findElement(By.id("username")).sendKeys("radist@radist.online");
    // Находим поле ввода для пароля и вводим пароль, затем нажимаем Enter
    await driver.findElement(By.id("password")).sendKeys("9ed1bf12-23c2-45fa-a137-4441f9671384", Key.ENTER);
    await driver.wait(until.elementLocated(By.css('#chats')));
    await driver.sleep(2000);
    // Ждем, пока страница загрузится
    await takeScreenshot(driver, './screenshots/screenshotsloginPage.png');
  } finally {
    // Закрываем браузер после выполнения
    await driver.quit();
  }
}
async function takeScreenshot(driver, filename) {
  await driver.takeScreenshot().then(function (data) {
    fs.writeFileSync(filename, data, 'base64');
  });
}
login();