import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AuthActions } from '../../actions';
import RegisterForm from '../../components/auth/register.form';
import config from '../../../config';

const { registerUser, loginUser } = AuthActions;

class RegisterScreen extends Component {
  state = {
    loading: false,
    nextStepSignIn: false,
    email: '',
    password: '',
  };

  async componentWillUpdate({ auth }) {
    /* Automatically sign in after registration.
       Navigating to tabBasedApp is handled by login screen.
    */
    if (!auth.isLoading && this.state.nextStepSignIn) {
      const { email, password } = this.state;
      this.switchNextStep();
      this.props.loginUser({ email, password });
    }
  }

  onBackPress = () => {
    this.props.navigator.pop();
  };

  onFormSubmit = (email, password, fullName, countryCode, regionName) => {
    /* divide fullName to first and last */
    const firstName = fullName.replace(/ .*/, '');
    const wordsLength = fullName.split(' ').length;
    let lastName = '';
    if (wordsLength > 1) {
      lastName = fullName.split(' ').pop();
    }

    const body = {
      email,
      password,
      firstName,
      lastName,
      countryCode,
      regionName,
      eulaAccepted: true,
      deviceToken: 'somerandomtoken',
    };

    this.setState({ nextStepSignIn: true, email, password });
    this.props.registerUser(body);
  };

  onProviderFormSubmit = async (
    email,
    password,
    fullName,
    image,
    category,
    countryCode,
    regionName,
  ) => {
    /* divide fullName to first and last */
    const firstName = fullName.replace(/ .*/, '');
    const wordsLength = fullName.split(' ').length;
    let lastName = '';
    if (wordsLength > 1) {
      lastName = fullName.split(' ').pop();
    }

    try {
      this.setState({ loading: true });
      const { secure_url } = await this.uploadProfileImage(image);
      image = secure_url;
    } catch ({ message }) {
      alert(message);
      this.setState({ loading: false });
    }

    const body = {
      email,
      password,
      firstName,
      lastName,
      countryCode,
      regionName,
      eulaAccepted: true,
      isProvider: true,
      deviceToken: 'somerandomtoken',
      categories: [category._id],
      profileImageURL: image,
    };

    this.setState({ nextStepSignIn: true, email, password });
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
    return (
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
