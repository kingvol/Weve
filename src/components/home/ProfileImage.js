import React from 'react';
import { View, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';
import { primaryFont } from '../../theme';

const ProfileImage = ({
  id,
  onPress,
  source,
  hasImage,
  styleContainer,
  styleImage,
  styleIconImage,
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      id={id}
      style={[styleContainer, { borderWidth: hasImage ? 0 : 0.25, borderColor: 'grey' }]}
    >
      {hasImage ? (
        <FastImage source={source} style={styleImage} />
      ) : (
        <ImageBackground source={source} style={styleImage} />
      )}
      {!hasImage && (
        <View style={styleIconImage}>
          <Icon
            style={{
              color: 'lightgrey',
            }}
            size={20}
            name="photo"
            // film
          />
        </View>
      )}
      <View
        style={{
          flex: 0,
          // bottom: (ITEM_WIDTH * 1 / 3 - ITEM_WIDTH / 20) / 2 - 10,
          // paddingLeft: (ITEM_WIDTH * 1 / 3 - ITEM_WIDTH / 20) / 2 - 10,
          justifyContent: 'flex-end',
          // marginLeft: 1,
          // transform: [{ translate: [1, 1, 1] }],
          // zIndex: -10,
          position: 'absolute',
        }}
      >
        <Icon
          style={{
            color: '#d64635',
            backgroundColor: 'white',
            borderRadius: 1,
          }}
          size={15}
          name={hasImage ? 'remove' : 'plus-square'}
        />
      </View>
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
