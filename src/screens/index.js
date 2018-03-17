import { Navigation } from 'react-native-navigation';

import App from '../App';

const registerScreens = (store = {}, Provider = {}) => {
  Navigation.registerComponent('wevedo.launchScreen', () => App, store, Provider);
};

export default registerScreens;
