const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");
require('dotenv').config();
const LOGIN = process.env.LOGIN
const PASSWORD = process.env.PASSWORD

// Тест 1 testEnter  Вход в ЛК
async function testEnter(driver) {
    await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
    const handles = await driver.getAllWindowHandles();
    await driver.switchTo().window(handles[handles.length - 1]);
    // Логика вашего первого теста testEnter
    await driver.get(
        "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
    );
    await driver.findElement(By.css("#username")).sendKeys(`${LOGIN}`);
    await driver.findElement(By.css("#password")).sendKeys(`${PASSWORD}`, Key.ENTER);
    await driver.sleep(1000);
    await driver.wait(until.elementLocated(By.css("#chats")));
    await driver.sleep(1000);
    await takeScreenshot(driver, "./screenshots/BlockContacts_test_1.png");
    async function takeScreenshot(driver, filename) {
        await driver.takeScreenshot().then(function (data) {
            fs.writeFileSync(filename, data, "base64");
        });
    }
    // Закрыть текущую вкладку
    await driver.close();
    await driver.switchTo().window(handles[handles.length - 2]);
}

// Тест 2 testMenuButtons  Проход по кнопкакм меню
async function testMenuButtons(driver) {
    // Открыть новую вкладку
    await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
    const handles = await driver.getAllWindowHandles();
    await driver.switchTo().window(handles[handles.length - 1]);
    // Логика вашего первого теста testMenuButtons
    await driver.get(
        "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
    );
    await driver.wait(until.elementLocated(By.css('#chats')));
    await driver.sleep(2000);
    await takeScreenshot(driver, './screenshots/chats_test_2.png');
    await driver.findElement(By.css('#templates')).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, './screenshots/templates_test_2.png');
    await driver.findElement(By.css('#contacts')).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, './screenshots/contacts_test_2.png');
    await driver.findElement(By.css('#broadcasts')).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, './screenshots/broadcasts_test_2.png');
    await driver.findElement(By.css('#settings')).click();
    await takeScreenshot(driver, './screenshots/settings_test_2.png');
    await driver.findElement(By.css("a[href='/companies/1/settings/members']")).click();
    await takeScreenshot(driver, './screenshots/tabShadow_test_2.png');
    await driver.findElement(By.css("a[href='/companies/1/settings/subscriptions']")).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, './screenshots/subscriptions_test_2.png');
    await driver.findElement(By.css("a[href='/companies/1/settings/integrations']")).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, './screenshots/integrations_test_2.png');
    await driver.findElement(By.css("a[href='/companies/1/settings/tags']")).click();
    await takeScreenshot(driver, './screenshots/tags_test_2.png');
    await driver.findElement(By.css("a[href='/companies/1/settings/company_settings']")).click();
    await takeScreenshot(driver, './screenshots/company_settings_test_2.png');
    await driver.findElement(By.css("a[href='/companies/1/settings/notifications']")).click();
    await takeScreenshot(driver, './screenshots/notifications_test_2.png');
    await driver.findElement(By.css("a[href='/companies/1/settings/profile']")).click();
    await takeScreenshot(driver, './screenshots/profile_test_2.png');
    async function takeScreenshot(driver, filename) {
        await driver.takeScreenshot().then(function (data) {
            fs.writeFileSync(filename, data, 'base64');
        });
    }
    // Закрыть текущую вкладку
    await driver.close();
    await driver.switchTo().window(handles[handles.length - 2]);
}

// Тест 3 helpSections Вход. Кнопка "Справка". Знакомство с программой.
async function testHelpSections(driver) {
    // Открыть новую вкладку
    await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
    const handles = await driver.getAllWindowHandles();
    await driver.switchTo().window(handles[handles.length - 1]);
    // Логика вашего первого теста helpSections
    await driver.get(
        "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
    );
    await driver.wait(until.elementLocated(By.css('#chats')));
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
    async function takeScreenshot(driver, filename) {
        await driver.takeScreenshot().then(function (data) {
            fs.writeFileSync(filename, data, 'base64');
        });
    }
    // Закрыть текущую вкладку
    await driver.close();
    await driver.switchTo().window(handles[handles.length - 2]);
}

// Тест 4 testCompanyCreation Вход. Создание новой компании.
async function testCompanyCreation(driver) {
    // Открыть новую вкладку
    await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
    const handles = await driver.getAllWindowHandles();
    await driver.switchTo().window(handles[handles.length - 1]);
    // Логика вашего первого теста helpSections
    await driver.get(
        "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
    );
    await driver.wait(until.elementLocated(By.css('#chats')));
    await driver.findElement(By.css(".companyDropdown__icon")).click();
    await driver.findElement(By.css(".createCompany")).click();
    await driver.sleep(1000);
    function generateRandomName() {
        const names = ["Aliance", "Bobik and Kotik", "Charlie Chaplin and Alex", "David and Goliaf", "Maugli and Sherchan"];
        return names[Math.floor(Math.random() * names.length)];
    }
    function generateRandomPhoneNumber() {
        const phoneNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
        return phoneNumber.toString();
    }
    const randomName = generateRandomName();
    const randomPhoneNumber = generateRandomPhoneNumber();
    await driver.findElement(By.css(".inputContainer__input")).sendKeys(randomName);
    await driver.findElement(By.css(".PhoneInputInput")).sendKeys(randomPhoneNumber);
    await driver.sleep(1000);
    await driver.findElement(By.css(".GlobalButton.orange.regular ")).click();
    await driver.sleep(1000);
    await takeScreenshot(driver, "./screenshots/companyCreation.png");

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

    await testEnter(driver);
    await testMenuButtons(driver);
    await testHelpSections(driver);
    await testCompanyCreation(driver);

    await driver.quit(); // Закрытие браузера после выполнения тестов
}

main();