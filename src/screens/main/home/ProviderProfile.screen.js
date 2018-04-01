import React, { Component } from 'react';
import { Content } from 'native-base';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
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

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'fade',
      });
    }
  }

  render() {
    return (
      <Content contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ minHeight: 500, flex: 2 }}>
          <Image style={styles.image} source={{ uri: this.props.provider.profileImageURL }} />
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

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(ProviderProfileScreen);
