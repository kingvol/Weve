/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { last, orderBy } from 'lodash';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Icon, Container, Content, Body, Left, Right, Badge, Spinner } from 'native-base';
import { Center } from '../../components/common';
import { primaryFont, black, lighterTextColor } from '../../theme';
import { fetchRooms } from '../../actions/chat.actions';
import I18n from '../../locales';

const defaultProfile = 'https://d30y9cdsu7xlg0.cloudfront.net/png/112829-200.png';

class InboxTab extends Component {
  state = {
    intervalId: null,
    showSpinner: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.fetchRooms();
      this.startRoomPolling();
      this.setState({ showSpinner: false });
    }, 5000);
  }

  componentWillReceiveProps({ chat, user }) {
    let unreadDialogs = 0;
    const { isProvider } = user.profile;

    if (chat.rooms.length) {
      chat.rooms.forEach((room) => {
        if (
          (isProvider && room.unreadByProvider.length) ||
          (!isProvider && room.unreadByUser.length)
        ) {
          unreadDialogs += 1;
        }
      });
    }

    this.props.navigator.setTabBadge({
      tabIndex: 1,
      badge: unreadDialogs || null,
      badgeColor: '#ef8c28',
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  onDialogPress = ({ _id }) => {
    this.props.navigator.push({
      screen: 'wevedo.ChatScreen',
      title: I18n.t('menu.inbox'),
      passProps: { roomId: _id, from: 'inbox' },
      navigatorStyle: {
        navBarBackgroundColor: '#d64635',
        navBarTextColor: 'white',
        navBarButtonColor: 'white',
        navBarTextFontFamily: primaryFont,
        // contextualMenuStatusBarColor: '#d64635',
        contextualMenuBackgroundColor: '#d64635',
        contextualMenuButtonsColor: 'white',
        contextualMenuTextFontFamily: primaryFont,
      },
    });
  };

  formatDate = date => moment(date).format('DD.MM.YY');

  startRoomPolling = () => {
    const intervalId = setInterval(() => {
      this.props.fetchRooms();
    }, 2500);
    this.setState({ intervalId });
  };

  renderInboxItem = ({ item }) => {
    const {
      body,
      avatar,
      contentWrapper,
      content,
      listItem,
      listItemHeader,
      username,
      lastMessage,
      image,
      messageBody,
      badge,
      badgeText,
    } = styles;
    const { dialogUser, messages, lastMessageTime, lastMessageText, unreadMessages = [] } = item;

    return (
      dialogUser &&
      messages.length && (
        <TouchableOpacity style={listItem} onPress={() => this.onDialogPress(item)}>
          <Body style={body}>
            <Left style={avatar}>
              <FastImage
                style={image}
                source={{ uri: dialogUser.profileImageURL || defaultProfile }}
              />
            </Left>
            <View style={contentWrapper}>
              <View style={content}>
                <View style={listItemHeader}>
                  <Text numberOfLines={1} style={username}>
                    {`${dialogUser.firstName} ${dialogUser.lastName || ''}`}
                  </Text>
                  <Text style={lastMessage}>{this.formatDate(lastMessageTime)}</Text>
                </View>
                <View style={messageBody}>
                  <Text numberOfLines={2}>{lastMessageText}</Text>
                  {unreadMessages.length > 0 && (
                    <Badge warning style={badge}>
                      <Text style={badgeText}>{unreadMessages.length}</Text>
                    </Badge>
                  )}
                </View>
              </View>
              <Right style={{ flex: 1 }}>
                <Icon style={{ fontSize: 18, margin: 10 }} name="ios-arrow-forward" />
              </Right>
            </View>
          </Body>
        </TouchableOpacity>
      )
    );
  };

  render() {
    const { profile } = this.props.user;
    const { rooms } = this.props.chat;

    let inbox = [];

    if (rooms.length) {
      inbox = rooms
        .filter(room => room.messages.length) /* remove rooms with no messages */
        .map(({ _id, user, provider, messages, unreadByProvider, unreadByUser }) => {
          const dialogUser = profile.isProvider ? user : provider;
          const { body } = last(orderBy(messages, 'createdAt'));
          const { createdAt } = last(orderBy(messages, 'createdAt'));
          const unreadMessages = profile.isProvider ? unreadByProvider : unreadByUser;
          return {
            _id,
            dialogUser,
            messages,
            lastMessageTime: createdAt,
            lastMessageText: body,
            unreadMessages,
          };
        });
    }
    inbox = orderBy(inbox, 'lastMessageTime', 'desc');

    if (this.state.showSpinner || (this.props.chat.isLoading && !this.props.chat.rooms.length)) {
      return (
        <Container>
          <Center>
            <Spinner />
          </Center>
        </Container>
      );
    }

    return !this.props.chat.rooms.length ? (
      <Container>
        <Center>
          <Text>{I18n.t('inbox.no_active_dialog')}</Text>
        </Center>
      </Container>
    ) : (
      <Container>
        <Content>
          <FlatList
            data={inbox}
            keyExtractor={item => item._id}
            renderItem={this.renderInboxItem}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    marginLeft: 0.0,
  },
  badgeText: {
    color: black,
  },
  body: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  avatar: {
    flex: 0,
    paddingTop: 5,
    marginLeft: 15,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 15,
    paddingRight: 10,
    paddingVertical: 10,
    borderBottomColor: lighterTextColor,
    borderBottomWidth: 0.5,
  },
  listItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    flex: 5,
    flexDirection: 'column',
    paddingRight: 10,
  },
  username: {
    ...primaryFont,
    flex: 2,
    color: black,
  },
  lastMessage: {
    ...primaryFont,
  },
  messageBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 21,
  },
  badge: {
    marginLeft: 5,
    height: 21,
  },
});

const mapStateToProps = state => ({
  chat: state.chat,
  user: state.user,
});

export default connect(mapStateToProps, { fetchRooms })(InboxTab);
