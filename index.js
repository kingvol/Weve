import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { AppRegistry, AsyncStorage } from 'react-native';

// import React from 'react';
// import { Icon } from 'native-base';
// import { getDrawerIcon } from './src/screens/main/navigation.utils';

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
        icon: require('./src/images/Categories/artist.png'), // eslint-disable-line global-require
        // icon: () => getDrawerIcon('home'),
        // icon: () => <Icon name="home" />,
        // selectedIcon: () => <Icon name="home" />,
        title: 'Screen One',
        navigatorStyle: {},
      },
      {
        label: 'inbox',
        screen: 'wevedo.InboxTab',
        icon: require('./src/images/Categories/artist.png'), // eslint-disable-line global-require
        // icon: () => <Icon name="inbox" />,
        // selectedIcon: () => <Icon name="inbox" />,
        title: 'Screen Two',
        navigatorStyle: {},
      },
      {
        label: 'settings',
        screen: 'wevedo.SettingsTab',
        icon: require('./src/images/Categories/artist.png'), // eslint-disable-line global-require
        // icon: () => <Icon name="settings" />,
        // selectedIcon: () => <Icon name="settings" />,
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
