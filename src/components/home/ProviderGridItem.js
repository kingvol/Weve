import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { primaryFont } from '../../theme';

class ProviderGridItem extends Component {
  onItemPress = () => {
    this.props.onPress(this.props.provider);
  };

  render() {
    const { firstName, lastName, profileImageURL } = this.props.provider;
    const { itemWidth } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.onItemPress}>
        <View
          style={{
            borderBottomColor: '#efefef',
            borderBottomWidth: 2,
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: itemWidth,
          }}
        >
          <ImageBackground
            style={{
              paddingTop: itemWidth - itemWidth / 4.5,
              height: itemWidth,
              width: itemWidth,
              marginTop: 3,
              marginBottom: 10,
              borderColor: 'white',
              borderWidth: 5,
            }}
            source={{ uri: profileImageURL }}
          >
            <View
              style={{
                height: itemWidth / 4.5,
                width: itemWidth,
                backgroundColor: 'rgba(52, 52, 52, 0.5)',
              }}
            >
              <Text style={styles.artistTitle}>{`${firstName} ${lastName || ''}`}</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  artistTitle: {
    ...primaryFont,
    color: 'white',
    margin: 10,
    textAlign: 'left',
  },
});

export default ProviderGridItem;
