import React, { Component } from 'react';

let timer = false;
const DEBOUNCE_DELAY = 2000;

export default class ProviderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteActive: this.props.user.profile.favoriteProviders.includes(this.props.provider._id),
      favorites: this.props.user.profile.favoriteProviders,
      imageLoaded: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      favoriteActive: nextProps.user.profile.favoriteProviders.includes(this.props.provider._id),
      favorites: nextProps.user.profile.favoriteProviders,
    });
  }

  onItemPress = () => {
    this.props.onPress(this.props.provider);
  };

  onFavoriteIconPress = () => {
    const index = this.state.favorites.indexOf(this.props.provider._id);
    const favoriteArray = this.state.favorites;
    if (index > -1) {
      favoriteArray.splice(index, 1);
    } else {
      favoriteArray.push(this.props.provider._id);
    }
    this.setState({
      favoriteActive: !this.state.favoriteActive,
      favorites: favoriteArray,
    });
    this.props.handleFavorites(favoriteArray);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.props.updateProfile({
        favoriteProviders: this.state.favorites,
      });
    }, DEBOUNCE_DELAY);
  };

  _onLoad = () => {
    this.setState({ imageLoaded: true });
  };
}
