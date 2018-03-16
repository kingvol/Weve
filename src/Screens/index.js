import { Navigation } from 'react-native-navigation';

import App from '../App';

const registerScreens = () => {
  Navigation.registerComponent('wevedo.launchScreen', () => App);
};


export default registerScreens;
