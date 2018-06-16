import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
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
  ProfileFieldForCountry,
} from '../../../components/common';
import { backgroundColor, primaryFont } from '../../../theme';
import { UserActions } from '../../../actions';

const { fetchProfile } = UserActions;
const defaultProfile = 'https://d30y9cdsu7xlg0.cloudfront.net/png/112829-200.png';
const ITEM_WIDTH = Dimensions.get('window').width;

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this.props.fetchProfile('me');
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'fade',
      });
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

  renderProfileImageName = (firstName, lastName) => {
    const { isProvider } = this.props.user.profile;
    const { styleImage } = styles;
    let images;
    if (this.props.user.profile.providerImages) {
      images = this.props.user.profile.providerImages.filter(e => !!e);
      if (this.props.user.profile.bio) {
        images.unshift(this.props.user.profile.bio);
      }
      images.unshift(this.props.user.profile.profileImageURL);
    }
    return (
      <Row
        style={{
          height: isProvider && this.props.user.profile.profileImageURL ? ITEM_WIDTH / 3 + 20 : 150,
        }}
      >
        <Col style={{ alignItems: 'center' }}>
          <Row
            size={isProvider && this.props.user.profile.profileImageURL ? ITEM_WIDTH / 3 : 65}
            style={{
              height: isProvider && this.props.user.profile.profileImageURL ? ITEM_WIDTH / 3 : 65,
            }}
          >
            {isProvider && this.props.user.profile.profileImageURL ? (
              <Swiper
                style={styles.wrapper}
                showsButtons
                autoplay
                dotColor="#c4c4c4"
                activeDotColor="#d64635"
                paginationStyle={{
                  bottom: 7,
                }}
                buttonWrapperStyle={{ paddingHorizontal: 20 }}
                nextButton={<Text style={{ color: '#d64635', fontSize: 35 }}>›</Text>}
                prevButton={<Text style={{ color: '#d64635', fontSize: 35 }}>‹</Text>}
              >
                {images.map((item, key) => (
                  <View id={key} key={item} style={styles.slide1}>
                    {this.props.user.profile.bio && key === 1 ? (
                      <Text style={styles.text}>{item}</Text>
                    ) : (
                      <FastImage source={{ uri: item }} style={styleImage} />
                    )}
                  </View>
                ))}
              </Swiper>
            ) : (
              <Thumbnail
                id="Profile.profileImage"
                large
                source={{ uri: this.props.user.profile.profileImageURL || defaultProfile }}
              />
            )}
          </Row>
          <Row
            size={35}
            style={{
              marginTop: isProvider && this.props.user.profile.profileImageURL ? 5 : 0,
              height: 20,
            }}
          >
            <Label id="Profile.first_lastName">{`${firstName || ''} ${lastName || ''}`}</Label>
          </Row>
        </Col>
      </Row>
    );
  };

  render() {
    const {
      firstName,
      lastName,
      phoneNumber,
      profileImageURL,
      countryCode,
      regionName,
    } = this.props.profile;
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
            {this.renderProfileImageName(firstName, lastName, profileImageURL)}
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

export default connect(mapStateToProps, { fetchProfile })(ProfileScreen);

const styles = {
  wrapper: {
    height: ITEM_WIDTH / 3,
    width: ITEM_WIDTH / 1.5,
    alignSelf: 'center',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  styleImage: {
    height: ITEM_WIDTH / 3,
    width: ITEM_WIDTH / 1.5,
  },
};
