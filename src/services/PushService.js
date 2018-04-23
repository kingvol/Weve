import FCM, { FCMEvent } from 'react-native-fcm';
import { Platform } from 'react-native';
import { orderBy } from 'lodash';
import { primaryFont } from '../theme';
import I18n from 'react-native-i18n';

import APIs from '../api';
const { ChatApi } = APIs;
const api = new ChatApi();

const appIntent = 'android.intent.action.MAIN';

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
    };

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
