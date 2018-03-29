import React, { Component } from 'react';
// import { BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from '../../../locales';
import {
  Button,
  Container,
  Content,
  Thumbnail,
  Label,
  Row,
  Grid,
  Col,
  ProfileField,
} from '../../../components/common';
// import { getProfileDetails } from '../Actions/profileActions';

import { backgroundColor, primaryFont } from '../../../theme';

const defaultProfile = 'https://d30y9cdsu7xlg0.cloudfront.net/png/112829-200.png';

class ProfileScreen extends Component {
  // constructor(props) {
  //   super(props);
  // this.backHandler = this.backHandler.bind(this);
  // }

  onItemPress = () => {
    this.props.navigator.push({
      screen: 'wevedo.EditProfileScreen',
      title: I18n.t('editProfile.title'),
      navigatorStyle: {
        navBarBackgroundColor: '#d64635',
        navBarTextColor: 'white',
        navBarButtonColor: 'white',
        navBarTextFontFamily: primaryFont,
      },
    });
  };

  // backHandler() {
  //   this.props.navigation.dispatch(NavigationActions.reset({
  //     index: 0,
  //     actions: [NavigationActions.navigate({ routeName: 'settingsScreen' })],
  //   }));
  //   return true;
  // }

  // componentDidMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.backHandler);
  //   this.props.getProfileDetails(this.props.auth.user.uid);
  // }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
  // }
  // { firstName, lastName, profileImageURL }  - aguments function bellow:
  renderProfileImageName = () => (
    <Row style={{ height: 150 }}>
      <Col style={{ alignItems: 'center' }}>
        <Row size={65}>
          <Thumbnail
            id="Profile.profileImage"
            large
            source={{
              uri:
                // profileImageURL ||
                defaultProfile,
            }}
          />
        </Row>
        <Row size={35} style={{ height: 20 }}>
          <Label id="Profile.first_lastName">
            {/* {`${firstName || ''} ${lastName || ''}`} */}
          </Label>
        </Row>
      </Col>
    </Row>
  );

  render() {
    // const { firstName, lastName, phone, email, profileImageURL } = this.props.profile;

    return (
      <Container id="Profile.container" style={{ backgroundColor }}>
        <Content id="Profile.content" padder>
          <Grid id="Profile.grid">
            <Row id="Profile.row.editButtonWrapper" style={{ justifyContent: 'flex-end' }}>
              <Button
                id="Profile.row.editProfileButton"
                style={{ marginRight: 10 }}
                transparent
                onPress={() => this.onItemPress()}
              >
                <Icon size={24} name="pencil" />
              </Button>
            </Row>
            {/* {this.renderProfileImageName({ firstName, lastName, profileImageURL })} */}
            {this.renderProfileImageName()}
            <ProfileField
              id="Profile.phoneField"
              icon="phone"
              title={I18n.t('common.phone')}
              // subTitle={phone}
            />
            <ProfileField
              id="Profile.emailField"
              icon="envelope"
              title={I18n.t('common.email')}
              // subTitle={email}
            />
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default ProfileScreen;
