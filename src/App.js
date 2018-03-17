import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    if (Platform.OS === 'ios') {
      SplashScreen.hide();
    }
  }

  render() {
    return (
      <View>
        <Text>Hello from {this.props.root.appTitle}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  root: state.root,
});

export default connect(mapStateToProps)(App);
