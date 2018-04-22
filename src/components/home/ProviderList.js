/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import { View, ActivityIndicator, FlatList, Alert, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProviderListItem from './ProviderListItem';
import { primaryFont } from '../../theme';
import APIs from '../../api';
import I18n from '../../locales';

const { ProviderApi } = APIs;
const api = new ProviderApi();

class ProviderList extends PureComponent {
  state = {
    providers: null,
    grid: false,
  };

  componentDidMount() {
    this.fetchProvidersList(
      this.props.category,
      this.props.profile.countryCode,
      this.props.profile.regionName,
    );
  }

  onPressItem = (provider) => {
    this.props.navigator.push({
      screen: 'wevedo.ProviderProfile',
      title: `${provider.firstName} ${provider.lastName || ''}`,
      passProps: { provider },
      navigatorStyle: {
        navBarBackgroundColor: '#d64635',
        navBarTextColor: 'white',
        navBarButtonColor: 'white',
        navBarTextFontFamily: primaryFont,
      },
    });
  };

  onPressGridButton = () => {
    this.setState({
      grid: !this.state.grid,
    });
  };

  fetchProvidersList = async (category, country, region) => {
    try {
      const providers = await api.fetchListByCategory(category, country, region);
      this.setState({ providers });
    } catch ({ message }) {
      Alert.alert(message);
    }
  };

  _keyExtractor = item => item._id;

  _renderItem = ({ item }) => (
    <ProviderListItem provider={item} id={item._id} onPress={this.onPressItem} />
  );

  render() {
    return this.state.providers ? (
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity onPress={this.onPressGridButton}>
              <Icon
                style={{ color: 'lightgrey', alignSelf: 'center', marginTop: 4 }}
                size={24}
                name={this.state.grid ? 'bars' : 'th-large'}
              />
            </TouchableOpacity>
            <Text style={{ alignSelf: 'center', marginLeft: 7 }}>
              {this.state.grid
                ? I18n.t('menu.homeTab.buttonTextList')
                : I18n.t('menu.homeTab.buttonTextGrid')}
            </Text>
          </View>
        </View>
        <FlatList
          data={this.state.providers}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
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
});

export default connect(mapStateToProps)(ProviderList);
