import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import LottieView from 'lottie-react-native';

class HeartAnimation extends Component {
  componentDidMount() {
    const { filled } = this.props;
    if (filled) {
      this.animation.play(25, 50);
    }
  }

  onAnimationPress = () => {
    if (this.props.filled) {
      this.fillOut();
    } else {
      this.fillIn();
    }
    this.props.onAnimationPress();
  };

  fillIn = () => {
    this.animation.play(0, 50);
  };

  fillOut = () => {
    this.animation.play(30, 0);
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onAnimationPress}>
        <LottieView
          resizeMode="contain"
          style={{
            width: 65,
            heigth: 65,
            marginRight: 30,
            resizeMode: 'cover',
            top: 0,
            right: -35,
            position: 'absolute',
          }}
          ref={(animation) => {
            this.animation = animation;
          }}
          source={require('./sources/heart.json')}
          loop={false}
        />
      </TouchableWithoutFeedback>
    );
  }
}

export default HeartAnimation;
