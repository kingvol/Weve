import React, { PureComponent } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import LottieView from 'lottie-react-native';
import * as likeAnimation from '../../animations/heartAnimation.json';

export class HeartAnimation extends PureComponent {
  componentDidMount() {
    const { filled } = this.props;
    if (filled) this.animation.play(29, 30);
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
    this.animation.play(0, 30);
  };

  fillOut = () => {
    this.animation.play(0, 1);
  };

  render() {
    const { styleContainer } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.onAnimationPress}>
        <View style={[styleContainer, { width: 65, height: 65 }]}>
          <LottieView
            style={{ width: '100%', height: '100%' }}
            ref={(animation) => {
              this.animation = animation;
            }}
            source={likeAnimation}
            loop={false}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
