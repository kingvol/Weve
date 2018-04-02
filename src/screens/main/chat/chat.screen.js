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
    intervalId: '',
  }

  async componentDidMount() {
    const { from, roomId } = this.props;
    if (from === 'inbox' && roomId) {
      await this.fetchRoom(roomId);
      this.startMessagePolling();
    }
  }

  componentWillUnmount() {
    this.stopMessagePolling();
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

  /* createRoom = (data) => {
    // create room by the provided data. Then set the result to the state.
  } */

  fetchMessages = async () => {
    try {
      const messages = await api.fetchRoomMessages(this.state.room._id);
      this.setState({ messages });
    } catch (error) {
      Alert.alert('Failed to fetch messages: ', error);
    }
  }

  startMessagePolling = () => {
    const intervalId = setInterval(this.fetchMessages, 4000);
    this.setState({ intervalId });
  }

  stopMessagePolling = () => {
    const { intervalId } = this.state;
    clearInterval(intervalId);
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

