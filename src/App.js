import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { Button } from './Components/Common';

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <View>
        <Text>
          Welcome to React Native!
        </Text>
        <Button><Text>hello from button</Text></Button>
      </View>
    );
  }
}

