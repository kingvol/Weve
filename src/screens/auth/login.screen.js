import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';

class LoginScreen extends Component {
  onRegisterPress = () => {
    this.props.navigator.push({
      screen: 'wevedo.registerScreen',
      navigatorStyle: {
        navBarHidden: true,
      },
    });
  };

  render() {
    return (
      <View>
        <Text>Login screen here...</Text>
        <Button onPress={this.onRegisterPress}>
          <Text>Register</Text>
        </Button>
      </View>
    );
  }
}

export default LoginScreen;
