import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { primaryFont } from '../../theme';

// const defaultProfile = 'https://d30y9cdsu7xlg0.cloudfront.net/png/112829-200.png';

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
            width: itemWidth - itemWidth / 25,
          }}
        >
          <ImageBackground
            style={{
              paddingTop: itemWidth - itemWidth / 25 - (itemWidth - itemWidth / 25) / 4.5,
              height: itemWidth - itemWidth / 25,
              width: itemWidth - itemWidth / 25,
              margin: 3,
            }}
            source={{ uri: profileImageURL }}
          >
            <View
              style={{
                height: (itemWidth - itemWidth / 25) / 4.5,
                width: itemWidth - itemWidth / 25,
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
