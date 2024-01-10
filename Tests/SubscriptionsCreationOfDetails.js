// Тест Вход. Страница "Подписки". Создание "Реквизитов".
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");
async function SubscriptionsCreationOfDetails() {
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
        await driver.sleep(1000);
        await driver.findElement(By.css("a[href='/companies/1/settings/subscriptions']")).click();
        await driver.sleep(1000);
        await driver.findElement(By.css('#requisites')).click();
        await driver.findElement(By.css('.GlobalButton.orange.regular ')).click();
        const textAreaElements = await driver.findElements(By.css('.inputContainer__input  '));
        function generateRandomName() {
            const names = ['Johnson', 'Rondo', 'Coca', 'Stark', 'Wilson', 'D', 'Tony', 'Olives'];
            const surnames = ['and Ko', 'and Ko', 'and Ko', 'and Ko', 'and Ko', 'and Ko', 'and Ko', 'and Ko'];
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
            return `${randomName} ${randomSurname}`;
        }
        await textAreaElements[0].sendKeys(generateRandomName());
        const textAreaElements1 = await driver.findElements(By.css('.inputContainer__input '));
        function generateRandomNumber(length) {
            let result = '';
            const characters = '0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        await textAreaElements1[1].sendKeys(generateRandomNumber(12));
        await driver.findElement(By.css('.GlobalButton.orange.small ')).click();
        await driver.sleep(1000);
        await takeScreenshot(driver, './screenshots/creationOfDetails_1.png');
        await driver.sleep(1000);
        await driver.findElement(By.css('.GlobalButton.orange.small ')).click();
        await driver.sleep(1000);
        await takeScreenshot(driver, './screenshots/creationOfDetails_2.png');
    } finally {
        await driver.quit();
    }
}
async function takeScreenshot(driver, filename) {
    await driver.takeScreenshot().then(function (data) {
        fs.writeFileSync(filename, data, 'base64');
    });
}
SubscriptionsCreationOfDetails();