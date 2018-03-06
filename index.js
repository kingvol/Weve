import { Navigation } from 'react-native-navigation';

/* registed screens */


import { AppRegistry } from 'react-native';

import App from './src/App';
import Screen2 from './src/Screen2';

function registerScreens() {
  Navigation.registerComponent('wevedo.FirstTabScreen', () => App);
  Navigation.registerComponent('wevedo.SecondTabScreen', () => Screen2);
}

registerScreens();

/*Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'One',
      screen: 'wevedo.FirstTabScreen', // this is a registered name for a `screen`
      title: 'Screen One',
      icon: require('./src/Images/icon.png'),
    },
    {
      label: 'Two',
      screen: 'wevedo.SecondTabScreen',
      icon: require('./src/Images/icon.png'),
      title: 'Screen Two'
    }
  ]
});*/
Navigation.startSingleScreenApp({
  screen: {
    screen: 'wevedo.FirstTabScreen',
    title: 'Welcome',
  },
});

AppRegistry.registerComponent('wevedo_app', () => App);
