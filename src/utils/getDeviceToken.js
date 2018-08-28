/**
 * @name getDeviceToken
 * @return Promise -> device pushToken
 * */

import OneSignal from 'react-native-onesignal';

export default async () =>
  new Promise(async (res, rej) => {
    OneSignal.getPermissionSubscriptionState((status) => {
      if (status.pushToken) {
        res(status.pushToken);
      } else {
        rej(new Error('Cant receive a token'));
      }
    });
  });
