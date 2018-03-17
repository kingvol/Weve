import React, { Component } from 'react';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

class AppBootstrap extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <View />
    );
  }
}

export default AppBootstrap;

