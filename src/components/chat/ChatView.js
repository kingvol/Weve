import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

class ChatView extends Component {
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  transformMessages = (messages) => {
    const { room, authUser } = this.props;
    const transformedMessages = messages.map(({ _id, sender, body, createdAt }) => {
      let senderUser;

      if (authUser._id === sender) {
        senderUser = authUser;
      } else {
        senderUser = authUser.isProvider ? room.user : room.provider;
      }

      return {
        _id,
        text: body,
        createdAt,
        user: {
          _id: authUser._id === sender ? 1 : 2,
          name: `${senderUser.firstName} ${senderUser.lastName || ''}`,
          avatar: senderUser.profileImageURL,
        },
      };
    });

    return transformedMessages.reverse();
  }

  render() {
    return (
      <GiftedChat
        messages={this.transformMessages(this.props.messages)}
        bottomOffset={48.5}
        onSend={messages => this.onSend(messages)}
        user={{ _id: 1 }}
      />
    );
  }
}

export default ChatView;
