const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");
require('dotenv').config();
const LOGIN = process.env.LOGIN
const PASSWORD = process.env.PASSWORD

// Тест 1 Страница "Подписки". Создание счёта на Оплату. Оплата банковской картой РФ.
async function SubscriptionsPaymentCard(driver) {
  await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
  const handles = await driver.getAllWindowHandles();
  await driver.switchTo().window(handles[handles.length - 1]);
  // Логика теста SubscriptionsPaymentCard
  await driver.get(
    "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
  );
  await driver.findElement(By.css("#username")).sendKeys(`${LOGIN}`);
  await driver.findElement(By.css("#password")).sendKeys(`${PASSWORD}`, Key.ENTER);
  await driver.wait(until.elementLocated(By.css('#chats')));
  await driver.sleep(1000);
  await driver.findElement(By.css("#settings")).click();
  await driver.sleep(1000);
  await driver.findElement(By.css("a[href='/companies/1/settings/subscriptions']")).click();
  await driver.sleep(2000);
  await driver.findElement(By.css('.GlobalButton.orange.regular')).click();
  await driver.sleep(1000);
  await driver.findElement(By.css('.subscriptionsInvoicePay__bottom ')).click();
  await driver.sleep(1000);
  const textAreaElements = await driver.findElements(By.css('.GlobalButton.orange.regular'));
  await textAreaElements[1].click()
  await driver.sleep(2000);
  await takeScreenshot(driver, './screenshots/invoice.png');

  async function takeScreenshot(driver, filename) {
    await driver.takeScreenshot().then(function (data) {
      fs.writeFileSync(filename, data, 'base64');
    });
  }
  // Закрыть текущую вкладку
  await driver.close();
  await driver.switchTo().window(handles[handles.length - 2]);
}

// Тест 2 Вход. Страница "Подписки". Создание счёта для оплаты Банковской картой Не РФ.
async function SubscriptionsPaymentCardNoRF(driver) {
  await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
  const handles = await driver.getAllWindowHandles();
  await driver.switchTo().window(handles[handles.length - 1]);
  // Логика теста SubscriptionsPaymentCardNoRF
  await driver.get(
    "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
  );
  await driver.wait(until.elementLocated(By.css('#chats')));
  await driver.sleep(1000);
  await driver.findElement(By.css("#settings")).click();
  await driver.sleep(1000);
  await driver.findElement(By.css("a[href='/companies/1/settings/subscriptions']")).click();
  await driver.sleep(2000);
  await driver.findElement(By.css('.GlobalButton.orange.regular')).click();
  await driver.sleep(1000);
  await driver.findElement(By.css('.subscriptionsInvoicePay__bottom ')).click();
  await driver.sleep(1000);
  const element = await driver.findElement(By.css('input[name="payment_method"][value="CARD_OTHER"]'));
  await element.click();
  await driver.sleep(1000);
  const textAreaElements = await driver.findElements(By.css('.GlobalButton.orange.regular'));
  await textAreaElements[1].click()
  await driver.sleep(2000);
  await takeScreenshot(driver, './screenshots/InvoiceCardNoRF.png');

  async function takeScreenshot(driver, filename) {
    await driver.takeScreenshot().then(function (data) {
      fs.writeFileSync(filename, data, 'base64');
    });
  }
  // Закрыть текущую вкладку
  await driver.close();
  await driver.switchTo().window(handles[handles.length - 2]);
}

// Тест 3 Вход. Страница "Подписки". Создание счёта для оплаты Юр Лицом.
async function SubscriptionsPaymentLegalEntities(driver) {
  await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
  const handles = await driver.getAllWindowHandles();
  await driver.switchTo().window(handles[handles.length - 1]);
  // Логика теста SubscriptionsPaymentLegalEntities
  await driver.get(
    "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
  );
  await driver.wait(until.elementLocated(By.css('#chats')));
  await driver.sleep(1000);
  await driver.findElement(By.css("#settings")).click();
  await driver.sleep(1000);
  await driver.findElement(By.css("a[href='/companies/1/settings/subscriptions']")).click();
  await driver.sleep(2000);
  await driver.findElement(By.css('.GlobalButton.orange.regular')).click();
  await driver.sleep(1000);
  await driver.findElement(By.css('.subscriptionsInvoicePay__bottom ')).click();
  await driver.sleep(1000);
  const element = await driver.findElement(By.css('input[name="payment_method"][value="BANK_TRANSFER"]'));
  await element.click();
  await driver.sleep(1000);
  await driver.findElement(By.css('.dropdownContainer__dropdown '));
  await driver.findElement(By.css('.dropdownContainer__dropdown_arrowIcon.false')).click();
  const textAreaElements = await driver.findElements(By.css('.dropdownContainer__dropdown_content__item'));
  await textAreaElements[2].click();
  await driver.sleep(2000);
  const textAreaElements1 = await driver.findElements(By.css('.GlobalButton.orange.regular'));
  await textAreaElements1[1].click()
  await driver.sleep(3000);
  await takeScreenshot(driver, './screenshots/paymentLegalEntities.png');

  async function takeScreenshot(driver, filename) {
    await driver.takeScreenshot().then(function (data) {
      fs.writeFileSync(filename, data, 'base64');
    });
  }
  // Закрыть текущую вкладку
  await driver.close();
  await driver.switchTo().window(handles[handles.length - 2]);
}

// Тест 4 Вход. Страница "Подписки". Создание "Реквизитов".
async function SubscriptionsCreationOfDetails(driver) {
  await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
  const handles = await driver.getAllWindowHandles();
  await driver.switchTo().window(handles[handles.length - 1]);
  // Логика теста SubscriptionsCreationOfDetails
  await driver.get(
    "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
  );
  await driver.wait(until.elementLocated(By.css('#chats')));
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

  async function takeScreenshot(driver, filename) {
    await driver.takeScreenshot().then(function (data) {
      fs.writeFileSync(filename, data, 'base64');
    });
  }
  // Закрыть текущую вкладку
  await driver.close();
  await driver.switchTo().window(handles[handles.length - 2]);
}

// Тест 5 
async function deleteInterTemplate(driver) {
  await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
  const handles = await driver.getAllWindowHandles();
  await driver.switchTo().window(handles[handles.length - 1]);
  // Логика теста 
  await driver.get(
    "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
  );
  await driver.wait(until.elementLocated(By.css('#chats')));

  async function takeScreenshot(driver, filename) {
    await driver.takeScreenshot().then(function (data) {
      fs.writeFileSync(filename, data, 'base64');
    });
  }
  // Закрыть текущую вкладку
  await driver.close();
  await driver.switchTo().window(handles[handles.length - 2]);
}

// Тест 6 
require('dotenv').config();
async function deleteTemplate(driver) {
  await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
  const handles = await driver.getAllWindowHandles();
  await driver.switchTo().window(handles[handles.length - 1]);
  // Логика теста 
  await driver.get(
    "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
  );
  await driver.wait(until.elementLocated(By.css('#chats')));

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

  await SubscriptionsPaymentCard(driver);
  await SubscriptionsPaymentCardNoRF(driver);
  await SubscriptionsPaymentLegalEntities(driver);
  await SubscriptionsCreationOfDetails(driver);
  //   await deleteInterTemplate(driver);
  //   await deleteTemplate(driver);

  await driver.quit(); // Закрытие браузера после выполнения тестов
}

main();