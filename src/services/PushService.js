import OneSignal from 'react-native-onesignal';
import config from '../../config';
import APIs from '../api';

const { UserApi } = APIs;
const api = new UserApi();

export default class PushService {
  constructor(navigator) {
    this.navigator = navigator;
  }

  init = () => {
    OneSignal.init(config.onesignal.appId, {
      kOSSettingsKeyAutoPrompt: true,
      kOSSettingsKeyInFocusDisplayOption: 0,
    });
    OneSignal.setSubscription(true);
    OneSignal.configure();
    OneSignal.inFocusDisplaying(0);
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

  onIds = async (device) => {
    try {
      await api.updateProfile({
        notificationId: device.userId,
      });
    } catch ({ message }) {
      console.warn("Can't send a token to server", message);
    }
  };
}
