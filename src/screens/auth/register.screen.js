import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AuthActions } from '../../actions';
import RegisterForm from '../../components/auth/register.form';

const { registerUser } = AuthActions;

class RegisterScreen extends Component {
  onBackPress = () => {
    this.props.navigator.pop();
  }

  onFormSubmit = (email, password, fullName) => {
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
      eulaAccepted: true,
      deviceToken: 'somerandomtoken',
    };

    this.props.registerUser(body);
  }

  onProviderFormSubmit = async (email, password, fullName, image, category) => {
    /* divide fullName to first and last */
    const firstName = fullName.replace(/ .*/, '');
    const wordsLength = fullName.split(' ').length;
    let lastName = '';
    if (wordsLength > 1) {
      lastName = fullName.split(' ').pop();
    }

    // upload photo, then build body and send request.

    const body = {
      email,
      password,
      firstName,
      lastName,
      eulaAccepted: true,
      isProvider: true,
      deviceToken: 'somerandomtoken',
      categories: [category._id],
      image,
    };

    console.warn(JSON.stringify(body));
  };

  render() {
    return (
      <RegisterForm
        onBackPress={this.onBackPress}
        onFormSubmit={this.onFormSubmit}
        onProviderFormSubmit={this.onProviderFormSubmit}
        isLoading={this.props.auth.isLoading}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { registerUser })(RegisterScreen);

