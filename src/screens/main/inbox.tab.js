import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Container, Icon } from 'native-base';
import { connect } from 'react-redux';
import { onPending, onFulfilled, onRejected } from '../../actions/inbox.actions';

class InboxTab extends Component {
  onFocus() {
    this.props.onPending(true);
  }

  onChange() {
    this.props.onFulfilled(true);
  }

  onBlur() {
    this.props.onRejected(true);
  }

  render() {
    return (
      <Container>
        <View>
          <Text>Inbox</Text>
          <Icon type="FontAwesome" name="inbox" />
          <TextInput
            placeholder="chat with me"
            onFocus={() => this.onFocus()}
            onChangeText={() => this.onChange()}
            onBlur={() => this.onBlur()}
          />
        </View>
        <View>
          {this.props.pending && <Text>Pending</Text>}
          {this.props.fulfilled && <Text>Fulfilled</Text>}
          {this.props.rejected && <Text>Rejected</Text>}
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  pending: state.inbox.pending,
  fulfilled: state.inbox.fulfilled,
  rejected: state.inbox.rejected,
});

export default connect(mapStateToProps, {
  onPending,
  onFulfilled,
  onRejected,
})(InboxTab);
