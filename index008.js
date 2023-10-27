// Тест 008: Вход. Страница "Подписки". Открытие счёта на Оплату, в блоке "Счета".
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");
async function run() {
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
        await driver.findElement(By.css("a[href='/companies/1/settings/subscriptions']")).click();
        await driver.sleep(1000);
        await driver.findElement(By.css('.bills__list')).click();
        await driver.findElement(By.css('.GlobalButton.white.regular')).click();
        const handles = await driver.getAllWindowHandles();
        await driver.switchTo().window(handles[1]);
        // Установка значения "visible" для свойств overflow элементов body и documentElement
        await driver.executeScript('document.body.style.overflow = "visible";');
        await driver.executeScript('document.documentElement.style.overflow = "visible";');
        // Получение размеров страницы
        const pageWidth = await driver.executeScript('return document.body.offsetWidth');
        const pageHeight = await driver.executeScript('return document.body.scrollHeight');
        // Установка размеров окна браузера
        await driver.manage().window().setRect({ width: 1440, height: 1150 });
        await driver.findElement(By.css('.radist-invoice_container')).click();
        await driver.sleep(1000);
        await takeScreenshot(driver, './screenshots/invoice008.png');
    } finally {
        await driver.quit();
    }
}
async function takeScreenshot(driver, filename) {
    await driver.takeScreenshot().then(function (data) {
        fs.writeFileSync(filename, data, 'base64');
    });
}
run();