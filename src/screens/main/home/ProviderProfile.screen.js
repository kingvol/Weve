import React, { Component } from 'react';
import { Content } from 'native-base';
import { View, Alert, Dimensions, Text, Linking } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
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

class ProviderProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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
            Alert.alert("Can't handle phone:", this.props.provider.phoneNumber);
          } else {
            return Linking.openURL(`tel:${this.props.provider.phoneNumber}`);
          }
        })
        .catch(error => alert(I18n.t('chat.error')));
    }
  }

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
    const { styleImage } = styles;

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
      if (provider.bio) {
        images.unshift(provider.bio);
      }
      images.unshift(provider.profileImageURL);
    } else if (provider.bio) {
      images.unshift(provider.bio);
    }

    return (
      <Content contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ minHeight: 500 }}>
          {provider.profileImageURL && provider.providerImages && images.length > 1 ? (
            <Swiper
              style={styles.wrapper}
              showsButtons
              autoplay
              autoplayTimeout={5}
              dotColor="#c4c4c4"
              activeDotColor="#d64635"
              // paginationStyle={{ bottom: 7 }}
              // buttonWrapperStyle={{ paddingHorizontal: 20 }}
              nextButton={<Text style={{ color: '#d64635', fontSize: 35 }}>›</Text>}
              prevButton={<Text style={{ color: '#d64635', fontSize: 35 }}>‹</Text>}
            >
              {images.map((item, key) => (
                <View id={key} key={item} style={styles.slide}>
                  {provider.bio && key === 1 ? (
                    <Text style={styles.text}>{item}</Text>
                  ) : (
                    <FastImage source={{ uri: item }} style={styleImage} />
                  )}
                </View>
              ))}
            </Swiper>
          ) : (
            <FastImage
              style={styles.image}
              resizeMode={FastImage.resizeMode.contain}
              source={{ uri: this.props.provider.profileImageURL || defaultProfile }}
            />
          )}
          <Calendar
            theme={calendarTheme}
            style={styles.calendar}
            markedDates={markedDates ? transformedMarkedDates : null}
            onDayPress={this.handleDayPress}
          />
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
    fontSize: 18,
    margin: 30,
  },
  styleImage: {
    height: ITEM_WIDTH / 1.5,
    width: ITEM_WIDTH,
  },
  calendar: {},
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { updateProfile, fetchProfile })(ProviderProfileScreen);
