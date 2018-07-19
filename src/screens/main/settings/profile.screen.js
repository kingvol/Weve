import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import I18n from '../../../locales';
import {
  Container,
  Content,
  Label,
  Row,
  Grid,
  Col,
  ProfileField,
  ProfileFieldForCountry,
} from '../../../components/common';
import { backgroundColor, primaryFont } from '../../../theme';
import { UserActions } from '../../../actions';

const { fetchProfile } = UserActions;
const defaultProfile = 'https://d30y9cdsu7xlg0.cloudfront.net/png/112829-200.png';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this.props.fetchProfile('me');
    this.setEditButton();
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'fade',
      });
    } else if (event.id === 'edit') {
      this.onEditPress();
    }
  }

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

  setEditButton = () => {
    Promise.all([Icon.getImageSource('pencil', 22, '#ffffff')]).then((sources) => {
      this.props.navigator.setButtons({
        rightButtons: [
          {
            icon: sources[0],

            id: 'edit',
          },
        ],
        animated: true,
      });
    });
  };

  renderProfileImageName = (fullName, firstName, lastName) => (
    <Row
      style={{
        height: 150,
      }}
    >
      <Col style={{ alignItems: 'center' }}>
        <Row size={65} style={{ height: 65 }}>
          <FastImage
            style={styles.profileImage}
            id="Profile.profileImage"
            large
            source={{ uri: this.props.user.profile.profileImageURL || defaultProfile }}
          />
        </Row>
        <Row size={35} style={{ height: 20 }}>
          <Label id="Profile.first_lastName">
            {fullName || `${firstName || ''} ${lastName || ''}`}
          </Label>
        </Row>
      </Col>
    </Row>
  );

  render() {
    const {
      firstName,
      lastName,
      fullName,
      phoneNumber,
      profileImageURL,
      countryCode,
      regionName,
    } = this.props.profile;
    return (
      <Container id="Profile.container" style={{ backgroundColor }}>
        <Content id="Profile.content" padder>
          <Grid id="Profile.grid">
            {this.renderProfileImageName(fullName, firstName, lastName, profileImageURL)}
            <ProfileField
              id="Profile.phoneField"
              icon="phone"
              title={I18n.t('common.phone')}
              subTitle={phoneNumber || ''}
            />
            <ProfileFieldForCountry
              id="Profile.countryField"
              icon={countryCode || ''}
              title={I18n.t('editProfile.region')}
              subTitle={regionName || ''}
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

const styles = {
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
};

export default connect(mapStateToProps, { fetchProfile })(ProfileScreen);
