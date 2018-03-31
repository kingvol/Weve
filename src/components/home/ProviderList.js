import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import APIs from '../../api';

const { ProviderApi } = APIs;
const api = new ProviderApi();

class ProviderList extends Component {
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
      alert(message);
    }
  };

  render() {
    return this.state.providers ? (
      <View><Text>Got a list...</Text></View>
    ) : (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
}

export default ProviderList;

