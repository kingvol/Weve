import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as Keychain from 'react-native-keychain';

import { AuthActions } from '../../actions';
import { startTabBasedApp } from '../../../index';
import LoginForm from '../../components/auth/login.form';
import Analytics from '../../services/AnalyticsService';

const { loginUser } = AuthActions;

class LoginScreen extends Component {
  state = {
    password: '',
    phoneNumber: '',
    biometricsEnabled: false,
  }

  async componentDidMount() {
    try {
      const credentials = await Keychain.getGenericPassword();
      this.setState({ biometricsEnabled : !!credentials.username });
      console.warn(credentials);
    } catch (error) {
      this.setState({ biometricsEnabled : false });
    }
  }

  async componentWillUpdate({ auth }) {
    if (auth.isAuthorized && auth.accessToken) {
      await AsyncStorage.setItem('wevedo_access_token', auth.accessToken);
      await Keychain.setGenericPassword( // enables auth with biometr.
        this.state.phoneNumber,
        this.state.password,
      );
      startTabBasedApp();
    }
  }

  onSubmitPress = (phoneNumber, password) => {
    this.setState({ phoneNumber, password });
    this.props.loginUser({ phoneNumber, password });
    /* Appcenter Analytics */
    Analytics.trackEvent('Login', { phoneNumber });
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
        biometricsEnabled={this.state.biometricsEnabled}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(LoginScreen);
