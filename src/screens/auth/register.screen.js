import React, { Component } from 'react';

import RegisterForm from '../../components/auth/register.form';

class RegisterScreen extends Component {
  onBackPress = () => {
    this.props.navigator.pop();
  }

  onFormSubmit = (email, password, fullName) => {

  }

  render() {
    return (
      <RegisterForm
        onBackPress={this.onBackPress}
        onFormSubmit={this.onFormSubmit}
      />
    );
  }
}

export default RegisterScreen;
