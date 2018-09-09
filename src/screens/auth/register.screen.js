import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Keychain from 'react-native-keychain';
import I18n from 'react-native-i18n';

import { AuthActions } from '../../actions';
import RegisterForm from '../../components/auth/register.form';
import config from '../../../config';
import Analytics from '../../services/AnalyticsService';
import * as splashyLoader from '../../animations/splashyLoader.json';

const { registerUser, loginUser } = AuthActions;

class RegisterScreen extends Component {
  state = {
    loading: false,
    nextStepSignIn: false,
    phoneNumber: '',
    password: '',
  };

  async componentWillUpdate({ auth }) {
    /* Automatically sign in after registration.
       Navigating to tabBasedApp is handled by login screen.
    */
    if (!auth.isLoading && this.state.nextStepSignIn) {
      const { phoneNumber, password } = this.state;
      this.switchNextStep();
      /* Appcenter Analytics */
      Analytics.trackEvent('Registration', { phoneNumber });
      Keychain.resetGenericPassword();
      this.props.loginUser({ phoneNumber, password });
    }
  }

  onBackPress = () => {
    this.props.navigator.resetTo({
      screen: 'wevedo.verificationScreen',
      navigatorStyle: {
        navBarHidden: true,
        screenBackgroundColor: 'orange',
      },
    });
  };

  onFormSubmit = (password, fullName, countryCode, regionName) => {
    /* divide fullName to first and last */
    const firstName = fullName.replace(/ .*/, '');
    const wordsLength = fullName.split(' ').length;
    const { phoneNumber } = this.props;
    let lastName = '';
    if (wordsLength > 1) {
      lastName = fullName.split(' ').pop();
    }

    const body = {
      phoneNumber,
      password,
      fullName,
      firstName,
      lastName,
      countryCode,
      regionName,
      eulaAccepted: true,
      deviceToken: 'somerandomtoken',
    };

    this.setState({ nextStepSignIn: true, phoneNumber, password });
    this.props.registerUser(body);
  };

  onProviderFormSubmit = async (password, fullName, image, category, countryCode, regionName) => {
    /* divide fullName to first and last */
    const firstName = fullName.replace(/ .*/, '');
    const wordsLength = fullName.split(' ').length;
    const { phoneNumber } = this.props;
    let lastName = '';
    if (wordsLength > 1) {
      lastName = fullName.split(' ').pop();
    }

    try {
      this.setState({ loading: true });
      const { secureUrl } = await this.uploadProfileImage(image);
      image = secureUrl;
    } catch ({ message }) {
      alert(I18n.t(`backend.${message}`, { defaults: [{ scope: 'chat.error' }] }));
      this.setState({ loading: false });
    }

    const body = {
      phoneNumber,
      password,
      fullName,
      firstName,
      lastName,
      countryCode,
      regionName,
      eulaAccepted: true,
      isProvider: true,
      deviceToken: 'somerandomtoken',
      categories: category,
      profileImageURL: image,
    };

    this.setState({ nextStepSignIn: true, phoneNumber, password });
    this.props.registerUser(body);
  };

  switchNextStep = () => {
    this.setState({
      nextStepSignIn: false,
    });
  };

  uploadProfileImage = (uri) => {
    const { cloudinary: { apiKey, cloud } } = config;
    const timestamp = Date.now().toString();
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloud}/image/upload?upload_preset=profileImg&secure=true`;

    const formdata = new FormData();
    formdata.append('file', { uri, type: 'image/png', name: 'image.png' });
    formdata.append('timestamp', timestamp);
    formdata.append('api_key', apiKey);

    return fetch(uploadUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formdata,
    }).then(raw => raw.json());
  };

  render() {
    return this.state.loading ? (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'white',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <LottieView style={{ width: 150, height: 150 }} source={splashyLoader} autoPlay />
      </View>
    ) : (
      <RegisterForm
        onBackPress={this.onBackPress}
        onFormSubmit={this.onFormSubmit}
        onProviderFormSubmit={this.onProviderFormSubmit}
        isLoading={this.props.auth.isLoading || this.state.loading}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { registerUser, loginUser })(RegisterScreen);
