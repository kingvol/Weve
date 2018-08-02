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
import _ from 'lodash';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from '.././common';
import ProviderListItem from './ProviderListItem';
import ProviderGridItem from './ProviderGridItem';
import { primaryFont, backgroundColor } from '../../theme';
import APIs from '../../api';
import I18n from '../../locales';

import { UIActions } from '../../actions';

const { displayModeChanged } = UIActions;

const { ProviderApi } = APIs;
const api = new ProviderApi();
const ITEM_WIDTH = Dimensions.get('window').width;
const deviceWidth = Dimensions.get('window').width;
const PROVIDERS_PER_PAGE = 10;

class ProviderList extends PureComponent {
  state = {
    providers: [],
    isLoading: false,
    page: 1,
    disableMore: true,
  };

  componentDidMount() {
    this.fetchProvidersList(
      this.props.category,
      this.state.page,
      this.props.profile.countryCode,
      this.props.profile.regionName,
    );
  }

  onMorePress = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.fetchProvidersList(
        this.props.category,
        this.state.page,
        this.props.profile.countryCode,
        this.props.profile.regionName,
      );
    });
  };

  onPressItem = (provider) => {
    this.props.navigator.push({
      screen: 'wevedo.ProviderProfile',
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

  fetchProvidersList = async (category, page, country, region) => {
    try {
      this.setState({ isLoading: true });
      const providers = await api.fetchListByCategory(category, page, country, region);
      this.setState({
        isLoading: false,
        providers: [...this.state.providers, ...providers],
        disableMore: providers.length < PROVIDERS_PER_PAGE,
      });
    } catch ({ message }) {
      Alert.alert(I18n.t(`backend.${message}`, { defaults: [{ scope: 'chat.error' }] }));
    }
  };

  _renderMoreButton = () =>
    !this.state.disableMore ? (
      <Button
        style={styles.moreButton}
        key="more_button"
        spinner={this.state.isLoading}
        onPress={this.onMorePress}
      >
        <Text style={styles.moreButtonText}>{I18n.t('common.show_more')}</Text>
      </Button>
    ) : null;

  _keyExtractor = item => item._id;

  _renderGridItem = ({ item }) =>
    item._id === 'button' ? (
      this._renderMoreButton()
    ) : (
      <ProviderGridItem
        provider={item}
        id={item._id}
        key={item._id.toString()}
        itemWidth={ITEM_WIDTH / 2}
        onPress={this.onPressItem}
      />
    );

  _renderItem = ({ item }) =>
    item._id === 'button' ? (
      this._renderMoreButton()
    ) : (
      <ProviderListItem
        provider={item}
        id={item._id}
        key={item._id.toString()}
        itemWidth={ITEM_WIDTH / 2.5}
        onPress={this.onPressItem}
      />
    );

  render() {
    const { containerStyle, buttonsRow, buttonView } = styles;

    let data = this.state.providers ? [...this.state.providers, { _id: 'button' }] : null;
    if (data.length) {
      data = _.sortBy(data, 'createdAt').reverse();
    }

    return !this.state.isLoading ? (
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
          data={data}
          keyExtractor={this._keyExtractor}
          renderItem={this.props.grid ? this._renderGridItem : this._renderItem}
          key={this.props.grid ? 1 : 0}
          numColumns={this.props.grid ? 2 : 1}
          style={{ backgroundColor, borderLeftWidth: 3, borderRightWidth: 3, borderColor: 'white' }}
        />
      </View>
    ) : (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.user.profile,
  grid: state.ui.grid,
});

export default connect(mapStateToProps, { displayModeChanged })(ProviderList);

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
  moreButton: {
    width: '50%',
    borderRadius: 15,
    marginLeft: deviceWidth / 4,
    marginTop: 10,
    alignSelf: 'flex-start',
    flexDirection: 'column',
  },
  moreButtonText: {
    color: 'white',
    fontSize: 16,
  },
};
