import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';
import { primaryFont } from '../../theme';
import { updateProfile, fetchProfile } from '../../actions/user.actions';

const defaultProfile = 'https://d30y9cdsu7xlg0.cloudfront.net/png/112829-200.png';

class ProviderListItem extends Component {
  state = {
    favorites: !!this.props.user.profile.favoriteProviders.includes(this.props.provider._id),
  };

  onItemPress = () => {
    this.props.onPress(this.props.provider);
  };

  onFavoriteIconPress = () => {
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
    this.setState({ favorites: !this.state.favorites });
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
            <TouchableOpacity
              onPress={this.onFavoriteIconPress}
              style={{
                flex: 0,
                alignSelf: 'flex-start',
                position: 'absolute',
                marginLeft: itemWidth + 10,
              }}
            >
              <Icon
                size={30}
                name={this.state.favorites ? 'heart' : 'heart-o'}
                style={{ color: 'red' }}
              />
            </TouchableOpacity>
            <Text style={[styles.artistTitle, { marginRight: 5 }]}>
              {`${firstName} ${lastName || ''}`}
            </Text>
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
