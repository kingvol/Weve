import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { AppRegistry, AsyncStorage } from 'react-native';
import { Icon } from 'native-base';

import registerScreens from './src/screens';
import configureStore from './src/store/configureStore';
import AppBootstrap from './src/AppBootstrap';

const store = configureStore();

registerScreens(store, Provider);

AppRegistry.registerComponent('wevedo_app', () => AppBootstrap);

const startSingleScreenApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'wevedo.loginScreen',
      overrideBackPress: true,
      navigatorStyle: {
        navBarHidden: true,
        disabledBackGesture: true,
      },
    },
  });
};

const tabBasedApp = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'home',
        screen: 'wevedo.HomeTab', // this is a registered name for a screen
        icon: () => <Icon name="close-circle" />,
        selectedIcon: () => <Icon name="close-circle" />,
        title: 'Screen One',
        navigatorStyle: {},
      },
      {
        label: 'inbox',
        screen: 'wevedo.InboxTab',
        icon: () => <Icon name="close-circle" />,
        selectedIcon: () => <Icon name="close-circle" />,
        title: 'Screen Two',
        navigatorStyle: {},
      },
      {
        label: 'settings',
        screen: 'wevedo.SettingsTab',
        icon: () => <Icon name="close-circle" />,
        selectedIcon: () => <Icon name="close-circle" />,
        title: 'Screen Three',
        navigatorStyle: {},
      },
    ],
  });
};

const init = async () => {
  try {
    const token = await AsyncStorage.getItem('wevedo_access_token');
    if (token) {
      tabBasedApp();
    } else {
      startSingleScreenApp();
    }
  } catch ({ message }) {
    startSingleScreenApp();
  }
};

// init();
tabBasedApp();
