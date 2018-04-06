import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Alert, Platform, Keyboard, ActionSheetIOS } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import APIs from '../../../api';
import ChatView from '../../../components/chat/ChatView';
import { Center, Container } from '../../../components/common';
import { fetchRooms } from '../../../actions/chat.actions';
import { updateProfile } from '../../../actions/user.actions';

const { ChatApi } = APIs;
const api = new ChatApi();

class Chat extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  state = {
    room: null,
    messages: [],
    intervalId: '',
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  async componentDidMount() {
    const { from, roomId, provider } = this.props;
    if (from === 'inbox' && roomId) {
      await this.fetchRoom(roomId);
      this.startMessagePolling();
    } else {
      const room = await this.createRoom(this.props.user.profile._id, provider._id);
      await this.fetchRoom(room._id);
      this.startMessagePolling();
    }
    this.initChatOptions();
  }

  async componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    await this.fetchRoom(this.state.room._id); // to mark messages as read.
    this.stopMessagePolling();
    this.props.fetchRooms();
  }

  onMessageSend = async (body) => {
    const { _id } = this.state.room;
    try {
      await api.addMessage(_id, body);
    } catch (error) {
      Alert.alert('Cannot send message: ', error);
    }
  }

  onNavigatorEvent = ({ id }) => {
    if (id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'fade',
      });
    } else if (id === 'options') {
      this.handleOptionsPress();
    }
  }

  initChatOptions = () => {
    Promise.all([Icon.getImageSource('ellipsis-v', 20, '#000000')]).then((sources) => {
      this.props.navigator.setButtons({
        rightButtons: [{
          icon: sources[0],
          id: 'options',
        }],
        animated: true,
      });
    });
  }

  fetchRoom = async (roomId) => {
    try {
      const room = await api.fetchRoom(roomId);
      this.setState({ room, messages: room.messages });
    } catch (error) {
      Alert.alert('Failed to fetch room: ', error);
    }
  }

  createRoom = async (user, provider) => {
    try {
      const room = await api.createRoom({ user, provider });
      return room;
    } catch (error) {
      Alert.alert('Cannot create a room: ', error);
    }
  }

  fetchMessages = async () => {
    try {
      const messages = await api.fetchRoomMessages(this.state.room._id);
      this.setState({ messages });
    } catch (error) {
      Alert.alert('Failed to fetch messages: ', error);
    }
  }

  startMessagePolling = () => {
    const intervalId = setInterval(this.fetchMessages, 500);
    this.setState({ intervalId });
  }

  stopMessagePolling = () => {
    const { intervalId } = this.state;
    clearInterval(intervalId);
  }

  keyboardDidShow = () => {
    if (Platform.OS === 'android') {
      this.props.navigator.toggleTabs({
        to: 'hidden',
        animated: false,
      });
    }
  };

  keyboardDidHide = () => {
    if (Platform.OS === 'android') {
      this.props.navigator.toggleTabs({
        to: 'shown',
        animated: true,
      });
    }
  };

  handleOptionsPress = () => {
    const { room } = this.state;
    const authUser = this.props.user.profile;
    const targetUser = authUser.isProvider ? room.user._id : room.provider._id;

    const isUserBlocked = authUser.blockedUsers.includes(targetUser);

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions({
        options: ['Cancel', isUserBlocked ? 'Unblock user' : 'Block user'],
        cancelButtonIndex: 0,
        blockingButtonIndex: 1,
      }, (buttonIndex) => {
        if (buttonIndex === 1) {
          return isUserBlocked ? this.handleUnblockPress() : this.handleBlockUserPress();
        }
      });
    } else {
      this.props.navigator.showContextualMenu({
        rightButtons: [{ title: isUserBlocked ? 'Unblock user' : 'Block user' }],
        onButtonPressed: index => index === 0 && (isUserBlocked ? this.handleUnblockPress() : this.handleBlockUserPress()),
      });
    }
  }

  handleBlockUserPress = () => {
    const { room } = this.state;
    const authUser = this.props.user.profile;
    const userToBlock = authUser.isProvider ? room.user._id : room.provider._id;
    this.props.updateProfile({ blockedUsers: [...authUser.blockedUsers, userToBlock] });
  }

  handleUnblockPress = () => {
    const { room } = this.state;
    const authUser = this.props.user.profile;
    const userToUnblock = authUser.isProvider ? room.user._id : room.provider._id;
    this.props.updateProfile({
      blockedUsers: authUser.blockedUsers.filter(user => user._id === userToUnblock),
    });
  }

  render() {
    return this.state.room ? (
      <ChatView
        room={this.state.room}
        messages={this.state.messages}
        authUser={this.props.user.profile}
        onMessageSend={this.onMessageSend}
      />
    ) : (
      <Container>
        <Center>
          <ActivityIndicator />
        </Center>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { fetchRooms, updateProfile })(Chat);
