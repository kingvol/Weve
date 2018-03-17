import { Navigation } from 'react-native-navigation';

import App from '../App';
import LoginScreen from './auth/login.screen';

const registerScreens = (store = {}, Provider = {}) => {
  Navigation.registerComponent('wevedo.launchScreen', () => App, store, Provider);
  Navigation.registerComponent('wevedo.loginScreen', () => LoginScreen, store, Provider);
};

export default registerScreens;
