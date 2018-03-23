import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
// import { RootActions } from '../../actions';

class HomeTab extends Component {
  render() {
    return (
      <Container>
        <View>
          <Text>Home</Text>
        </View>
      </Container>
    );
  }
}

export default HomeTab;
// export default connect()(HomeTab);
