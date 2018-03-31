import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ProviderListItem extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.provider.firstName}</Text>
      </View>
    );
  }
}

export default ProviderListItem;
