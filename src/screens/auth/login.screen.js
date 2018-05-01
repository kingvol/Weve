import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { AuthActions } from '../../actions';
import { startTabBasedApp } from '../../../index';
import LoginForm from '../../components/auth/login.form';

const { loginUser } = AuthActions;

class LoginScreen extends Component {
  async componentWillUpdate({ auth }) {
    if (auth.isAuthorized && auth.accessToken) {
      await AsyncStorage.setItem('wevedo_access_token', auth.accessToken);
      startTabBasedApp();
    }
  }

  onSubmitPress = (email, password) => {
    this.props.loginUser({ email, password });
  };

  onRegisterPress = () => {
    this.props.navigator.push({
      screen: 'wevedo.verificationScreen',
      navigatorStyle: {
        navBarHidden: true,
        screenBackgroundColor: 'orange',
      },
    });
  };

  onForgotPress = () => {
    this.props.navigator.push({
      screen: 'wevedo.forgotScreen',
      navigatorStyle: {
        navBarHidden: true,
      },
    });
  };

  render() {
    return (
      <LoginForm
        isLoading={this.props.auth.isLoading}
        error={this.props.auth.error}
        onRegisterPress={this.onRegisterPress}
        onSubmitPress={this.onSubmitPress}
        onForgotPress={this.onForgotPress}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(LoginScreen);
