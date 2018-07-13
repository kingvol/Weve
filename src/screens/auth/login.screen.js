/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import * as Keychain from 'react-native-keychain';
import I18n from 'react-native-i18n';

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
      const isBiometricsDeclined = await AsyncStorage.getItem('is_biometrics_declined');
      this.setState({ biometricsEnabled: !!credentials.username && !isBiometricsDeclined });
    } catch (error) {
      this.setState({ biometricsEnabled: false });
    }
  }

  async componentWillUpdate({ auth }) {
    if (auth.isAuthorized && auth.accessToken) {
      await AsyncStorage.setItem('wevedo_access_token', auth.accessToken);

      /* Biometrics */
      const isBiometricsDeclined = await AsyncStorage.getItem('is_biometrics_declined');
      if (!isBiometricsDeclined && !this.state.biometricsEnabled) {
        await Alert.alert(
          I18n.t('logIn.biometrics_title'),
          I18n.t('logIn.biometrics'),
          [
            {
              text: I18n.t('common.allow'),
              onPress: async () => {
                await Keychain.setGenericPassword( // enables auth with biometr.
                  this.state.phoneNumber,
                  this.state.password,
                );
                startTabBasedApp();
              },
            },
            {
              text: I18n.t('common.deny'),
              onPress: async () => {
                await AsyncStorage.setItem('is_biometrics_declined', 'yes');
                startTabBasedApp();
              },
              style: 'cancel',
            },
          ],
          { cancelable: false },
        );
      } else {
        await Keychain.setGenericPassword( // enables auth with biometr.
          this.state.phoneNumber,
          this.state.password,
        );
        startTabBasedApp();
      }
    }
    Keychain.resetGenericPassword();
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
