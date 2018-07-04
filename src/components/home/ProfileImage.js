import React from 'react';
import { View, ImageBackground, TouchableOpacity, Text, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';

const ITEM_WIDTH = Dimensions.get('window').width;

const ProfileImage = ({ id, onPress, source, size, hasImage, styleContainer }) => {
  const styles = {
    container: {
      borderWidth: hasImage ? 0 : 0.15,
      borderColor: 'grey',
      width: ITEM_WIDTH * size - ITEM_WIDTH / 20 - 1,
      height: ITEM_WIDTH * size - ITEM_WIDTH / 20 - 1,
    },
    styleImage: {
      height: ITEM_WIDTH * size - ITEM_WIDTH / 20 - 1,
      width: ITEM_WIDTH * size - ITEM_WIDTH / 20 - 1,
    },
    styleIconImage: {
      flex: 0,
      bottom: (ITEM_WIDTH * size - ITEM_WIDTH / 20) / 2 - 20,
      paddingLeft: (ITEM_WIDTH * size - ITEM_WIDTH / 20) / 2 - 20,
      position: 'absolute',
    },
    styleIconButton: {
      color: hasImage ? '#d64635' : 'green',
      backgroundColor: 'white',
      borderRadius: 12,
      paddingTop: 0.8,
      paddingBottom: 0.8,
      paddingLeft: 3.3,
      paddingRight: 3.3,
    },
    styleNumber: {
      flex: 0,
      position: 'absolute',
      backgroundColor: 'white',
      borderRadius: 10,
      paddingLeft: 5.5,
      paddingRight: 5.5,
      marginTop: ITEM_WIDTH * size - ITEM_WIDTH / 20 - 20,
      marginLeft: ITEM_WIDTH * size - ITEM_WIDTH / 20 - 20,
    },
  };
  const { container, styleImage, styleIconImage, styleIconButton, styleNumber } = styles;
  return (
    <View>
      <View id={id} style={[styleContainer, container]}>
        {hasImage ? (
          <FastImage source={source} style={styleImage} />
        ) : (
          <ImageBackground source={source} style={styleImage} />
        )}
        {!hasImage && (
          <View style={styleIconImage}>
            <Icon
              style={{ color: 'lightgrey' }}
              size={40}
              name="photo" // film
            />
          </View>
        )}
        <View
          style={{
            flex: 0,
            position: 'absolute',
          }}
        >
          <TouchableOpacity onPress={onPress}>
            <Icon
              style={styleIconButton}
              size={hasImage ? 17 : 20}
              name={hasImage ? 'remove' : 'plus-circle'}
            />
          </TouchableOpacity>
        </View>
        <View style={styleNumber}>
          <Text style={{ color: 'grey', fontWeight: 'bold' }}>{id.substr(id.length - 1)}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileImage;
