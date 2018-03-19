import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AuthActions } from '../../actions';
import LoginForm from '../../components/auth/login.form';

const { loginUser } = AuthActions;

class LoginScreen extends Component {
  componentWillUpdate({ auth }) {
    if (auth.isAuthorized && auth.accessToken) {
      /*
        Write wevedo_access_token to the AsyncStorage
        and start main Tab-based app.
      */
    }
  }

  onSubmitPress = (email, password) => {
    this.props.loginUser({ email, password });
  }

  onRegisterPress = () => {
    this.props.navigator.push({
      screen: 'wevedo.registerScreen',
      navigatorStyle: {
        navBarHidden: true,
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
  }

  render() {
    return (
      <LoginForm
        isLoading={this.props.auth.isLoading}
        error={this.props.auth.error}
        onRegisterPress={this.onRegisterPress}
        onForgotPress={this.onForgotPress}
        obSumbitPress={this.onSubmitPress}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(LoginScreen);
