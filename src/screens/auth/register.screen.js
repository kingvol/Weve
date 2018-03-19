import React, { Component } from 'react';

import RegisterForm from '../../components/auth/register.form';

class RegisterScreen extends Component {
  onBackPress = () => {
    this.props.navigator.pop();
  }

  render() {
    return (
      <RegisterForm
        onBackPress={this.onBackPress}
      />
    );
  }
}

export default RegisterScreen;
