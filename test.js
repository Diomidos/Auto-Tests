const Mocha = require('mocha');
const glob = require('glob');
const path = require('path');
const moment = require('moment');
const fs = require('fs').promises; // Использование промисов для работы с файлами

// Получение текущей даты и времени в формате, которое можно использовать в имени файла
const reportName = moment().format('YYYY-MM-DD_HH-mm-ss');
const reportDir = path.join(__dirname, 'test-results');
const reportFilePath = path.join(reportDir, `index-${reportName}.json`);

// Создание нового экземпляра Mocha с дополнительными параметрами
const mocha = new Mocha({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: reportDir, // путь к папке для сохранения результатов тестов
    reportFilename: `index-${reportName}`, // имя файла отчета с текущей датой и временем
    reportTitle: 'Test Report', // заголовок отчета
  },
});

// Функция для очистки старых файлов в папке test-results
async function cleanTestResults() {
  try {
    const files = await fs.readdir(reportDir);

    for (const file of files) {
      if (file.startsWith('index-') && file !== `index-${reportName}.json`) {
        await fs.unlink(path.join(reportDir, file));
      }
    }
  } catch (err) {
    console.error('Ошибка при очистке файлов тестов:', err);
  }
}

// Вызов функции cleanTestResults перед запуском тестов
(async () => {
  await cleanTestResults();

  // Получение всех файлов тестов с помощью glob
  const testFiles = glob.sync('workingTest/*.js');

  // Добавляем каждый файл теста в Mocha
  testFiles.forEach((file) => {
    mocha.addFile(file); // Добавление файла теста в Mocha
  });

  // Запуск тестов
  mocha.run((failures) => {
    process.exitCode = failures ? 1 : 0;
  });
})();
