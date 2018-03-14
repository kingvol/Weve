import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { Button } from './Components/Common';
import { primaryFont } from './Theme';

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <View>
        <Text style={{ fontFamily: 'Cochin' }}>Welcome to React Native!</Text>
        <Text style={{ fontFamily: primaryFont.fontFamily }}>Welcome to React Native!</Text>
        <Button>
          <Text>hello from button</Text>
        </Button>
      </View>
    );
  }
}
