import FCM, { FCMEvent } from 'react-native-fcm';
import { Platform } from 'react-native';

const appIntent = 'android.intent.action.MAIN';

const startPushService = (navigator) => {
  FCM.requestPermissions();

  FCM.on(FCMEvent.Notification, async (notification) => {
    try {
      if (Platform.OS === 'ios') {
        const { notification, click_action } = event;
        const { title, body, group } = JSON.parse(notification);

        FCM.presentLocalNotification({
          id: body,
          title,
          body,
          ticker: body,
          wake_screen: true,
          priority: "high",
          notification
        });
      }
    } catch (err) {
      console.warn(err)
    }
  })

}

export default startPushService;
