import React, { Component } from 'react';
import { Text, AsyncStorage, View } from 'react-native';
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
  Button,
} from '../../../components/common';
import { backgroundColor, primaryFont } from '../../../theme';
import { UserActions } from '../../../actions';
import config from '../../../../config';
import { CountriesPicker } from '../../../components/common/CountriesPicker';

const { defaultProfile } = config;
const { fetchProfile } = UserActions;

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    
  }

  state = {
    showRedeemBtn: false,
    lotteryTicket: null,
    lotteryCategory: null,
  };

  componentDidMount() {
    this.props.fetchProfile('me');
    this.checkLotteryStatus();
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

  onReddemPress = async () => {
    try {
      await AsyncStorage.setItem('wevedo_lottery_status', 'done');
      this.setState({ showRedeemBtn: false });
    } catch (error) {
      console.warn('Cant update lottery status :(');
    }
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

  checkLotteryStatus = async () => {
    try {
      const status = await AsyncStorage.getItem('wevedo_lottery_status');
      if (status === 'pending') {
        const lotteryTicket = await AsyncStorage.getItem('wevedo_lottery_ticket');
        const lotteryCategory = await AsyncStorage.getItem('wevedo_lottery_category');
        this.setState({
          showRedeemBtn: true,
          lotteryTicket,
          lotteryCategory,
        });
      }
    } catch (error) {
      console.warn("Can't get a lottery status (for redeem btn)");
    }
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
      appearInCountries,
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
            <View style={{ marginLeft: 65, marginTop: 20 }}>
              <CountriesPicker
                readOnly
                selectedCountries={appearInCountries}
                selectedRegion={regionName}
              />
            </View>
          </Grid>

          {this.props.profile.countryCode === 'GB' && this.state.showRedeemBtn ? (
            <Button
              style={{ marginTop: 30, marginLeft: 50, marginRight: 50 }}
              onPress={this.onReddemPress}
            >
              <Text style={{ color: 'white' }}>
                Redeem ticket {this.state.lotteryCategory === '1' ? 'A' : 'B'}
                {this.state.lotteryTicket}
              </Text>
            </Button>
          ) : null}
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
