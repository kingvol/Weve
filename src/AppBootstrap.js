/**
 * Is used for android only,
 * as android requires a component to pass to the AppRegistry
 * DO NOT CONNECT REDUX HERE!
 * */
import React, { Component } from 'react';
import { View } from 'react-native';

class AppBootstrap extends Component {
  render() {
    return <View />;
  }
}

export default AppBootstrap;
