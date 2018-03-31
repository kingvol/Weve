/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import { View, ActivityIndicator, FlatList, Alert } from 'react-native';
import ProviderListItem from './ProviderListItem';
import APIs from '../../api';

const { ProviderApi } = APIs;
const api = new ProviderApi();

class ProviderList extends PureComponent {
  state = {
    providers: null,
  };

  componentDidMount() {
    this.fetchProvidersList(this.props.category);
  }

  fetchProvidersList = async (category) => {
    try {
      const providers = await api.fetchListByCategory(category);
      this.setState({ providers });
    } catch ({ message }) {
      Alert.alert(message);
    }
  };

  _keyExtractor = item => item._id;

  _renderItem = ({ item }) => (
    <ProviderListItem
      provider={item}
      id={item._id}
      onPressItem={this.onPressItem}
    />
  );

  render() {
    return this.state.providers ? (
      <View style={{ flex: 1 }}>
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

export default ProviderList;

