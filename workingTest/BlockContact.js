const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");
require('dotenv').config();
const LOGIN = process.env.LOGIN
const PASSWORD = process.env.PASSWORD

// Тест 1 testNewContact Вход. Страница Контакты. Создание нового контакта.
async function testNewContact(driver) {
    await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
    const handles = await driver.getAllWindowHandles();
    await driver.switchTo().window(handles[handles.length - 1]);
    // Логика вашего первого теста testNewContact
    await driver.get(
        "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
    );
    await driver.findElement(By.css("#username")).sendKeys(`${LOGIN}`);
    await driver.findElement(By.css("#password")).sendKeys(`${PASSWORD}`, Key.ENTER);
    await driver.sleep(1000);
    await driver.wait(until.elementLocated(By.css("#chats")));
    await driver.sleep(1000);
    await driver.findElement(By.css('#contacts')).click();
    await driver.sleep(2000);
    await driver.findElement(By.css('.GlobalButton.orange.regular.isImage')).click();
    await driver.sleep(1000);
    const textAreaElements = await driver.findElements(By.css('.inputContainer__wrapper > input'));
    function generateRandomName() {
        const names = ['John', 'Jane', 'James', 'Emily', 'Michael', 'Emma', 'Daniel', 'Olivia'];
        const surnames = ['Smith', 'Johnson', 'Brown', 'Lee', 'Wilson', 'Taylor', 'Clark', 'Walker'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
        return `${randomName} ${randomSurname}`;
    }
    await textAreaElements[0].sendKeys(generateRandomName());
    await driver.sleep(2000);
    const textAreaElements1 = await driver.findElements(By.css('.inputContainer__wrapper > input'));
    function generateRandomEmail() {
        const emailPrefix = Math.random().toString(36).substring(7);
        const emailDomain = 'example.com';
        return `${emailPrefix}@${emailDomain}`;
    }
    await textAreaElements1[1].sendKeys(generateRandomEmail());
    await driver.sleep(1000);
    await driver.findElement(By.css('.GlobalButton.orange.regular ')).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, './screenshots/newContact.png');

    async function takeScreenshot(driver, filename) {
        await driver.takeScreenshot().then(function (data) {
            fs.writeFileSync(filename, data, 'base64');
        });
    }
    // Закрыть текущую вкладку
    await driver.close();
    await driver.switchTo().window(handles[handles.length - 2]);
}

// Тест 2 testSearchContact Вход. Страница "Контакты" Поиск контакта через поле ввода "Поиск"
async function testSearchContact(driver) {
    await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
    const handles = await driver.getAllWindowHandles();
    await driver.switchTo().window(handles[handles.length - 1]);
    // Логика вашего первого теста testSearchContact
    await driver.get(
        "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
    );
    await driver.wait(until.elementLocated(By.css("#chats")));
    await driver.sleep(1000);
    await driver.findElement(By.css('#contacts')).click();
    await driver.sleep(2000);
    await driver.findElement(By.css('.contacts__header__sort__inputs__keyWords')).click();
    await driver.findElement(By.css('.search__input')).sendKeys('Семён');
    await driver.sleep(1000);
    await takeScreenshot(driver, './screenshots/searchContact.png');

    async function takeScreenshot(driver, filename) {
        await driver.takeScreenshot().then(function (data) {
            fs.writeFileSync(filename, data, 'base64');
        });
    }
    // Закрыть текущую вкладку
    await driver.close();
    await driver.switchTo().window(handles[handles.length - 2]);
}

// Тест 3 testSortingContact Вход. Страница "Контакты". Сортировка по алфавиту, по времени создания (1.сначало новые; 2.сначала старые; 3.По имени А-Я; 4.По имени Я-А)
async function testSortingContact(driver) {
    await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
    const handles = await driver.getAllWindowHandles();
    await driver.switchTo().window(handles[handles.length - 1]);
    // Логика вашего первого теста testSortingContact
    await driver.get(
        "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
    );
    await driver.wait(until.elementLocated(By.css("#chats")));
    await driver.findElement(By.css('#contacts')).click();
    await driver.sleep(2000);
    await driver.findElement(By.css('.dropdownContainer__dropdown_arrowIcon.false')).click();
    await driver.sleep(1000);
    const textAreaElements = await driver.findElements(By.css('.dropdownContainer__dropdown_content__item'));
    await textAreaElements[2].click();
    await driver.sleep(1000);
    await takeScreenshot(driver, './screenshots/sortingContact_1.png');
    await driver.sleep(1000);
    await driver.findElement(By.css('.dropdownContainer__dropdown_arrowIcon.false')).click();
    await driver.sleep(1000);
    const textAreaElements1 = await driver.findElements(By.css('.dropdownContainer__dropdown_content__item'));
    await textAreaElements1[3].click();
    await driver.sleep(1000);
    await takeScreenshot(driver, './screenshots/sortingContact_2.png');
    await driver.findElement(By.css('.dropdownContainer__dropdown_arrowIcon.false')).click();
    await driver.sleep(1000);
    const textAreaElements2 = await driver.findElements(By.css('.dropdownContainer__dropdown_content__item'));
    await textAreaElements2[0].click();
    await driver.sleep(1000);
    await takeScreenshot(driver, './screenshots/sortingContact_3.png');
    await driver.findElement(By.css('.dropdownContainer__dropdown_arrowIcon.false')).click();
    await driver.sleep(1000);
    const textAreaElements3 = await driver.findElements(By.css('.dropdownContainer__dropdown_content__item'));
    await textAreaElements3[1].click();
    await driver.sleep(1000);
    await takeScreenshot(driver, './screenshots/sortingContact_4.png');

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

    await testNewContact(driver);
    await testSearchContact(driver);
    await testSortingContact(driver);
    // await testCompanyCreation(driver);

    await driver.quit(); // Закрытие браузера после выполнения тестов
}

main();