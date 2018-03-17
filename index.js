import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';

import registerScreens from './src/screens';
import configureStore from './src/store/configureStore';
import App from './src/App';

const store = configureStore();

registerScreens(store, Provider);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'wevedo.launchScreen',
    title: 'Welcome!',
  },
});

AppRegistry.registerComponent('wevedo_app', () => App);
