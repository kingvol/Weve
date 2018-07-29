/* eslint-disable no-confusing-arrow */
import React, { Component } from 'react';
import { Content, Tab, Tabs } from 'native-base';
import {
  View,
  Alert,
  Dimensions,
  Text,
  Linking,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Video, { Container } from 'react-native-af-video-player';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import ImageZoom from 'react-native-image-pan-zoom';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { lightTextColor, primaryFont } from '../../../theme';
import { secondaryColor } from '../../../theme/colors';
import { updateProfile, fetchProfile } from '../../../actions/user.actions';
import Analytics from '../../../services/AnalyticsService';

import I18n from '../../../locales';

const calendarTheme = {
  selectedDayBackgroundColor: lightTextColor,
  todayTextColor: secondaryColor,
  arrowColor: secondaryColor,
  textDayFontFamily: primaryFont.fontFamily,
  textMonthFontFamily: primaryFont.fontFamily,
  textDayHeaderFontFamily: primaryFont.fontFamily,
};

const defaultProfile = 'https://d30y9cdsu7xlg0.cloudfront.net/png/112829-200.png';
const ITEM_WIDTH = Dimensions.get('window').width;
const ITEM_HEIGHT = Dimensions.get('window').height;

// const isPortrait = () => ITEM_HEIGHT >= ITEM_WIDTH;

class ProviderProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      modalForImageVisible: false,
      fullScreenImageUrl: this.props.provider.profileImageURL || defaultProfile,
      videoFullScreen: false,
    };
  }

  componentDidMount() {
    const { _id } = this.props.user.profile;

    Analytics.trackEvent('Provider profile view', { _id });

    if (_id !== this.props.provider._id) {
      Promise.all([
        Icon.getImageSource('comments-o', 20, '#ffffff'),
        Icon.getImageSource('phone', 20, '#ffffff'),
      ]).then((sources) => {
        this.props.navigator.setButtons({
          rightButtons: [
            {
              icon: sources[0],
              id: 'chat',
              disabled:
                !this.props.provider.chatEnabled && this.props.provider.chatEnabled !== undefined,
            },
            {
              icon: sources[1],
              id: 'phone',
              disabled:
                !this.props.provider.allowPhoneCalls &&
                this.props.provider.allowPhoneCalls !== undefined,
            },
          ],
          animated: true,
        });
      });
    }
  }

  componentWillReceiveProps({ user }) {
    const { isLoading, error } = user;
    if (!isLoading && error) {
      Alert.alert(I18n.t('menu.homeTab.booking.error'), I18n.t('menu.homeTab.booking.later'));
    }
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'fade',
      });
    } else if (event.id === 'chat') {
      this.props.navigator.push({
        screen: 'wevedo.ChatScreen',
        title: I18n.t('menu.inbox'),
        passProps: {
          from: 'providerProfile',
          provider: this.props.provider,
        },
        navigatorStyle: {
          navBarBackgroundColor: '#d64635',
          navBarTextColor: 'white',
          navBarButtonColor: 'white',
          navBarTextFontFamily: primaryFont,
        },
      });
    } else if (event.id === 'phone') {
      Linking.canOpenURL(`tel:${this.props.provider.phoneNumber}`)
        .then((supported) => {
          if (!supported) {
            alert(I18n.t('menu.homeTab.calls'));
          } else {
            return Linking.openURL(`tel:${this.props.provider.phoneNumber}`);
          }
        })
        .catch(() => alert(I18n.t('chat.error')));
    }
  }

  onFullScreen = (status) => {
    this.setState({ videoFullScreen: status });
  };

  setModalForImageVisible = (visible, link) => {
    this.setState({ modalForImageVisible: visible });
    if (link) {
      this.setState({ fullScreenImageUrl: link });
    }
  };

  handleDayPress = ({ timestamp, dateString }) => {
    if (this.props.user.profile.isProvider) {
      const { _id } = this.props.user.profile;
      if (_id === this.props.provider._id) {
        if (this.props.user.profile.bookedDates.includes(`${dateString}T00:00:00.000Z`)) {
          Alert.alert(`${I18n.t('menu.homeTab.booking.remove_booking')} ${dateString}?`, '', [
            { text: I18n.t('menu.homeTab.booking.cancel') },
            {
              text: I18n.t('menu.homeTab.booking.remove'),
              onPress: () => this.handleRemoveDate(dateString),
            },
          ]);
        } else {
          Alert.alert(
            I18n.t('menu.homeTab.booking.add_booking'),
            `${I18n.t('menu.homeTab.booking.booking')} ${dateString}.`,
            [
              { text: I18n.t('menu.homeTab.booking.cancel') },
              {
                text: I18n.t('menu.homeTab.booking.book'),
                onPress: () => this.handleBookDate(timestamp),
              },
            ],
          );
        }
      } else {
        Alert.alert(
          I18n.t('menu.homeTab.booking.cannot'),
          I18n.t('menu.homeTab.booking.authority'),
          [{ text: I18n.t('common.ok') }],
        );
      }
    }
  };

  handleRemoveDate = (dateString) => {
    const { bookedDates } = this.props.user.profile;
    const index = bookedDates.indexOf(`${dateString}T00:00:00.000Z`);
    if (index > -1) {
      const bookArray = [...bookedDates];
      bookArray.splice(index, 1);
      this.props.updateProfile({
        bookedDates: bookArray,
      });
    }
  };

  handleBookDate = (timestamp) => {
    this.props.updateProfile({
      bookedDates: [...this.props.user.profile.bookedDates, timestamp],
    });
    Analytics.trackEvent('Booked date', { provider: this.props.user._id, date: timestamp });
  };

  render() {
    const { profile } = this.props.user; // authUser
    const { provider } = this.props;
    const {
      styleImage,
      styleImageFullScreen,
      slide,
      wrapper,
      styleIconButton,
      styleIconImage,
      dotsStyle,
    } = styles;

    const markedDates = profile._id === provider._id ? profile.bookedDates : provider.bookedDates;

    let transformedMarkedDates = {};

    if (markedDates) {
      markedDates.forEach((date) => {
        transformedMarkedDates = {
          ...transformedMarkedDates,
          [moment(date).format('YYYY-MM-DD')]: { disabled: true, selected: true },
        };
      });
    }

    let images;
    if (provider.providerImages) {
      const arrayImages = Object.values(provider.providerImages);
      images = arrayImages.filter(e => !!e);
      images.unshift(provider.profileImageURL);
      images.forEach(item => FastImage.preload([{ uri: item }]));
      if (provider.profileVideoURL) {
        images.splice(1, 0, {
          id: 'video',
          url: provider.profileVideoURL,
        });
      }
    }
    const nameWithRegion = provider.fullName
      ? `${provider.fullName.toUpperCase()} · ${provider.regionName.toUpperCase()}`
      : `${provider.firstName.toUpperCase()} ${provider.lastName.toUpperCase() ||
          ''} · ${provider.regionName.toUpperCase()}`;

    const singleProfileImage = this.props.provider.profileImageURL || defaultProfile;

    return (
      <Content contentContainerStyle={{ flexGrow: 1 }}>
        <Modal
          transparent={false}
          visible={this.state.modalForImageVisible}
          onRequestClose={() => this.setModalForImageVisible(false)}
          supportedOrientations={['portrait', 'landscape']}
        >
          {typeof this.state.fullScreenImageUrl === 'object' ? (
            <Container style={{ flex: 1, backgroundColor: 'black' }}>
              <Video
                key={provider.profileVideoURL}
                url={provider.profileVideoURL}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  marginTop: Platform.OS === 'ios' && 20,
                }}
                logo={Platform.OS === 'ios' ? require('../../../images/WevedoLogoalpha.jpg') : "http://wevedo.com/img/logo.png"} // eslint-disable-line global-require
                title={
                  provider.fullName
                    ? `${provider.fullName}`
                    : `${provider.firstName} ${provider.lastName || ''}`
                }
                inlineOnly={Platform.OS === 'ios'}
                resizeMode={Platform.OS === 'ios' || this.state.videoFullScreen ? 'cover' : 'contain'}
                onFullScreen={status => this.onFullScreen(status)}
                autoPlay
                onEnd={() => this.setModalForImageVisible(false)}
                onMorePress={() => this.setModalForImageVisible(false)}
                onError={() => this.setModalForImageVisible(false)}
              />
            </Container>
          ) : (
            <View style={{ backgroundColor: 'black' }}>
              <TouchableOpacity style={{ marginTop: Platform.OS === 'ios' ? 20 : 5, marginLeft: 5 }} onPress={() => this.setModalForImageVisible(false)}>
                <Icon style={styleIconButton} size={20} name="remove" />
              </TouchableOpacity>
              <ImageZoom
                cropWidth={ITEM_WIDTH}
                cropHeight={ITEM_HEIGHT}
                imageWidth={ITEM_WIDTH}
                imageHeight={ITEM_HEIGHT}
                style={{ backgroundColor: 'black' }}
              >
                <FastImage
                  style={styleImageFullScreen}
                  resizeMode={FastImage.resizeMode.contain}
                  source={{ uri: this.state.fullScreenImageUrl }}
                  priority={FastImage.priority.high}
                />
              </ImageZoom>
            </View>
          )}
        </Modal>
        <View style={{ minHeight: 500 }}>
          {provider.profileImageURL && provider.providerImages && images.length > 1 ? (
            <Swiper
              style={wrapper}
              showsButtons
              autoplay
              autoplayTimeout={5}
              dot={<View style={[{ backgroundColor: '#c4c4c4' }, dotsStyle]} />}
              activeDot={<View style={[{ backgroundColor: '#d64635' }, dotsStyle]} />}
              nextButton={<Text style={{ color: '#d64635', fontSize: 35 }}>›</Text>}
              prevButton={<Text style={{ color: '#d64635', fontSize: 35 }}>‹</Text>}
            >
              {images.map((item, key) => (
                <TouchableWithoutFeedback
                  id={key}
                  key={item}
                  style={slide}
                  onPress={() => this.setModalForImageVisible(true, item)}
                >
                  {item.id === 'video' ? (
                    <View style={{ flex: 1, backgroundColor: 'black' }}>
                      <TouchableOpacity
                        onPress={() => this.setModalForImageVisible(true, item)}
                        style={styleIconImage}
                      >
                        <Icon style={{ color: 'white' }} size={45} name="play-circle-o" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <FastImage source={{ uri: item }} style={styleImage} />
                  )}
                </TouchableWithoutFeedback>
              ))}
            </Swiper>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => this.setModalForImageVisible(true, singleProfileImage)}
            >
              <FastImage
                style={styles.image}
                resizeMode={FastImage.resizeMode.contain}
                source={{ uri: singleProfileImage }}
              />
            </TouchableWithoutFeedback>
          )}

          {this.props.provider.bio && this.props.provider.bio.length ? (
            <Tabs tabBarUnderlineStyle={{ backgroundColor: 'red' }}>
              <Tab
                heading={I18n.t('common.calendar')}
                activeTextStyle={{ color: 'red' }}
                textStyle={{ color: 'black' }}
                tabStyle={{ backgroundColor: 'white' }}
                activeTabStyle={{ backgroundColor: 'white' }}
              >
                <Calendar
                  theme={calendarTheme}
                  style={styles.calendar}
                  markedDates={markedDates ? transformedMarkedDates : null}
                  onDayPress={this.handleDayPress}
                />
              </Tab>
              <Tab
                heading={I18n.t('common.information')}
                activeTextStyle={{ color: 'red' }}
                textStyle={{ color: 'black' }}
                tabStyle={{ backgroundColor: 'white' }}
                activeTabStyle={{ backgroundColor: 'white' }}
              >
                <View style={styles.infoContainer}>
                  <Text
                    adjustsFontSizeToFit
                    minimumFontScale={0.5}
                    style={{
                      fontSize: 1.2 * ITEM_WIDTH / nameWithRegion.length,
                      marginTop: 10,
                    }}
                  >
                    {nameWithRegion}
                  </Text>
                  <Text style={styles.text}>{this.props.provider.bio}</Text>
                </View>
              </Tab>
            </Tabs>
          ) : (
            <Calendar
              theme={calendarTheme}
              style={styles.calendar}
              markedDates={markedDates ? transformedMarkedDates : null}
              onDayPress={this.handleDayPress}
            />
          )}
        </View>
      </Content>
    );
  }
}

const styles = {
  image: {
    height: ITEM_WIDTH / 1.5,
  },
  wrapper: {
    height: ITEM_WIDTH / 1.5,
  },
  slide: {
    flex: 1,
    justifyContent: 'flex-start',
    height: ITEM_WIDTH / 1.5,
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 18,
    margin: 15,
    marginTop: 10,
  },
  styleImage: {
    height: ITEM_WIDTH / 1.5,
    width: ITEM_WIDTH,
  },
  styleIconImage: {
    flex: 0,
    alignSelf: 'center',
    paddingTop: ITEM_WIDTH / 1.5 / 2.3,
    position: 'absolute',
  },
  styleImageFullScreen: {
    height: ITEM_HEIGHT,
  },
  styleIconButton: {
    color: '#d64635',
    backgroundColor: 'black',
    paddingTop: 0.8,
    paddingBottom: 0.8,
    paddingLeft: 3.3,
    paddingRight: 3.3,
    justifyContent: 'flex-end',
  },
  calendar: {},
  infoContainer: {
    alignItems: 'center',
    flex: 1,
  },
  dotsStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: ITEM_WIDTH / 1.5 - 45,
  },
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { updateProfile, fetchProfile })(ProviderProfileScreen);
