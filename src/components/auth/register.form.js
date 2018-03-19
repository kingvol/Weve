import React, { Component } from 'react';
import { View, Text, Button } from 'native-base';

class RegisterForm extends Component {
  render() {
    return (
      <View>
        <Text>It is a signup screen</Text>
        <Button onPress={this.props.onBackPress}>
          <Text>Back</Text>
        </Button>
      </View>
    );
  }
}

export default RegisterForm;
