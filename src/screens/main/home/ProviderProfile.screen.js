import React, { Component } from 'react';
import { Content } from 'native-base';
import { View, Image } from 'react-native';

class ProviderProfileScreen extends Component {
  render() {
    return (
      <Content contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ minHeight: 280 }}>
          <Image
            style={styles.image}
            source={{ uri: this.props.provider.profileImageURL }}
          />
        </View>
      </Content>
    );
  }
}

const styles = {
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
};

export default ProviderProfileScreen;
