import { Navigation } from 'react-native-navigation';

import LoginScreen from './auth/login.screen';
import RegisterScreen from './auth/register.screen';
import ForgotScreen from './auth/forgot.screen';
import HomeTab from './main/home.tab';
import InboxTab from './main/inbox.tab';
import SettingsTab from './main/settings.tab';
import ChangePasswordScreen from './main/settings/change.password.screen';
import ProfileScreen from './main/settings/profile.screen';
import EditProfileScreen from './main/settings/edit.profile.screen';

import ProviderTabList from './main/home/ProviderTabList.screen';
import ProviderProfileScreen from './main/home/ProviderProfile.screen';

import ChatScreen from './main/chat/chat.screen';

const registerScreens = (store = {}, Provider = {}) => {
  Navigation.registerComponent('wevedo.loginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('wevedo.registerScreen', () => RegisterScreen, store, Provider);
  Navigation.registerComponent('wevedo.forgotScreen', () => ForgotScreen, store, Provider);
  Navigation.registerComponent('wevedo.HomeTab', () => HomeTab, store, Provider);
  Navigation.registerComponent('wevedo.InboxTab', () => InboxTab, store, Provider);
  Navigation.registerComponent('wevedo.SettingsTab', () => SettingsTab, store, Provider);
  Navigation.registerComponent(
    'wevedo.ChangePasswordScreen',
    () => ChangePasswordScreen,
    store,
    Provider,
  );
  Navigation.registerComponent('wevedo.ProfileScreen', () => ProfileScreen, store, Provider);
  Navigation.registerComponent(
    'wevedo.EditProfileScreen',
    () => EditProfileScreen,
    store,
    Provider,
  );
  Navigation.registerComponent('wevedo.ProviderTabList', () => ProviderTabList, store, Provider);
  Navigation.registerComponent('wevedo.ProviderProfile', () => ProviderProfileScreen, store, Provider);
  Navigation.registerComponent('wevedo.ChatScreen', () => ChatScreen, store, Provider);
};

export default registerScreens;
