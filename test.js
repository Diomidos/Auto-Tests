const Mocha = require('mocha');
const glob = require('glob');
const path = require('path');
const moment = require('moment');
const fs = require('fs');

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

// Функция для очистки старых файлов в папке test-results
function cleanTestResults() {
  const testResultsPath = path.join(__dirname, 'test-results');
  const files = fs.readdirSync(testResultsPath);

  files.forEach((file) => {
    if (file.startsWith('index-') && file !== `index-${reportName}.json`) {
      const filePath = path.join(testResultsPath, file);
      fs.unlinkSync(filePath);
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

// Запуск тестов
mocha.run((failures) => {
  process.exitCode = failures ? 1 : 0;
});