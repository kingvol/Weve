import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
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
import { backgroundColor, primaryFont } from '../../../theme';

const defaultProfile = 'https://d30y9cdsu7xlg0.cloudfront.net/png/112829-200.png';

class ProfileScreen extends Component {
  onEditPress = () => {
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

  renderProfileImageName = () => (
    <Row style={{ height: 150 }}>
      <Col style={{ alignItems: 'center' }}>
        <Row size={65}>
          <Thumbnail
            id="Profile.profileImage"
            large
            source={{
              uri: this.props.user.profileImageURL || defaultProfile,
            }}
          />
        </Row>
        <Row size={35} style={{ height: 20 }}>
          <Label id="Profile.first_lastName">
            {`${this.props.profile.firstName || ''} ${this.props.profile.lastName || ''}`}
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
                onPress={this.onEditPress}
              >
                <Icon size={24} name="pencil" />
              </Button>
            </Row>
            {this.renderProfileImageName()}
            <ProfileField
              id="Profile.phoneField"
              icon="phone"
              title={I18n.t('common.phone')}
              subTitle={this.props.profile.phoneNumber || ''}
            />
            <ProfileField
              id="Profile.emailField"
              icon="envelope"
              title={I18n.t('common.email')}
              subTitle={this.props.profile.email}
            />
          </Grid>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  profile: state.user.profile,
});

export default connect(mapStateToProps)(ProfileScreen);
