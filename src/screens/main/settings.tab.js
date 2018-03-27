import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { backgroundColor, primaryFont } from '../../theme';
import {
  Body, Container, Content, List,
  ListItem, Text,
} from '../../components/common';
import { AuthActions } from '../../actions';
import { startSingleScreenApp } from '../../../index';

const { signOut } = AuthActions;

const SETTINGS = [{
  name: 'menu.sign_out',
  route: '',
  action: 'SIGN_OUT',
}];

class SettingsTab extends Component {
  onItemPress = async (route, action) => {
    if (action === 'SIGN_OUT') {
      this.props.signOut();
      await AsyncStorage.removeItem('wevedo_access_token');
      startSingleScreenApp();
    }
  }

  render() {
    return (
      <Container id="Settings.container" style={{ backgroundColor }}>
        <Content id="Settings.content">
          <List id="Settings.list" style={{ marginLeft: 0 }}>
            {SETTINGS.map(({ name, route, action }) => (
              <ListItem
                id={`Settings.listitem.${name}`}
                key={Date.now()}
                style={{ marginLeft: 0 }}
                icon
                button
                onPress={() => this.onItemPress(route, action)}
              >
                <Body>
                  <Text id={`Settings.listItemTitle.${name}`} style={{ ...primaryFont, paddingLeft: 10 }}>
                    {I18n.t(name)}
                  </Text>
                </Body>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signOut })(SettingsTab);
