/* eslint-disable global-require */
// Incrementing build number
const fs = require('fs');
const colors = require('colors');

const androidFilePath = 'android/app/build.gradle';
const iOSFilePath = 'ios/wevedo_app/info.plist';

/* Android */
fs.readFile(androidFilePath, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  const versionPattern = /versionCode/;

  const { index } = data.match(versionPattern);
  const stringToEdit = data.substring(index, index + 20);

  const { index: versionNumber } = stringToEdit.match(/\d/);
  const currentNumber = +stringToEdit.substring(versionNumber, versionNumber + 10);
  const nextNumber = currentNumber + 1;
  const nextString = stringToEdit.replace(currentNumber, nextNumber);
  const newData = data.replace(stringToEdit, nextString);

  fs.writeFile(androidFilePath, newData, 'utf8', (error) => {
    if (error) return console.log(err);
    console.log(`${colors.green('ANDROID:DONE')}: New codeVersionNumber is ${colors.green(nextNumber)}. (Was ${colors.yellow(currentNumber)})`);
  });
});

/* ios */
fs.readFile(iOSFilePath, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  const versionPattern = /<key>CFBundleVersion<\/key>/;

  const { index } = data.match(versionPattern);
  const stringToEdit = data.substring(index, index + 60);

  const currentNumber = +stringToEdit.replace(/\D/g, '');
  const nextNumber = currentNumber + 1;
  const nextString = stringToEdit.replace(currentNumber, nextNumber);
  const newData = data.replace(stringToEdit, nextString);

  fs.writeFile(iOSFilePath, newData, 'utf8', (error) => {
    if (error) return console.log(err);
    console.log(`${colors.green('IOS:DONE')}: New codeVersionNumber is ${colors.green(nextNumber)}. (Was ${colors.yellow(currentNumber)})`);
  });
});
