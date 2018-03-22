import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { AppRegistry, AsyncStorage } from 'react-native';

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


const init = async () => {
  try {
    const token = await AsyncStorage.getItem('wevedo_access_token');
    if (token) {
      /* start tab-based app here */
    } else {
      startSingleScreenApp();
    }
  } catch ({ message }) {
    startSingleScreenApp();
  }
};

init();
