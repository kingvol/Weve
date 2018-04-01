import React, { Component } from 'react';
import { Content } from 'native-base';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
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
  componentDidMount() {
    // this.props.fetchProfile('me');
    console.log(this.props.user.profile.isProvider);
    if (!this.props.user.profile.isProvider) {
      this.props.navigator.setButtons({
        rightButtons: [
          {
            title: 'Edit', // for a textual button, provide the button title (label)
            id: 'edit', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
            testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
            disabled: true, // optional, used to disable the button (appears faded and doesn't interact)
            disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
            showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
            buttonColor: 'blue', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
            buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
            buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
          },
          // {
          //   icon: require('../../img/navicon_add.png'), // for icon button, provide the local image asset name
          //   id: 'add' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
          // }
        ],
        animated: true,
      });
    }
  }

  // componentWillReceiveProps({ user }) {
  //   console.log(this.props.user.profile.isProvider);
  //   if (!user.isLoading && user.error && this.state.loading) {
  //     // Alert.alert(user.error);
  //   }
  //   // if (!user.isLoading && this.state.loading) {
  //   //   this.updateProfile();
  //   //   this.props.navigator.pop();
  //   // }
  // }

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
