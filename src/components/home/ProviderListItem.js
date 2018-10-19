import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import ProviderItem from './ProviderItem';
import FastImage from 'react-native-fast-image';
import { primaryFont } from '../../theme';
import { HeartAnimation } from './Heart.Animation';
import { updateProfile, fetchProfile } from '../../actions/user.actions';
import images from '../../images';

const defaultProfile = 'https://d30y9cdsu7xlg0.cloudfront.net/png/112829-200.png';
const loadingImage = images.loadingImage;


class ProviderListItem extends ProviderItem {

  constructor(props) {
    super(props);
    this.state = {
      favorites: !!this.props.user.profile.favoriteProviders.includes(this.props.provider._id),
      isLoaded: false,
    };
  }

  render() {
    const { fullName, firstName, lastName, profileImageURL } = this.props.provider;
    const { itemWidth } = this.props;
    let providerTitle = fullName ||`${firstName} ${lastName || ''}`;
    
      return  (
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
            onLoad={this._onLoad}
          />
  
          {!this.state.loaded && (
            <FastImage
            style={{
              height: itemWidth,
              width: itemWidth,
              marginTop: 5,
              marginBottom: 2,
              borderColor: 'white',
              borderWidth: 5,
              borderRadius: 20,
              position: 'absolute',
            }}
            source={loadingImage}
          />
          )}
         
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
                {providerTitle}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      );
  
  }
  _onLoad = () => {
    // This only exists so the transition can be seen
    // if loaded too quickly.
    setTimeout(() => {
      this.setState(() => ({ loaded: true }))
    }, 500)
  }
  _onLoad = () => {
    // This only exists so the transition can be seen
    // if loaded too quickly.
    setTimeout(() => {
      this.setState(() => ({ loaded: true }))
    }, 500)
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
