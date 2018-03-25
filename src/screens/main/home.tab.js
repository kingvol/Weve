import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Icon } from 'native-base';
// import Icon from 'react-native-vector-icons/FontAwesome';

class HomeTab extends Component {
  render() {
    return (
      <Container>
        <View>
          <Text>Home</Text>
          <Icon name="home" />
        </View>
      </Container>
    );
  }
}

export default HomeTab;
