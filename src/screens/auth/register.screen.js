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

  render() {
    return (
      <RegisterForm
        onBackPress={this.onBackPress}
        onFormSubmit={this.onFormSubmit}
        isLoading={this.props.auth.isLoading}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { registerUser })(RegisterScreen);

