import React, { Component } from 'react';
import { View, Platform, AsyncStorage } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';

class App extends Component {
  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('wevedo_access_token');
      if (token) {
        alert('Token exist, starting a tab-based app...');
      } else {
        if (Platform.OS === 'ios') {
          SplashScreen.hide();
        }
        this.props.navigator.push({
          screen: 'wevedo.loginScreen',
          overrideBackPress: true,
          navigatorStyle: {
            navBarHidden: true,
            disabledBackGesture: true,
          },
        });
      }
    } catch ({ message }) {
      console.error(message);
    }
  }

  render() {
    return (
      <View />
    );
  }
}

const mapStateToProps = state => ({
  root: state.root,
});

export default connect(mapStateToProps)(App);
