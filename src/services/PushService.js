import FCM, { FCMEvent } from 'react-native-fcm';

const appIntent = 'android.intent.action.MAIN';

const startPushService = (navigator) => {
  FCM.requestPermissions();

  FCM.on(FCMEvent.Notification, async (notification) => {
    try {
    } catch (err) {
      console.warn(err)
    }
  })

}

export default startPushService;
