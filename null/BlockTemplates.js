const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");
require('dotenv').config();
const LOGIN = process.env.LOGIN
const PASSWORD = process.env.PASSWORD

// Тест 1 testInteractiveMessages  Вход. Создание Интерактивного сообщения.
async function testInteractiveMessages(driver) {
  await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
  const handles = await driver.getAllWindowHandles();
  await driver.switchTo().window(handles[handles.length - 1]);
  // Логика теста testInteractiveMessages
  await driver.get(
    "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
  );
  await driver.findElement(By.css("#username")).sendKeys(`${LOGIN}`);
  await driver.findElement(By.css("#password")).sendKeys(`${PASSWORD}`, Key.ENTER);
  await driver.wait(until.elementLocated(By.css('#chats')));
  await driver.sleep(1000);
  await driver.findElement(By.css('#templates')).click();
  const buttonsElements = await driver.findElements(By.css('.templatesList__item_content'));
  for (const buttonElement of buttonsElements) {
    await buttonElement.click();
  }
  await driver.findElement(By.css('.GlobalButton.orange.regular.isImage')).click();
  const textAreaElements = await driver.findElements(By.css('.textArea__textarea'));
  await textAreaElements[0].sendKeys("Название Нового Интерактивного шаблона Радист Онлайн");
  await textAreaElements[1].sendKeys("Текст Заголовка: Рандомнй текст");
  await textAreaElements[2].sendKeys("Текст Шаблона: Повседневная практика показывает, что социально-экономическое развитие способствует повышению актуальности позиций, занимаемых участниками в отношении поставленных задач. Соображения высшего порядка, а также выбранный нами инновационный путь обеспечивает актуальность позиций, занимаемых участниками в отношении поставленных задач? Задача организации, в особенности же новая модель организационной деятельности позволяет выполнить важнейшие задания по разработке направлений...");
  await textAreaElements[3].sendKeys("Нижний колонтикул. Здесь должен быть какой-либо текст. Пусть будет этот.");
  await textAreaElements[4].sendKeys("Кнопка 42");
  await textAreaElements[5].sendKeys("Кнопка 44");
  await driver.sleep(1000);
  await driver.findElement(By.css('.interactiveMessageSettings__footer_saveButton.false')).click();
  await driver.sleep(1000);
  await takeScreenshot(driver, './screenshots/BlockTemplates_Test_1.png');
  async function takeScreenshot(driver, filename) {
    await driver.takeScreenshot().then(function (data) {
      fs.writeFileSync(filename, data, 'base64');
    });
  }
  // Закрыть текущую вкладку
  await driver.close();
  await driver.switchTo().window(handles[handles.length - 2]);
}

// Тест 2 templates Вход. Страница "Шаблоны". Создание Нового текстового шаблона.
async function testTemplate(driver) {
  await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
  const handles = await driver.getAllWindowHandles();
  await driver.switchTo().window(handles[handles.length - 1]);
  // Логика теста templates
  await driver.get(
    "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
  );
  await driver.wait(until.elementLocated(By.css('#chats')));
  await driver.findElement(By.css('#templates')).click();
  await driver.sleep(2000);
  await driver.actions().doubleClick(await driver.findElement(By.css('.GlobalButton.orange.regular.isImage'))).perform();
  await driver.sleep(1000);
  // await takeScreenshot(driver, './screenshots/001.png');
  const textAreaElements = await driver.findElements(By.css('.textArea__textarea'));
  await textAreaElements[0].sendKeys("Название Нового шаблона Радист Онлайн");
  await textAreaElements[1].sendKeys("Текст для нового шаблона из автотеста");
  await driver.sleep(1000);
  await driver.findElement(By.css('.GlobalButton.orange.regular')).click();
  await driver.sleep(1000);
  await takeScreenshot(driver, './screenshots/BlockTemplates_Test_2.png');
  async function takeScreenshot(driver, filename) {
    await driver.takeScreenshot().then(function (data) {
      fs.writeFileSync(filename, data, 'base64');
    });
  }
  // Закрыть текущую вкладку
  await driver.close();
  await driver.switchTo().window(handles[handles.length - 2]);
}

// Тест 3 editInterTemplate Вход. Страница "Шаблоны". Редактирование интерактивного шаблона.
async function editInterTemplate(driver) {
  await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
  const handles = await driver.getAllWindowHandles();
  await driver.switchTo().window(handles[handles.length - 1]);
  // Логика теста editInterTemplate
  await driver.get(
    "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
  );
  await driver.wait(until.elementLocated(By.css('#chats')));
  await driver.findElement(By.css('#templates')).click();
  const buttonsElements = await driver.findElements(By.css('.templatesList__item_content'));
  for (const buttonElement of buttonsElements) {
    await buttonElement.click();
  }
  await driver.sleep(1000)
  await driver.findElement(By.css('.cardButtons__list'))
  const textAreaElements = await driver.findElements(By.css('.cardButtons__list_item'));
  await textAreaElements[0].click()
  const textAreaElements1 = await driver.findElements(By.css('.textArea__textarea'));
  await textAreaElements1[0].sendKeys(" test 33");
  await driver.sleep(1000);
  await driver.findElement(By.css('.interactiveMessageSettings__footer_saveButton.false')).click();
  await driver.sleep(1000);
  await takeScreenshot(driver, './screenshots/BlockTemplates_Test_3.png');
  async function takeScreenshot(driver, filename) {
    await driver.takeScreenshot().then(function (data) {
      fs.writeFileSync(filename, data, 'base64');
    });
  }
  // Закрыть текущую вкладку
  await driver.close();
  await driver.switchTo().window(handles[handles.length - 2]);
}

