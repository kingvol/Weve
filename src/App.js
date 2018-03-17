import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { Button } from './components/common';
import { primaryFont } from './theme';
import I18n from './locales';

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <View>
        <Text style={{ fontFamily: 'Cochin' }}>Welcome to React Native!</Text>
        <Text style={{ fontFamily: primaryFont.fontFamily }}>Welcome to React Native!</Text>
        <Text style={{ fontFamily: primaryFont.fontFamily }}>{I18n.t('logIn.log_in')}</Text>
        <Button>
          <Text>hello from {this.props.root.appTitle}</Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  root: state.root,
});

export default connect(mapStateToProps)(App);

