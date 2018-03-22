import { Navigation } from 'react-native-navigation';

import LoginScreen from './auth/login.screen';
import RegisterScreen from './auth/register.screen';
import ForgotScreen from './auth/forgot.screen';

const registerScreens = (store = {}, Provider = {}) => {
  Navigation.registerComponent('wevedo.loginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('wevedo.registerScreen', () => RegisterScreen, store, Provider);
  Navigation.registerComponent('wevedo.forgotScreen', () => ForgotScreen, store, Provider);
};

export default registerScreens;
