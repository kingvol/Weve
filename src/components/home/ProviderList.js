/* eslint-disable no-underscore-dangle,no-confusing-arrow */
import React, { PureComponent } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Alert,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { Spinner } from 'native-base';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProviderListItem from './ProviderListItem';
import ProviderGridItem from './ProviderGridItem';
import { primaryFont, backgroundColor } from '../../theme';
import APIs from '../../api';
import I18n from '../../locales';

import { UIActions } from '../../actions';

const { displayModeChanged, shortListChanged } = UIActions;

const { ProviderApi } = APIs;
const api = new ProviderApi();
const ITEM_WIDTH = Dimensions.get('window').width;
const PROVIDERS_PER_PAGE = 10;

class ProviderList extends PureComponent {
  state = {
    providers: [],
    isLoading: false,
    page: 1,
    disableMore: true,
    favorites: this.props.profile.favoriteProviders,
  };

  componentDidMount() {
    this.fetchProvidersList(
      this.props.category,
      this.state.page,
      this.props.profile.countryCode,
      this.props.profile.regionName,
    );
  }

  componentWillReceiveProps({ profile }) {
    this.setState({
      favorites: profile.favoriteProviders,
    });
  }

  onPressItem = (provider) => {
    if (!provider.fullName) {
      // backward compatibility
      provider.fullName = `${provider.firstName} ${provider.lastName || ''}`;
    }

    this.props.navigator.push({
      screen: 'wevedo.ProviderProfile',
      // title:
      //   provider.fullName.length > 20
      //     ? provider.fullName.split(' ', 2).join(' ')
      //     : provider.fullName || `${provider.firstName} ${provider.lastName || ''}`,
      title: provider.fullName || `${provider.firstName} ${provider.lastName || ''}`,
      passProps: { provider },
      navigatorStyle: {
        navBarBackgroundColor: '#d64635',
        navBarTextColor: 'white',
        navBarButtonColor: 'white',
        navBarTextFontFamily: primaryFont,
      },
    });
  };

  onDisplayModeChange = () => {
    this.props.displayModeChanged();
  };

  handleFavorites = (favorites) => {
    this.setState({ favorites });
    this.forceUpdate();
  };

  loadMoreItems = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.fetchProvidersList(
        this.props.category,
        this.state.page,
        this.props.profile.countryCode,
        this.props.profile.regionName,
      );
    });
  };

  fetchProvidersList = async (category, page, country, region) => {
    try {
      this.setState({ isLoading: true });
      const providers = await api.fetchListByCategory(category, page, country, region);
      this.setState({
        isLoading: false,
        providers: this.state.providers.length
          ? [...this.state.providers, ...providers]
          : providers,
        disableMore: providers.length < PROVIDERS_PER_PAGE,
      });
    } catch ({ message }) {
      Alert.alert(I18n.t(`backend.${message}`, { defaults: [{ scope: 'chat.error' }] }));
    }
  };

  _keyExtractor = item => item._id;

  _renderGridItem = ({ item }) =>
    item._id === 'spinner' ? (
      this.state.isLoading ? (
        <Spinner />
      ) : null
    ) : (
      <ProviderGridItem
        provider={item}
        handleFavorites={this.handleFavorites}
        id={item._id}
        key={item._id.toString()}
        itemWidth={ITEM_WIDTH / 2}
        onPress={this.onPressItem}
      />
    );

  _renderItem = ({ item }) =>
    item._id === 'spinner' ? (
      this.state.isLoading ? (
        <Spinner />
      ) : null
    ) : (
      <ProviderListItem
        provider={item}
        handleFavorites={this.handleFavorites}
        id={item._id}
        key={item._id.toString()}
        itemWidth={ITEM_WIDTH / 2.5}
        onPress={this.onPressItem}
      />
    );

  _endReached = () => {
    if (this.state.disableMore) return;
    this.loadMoreItems();
  };

  render() {
    const { containerStyle, buttonsRow, buttonView } = styles;

    const data = this.state.providers
      ? !this.props.shortlisted
        ? [...this.state.providers, { _id: 'spinner' }]
        : this.state.providers.filter(element => this.state.favorites.includes(element._id))
      : null;

    return !this.state.isLoading || this.state.providers.length ? (
      <View style={containerStyle}>
        <View style={buttonsRow}>
          <View style={buttonView}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
              }}
              onPress={this.onDisplayModeChange}
            >
              <Icon
                style={{
                  color: this.props.grid ? '#d64635' : '#c4c4c4',
                  alignSelf: 'center',
                  marginTop: 4,
                }}
                size={24}
                name="th-large"
              />
              <Text
                style={{
                  alignSelf: 'center',
                  marginLeft: 7,
                  color: this.props.grid ? '#d64635' : '#c4c4c4',
                }}
              >
                {I18n.t('menu.homeTab.buttonTextGrid')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={buttonView}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
              }}
              onPress={this.onDisplayModeChange}
            >
              <Icon
                style={{
                  color: this.props.grid ? '#c4c4c4' : '#d64635',
                  alignSelf: 'center',
                  marginTop: 4,
                }}
                size={24}
                name="bars"
              />
              <Text
                style={{
                  alignSelf: 'center',
                  marginLeft: 7,
                  color: this.props.grid ? '#c4c4c4' : '#d64635',
                }}
              >
                {I18n.t('menu.homeTab.buttonTextList')}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
              }}
            >
              <Icon
                style={{
                  color: '#c4c4c4',
                  alignSelf: 'center',
                  marginTop: 4,
                }}
                size={24}
                name="filter"
              />
              <Text
                style={{
                  alignSelf: 'center',
                  marginLeft: 7,
                  color: '#c4c4c4',
                }}
              >
                {I18n.t('menu.homeTab.buttonTextFilter')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          extraData={this.props.shortlisted}
          data={data}
          keyExtractor={this._keyExtractor}
          renderItem={this.props.grid ? this._renderGridItem : this._renderItem}
          key={this.props.grid ? 1 : 0}
          numColumns={this.props.grid ? 2 : 1}
          style={{ backgroundColor, borderLeftWidth: 3, borderRightWidth: 3, borderColor: 'white' }}
          onEndReachedThreshold={1}
          onEndReached={this._endReached}
        />
      </View>
    ) : (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#d64635" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.user.profile,
  grid: state.ui.grid,
  shortlisted: state.ui.shortlisted,
});

export default connect(mapStateToProps, { displayModeChanged, shortListChanged })(ProviderList);

const styles = {
  containerStyle: { flex: 1 },
  buttonsRow: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
  },
  buttonView: {
    borderRightColor: '#c4c4c4',
    borderRightWidth: 1,
    flex: 1,
    alignItems: 'center',
  },
};
