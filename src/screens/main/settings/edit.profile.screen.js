import React, { Component } from 'react';
import { Alert, Keyboard, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
// import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import I18n from '../../../locales';
import {
  Button,
  Container,
  Content,
  EditProfileField,
  FieldInput,
  Thumbnail,
} from '../../../components/common';
import { backgroundColor, lightTextColor } from '../../../theme';
import { UserActions } from '../../../actions';

const { fetchProfile } = UserActions;
const defaultProfile = 'https://d30y9cdsu7xlg0.cloudfront.net/png/112829-200.png';

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        firstName: this.props.user.profile.firstName || '',
        lastName: this.props.user.profile.lastName || '',
        phoneNumber: this.props.user.profile.phoneNumber || '',
        email: this.props.user.profile.email || '',
      },
      image: null,
    };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentDidMount() {
    if (!this.props.user.profile._id) {
      this.props.fetchProfile('me');
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = () => {
    this.props.navigator.toggleTabs({
      to: 'hidden',
      animated: false,
    });
  };

  keyboardDidHide = () => {
    this.props.navigator.toggleTabs({
      to: 'shown',
      animated: false,
    });
  };

  // onSubmitForm(profile) {
  //   this.setState({ loading: true });
  //   this.props.updateProfileDetails(profile, this.state.image, () => {
  //     this.setState({ loading: false });
  //     this.props.navigation.goBack();
  //   });
  // }

  // backHandler() {
  //   this.props.navigation.goBack();
  //   return true;
  // }

  // componentDidMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.backHandler);
  // }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
  // }

  // onSubmitForm(profile) {
  //   this.setState({ loading: true });
  //   const arrFN = profile.firstName.split(' ').map(a => a.charAt(0).toUpperCase() + a.substr(1));
  //   profile.firstName = arrFN.join(' ');
  //   profile.lastName = profile.lastName.charAt(0).toUpperCase() + profile.lastName.substr(1);
  //   this.props.updateProfileDetails(profile, this.state.image, () => {
  //     this.setState({ loading: false });
  //     this.props.navigation.goBack();
  //   });
  // }

  captureImage = () => {
    const options = {
      title: I18n.t('editProfile.select_avatar'),
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      const { error, uri } = response;
      if (error) {
        Alert.alert(
          I18n.t('editProfile.avatar_error'),
          `${error}`,
          [{ text: `${I18n.t('common.ok')}` }],
          { cancelable: false },
        );
        return;
      }

      if (uri) {
        this.setState({ image: uri });
      }
    });
  }

  render() {
    const { firstName, lastName, phoneNumber, email, profileImageURL } = this.state.values;
    // const { handleSubmit, initialValues } = this.props;

    return (
      <Container id="EditProfile.container" style={{ backgroundColor }}>
        {/* <SpinnerOverlay
          visible={this.state.loading}
          textContent={I18n.t('common.loading')}
          textStyle={{ color: '#FFF' }}
        /> */}
        <Content id="EditProfile.content" padder keyboardShouldPersistTaps="always">
          <View style={{ justifyContent: 'center' }}>
            <Button
              id="EditProfile.imageButtonWrapper"
              style={{ height: 100 }}
              transparent
              onPress={this.captureImage}
            >
              <Thumbnail
                id="EditProfile.profileImage"
                large
                source={{
                  uri: this.state.image || profileImageURL || defaultProfile,
                }}
              />
            </Button>
          </View>
          <FieldInput
            name="firstName"
            input={{ value: firstName }}
            placeholder={I18n.t('editProfile.first_name')}
            color={lightTextColor}
            component={EditProfileField}
            id="EditProfile.firtsNameInput"
            autoCapitalize="words"
          />
          <FieldInput
            name="lastName"
            input={{ value: lastName }}
            placeholder={I18n.t('editProfile.last_name')}
            color={lightTextColor}
            component={EditProfileField}
            id="EditProfile.lastNameInput"
            autoCapitalize="words"
          />
          <FieldInput
            name="phone"
            input={{ value: phoneNumber }}
            placeholder={I18n.t('editProfile.phone_number')}
            color={lightTextColor}
            component={EditProfileField}
            id="EditProfile.phoneNumberInput"
          />
          <FieldInput
            name="email"
            input={{ value: email }}
            placeholder={I18n.t('common.email')}
            color={lightTextColor}
            disabled
            component={EditProfileField}
            id="EditProfile.emailInput"
          />
          <Button
            id="EditProfile.subbmitButton"
            block
            success
            disabled={this.state.loading}
            // onPress={handleSubmit(this.onSubmitForm.bind(this))}
          >
            {I18n.t('common.done')}
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { fetchProfile })(EditProfileScreen);
