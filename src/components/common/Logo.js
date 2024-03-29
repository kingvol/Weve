// @flow
import React, { PureComponent } from 'react';
import { View, Animated, Keyboard, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import images from '../../images';

const ITEM_WIDTH = Dimensions.get('window').width;
const logoSize = ITEM_WIDTH / 4.5;
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

type Props = {
  styleContainer?: Object,
  adaptive?: boolean,
};

class Logo extends PureComponent<Props> {
  constructor() {
    super();
    this.imageHeight = new Animated.Value(logoSize);
    this.imageWight = new Animated.Value(logoSize);
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
    const { adaptive } = this.props;
    if (!adaptive) return;
    Animated.parallel([
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: logoSize / 2,
      }),
      Animated.timing(this.imageWight, {
        duration: event.duration,
        toValue: logoSize / 2,
      }),
    ]).start();
    this.setState({
      margin: 2,
    });
  };

  keyboardDidHide = () => {
    const { adaptive } = this.props;
    if (!adaptive) return;
    Animated.parallel([
      Animated.timing(this.imageHeight, {
        duration: logoSize / 2,
        toValue: logoSize,
      }),
      Animated.timing(this.imageWight, {
        duration: logoSize / 2,
        toValue: logoSize,
      }),
    ]).start();
    this.setState({
      margin: 1,
    });
  };

  render() {
    const { styleContainer, adaptive } = this.props;
    const { pic, logoInnerCircle } = styles;
    return (
      <View
        style={[
          pic,
          { marginTop: 30 / this.state.margin, marginBottom: 20 / this.state.margin },
          styleContainer,
        ]}
      >
        {adaptive ? (
          <AnimatedFastImage
            id="logo"
            source={images.logoRounded}
            style={[logoInnerCircle, { height: this.imageHeight, width: this.imageWight }]}
          />
        ) : (
          <FastImage
            id="logo"
            source={images.logoRounded}
            style={[logoInnerCircle, { height: logoSize, width: logoSize }]}
          />
        )}
      </View>
    );
  }
}

const styles = {
  pic: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  logoInnerCircle: {
    alignSelf: 'center',
  },
};

export default Logo;
