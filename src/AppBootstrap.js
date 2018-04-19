/**
 * Is used for android only,
 * as android requires a component to pass to the AppRegistry
 * DO NOT CONNECT REDUX HERE!
 * */
import React, { Component } from 'react';
import { View } from 'react-native';
import { init } from '../index';
import SplashScreen from 'react-native-splash-screen';

class AppBootstrap extends Component {
  componentDidMount() {
    SplashScreen.hide();
    init();
  }
  render() {
    return <View />;
  }
}

export default AppBootstrap;
