/**
 * @name getDeviceToken
 * @return Promise -> device pushToken
 * */

import OneSignal from 'react-native-onesignal';

export default async () =>
  new Promise(async (res, rej) => {
    await OneSignal.init('32572554-6b4f-4d8c-be27-89aa4aefce30', {
      kOSSettingsKeyAutoPrompt: true,
    });

    OneSignal.getPermissionSubscriptionState((status) => {
      if (status.pushToken) {
        res(status.pushToken);
      } else {
        rej(new Error('Cant receive a token'));
      }
    });
  });
