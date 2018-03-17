import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

class Screen2 extends Component {

  componentDidMount() {
    setTimeout(() => {
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'wevedo.mainScreen',
          title: 'Welcome to main app',
        },
      });
    }, 1000);
  }

  render() {
    return (
      <View>
        <Text>Hello from another screen {this.props.root.appTitle}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  root: state.root,
});

export default connect(mapStateToProps)(Screen2);
