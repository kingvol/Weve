import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { primaryFont } from '../../theme';

class ProviderGridItem extends Component {
  render() {
    const { firstName, lastName, profileImageURL } = this.props.provider;
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress(this.props.provider)}>
        <View style={styles.GridItem}>
          <Image style={styles.image} source={{ uri: profileImageURL }} />
          <View style={{ justifyContent: 'center' }}>
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
    marginTop: 10,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  GridItem: {
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
    flex: 1,
    alignItems: 'center',
  },
  artistTitle: {
    ...primaryFont,
    color: 'red',
  },
});

export default ProviderGridItem;
