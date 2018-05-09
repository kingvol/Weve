import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { primaryFont } from '../../theme';

class ProviderGridItem extends Component {
  render() {
    const { firstName, lastName, profileImageURL } = this.props.provider;
    const { itemWidth } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress(this.props.provider)}>
        <View style={styles.GridItem}>
          <ImageBackground
            style={{
              height: itemWidth,
              width: itemWidth,
              marginTop: 5,
              marginBottom: 2,
              borderColor: 'white',
              borderWidth: 5,
            }}
            source={{ uri: profileImageURL }}
          >
            <View
              style={{
                height: itemWidth,
                width: itemWidth,
                justifyContent: 'flex-end',
                backgroundColor: 'rgba(0,0,0,0)',
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
  GridItem: {
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
    flex: 1,
    alignItems: 'center',
  },
  artistTitle: {
    ...primaryFont,
    color: 'white',
    margin: 10,
    textAlign: 'left',
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

export default ProviderGridItem;
