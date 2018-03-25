import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { AppRegistry, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import I18n from './src/locales';
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

// Icon.getImageSource('ios-home', 20, 'red').then((source) => {
//   source;
// });

const tabBasedApp = () => {
  Promise.all([
    Icon.getImageSource('home', 20),
    Icon.getImageSource('inbox', 20),
    Icon.getImageSource('gear', 20),
  ]).then((sources) => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: I18n.t('menu.home').toUpperCase(),
          screen: 'wevedo.HomeTab', // this is a registered name for a screen
          icon: sources[0],
          // selectedIcon:
          title: I18n.t('menu.home'),
          navigatorStyle: {},
        },
        {
          label: I18n.t('menu.inbox').toUpperCase(),
          screen: 'wevedo.InboxTab',
          icon: sources[1],
          title: I18n.t('menu.inbox'),
          navigatorStyle: {},
        },
        {
          label: I18n.t('menu.my_profile').toUpperCase(),
          screen: 'wevedo.SettingsTab',
          icon: sources[2],
          title: I18n.t('menu.my_profile'),
          navigatorStyle: {},
        },
      ],
    });
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
