import { Navigation, NativeEventsReceiver } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { AppRegistry, AsyncStorage, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import I18n from './src/locales';
import registerScreens from './src/screens';
import store from './src/store/configureStore';
import AppBootstrap from './src/AppBootstrap';
import { primaryFont } from './src/theme';

registerScreens(store, Provider);

AppRegistry.registerComponent('wevedo_app', () => AppBootstrap);

export const startSingleScreenApp = () => {
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

export const startTabBasedApp = () => {
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
          title: I18n.t('menu.home'),
          overrideBackPress: true,
          navigatorStyle: {
            navBarBackgroundColor: '#d64635',
            navBarTextColor: 'white',
            navBarTextFontFamily: primaryFont,
          },
        },
        {
          label: I18n.t('menu.inbox').toUpperCase(),
          screen: 'wevedo.InboxTab',
          icon: sources[1],
          title: I18n.t('menu.inbox'),
          overrideBackPress: true,
          navigatorStyle: {
            navBarBackgroundColor: '#d64635',
            navBarTextColor: 'white',
            navBarTextFontFamily: primaryFont,
          },
        },
        {
          label: I18n.t('menu.settings').toUpperCase(),
          screen: 'wevedo.SettingsTab',
          icon: sources[2],
          title: I18n.t('menu.settings'),
          overrideBackPress: true,
          navigatorStyle: {
            navBarBackgroundColor: '#d64635',
            navBarTextColor: 'white',
            navBarButtonColor: 'white',
            navBarTextFontFamily: primaryFont,
          },
        },
      ],
      tabsStyle: {
        tabBarButtonColor: '#c4c4c4',
        tabBarSelectedButtonColor: '#d64635',
      },
      appStyle: {
        tabBarButtonColor: '#c4c4c4',
        tabBarSelectedButtonColor: '#d64635',
      },
    });
  });
};

export const init = async () => {
  try {
    const token = await AsyncStorage.getItem('wevedo_access_token');
    if (token) {
      startTabBasedApp();
    } else {
      startSingleScreenApp();
    }
  } catch ({ message }) {
    startSingleScreenApp();
  }
};

if (Platform.OS === 'android') {
  Navigation.isAppLaunched().then((appLaunched) => {
    if (appLaunched) {
      init(); // App is launched -> show UI
    }
    // App hasn't been launched yet -> show the UI only when needed
    new NativeEventsReceiver().appLaunched(init);
  });
} else {
  init();
}
