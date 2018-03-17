import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <View>
        <Text>Hello from {this.props.root.appTitle}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  root: state.root,
});

export default connect(mapStateToProps)(App);
