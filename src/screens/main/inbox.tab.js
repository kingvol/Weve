import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Icon } from 'native-base';

class InboxTab extends Component {
  render() {
    return (
      <Container>
        <View>
          <Text>Inbox</Text>
          <Icon type="FontAwesome" name="inbox" />
        </View>
      </Container>
    );
  }
}

export default InboxTab;
