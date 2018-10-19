import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import ProviderItem from './ProviderItem';
import { updateProfile, fetchProfile } from '../../actions/user.actions';
import { primaryFont } from '../../theme';
import images from '../../images';
import { HeartAnimation } from './Heart.Animation';

const defaultProfile = 'https://d30y9cdsu7xlg0.cloudfront.net/png/112829-200.png';
const loadingImage = images.loadingImage;

class ProviderGridItem extends ProviderItem {
  render() {
    const { fullName, firstName, lastName, profileImageURL } = this.props.provider;
    const { itemWidth } = this.props;
    const providerTitle = fullName || `${firstName} ${lastName || ''}`;

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
              // position: 'absolute',
              // resizeMode: 'contain',
              margin: 3,
            }}
            source={{ uri: profileImageURL || defaultProfile }}
            onLoad={this._onLoad}
          >
            <HeartAnimation
              onAnimationPress={this.onFavoriteIconPress}
              filled={this.state.favorites}
              styleContainer={{
                flex: 0,
                position: 'absolute',
                marginTop: -15,
                marginLeft: itemWidth - itemWidth / 25 - 55,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            />
            <View
              style={{
                height: (itemWidth - itemWidth / 25) / 4.5,
                width: itemWidth - itemWidth / 25,
                backgroundColor: 'rgba(52, 52, 52, 0.5)',
              }}
            >
              <Text style={[styles.artistTitle, { margin: 5 }]}>{providerTitle}</Text>
            </View>
          </ImageBackground>

          {!this.state.loaded && (
            <ImageBackground
              style={{
                paddingTop: itemWidth - itemWidth / 25 - (itemWidth - itemWidth / 25) / 4.5,
                height: itemWidth - itemWidth / 25,
                width: itemWidth - itemWidth / 25,
                position: 'absolute',
                // resizeMode: 'contain',
                margin: 3,
              }}
              source={loadingImage}
            >
              <HeartAnimation
                onAnimationPress={this.onFavoriteIconPress}
                filled={this.state.favorites}
                styleContainer={{
                  flex: 0,
                  position: 'absolute',
                  marginTop: -15,
                  marginLeft: itemWidth - itemWidth / 25 - 55,
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              />
              <View
                style={{
                  height: (itemWidth - itemWidth / 25) / 4.5,
                  width: itemWidth - itemWidth / 25,
                  backgroundColor: 'rgba(52, 52, 52, 0.5)',
                }}
              >
                <Text style={[styles.artistTitle, { margin: 5 }]}>{providerTitle}</Text>
              </View>
            </ImageBackground>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
  _onLoad = () => {
    // This only exists so the transition can be seen
    // if loaded too quickly.
    setTimeout(() => {
      this.setState(() => ({ loaded: true }));
    }, 500);
  };
}

const styles = StyleSheet.create({
  artistTitle: {
    ...primaryFont,
    color: 'white',
    margin: 6,
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize: 14,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { updateProfile, fetchProfile })(ProviderGridItem);
