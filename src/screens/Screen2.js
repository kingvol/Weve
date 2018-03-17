import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class Screen2 extends Component {
  render() {
    return (
      <View>
        <Text>Hello from another screen {this.props.root.appTitle}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  root: state.root,
});

export default connect(mapStateToProps)(Screen2);
