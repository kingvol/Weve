import React, { Component } from 'react';
import { AsyncStorage, View, TouchableOpacity, Share } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';

import I18n from '../../locales';
import images from '../../images';
import { backgroundColor, primaryFont } from '../../theme';
import { Body, Container, Content, List, ListItem, Right, Text } from '../../components/common';
import { AuthActions } from '../../actions';
import { startSingleScreenApp } from '../../../index';
import vars from '../../env/vars';
import Analytics from '../../services/AnalyticsService';
import APIs from '../../api';

const { AuthApi } = APIs;
const api = new AuthApi();

const { signOut } = AuthActions;

const SETTINGS = [
  {
    name: 'changePassword.title',
    route: 'ChangePasswordScreen',
  },
  {
    name: 'menu.my_profile',
    route: 'ProfileScreen',
  },
];

class SettingsTab extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    Promise.all([Icon.getImageSource('sign-out', 20, '#ffffff')]).then((sources) => {
      this.props.navigator.setButtons({
        rightButtons: [
          {
            icon: sources[0],
            id: 'sign-out',
          },
        ],
        animated: true,
      });
    });
  }

  async onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      // this is the event type for button presses
      if (event.id === 'sign-out') {
        Analytics.trackEvent('Signout');
        await api.signout();
        this.props.signOut();
        startSingleScreenApp();
        await AsyncStorage.removeItem('wevedo_access_token');
      }
    }
  }

  onItemPress = (name, route) => {
    this.props.navigator.push({
      screen: `wevedo.${route}`,
      title: I18n.t(name),
      navigatorStyle: {
        navBarBackgroundColor: '#d64635',
        navBarTextColor: 'white',
        navBarButtonColor: 'white',
        navBarTextFontFamily: primaryFont,
      },
    });
  };

  ShareMessage = () => {
    Share.share({
      message: 'https://wevedo.page.link/get',
    })
      .then(result => console.log(result))
      .catch(errorMsg => console.log(errorMsg));
  };

  render() {
    const { logoOuterCircle, logoInnerCircle } = styles;
    return (
      <Container id="Settings.container" style={{ backgroundColor }}>
        <Content id="Settings.content">
          <List id="Settings.list" style={{ marginLeft: 0 }}>
            {SETTINGS.map(({ name, route }) => (
              <ListItem
                id={`Settings.listitem.${name}`}
                key={Math.random()}
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
          {vars.DB_ENV === 'test' && <Text style={{ alignSelf: 'center' }}>DEV</Text>}
        </Content>
        <View style={{ alignSelf: 'center', marginBottom: 10 }}>
          <TouchableOpacity onPress={this.ShareMessage}>
            <View>
              <Text style={{ textAlign: 'center' }}>{I18n.t('common.share')}</Text>
            </View>
            <View style={logoOuterCircle}>
              <FastImage id="LoginPage.logo" source={images.logo} style={logoInnerCircle} />
            </View>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signOut })(SettingsTab);

const styles = {
  logoOuterCircle: {
    alignItems: 'center',
  },
  logoInnerCircle: {
    width: 57,
    height: 57,
    margin: 3,
  },
};
