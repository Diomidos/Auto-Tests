const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");
require('dotenv').config();
const LOGIN = process.env.LOGIN
const PASSWORD = process.env.PASSWORD

// Тест 1 ChangingTheInterfaceLanguage Вход. Страница "Профиль". Смена языка интерфейса: Англ., Русский, Исп..
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
    await driver.findElement(By.css("a[href='/companies/1/settings/profile']")).click();
    selectNextLanguage(driver);
    await driver.sleep(1000);
    await driver.findElement(By.css('.buttonSave.active'));
    await driver.sleep(1000);
    let textAreaElements = await driver.findElements(By.css('.GlobalButton.orange.regular'));
    await textAreaElements[1].click();
    await driver.sleep(1000);
    await takeScreenshot(driver, './screenshots/ChangingTheInterfaceLanguage.png');

    async function selectNextLanguage(driver) {
        const arrowButton = await driver.findElement(By.css('.uiSelect__arrow'));
        await arrowButton.click();
        const selectedLanguageIsActive = await driver.findElement(By.css('.uiSelected__text.active'));
        const selectedLanguageId = await selectedLanguageIsActive.getAttribute('id');
        let nextLanguageId;
        if (selectedLanguageId === 'ru' && selectedLanguageIsActive) {
            nextLanguageId = 'en';
        } else if (selectedLanguageId === 'en' && selectedLanguageIsActive) {
            nextLanguageId = 'es';
        } else if (selectedLanguageId === 'es' && selectedLanguageIsActive) {
            nextLanguageId = 'ru';
        } else {
            nextLanguageId = selectedLanguageId;
        }
        const languageOption = await driver.findElement(By.css(`[id="${nextLanguageId}"]`));
        await languageOption.click();
    }

    async function takeScreenshot(driver, filename) {
        await driver.takeScreenshot().then(function (data) {
            fs.writeFileSync(filename, data, 'base64');
        });
    }
    // Закрыть текущую вкладку
    await driver.close();
    await driver.switchTo().window(handles[handles.length - 2]);
}

// Тест 2 PushNotificationEnableDisable Вход. Страница "Настройки компании". Включение/Отключение Push-уведомлений
async function PushNotificationEnableDisable(driver) {
    await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
    const handles = await driver.getAllWindowHandles();
    await driver.switchTo().window(handles[handles.length - 1]);
    // Логика теста PushNotificationEnableDisable
    await driver.get(
        "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
    );
    await driver.wait(until.elementLocated(By.css('#chats')));
    await driver.sleep(1000);
    await driver.findElement(By.css("#settings")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css("a[href='/companies/1/settings/profile']")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css('.switcher__wrapper'));
    toggleSwitch(driver);
    async function toggleSwitch(driver) {
        const currentSwitch = await driver.findElement(By.css('.isoSwitch.switch-btn.false, .isoSwitch.switch-btn.switch-on'));
        const currentSwitchClass = await currentSwitch.getAttribute('class');

        if (currentSwitchClass.includes('false')) {
            await currentSwitch.click();
        } else {
            const switchToClick = await driver.findElement(By.css('.isoSwitch.switch-btn.switch-on, .isoSwitch.switch-btn.false'));
            await switchToClick.click();
        }
    }
    await driver.sleep(1000);
    let textAreaElements = await driver.findElements(By.css('.GlobalButton.orange.regular'));
    await textAreaElements[1].click();
    await driver.sleep(1000);
    await takeScreenshot(driver, './screenshots/PushNotificationEnableDisable.png');

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
    await PushNotificationEnableDisable(driver);

    await driver.quit();
}

main();