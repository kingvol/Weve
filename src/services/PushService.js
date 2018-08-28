import OneSignal from 'react-native-onesignal';
import config from '../../config';

export default class PushService {
  constructor(navigator) {
    this.navigator = navigator;
  }

  init = () => {
    OneSignal.init(config.onesignal.appId, { kOSSettingsKeyAutoPrompt: true });
    OneSignal.setSubscription(true);
    OneSignal.configure();
    OneSignal.requestPermissions({
      alert: true,
      badge: true,
      sound: true,
    });
  };

  enableListeners = () => {
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  };

  onReceived = (notification) => {
    console.warn('Notification received: ', notification);
  };

  onOpened = (openResult) => {
    console.warn('Message: ', openResult.notification.payload.body);
    console.warn('Data: ', openResult.notification.payload.additionalData);
    console.warn('isActive: ', openResult.notification.isAppInFocus);
    console.warn('openResult: ', openResult);
  };

  onIds = (device) => {
    console.warn('Device info: ', device);
  };
}

/* import FCM, { FCMEvent } from 'react-native-fcm';
import { Platform } from 'react-native';
import { orderBy } from 'lodash';
import OneSignal from 'react-native-onesignal';
import I18n from 'react-native-i18n';
import { primaryFont } from '../theme';

import APIs from '../api';

const { ChatApi } = APIs;
const api = new ChatApi();

OneSignal.init('32572554-6b4f-4d8c-be27-89aa4aefce30');
OneSignal.addEventListener('received', this.onReceived);
OneSignal.addEventListener('opened', this.onOpened);
OneSignal.addEventListener('ids', this.onIds);

const startPushService = (navigator) => {
  FCM.requestPermissions();

  FCM.on(FCMEvent.Notification, async (notification) => {
    if (notification.fcm.action && notification.collapse_key && Platform.OS === 'android') {
      const rooms = await api.fetchRooms();
      let list = rooms.filter(room => room.messages.length);
      list = orderBy(list, 'lastMessageTime', 'desc');
      const targetRoom = list[0];

      if (targetRoom) {
        navigator.push({
          screen: 'wevedo.ChatScreen',
          title: I18n.t('menu.inbox'),
          passProps: { roomId: targetRoom._id, from: 'inbox' },
          navigatorStyle: {
            navBarBackgroundColor: '#d64635',
            navBarTextColor: 'white',
            navBarButtonColor: 'white',
            navBarTextFontFamily: primaryFont,
          },
        });
      }
    }

    try {
      if (Platform.OS === 'ios') {
        const { title, body, group } = JSON.parse(notification.notification);

        FCM.presentLocalNotification({
          id: body,
          title,
          body,
          ticker: body,
          wake_screen: true,
          priority: 'high',
          notification: notification.notification,
        });
      }
    } catch (err) {
      console.warn(err);
    }
  });
};
*/
