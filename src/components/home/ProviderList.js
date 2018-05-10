/* eslint-disable no-underscore-dangle */
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
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProviderListItem from './ProviderListItem';
import ProviderGridItem from './ProviderGridItem';
import { primaryFont, backgroundColor } from '../../theme';
import APIs from '../../api';
import I18n from '../../locales';

const { ProviderApi } = APIs;
const api = new ProviderApi();
const ITEM_WIDTH = Dimensions.get('window').width;

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

  onGridChange() {
    this.props.GridChanged();
  }

  fetchProvidersList = async (category, country, region) => {
    try {
      const providers = await api.fetchListByCategory(category, country, region);
      this.setState({ providers });
    } catch ({ message }) {
      Alert.alert(message);
    }
  };

  _keyExtractor = item => item._id;

  _renderGridItem = ({ item }) => (
    <ProviderGridItem
      provider={item}
      id={item._id}
      itemWidth={ITEM_WIDTH / 2}
      onPress={this.onPressItem}
    />
  );

  _renderItem = ({ item }) => (
    <ProviderListItem
      provider={item}
      id={item._id}
      itemWidth={ITEM_WIDTH / 2.5}
      onPress={this.onPressItem}
    />
  );

  render() {
    const { containerStyle, buttonsRow, buttonView } = styles;
    return this.state.providers ? (
      <View style={containerStyle}>
        <View style={buttonsRow}>
          <View style={buttonView}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
              }}
              onPress={this.onPressGridButton}
            >
              <Icon
                style={{
                  color: this.state.grid ? '#d64635' : '#c4c4c4',
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
                  color: this.state.grid ? '#d64635' : '#c4c4c4',
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
              onPress={this.onPressGridButton}
            >
              <Icon
                style={{
                  color: this.state.grid ? '#c4c4c4' : '#d64635',
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
                  color: this.state.grid ? '#c4c4c4' : '#d64635',
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
          data={this.state.providers}
          keyExtractor={this._keyExtractor}
          renderItem={this.state.grid ? this._renderGridItem : this._renderItem}
          key={this.state.grid ? 1 : 0}
          numColumns={this.state.grid ? 2 : 1}
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
  grid: state.appView.grid,
});

export default connect(mapStateToProps)(ProviderList);

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
