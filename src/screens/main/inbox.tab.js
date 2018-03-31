import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Container, Icon } from 'native-base';
import { connect } from 'react-redux';
import { fetchRooms } from '../../actions/chat.actions';

class InboxTab extends Component {
  onPress() {
    this.props.fetchRooms();
  }

  render() {
    return (
      <Container>
        <View>
          <Text>Touch me</Text>
          <TouchableOpacity onPress={() => this.onPress()}>
            <Icon type="FontAwesome" name="inbox" />
          </TouchableOpacity>
        </View>
        <View>
          {/* {this.props.pending && <Text>Pending</Text>}
          {this.props.fulfilled && <Text>Fulfilled</Text>}
          {this.props.rejected && <Text>Rejected</Text>} */}
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  rooms: state.chat,
});

export default connect(mapStateToProps, { fetchRooms })(InboxTab);
