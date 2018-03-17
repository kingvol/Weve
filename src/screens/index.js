import { Navigation } from 'react-native-navigation';

import App from '../App';
import LoginScreen from './auth/login.screen';
import RegisterScreen from './auth/register.screen';

const registerScreens = (store = {}, Provider = {}) => {
  Navigation.registerComponent('wevedo.launchScreen', () => App, store, Provider);
  Navigation.registerComponent('wevedo.loginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('wevedo.registerScreen', () => RegisterScreen, store, Provider);
};

export default registerScreens;
