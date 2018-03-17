import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';

import registerScreens from './src/screens';
import configureStore from './src/store/configureStore';
import AppBootstrap from './src/AppBootstrap';

const store = configureStore();

registerScreens(store, Provider);

AppRegistry.registerComponent('wevedo_app', () => AppBootstrap);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'wevedo.launchScreen',
    title: 'Welcome!',
  },
});
