import { Navigation } from 'react-native-navigation';

import LoginScreen from './auth/login.screen';
import RegisterScreen from './auth/register.screen';
import ForgotScreen from './auth/forgot.screen';
import HomeTab from './main/home.tab';
import InboxTab from './main/inbox.tab';
import SettingsTab from './main/settings.tab';
import VenueScreen from './main/home/venue.screen';
import ChangePasswordScreen from './main/settings/change.password.screen';

const registerScreens = (store = {}, Provider = {}) => {
  Navigation.registerComponent('wevedo.loginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('wevedo.registerScreen', () => RegisterScreen, store, Provider);
  Navigation.registerComponent('wevedo.forgotScreen', () => ForgotScreen, store, Provider);
  Navigation.registerComponent('wevedo.HomeTab', () => HomeTab, store, Provider);
  Navigation.registerComponent('wevedo.InboxTab', () => InboxTab, store, Provider);
  Navigation.registerComponent('wevedo.SettingsTab', () => SettingsTab, store, Provider);
  Navigation.registerComponent('wevedo.VenueScreen', () => VenueScreen, store, Provider);
  Navigation.registerComponent(
    'wevedo.ChangePasswordScreen',
    () => ChangePasswordScreen,
    store,
    Provider,
  );
};

export default registerScreens;