// Тест 4 editTemplate Вход. Страница "Шаблоны". Редактирование обычного текстового шаблона.
async function editTemplate(driver) {
  await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
  const handles = await driver.getAllWindowHandles();
  await driver.switchTo().window(handles[handles.length - 1]);
  // Логика теста editTemplate
  await driver.get(
    "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
  );
  await driver.wait(until.elementLocated(By.css('#chats')));
  await driver.findElement(By.css('#templates')).click();
  await driver.sleep(2000)
  await driver.findElement(By.css('.cardButtons__list'))
  const textAreaElements = await driver.findElements(By.css('.cardButtons__list_item'));
  await textAreaElements[0].click()
  const textAreaElements1 = await driver.findElements(By.css('.textArea__textarea'));
  await textAreaElements1[0].sendKeys(" тест 44");
  await driver.sleep(1000);
  await driver.findElement(By.css('.GlobalButton.orange.regular')).click();
  await driver.sleep(1000);
  await takeScreenshot(driver, './screenshots/BlockTemplates_Test_4.png');
  async function takeScreenshot(driver, filename) {
    await driver.takeScreenshot().then(function (data) {
      fs.writeFileSync(filename, data, 'base64');
    });
  }
  // Закрыть текущую вкладку
  await driver.close();
  await driver.switchTo().window(handles[handles.length - 2]);
}

// Тест 5 deleteInterTemplate Вход. Страница "Шаблоны". Удаление интерактивного шаблона.
async function deleteInterTemplate(driver) {
  await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
  const handles = await driver.getAllWindowHandles();
  await driver.switchTo().window(handles[handles.length - 1]);
  // Логика теста deleteInterTemplate
  await driver.get(
    "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
  );
  await driver.wait(until.elementLocated(By.css('#chats')));
  await driver.findElement(By.css('#templates')).click();
  const buttonsElements = await driver.findElements(By.css('.templatesList__item_content'));
  for (const buttonElement of buttonsElements) {
    await buttonElement.click();
  }
  await driver.sleep(1000)
  await driver.findElement(By.css('.cardButtons__list'))
  const textAreaElements = await driver.findElements(By.css('.cardButtons__list_item'));
  await textAreaElements[1].click()
  await driver.sleep(1000);
  await takeScreenshot(driver, './screenshots/BlockTemplates_Test_5.png');
  async function takeScreenshot(driver, filename) {
    await driver.takeScreenshot().then(function (data) {
      fs.writeFileSync(filename, data, 'base64');
    });
  }
  // Закрыть текущую вкладку
  await driver.close();
  await driver.switchTo().window(handles[handles.length - 2]);
}

// Тест 6 deleteTemplate Вход. Страница "Шаблоны". Удаление обычного текстового шаблона.
require('dotenv').config();
async function deleteTemplate(driver) {
  await driver.executeScript(`window.open('https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=d393e90d-86f7-42b7-96d0-34cccb99101d&response_mode=fragment&response_type=code&scope=openid&nonce=95335ca7-0e68-4e7e-8565-448ad2c36ccc')`);
  const handles = await driver.getAllWindowHandles();
  await driver.switchTo().window(handles[handles.length - 1]);
  // Логика теста deleteTemplate
  await driver.get(
    "https://auth.radist.online/auth/realms/radist/protocol/openid-connect/auth?client_id=web-ui-test&redirect_uri=https%3A%2F%2Fapp-beta.int.radist.online%2Fcompanies%2F1%2Fchats%2F643%2F452367&state=a2095ef3-ee00-4893-8bf6-a596644a6bfa&response_mode=fragment&response_type=code&scope=openid&nonce=d8ba6edb-4e15-4869-850e-17cec5778cd6"
  );
  await driver.wait(until.elementLocated(By.css('#chats')));
  await driver.findElement(By.css('#templates')).click();
  await driver.sleep(1000)
  await driver.findElement(By.css('.cardButtons__list'))
  const textAreaElements = await driver.findElements(By.css('.cardButtons__list_item'));
  await textAreaElements[1].click()
  await takeScreenshot(driver, './screenshots/BlockTemplates_Test_6.png');
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

  await testInteractiveMessages(driver);
  await testTemplate(driver);
  await editInterTemplate(driver);
  await editTemplate(driver);
  await deleteInterTemplate(driver);
  await deleteTemplate(driver);

  await driver.quit(); // Закрытие браузера после выполнения тестов
}

main();