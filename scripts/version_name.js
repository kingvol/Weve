/* eslint-disable global-require */
const fs = require('fs');
const colors = require('colors');

const androidFilePath = 'android/app/build.gradle';
const iOSFilePath = 'ios/wevedo_app/info.plist';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/* Android */
fs.readFile(androidFilePath, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  const versionPattern = /versionName/;

  const { index } = data.match(versionPattern);
  const currentVersion = data.substring(index + 12, index + 19);

  rl.question(`Current version on ${colors.yellow(`Android: ${currentVersion}`)}\nPlease enter next version (without ""): `, async (answer) => {
    const newData = data.replace(currentVersion, `"${answer}"`);
    await fs.writeFile(androidFilePath, newData, 'utf8', (error) => {
      if (error) return console.log(err);
      console.log(`${colors.green('\nANDROID:DONE')}: New appVersionName is ${colors.green(answer)}. (Was ${colors.yellow(currentVersion)})\n`);
      runiOS();
    });
  });
});

/* ios */
const runiOS = () => {
  fs.readFile(iOSFilePath, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
  
    const versionPattern = /CFBundleShortVersionString/;
  
    const { index } = data.match(versionPattern);
    const currentVersion = data.substring(index + 42, index + 45);
  
    rl.question(`Current version on ${colors.yellow(`iOS: ${currentVersion}`)}\nPlease enter next version (without ""): `, (answer) => {
      const newData = data.replace(currentVersion, answer);
      fs.writeFile(iOSFilePath, newData, 'utf8', (error) => {
        if (error) return console.log(err);
        console.log(`${colors.green('\niOS:DONE')}: New appVersionName is ${colors.green(answer)}. (Was ${colors.yellow(currentVersion)})`);
      });
      rl.close();
    });
  });
};
