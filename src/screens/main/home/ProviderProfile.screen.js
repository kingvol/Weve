import React, { Component } from 'react';
import { Content } from 'native-base';
import { View, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { lightTextColor, primaryFont } from '../../../theme';
import { secondaryColor } from '../../../theme/colors';

const calendarTheme = {
  selectedDayBackgroundColor: lightTextColor,
  todayTextColor: secondaryColor,
  arrowColor: secondaryColor,
  textDayFontFamily: primaryFont.fontFamily,
  textMonthFontFamily: primaryFont.fontFamily,
  textDayHeaderFontFamily: primaryFont.fontFamily,
};

class ProviderProfileScreen extends Component {
  render() {
    return (
      <Content contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ minHeight: 500, flex: 2 }}>
          <Image
            style={styles.image}
            source={{ uri: this.props.provider.profileImageURL }}
          />
          <Calendar
            theme={calendarTheme}
            style={styles.calendar}
            // markedDates={//markedDates}
            // onDayPress={this.handleDayPress.bind(this)}
          />
        </View>
      </Content>
    );
  }
}

const styles = {
  image: {
    resizeMode: 'contain',
    flex: 1,
  },
};

export default ProviderProfileScreen;
