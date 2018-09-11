import React, { PureComponent } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import LottieView from 'lottie-react-native';
import * as radioButton from '../../animations/radioButton.json';

class RadioButton extends PureComponent {
  componentDidMount() {
    const { enabled } = this.props;
    if (enabled) this.animation.play(45, 46);
  }

  onAnimationPress = () => {
    if (this.props.enabled) {
      this.disable();
    } else {
      this.enable();
    }
    this.props.onAnimationPress();
  };

  enable = () => {
    this.animation.play(0, 46);
  };

  disable = () => {
    this.animation.play(46, 92);
  };

  animationRef = (animation) => {
    this.animation = animation;
  };

  render() {
    const { styleContainer } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.onAnimationPress}>
        <View style={[styleContainer, { width: 55, height: 46 }]}>
          <LottieView
            style={{ width: '100%', height: '100%' }}
            ref={this.animationRef}
            source={radioButton}
            loop={false}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default RadioButton;
