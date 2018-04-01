import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { fetchRooms } from '../../actions/chat.actions';

class InboxTab extends Component {
  componentDidMount() {
    this.props.fetchRooms();
  }

  render() {
    return !this.props.chat.rooms.length ? (
      <Container>
        <View>
          <Text>no active dialogs</Text>
        </View>
      </Container>
    ) : (
      <View><Text>Rooms list here...{JSON.stringify(this.props.chat.rooms)}</Text></View>
    );
  }
}

const mapStateToProps = state => ({
  chat: state.chat,
});

export default connect(mapStateToProps, { fetchRooms })(InboxTab);
