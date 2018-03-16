import { Navigation } from 'react-native-navigation';
import { AppRegistry } from 'react-native';

import registerScreens from './src/Screens';
import App from './src/App';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'wevedo.launchScreen',
    title: 'Welcome!',
  },
});

AppRegistry.registerComponent('wevedo_app', () => App);
