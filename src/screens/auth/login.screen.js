/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import * as Keychain from 'react-native-keychain';
import TouchID from 'react-native-touch-id';
import I18n from 'react-native-i18n';

import { AuthActions } from '../../actions';
import { startTabBasedApp } from '../../../index';
import LoginForm from '../../components/auth/login.form';
// import BiometricsModal from './biometrics.modal';
import Analytics from '../../services/AnalyticsService';

const { loginUser } = AuthActions;

class LoginScreen extends Component {
  state = {
    password: '',
    phoneNumber: '',
    biometricsEnabled: false,
    biometricsSupported: false,
  }

  async componentDidMount() {
    try {
      await TouchID.isSupported();
      this.setState({
        biometricsSupported: true,
      });
    } catch (error) {
      this.setState({ biometricsSupported: false });
    }

    try {
      const credentials = await Keychain.getGenericPassword();
      const isBiometricsDeclined = await AsyncStorage.getItem('is_biometrics_declined');
      this.setState({ biometricsEnabled: !!credentials.username && !isBiometricsDeclined });
    } catch (error) {
      this.setState({ biometricsEnabled: false });
    }

    if (this.state.biometricsEnabled && this.state.biometricsSupported) {
      this.processBiometricsAuth();
    }
  }

  async componentWillUpdate({ auth }) {
    if (auth.isAuthorized && auth.accessToken) {
      await AsyncStorage.setItem('wevedo_access_token', auth.accessToken);

      /* Biometrics */
      if (this.state.biometricsSupported) {
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
      } else {
        startTabBasedApp();
      }
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

  processBiometricsAuth = () => {
    const configObject = {
      title: 'Wevedo', // Android
      color: '#e00606', // Android,
    };

    TouchID.authenticate(I18n.t('logIn.biometrics_scan'), configObject)
      .then(() => {
        Keychain.getGenericPassword() // Retrieve the credentials from the keychain
          .then((credentials) => {
            const { username, password } = credentials;
            this.onSubmitPress(username, password);
          });
      });
  }

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
