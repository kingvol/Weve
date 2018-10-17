import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { updateProfile, fetchProfile } from '../../actions/user.actions';
import { primaryFont } from '../../theme';
import { HeartAnimation } from './Heart.Animation';

const defaultProfile = 'https://d30y9cdsu7xlg0.cloudfront.net/png/112829-200.png';

class ProviderGridItem extends Component {
  state = {
    favorites: !!this.props.user.profile.favoriteProviders.includes(this.props.provider._id),
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      favorites: !!nextProps.user.profile.favoriteProviders.includes(this.props.provider._id),
    });
  }

  onItemPress = () => {
    this.props.onPress(this.props.provider);
  };

  onFavoriteIconPress = () => {
    this.setState({ favorites: !this.state.favorites });
    const { favoriteProviders } = this.props.user.profile;
    const index = favoriteProviders.indexOf(this.props.provider._id);
    const favoriteArray = [...favoriteProviders];
    if (index > -1) {
      favoriteArray.splice(index, 1);
      this.props.updateProfile({
        favoriteProviders: favoriteArray,
      });
    } else {
      this.props.updateProfile({
        favoriteProviders: [...favoriteProviders, this.props.provider._id],
      });
    }
  };

  render() {
    const { firstName, lastName, profileImageURL } = this.props.provider;
    const { itemWidth } = this.props;
    // let artistTitle = `${firstName} ${lastName || ''}`;
    // if (itemWidth / artistTitle.length / 10 < 0.8) {
    //   const titleArray = artistTitle.split(' ', 2);
    //   artistTitle = titleArray.join(' ');

    // }

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
            source={{ uri: profileImageURL || defaultProfile }}
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
    margin: 11,
    textAlign: 'left',
    fontSize: 12,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { updateProfile, fetchProfile })(ProviderGridItem);
