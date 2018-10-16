import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import ProviderItem from './ProviderItem';
import FastImage from 'react-native-fast-image';
import { primaryFont } from '../../theme';
import { HeartAnimation } from './Heart.Animation';
import { updateProfile, fetchProfile } from '../../actions/user.actions';

const defaultProfile = 'https://d30y9cdsu7xlg0.cloudfront.net/png/112829-200.png';

class ProviderListItem extends ProviderItem {
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
            source={{ uri: profileImageURL || defaultProfile }}
          />
          <View
            style={{
              margin: 10,
              flexDirection: 'row',
              flex: 1,
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <HeartAnimation
              onAnimationPress={this.onFavoriteIconPress}
              filled={this.state.favoriteActive}
              styleContainer={{
                flex: 0,
                position: 'absolute',
                marginTop: -20,
                marginLeft: itemWidth - 15,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.artistTitle, { marginRight: 5 }]}>
                {`${firstName} ${lastName || ''}`}
              </Text>
            </View>
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
    textAlignVertical: 'center',
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { updateProfile, fetchProfile })(ProviderListItem);
