import React, { Component } from 'react';
import { Content } from 'native-base';
import { View, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { lightTextColor, primaryFont } from '../../../theme';
import { secondaryColor } from '../../../theme/colors';
import { updateProfile, fetchProfile } from '../../../actions/user.actions';

import I18n from '../../../locales';

const calendarTheme = {
  selectedDayBackgroundColor: lightTextColor,
  todayTextColor: secondaryColor,
  arrowColor: secondaryColor,
  textDayFontFamily: primaryFont.fontFamily,
  textMonthFontFamily: primaryFont.fontFamily,
  textDayHeaderFontFamily: primaryFont.fontFamily,
};

class ProviderProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    if (!this.props.user.profile.isProvider) {
      Promise.all([Icon.getImageSource('comments-o', 20, '#ffffff')]).then((sources) => {
        this.props.navigator.setButtons({
          rightButtons: [
            {
              icon: sources[0],
              id: 'chat',
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
      Alert.alert('Error booking date!', 'Please try again later.');
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
    }
  }

  handleDayPress = ({ timestamp, dateString }) => {
    if (this.props.user.profile.isProvider) {
      const { _id } = this.props.user.profile;
      if (_id === this.props.provider._id) {
        Alert.alert('Book the date?', `You are booking for ${dateString}.`, [
          { text: 'Cancel' },
          {
            text: 'Book Now',
            onPress: () => this.handleBookDate(timestamp),
          },
        ]);
      } else {
        Alert.alert('Cannot book!', 'You do not have the authority to book the dates.', [
          { text: 'Ok' },
        ]);
      }
    }
  };

  handleBookDate = (timestamp) => {
    this.props.updateProfile({
      bookedDates: [...this.props.user.profile.bookedDates, timestamp],
    });
  };

  render() {
    const { profile } = this.props.user; // authUser
    const { provider } = this.props;

    const markedDates = profile._id === provider._id ? profile.bookedDates : provider.bookedDates;

    let transformedMarkedDates = {};

    markedDates.forEach((date) => {
      transformedMarkedDates = {
        ...transformedMarkedDates,
        [moment(date).format('YYYY-MM-DD')]: { disabled: true, selected: true },
      };
    });

    return (
      <Content contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ minHeight: 500, flex: 2 }}>
          <FastImage
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
            source={{ uri: this.props.provider.profileImageURL }}
          />
          <Calendar
            theme={calendarTheme}
            style={styles.calendar}
            markedDates={transformedMarkedDates}
            onDayPress={this.handleDayPress}
          />
        </View>
      </Content>
    );
  }
}

const styles = {
  image: {
    flex: 1,
  },
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { updateProfile, fetchProfile })(ProviderProfileScreen);
