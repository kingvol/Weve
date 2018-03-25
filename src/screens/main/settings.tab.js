import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Icon } from 'native-base';

class SettingsTab extends Component {
  render() {
    return (
      <Container>
        <View>
          <Text>Settings</Text>
          <Icon name="settings" />
        </View>
      </Container>
    );
  }
}

export default SettingsTab;
