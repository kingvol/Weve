import { Navigation } from 'react-native-navigation';

import App from '../App';
import Screen2 from './Screen2';

const registerScreens = (store = {}, Provider = {}) => {
  Navigation.registerComponent('wevedo.launchScreen', () => App, store, Provider);
  Navigation.registerComponent('wevedo.screen2', () => Screen2, store, Provider);
};

export default registerScreens;
