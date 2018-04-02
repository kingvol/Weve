/* Here we have to:

1) if (from === 'inbox')

* show chatView
* start fetching messages every 3 seconds

2) if (from === 'providerProfile')

* create new room, then get it and disaplay chat view.

componendDidMount() => room_id -> fetch room every 3 seconds.
componentWillUnmount() => fetch rooms (to get updated list in the inbox

*/
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';

import APIs from '../../../api';
import { Center, Container } from '../../../components/common';

const { ChatApi } = APIs;
const api = new ChatApi();

class Chat extends Component {
  state = {
    room: null,
    messages: [],
  }

  async componentDidMount() {
    const { from, roomId } = this.props;
    if (from === 'inbox' && roomId) {
      await this.fetchRoom(roomId);
      this.startMessagePolling();
    }
  }

  componentWillUnmount() {
    /* this.props.fetchRooms */ // update inbox;
  }

  fetchRoom = async (roomId) => {
    try {
      const room = await api.fetchRoom(roomId);
      this.setState({ room, messages: room.messages });
    } catch (error) {
      Alert.alert('Failed to fetch room: ', error);
    }
  }

  createRoom = (data) => {
    // create room by the provided data. Then set the result to the state.
  }

  fetchMessages = () => {
    // fetch messages for current room and set them to the state. ChatView should re-render.
  }

  startMessagePolling = () => {
    console.warn('Message polling started.');
    // setTimeout(this.fetchMessages, 1000);
  }

  render() {
    return this.state.room ? (
      <View><Text>Chat here...{JSON.stringify(this.state.messages)}</Text></View>
    ) : (
      <Container>
        <Center>
          <ActivityIndicator />
        </Center>
      </Container>
    );
  }
}

export default Chat;

