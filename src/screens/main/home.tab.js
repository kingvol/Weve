import React, { Component } from 'react';
import { Platform, View, Text } from 'react-native';
import { Container, Icon } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import { Navigation } from 'react-native-navigation';

class HomeTab extends Component {
  componentDidMount() {
    if (Platform.OS === 'ios') {
      SplashScreen.hide();
    }
  }
  render() {
    return (
      <Container>
        <View>
          <Text>Home</Text>
          <Icon name="home" />
        </View>
      </Container>
    );
  }
}

export default HomeTab;
