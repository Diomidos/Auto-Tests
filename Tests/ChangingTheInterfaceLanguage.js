// Тест ChangingTheInterfaceLanguage Вход. Страница "Профиль". Смена языка интерфейса: Англ., Русский, Исп..
require('dotenv').config();
const LOGIN = process.env.LOGIN
const PASSWORD = process.env.PASSWORD
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
async function ChangingTheInterfaceLanguage() {
    let driver = await new Builder().forBrowser("chrome").setChromeOptions(new chrome.Options().addArguments("--start-maximized")).build()
    try {
        await driver.get("https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6");
        await driver.findElement(By.css("#username")).sendKeys(`${LOGIN}`);
        await driver.findElement(By.css("#password")).sendKeys(`${PASSWORD}`, Key.ENTER);
        await driver.wait(until.elementLocated(By.css('#chats')));
        await driver.sleep(1000);
        await driver.findElement(By.css("#settings")).click();
        await driver.sleep(1000);
        await driver.findElement(By.css("a[href='/companies/1/settings/profile']")).click();
        selectNextLanguage(driver);
        await driver.sleep(2000);
        await driver.findElement(By.css('.buttonSave.active'));
        await driver.sleep(2000);
        let textAreaElements = await driver.findElements(By.css('.GlobalButton_orange_regular '));
        await driver.sleep(3000);
        await textAreaElements[2].click();
        await driver.sleep(3000);
        await takeScreenshot(driver, './screenshots/ChangingTheInterfaceLanguage.jpg');
    } finally {
        await driver.quit();
    }
}
async function selectNextLanguage(driver) {
    const arrowButton = await driver.findElement(By.css('.uiSelect__arrow'));
    await arrowButton.click();
    await driver.sleep(2000);
    // const selectedLanguageIsActive = await driver.findElement(By.css('.uiSelected__text'));
    // let selectedLanguage = await selectedLanguageIsActive.getText();
    const selectedLanguageId = await selectedLanguageIsActive.getAttribute('id');
    // let nextLanguageId;

    if (selectedLanguage === 'ru') {
        selectedLanguage = 'en';
    } else if (selectedLanguage === 'en') {
        selectedLanguage = 'es';
    } else if (selectedLanguage === 'es') {
        selectedLanguage = 'ru';
    } else {
        return selectedLanguage;
    }


    // if (selectedLanguageId === 'ru' && selectedLanguageIsActive) {
    //     nextLanguageId = 'en';
    // } else if (selectedLanguageId === 'en' && selectedLanguageIsActive) {
    //     nextLanguageId = 'es';
    // } else if (selectedLanguageId === 'es' && selectedLanguageIsActive) {
    //     nextLanguageId = 'ru';
    // } else {
    //     return nextLanguageId = selectedLanguageId;
    //     // nextLanguageId = selectedLanguageId;
    // }
    const languageOption = await driver.findElement(By.css(`[id="${nextLanguageId}"]`));
    await languageOption.click();

}
async function takeScreenshot(driver, filename) {
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync(filename, screenshot, 'base64');
}

ChangingTheInterfaceLanguage();
