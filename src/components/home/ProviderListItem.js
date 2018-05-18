import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import { primaryFont } from '../../theme';

class ProviderListItem extends Component {
  onItemPress = () => {
    this.props.onPress(this.props.provider);
  };
  render() {
    const { firstName, lastName, profileImageURL } = this.props.provider;
    const { itemWidth } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.onItemPress}>
        <View style={styles.listItem}>
          <FastImage
            style={{
              height: itemWidth,
              width: itemWidth,
              marginTop: 5,
              marginBottom: 2,
              borderColor: 'white',
              borderWidth: 5,
              borderRadius: 20,
            }}
            source={{ uri: profileImageURL }}
          />
          <View style={{ margin: 10, justifyContent: 'center' }}>
            <Text style={styles.artistTitle}>{`${firstName} ${lastName || ''}`}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 80,
    width: 80,
    margin: 10,
    resizeMode: 'contain',
  },
  listItem: {
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
  },
  artistTitle: {
    ...primaryFont,
    color: 'red',
  },
});

export default ProviderListItem;
