import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from '../../components/auth/login.form';

class LoginScreen extends Component {
  onRegisterPress = () => {
    this.props.navigator.push({
      screen: 'wevedo.registerScreen',
      navigatorStyle: {
        navBarHidden: true,
      },
    });
  };

  onSubmitPress = (email, password) => {
    console.warn('Submitting...');
  }

  render() {
    return (
      <LoginForm
        isLoading={this.props.auth.isLoading}
        error={this.props.auth.error}
        onRegisterPress={this.onRegisterPress}
        obSumbitPress={this.onSubmitPress}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(LoginScreen);
