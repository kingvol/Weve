import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { backgroundColor } from '../../theme';
import images from '../../images';

const Logo = ({ styleContainer }) => {
  const { pic, logoOuterCircle, logoInnerCircle } = styles;
  return (
    <View style={[styleContainer, pic]}>
      <View style={logoOuterCircle} id="LoginPage.logoOuterCircle">
        <FastImage id="LoginPage.logo" source={images.logo} style={logoInnerCircle} />
      </View>
    </View>
  );
};

const styles = {
  pic: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  logoOuterCircle: {
    borderRadius: 40,
    width: 80,
    height: 80,
    backgroundColor,
  },
  logoInnerCircle: {
    borderRadius: 37,
    width: 74,
    height: 74,
    margin: 3,
  },
};

export default Logo;
