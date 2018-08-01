import React, { PureComponent } from 'react';
import { View, Animated, Keyboard } from 'react-native';
import FastImage from 'react-native-fast-image';
import { backgroundColor } from '../../theme';
import images from '../../images';

const logoSize = 80;
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

class Logo extends PureComponent {
  constructor() {
    super();
    this.imageOuterHeight = new Animated.Value(logoSize);
    this.imageOuterWight = new Animated.Value(logoSize);
    this.imageHeight = new Animated.Value(logoSize - 6);
    this.imageWight = new Animated.Value(logoSize - 6);
    this.state = {
      margin: 1,
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = (event) => {
    Animated.parallel([
      Animated.timing(this.imageOuterHeight, {
        duration: event.duration,
        toValue: logoSize / 2,
      }),
      Animated.timing(this.imageOuterWight, {
        duration: event.duration,
        toValue: logoSize / 2,
      }),
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: (logoSize - 6) / 2,
      }),
      Animated.timing(this.imageWight, {
        duration: event.duration,
        toValue: (logoSize - 6) / 2,
      }),
    ]).start();
    this.setState({
      margin: 2,
    });
  };

  keyboardDidHide = () => {
    Animated.parallel([
      Animated.timing(this.imageOuterHeight, {
        duration: logoSize / 2,
        toValue: logoSize,
      }),
      Animated.timing(this.imageOuterWight, {
        duration: logoSize / 2,
        toValue: logoSize,
      }),
      Animated.timing(this.imageHeight, {
        duration: (logoSize - 6) / 2,
        toValue: logoSize - 6,
      }),
      Animated.timing(this.imageWight, {
        duration: (logoSize - 6) / 2,
        toValue: logoSize - 6,
      }),
    ]).start();
    this.setState({
      margin: 1,
    });
  };

  render() {
    const { styleContainer } = this.props;
    const { pic, logoOuterCircle, logoInnerCircle } = styles;
    return (
      <View
        style={[
          pic,
          { marginTop: 30 / this.state.margin, marginBottom: 20 / this.state.margin },
          styleContainer,
        ]}
      >
        <Animated.View
          style={[logoOuterCircle, { height: this.imageOuterHeight, width: this.imageOuterWight }]}
          id="logoOuterCircle"
        >
          <AnimatedFastImage
            id="logo"
            source={images.logo}
            style={[logoInnerCircle, { height: this.imageHeight, width: this.imageWight }]}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = {
  pic: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  logoOuterCircle: {
    borderRadius: 40,
    width: 80,
    height: 80,
    backgroundColor,
    justifyContent: 'center',
  },
  logoInnerCircle: {
    borderRadius: 37,
    width: 74,
    height: 74,
    margin: 3,
    alignSelf: 'center',
  },
};

export default Logo;
