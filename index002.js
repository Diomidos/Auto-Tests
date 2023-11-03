const Mocha = require('mocha');
const glob = require('glob');
const path = require('path');
const moment = require('moment');
const fs = require('fs-extra');

// Получение текущей даты и времени в формате, которое можно использовать в имени файла
const reportName = moment().format('YYYY-MM-DD_HH-mm-ss');

// Создание нового экземпляра Mocha с дополнительными параметрами
const mocha = new Mocha({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: path.join(__dirname, 'test-results'), // путь к папке для сохранения результатов тестов
    reportFilename: `index-${reportName}`, // имя файла отчета с текущей датой и временем
    reportTitle: 'Test Report', // заголовок отчета
  },
});

// Получение всех файлов тестов с помощью glob
const testFiles = glob.sync('workingTest/*.js');

// Очистка папки test-results перед запуском тестов
function cleanTestResults() {
  const testResultsPath = path.join(__dirname, 'test-results');
  fs.emptyDir(testResultsPath, (error) => {
    if (error) {
      console.error('Ошибка при очистке папки test-results:', error);
    } else {
      console.log('Папка test-results успешно очищена.');
    }
  });
}

// Вызов функции cleanTestResults перед запуском тестов
cleanTestResults();

// Добавляем каждый файл теста в Mocha
testFiles.forEach((file) => {
  const filename = path.basename(file, path.extname(file)); // получение имени файла без расширения
  const testTitle = `Test: ${filename}`; // создание названия теста

  const suite = Mocha.Suite.create(mocha.suite, testTitle); // создание нового набора тестов для каждого файла
  const test = new Mocha.Test(testTitle, function () { }); // создание нового теста для каждого файла

  suite.addTest(test); // добавление теста в набор тестов
  mocha.suite.addSuite(suite); // добавление набора тестов в экземпляр Mocha

  mocha.addFile(file); // добавление файла теста в Mocha
});

// Запуск тестов и сохранение результатов в файл
mocha.run((failures) => {
  process.exitCode = failures ? 1 : 0;

  // Сохранение результатов тестов в файл
  const reportFilePath = path.join(__dirname, 'test-results', 'mochawesome.json');
  const reportJson = JSON.stringify(mocha.stats);
  fs.writeFileSync(reportFilePath, reportJson);
});

// Добавляем асинхронную функцию beforeEach, которая будет выполняться перед каждым тестом
mocha.suite.beforeEach('Wait for previous test to finish', async function () {
  await browser.pause(10000); // Приостановка выполнения тестов на 5 секунд
});