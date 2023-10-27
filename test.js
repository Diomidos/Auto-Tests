
const Mocha = require('mocha');
const glob = require('glob');
const path = require('path');
const moment = require('moment');

// Получите текущую дату и время в формате, которое можно использовать в имени файла
const reportName = moment().format('YYYY-MM-DD_HH-mm-ss');

// Создайте новый экземпляр Mocha с дополнительными параметрами
const mocha = new Mocha({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: path.join(__dirname, 'test-results'), // путь к папке для сохранения результатов тестов
    reportFilename: `index-${reportName}`, // имя файла отчета с текущей датой и временем
    reportTitle: 'Test Report', // заголовок отчета
  },
});

// Найдите все файлы тестов с помощью glob
const testFiles = glob.sync('workingTest/*.js'); // Замените путь и расширение файлов на соответствующие вашим файлам тестов

// Добавьте каждый файл теста в Mocha
testFiles.forEach((file) => {
  const filename = path.basename(file, path.extname(file)); // получить имя файла без расширения
  const testTitle = `Test: ${filename}`; // создать название теста

  const suite = Mocha.Suite.create(mocha.suite, testTitle); // создать новый набор тестов для каждого файла
  const test = new Mocha.Test(testTitle, function () {}); // создать новый тест для каждого файла

  suite.addTest(test); // добавить тест в набор тестов
  mocha.suite.addSuite(suite); // добавить набор тестов в экземпляр Mocha

  mocha.addFile(file); // добавить файл теста в Mocha
});

// Запустите тесты
mocha.run((failures) => {
  process.exitCode = failures ? 1 : 0;
});


// const Mocha = require('mocha');
// const glob = require('glob');
// const path = require('path');
// let reportName = Date.now();

// // Создайте новый экземпляр Mocha с дополнительными параметрами
// const mocha = new Mocha({
//   reporter: 'mochawesome',
//   reporterOptions: {
//     reportDir: path.join(__dirname, 'test-results'), // путь к папке для сохранения результатов тестов
//     reportFilename: `${reportName}`, // имя файла отчета
//     reportFilename: 'index', // заголовок отчета
//     reportTitle: 'Test Report', // заголовок отчета
//   },
// });

// // Найдите все файлы тестов с помощью glob
// const testFiles = glob.sync('workingTest/*.js'); // Замените путь и расширение файлов на соответствующие вашим файлам тестов

// // Добавьте каждый файл теста в Mocha
// testFiles.forEach((file) => {
//   mocha.addFile(file);
// });

// // Запустите тесты
// mocha.run((failures) => {
//   process.exitCode = failures ? 1 : 0;
// });




// const Mocha = require('mocha');
// const glob = require('glob');

// // Создайте новый экземпляр Mocha
// const mocha = new Mocha();

// // Найдите все файлы тестов с помощью glob
// const testFiles = glob.sync('workingTest/*.js'); // Замените путь и расширение файлов на соответствующие вашим файлам тестов

// // Добавьте каждый файл теста в Mocha
// testFiles.forEach((file) => {
//   mocha.addFile(file);
// });

// // Запустите тесты
// mocha.run((failures) => {
//   process.exitCode = failures ? 1 : 0;
// });