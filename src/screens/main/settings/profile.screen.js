import React, { PureComponent } from 'react';
import { Alert, View, BackHandler } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import I18n from 'react-native-i18n';
import {
  Button,
  Container,
  Content,
  EditProfileField,
  FieldInput,
  Thumbnail,
} from '../../../components/common';
import { backgroundColor, lightTextColor } from '../../../theme';

const defaultProfile = 'https://d30y9cdsu7xlg0.cloudfront.net/png/112829-200.png';
// import { updateProfileDetails } from '../Actions/profileActions';

class ProfileScreen extends PureComponent {
  constructor(props) {
    super(props);
    // this.backHandler = this.backHandler.bind(this);

    this.state = {
      loading: false,
      image: null,
    };
  }

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

  captureImage() {
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
    // const { firstName, lastName, phone, email, profileImageURL } = this.props.profile;
    // const { handleSubmit, initialValues } = this.props;

    return (
      <Container id="EditProfile.container" style={{ backgroundColor }}>
        <SpinnerOverlay
          visible={this.state.loading}
          textContent={I18n.t('common.loading')}
          textStyle={{ color: '#FFF' }}
        />
        <Content id="EditProfile.content" padder keyboardShouldPersistTaps="always">
          <View style={{ justifyContent: 'center' }}>
            <Button
              id="EditProfile.imageButtonWrapper"
              style={{ height: 100 }}
              transparent
              onPress={() => this.captureImage()}
            >
              <Thumbnail
                id="EditProfile.profileImage"
                large
                source={{
                  uri:
                    this.state.image ||
                    // profileImageURL ||
                    defaultProfile,
                }}
              />
            </Button>
          </View>
          <FieldInput
            name="firstName"
            placeholder={I18n.t('editProfile.first_name')}
            color={lightTextColor}
            component={EditProfileField}
            id="EditProfile.firtsNameInput"
            autoCapitalize="words"
          />
          <FieldInput
            name="lastName"
            placeholder={I18n.t('editProfile.last_name')}
            color={lightTextColor}
            component={EditProfileField}
            id="EditProfile.lastNameInput"
            autoCapitalize="words"
          />
          <FieldInput
            name="phone"
            placeholder={I18n.t('editProfile.phone_number')}
            color={lightTextColor}
            component={EditProfileField}
            id="EditProfile.phoneNumberInput"
          />
          <FieldInput
            name="email"
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

export default ProfileScreen;
