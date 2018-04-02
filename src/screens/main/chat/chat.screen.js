import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Alert } from 'react-native';

import APIs from '../../../api';
import ChatView from '../../../components/chat/ChatView';
import { Center, Container } from '../../../components/common';
import { fetchRooms } from '../../../actions/chat.actions';

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

  async componentWillUnmount() {
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
    const intervalId = setInterval(this.fetchMessages, 500);
    this.setState({ intervalId });
  }

  stopMessagePolling = () => {
    const { intervalId } = this.state;
    clearInterval(intervalId);
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

export default connect(mapStateToProps, { fetchRooms })(Chat);
