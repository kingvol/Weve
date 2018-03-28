import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';
import { backgroundColor, primaryFont } from '../../theme';
import { Body, Container, Content, List, ListItem, Right, Text } from '../../components/common';
import { AuthActions } from '../../actions';
import { startSingleScreenApp } from '../../../index';

const { signOut } = AuthActions;

const SETTINGS = [
  {
    name: 'changePassword.title',
    route: 'ChangePasswordScreen',
  },
  {
    name: 'menu.sign_out',
    route: 'SIGN_OUT',
  },
];

class SettingsTab extends Component {
  onItemPress = async (name, route) => {
    if (route === 'SIGN_OUT') {
      this.props.signOut();
      await AsyncStorage.removeItem('wevedo_access_token');
      startSingleScreenApp();
    } else {
      this.props.navigator.push({
        screen: `wevedo.${route}`,
        title: I18n.t(name),
        // overrideBackPress: true,
        navigatorStyle: {
          navBarBackgroundColor: '#d64635',
          navBarTextColor: 'white',
          navBarButtonColor: 'white',
          navBarTextFontFamily: primaryFont,
        },
      });
    }
  };

  render() {
    return (
      <Container id="Settings.container" style={{ backgroundColor }}>
        <Content id="Settings.content">
          <List id="Settings.list" style={{ marginLeft: 0 }}>
            {SETTINGS.map(({ name, route }) => (
              <ListItem
                id={`Settings.listitem.${name}`}
                key={Date.now()}
                style={{ marginLeft: 0 }}
                icon
                button
                onPress={() => this.onItemPress(name, route)}
              >
                <Body>
                  <Text
                    id={`Settings.listItemTitle.${name}`}
                    style={{ ...primaryFont, paddingLeft: 10 }}
                  >
                    {I18n.t(name)}
                  </Text>
                </Body>
                {route !== 'SIGN_OUT' && (
                  <Right>
                    <Icon name="chevron-right" />
                  </Right>
                )}
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
