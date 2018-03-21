import React, { Component } from 'react';
import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';

import { AuthActions } from '../../actions';
import LoginForm from '../../components/auth/login.form';

const { loginUser } = AuthActions;

class LoginScreen extends Component {
  componentDidMount() {
    if (Platform.OS === 'ios') {
      SplashScreen.hide();
    }
  }

  async componentWillUpdate({ auth }) {
    if (auth.isAuthorized && auth.accessToken) {
      alert('Authorized!');
      /*
        await AsyncStorage.setItem('wevedo_access_token', auth.accessToken);
        navigator.startMainApp();
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
  }

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
