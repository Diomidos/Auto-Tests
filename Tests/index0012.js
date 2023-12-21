// Тест Вход. Чаты. Поиск чата по номеру контакта. Клик "Принять оплату". Создание ссылки на оплату.
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
        await driver.sleep(1000);
        await driver.findElement(By.css(".conversationHeader__inputContainer__input")).sendKeys("9274479552");
        await driver.findElement(By.css(".conversation__content__description_upperBlock__arrowIcon")).click();
        // await driver.sleep(1000);
        await driver.findElement(By.css(".conversationChatsList__header_info__name")).click();
        await driver.sleep(1000);
        await driver.findElement(By.css(".GlobalButton.white.small.isImage")).click();
        await driver.sleep(1000);
        await driver.findElement(By.css('.dropdownContainer__dropdown ')).click();
        await driver.sleep(1000);
        const textAreaElements1 = await driver.findElements(By.css('.dropdownContainer__dropdown_content__item'));
        await textAreaElements1[5].click();
        await driver.findElement(By.css(".form-control.inputBill__input_phone")).sendKeys("9274479552");
        await driver.findElement(By.css(".inputContainer__input.name")).click();
        await driver.sleep(1000);
        const textAreaElements2 = await driver.findElements(By.css('.contentList_item'));
        await textAreaElements2[1].click();
        await driver.sleep(1000);
        await driver.findElement(By.css('.chatBillContainer__content_bottom')).click();
        await driver.findElement(By.css('.GlobalButton.orange.regular')).click();
        await driver.sleep(1000);
        await takeScreenshot(driver, './screenshots/invoise012.png');
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