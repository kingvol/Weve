import React from 'react';
import { View, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';
import { primaryFont } from '../../theme';

const ProfileImage = ({ id, onPress, source, emptyImage, styleContainer, styleImage }) => (
  // const { emptyImage } = this.props;

  <TouchableWithoutFeedback onPress={onPress}>
    <View id={id} style={[styleContainer, { borderWidth: 1, borderColor: 'grey' }]}>
      <FastImage source={source} style={styleImage} />
      {/* {!this.state.values.profileImageURL ? ( */}
      <View
        style={{
          flex: 0,
          bottom: 13,
          paddingLeft: 40,
          position: 'absolute',
        }}
      >
        <Icon
          style={
            {
              // color: this.state.profileIconColor,
            }
          }
          size={20}
          name="plus"
        />
      </View>
      {/* ) : null} */}
    </View>
  </TouchableWithoutFeedback>
);
const styles = {
  artistTitle: {
    ...primaryFont,
    color: 'white',
    margin: 10,
    textAlign: 'left',
  },
};

export default ProfileImage;
