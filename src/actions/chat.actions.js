// import { database, storage } from '../firebase';
// import { Platform } from 'react-native';
import moment from 'moment';
import { values, find } from 'lodash';
import { CHAT_ACTION_TYPES as types } from './actionTypes';
// import APIs from '../api';
// import { fetchProfile } from './user.actions';

// import FCM, { FCMEvent } from 'react-native-fcm';

// const chatRef = database.ref('chat');
// const usersRef = database.ref('users');

const { Router } = require('express');
const { checkToken, getUser } = require('../middlewares');
const chatController = require('../controllers/chat.controller');

// const router = Router();

// router.get('/chat/rooms', checkToken, getUser, chatController.getRoomList);
// router.get('/chat/rooms/:id', checkToken, getUser, chatController.getRoom);
// router.get('/chat/rooms/:id/messages', checkToken, getUser, chatController.getRoomMessages);

// router.post('/chat/rooms', checkToken, getUser, chatController.createRoom);
// router.post('/chat/rooms/:id/messages', checkToken, getUser, chatController.addMessage);

// module.exports = router;


export const addMessage = (userId, message) => ({
  type: types.ADD_MESSAGE,
  userId,
  message,
});

const createRoom = (userId, authUserId) => (dispatch) => {
  const room = {
    user1Id: authUserId,
    user2Id: userId,
    messages: [],
  };
  const newRoomRef = chatRef.child('rooms').push();
  room.id = newRoomRef.key;
  newRoomRef.set(room);
  dispatch({ type: types.CREATE_ROOM, payload: room });
  return newRoomRef.key;
};

export const fetchRoom = (userId, authUserId) => {
  const roomsRef = chatRef.child('rooms');
  return Promise.all(['user1Id', 'user2Id'].map(key =>
    new Promise((resolve) => {
      roomsRef
        .orderByChild(key)
        .equalTo(userId)
        .once('value', snapshot => resolve(snapshot.val()));
    }))).then(result =>
    result.reduce(
      (prev, rooms) =>
        prev ||
        (rooms &&
          find(values(rooms), room => room.user1Id === authUserId || room.user2Id === authUserId)),
      null,
    ));
};

const getRoom = (userId, authUserId) => (dispatch, getState) => {
  let { chat: { rooms } } = getState();
  rooms = values(rooms);

  return new Promise((resolve) => {
    const room =
      rooms.find(({ user1Id, user2Id }) => user1Id === userId && user2Id === authUserId) ||
      rooms.find(({ user1Id, user2Id }) => user1Id === authUserId && user2Id === userId);
    resolve(room || fetchRoom(userId, authUserId));
  });
};

export const sendMessage = ({ message, userId }) => (dispatch, getState) => {
  const { uid: authUserId } = getState().auth.user;
  const anotherParticipan = find(getState().users.list, { uid: userId });
  const messageIsBlocked =
    anotherParticipan.blockedChatUserIds &&
    anotherParticipan.blockedChatUserIds.includes(authUserId);

  const msg = {
    text: message,
    time: moment().unix(),
    userId: authUserId,
    blocked: messageIsBlocked,
  };

  getRoom(userId, authUserId)(dispatch, getState).then((room) => {
    const roomId = (room && room.id) || createRoom(userId, authUserId)(dispatch);
    const newMsgRef = chatRef.child(`dialogs/${roomId}`).push();
    msg.id = newMsgRef.key;
    newMsgRef.set(msg);
    dispatch(addMessage(userId, msg));
  });
};

export const roomsReceived = room => ({
  type: types.ROOMS_RECEIVED,
  payload: room,
});

const LIMIT = 10;

// const appIntent = 'android.intent.action.MAIN';

// export const initChat = ({ navigate }) => (dispatch, getState) => {
//   FCM.requestPermissions();

//   const { auth: { user: authUser } } = getState();

//   FCM.on(FCMEvent.Notification, async (event) => {
//     try {
//       const { message, notification, click_action } = event;
//       const { title, body, group } = JSON.parse(notification);
//       const room = await getRoom(group, authUser.uid)(dispatch, getState);
//       FCM.removeDeliveredNotification(room.id);
//       if (click_action === appIntent) {
//         const user = await fetchProfile (group)(dispatch);
//         navigate('InboxView', {
//           user,
//           fromIntent: true,
//           roomId: room.id,
//         });
//       } else {
//         const { userId } = JSON.parse(message);
//         if (authUser.uid !== userId) {
//           FCM.presentLocalNotification({
//             id: room.id,
//             title,
//             body,
//             ticker: body,
//             click_action: appIntent,
//             wake_screen: true,
//             priority: 'high',
//             notification,
//           });
//         }
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   const keys = ['user1Id', 'user2Id'];
//   keys.forEach((key) => {
//     const currentChatRef = chatRef.child('rooms');
//     currentChatRef
//       .orderByChild(key)
//       .equalTo(authUser.uid)
//       .on('value', (snapshot) => {
//         const rooms = values(snapshot.val());
//         dispatch(roomsReceived(rooms));
//         rooms.forEach((room) => {
//           startFetchingMessages(room.id)(dispatch, getState);
//           FCM.subscribeToTopic(`${Platform.OS}-chatroom${room.id}`);
//         });
//       });

//     chatRefs.push(currentChatRef);
//   });
// };

let chatRefs = [];

export const closeChat = () => (dispatch) => {
  dispatch({ type: types.CLEAR_CHATS });

  chatRefs.forEach(ref => ref.off('value'));
  chatRefs = [];
};

export const startFetchingMessages = (roomId, offset = 0) => (dispatch, getState) => {
  const { auth: { user: authUser } } = getState();
  const currentOffset = offset;
  const { chat: { rooms } } = getState();

  chatRef.child(`dialogs/${roomId}`).once('value', (snapshot) => {
    const total = snapshot._childKeys.length;
    const { meta } = find(rooms, { id: roomId });
    let snapshotQuery = snapshot.ref.orderByKey();

    if (meta && meta.lastKnownKey) {
      snapshotQuery = snapshotQuery.endAt(meta && meta.lastKnownKey);
    }

    snapshotQuery.limitToLast(LIMIT).on('value', (snapshot) => {
      const messages = snapshot.val();
      const filteredMessages = {};
      Object.keys(messages).forEach((messageId) => {
        if (messages[messageId].blocked && messages[messageId].userId !== authUser.uid) {
          return;
        }
        filteredMessages[messageId] = messages[messageId];
      });

      dispatch({
        type: types.RECEIVED_MESSAGES,
        roomId,
        messages: filteredMessages,
        lastKnownKey: Object.keys(messages)[snapshot._childKeys.length - 1],
        messagesCount: Object.keys(messages).length,
        canLoadMore: total > currentOffset + LIMIT,
      });
    });
  });
};

export const setCurrentRoom = roomId => (dispatch, getState) => {
  dispatch({ type: types.SET_ROOM, roomId });
  markRoomAsRead(roomId)(dispatch, getState);
};

export const markRoomAsRead = roomId => (dispatch, getState) => {
  const { auth: { user: authUser } } = getState();
  if (authUser) {
    usersRef.child(`${authUser.uid}/dialogs/${roomId}`).remove();
  }
};
