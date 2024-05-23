// Тест 011: Вход. Чаты. Поиск контакта. Открытие телега-чата. Отправка текстового сообщения.
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
        await driver.sleep(1000);
        await driver.findElement(By.css(".conversationChatsList__header_info__name")).click();
        await driver.sleep(1000);
        await driver.findElement(By.css(".chatField__container")).click();
        const textareaField = await driver.findElement(By.css("textarea[placeholder='Сообщение']"));
        // Кликаем по полю ввода сообщения
        await textareaField.click();
        await driver.sleep(1000);
        // Вводим текст в поле ввода сообщения
        await textareaField.sendKeys("Привет, это сообщение из авто теста!");
        await driver.findElement(By.css(".chatField__container__buttonsContainer__rightBlock_sendButton.false")).click();
        await driver.sleep(1000);
        await takeScreenshot(driver, './screenshots/chats011.png');
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