import React, { Component } from 'react';
import { Alert, Platform } from 'react-native';
import { View, Text, Thumbnail, Button } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import I18n from 'react-native-i18n';
import Permissions from 'react-native-permissions';

const defaultProfile = 'https://d30y9cdsu7xlg0.cloudfront.net/png/112829-200.png';

export default class SignupImageForm extends Component {
  state = {
    imageAttached: false,
    image: null,
    cameraPermission: 'undetermined',
    photoPermission: 'undetermined',
  };

  componentDidMount() {
    Permissions.checkMultiple(['camera', 'photo']).then((response) => {
      // response is an object mapping type to permission
      this.setState({
        cameraPermission: response.camera,
        photoPermission: response.photo,
      });
    });
  }

  setDefaultImage = () => {
    this.setState({
      imageAttached: true,
      image: defaultProfile,
    });
    this.props.onImageSelect(defaultProfile);
  };

  requestPermissionCamera = () => {
    Permissions.request('camera').then((response) => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ cameraPermission: response });
    });
  };

  requestPermissionPhoto = () => {
    Permissions.request('photo').then((response) => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ photoPermission: response });
    });
  };

  showImagePickerMethod = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
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
        this.setState({
          imageAttached: true,
          image: uri,
        });
        this.props.onImageSelect(uri);
      }
    });
  };

  captureImage = () => {
    if (
      this.state.photoPermission !== 'authorized' ||
      this.state.cameraPermission !== 'authorized'
    ) {
      if (this.state.photoPermission !== 'authorized') {
        Alert.alert(
          I18n.t('editProfile.permissions.allowPhoto'),
          I18n.t('editProfile.permissions.descriptionPhoto'),
          [
            {
              text: I18n.t('common.deny'),
              onPress: this.setDefaultImage,
              style: 'cancel',
            },
            Platform.OS === 'android' || this.state.photoPermission === 'undetermined'
              ? { text: I18n.t('common.allow'), onPress: this.requestPermissionPhoto }
              : { text: I18n.t('common.OpenSettings'), onPress: Permissions.openSettings },
          ],
        );
      } else if (this.state.cameraPermission !== 'authorized') {
        Alert.alert(
          I18n.t('editProfile.permissions.allowCamera'),
          I18n.t('editProfile.permissions.descriptionCamera'),
          [
            {
              text: 'Deny',
              onPress: this.setDefaultImage,
              style: 'cancel',
            },
            Platform.OS === 'android' || this.state.cameraPermission === 'undetermined'
              ? { text: I18n.t('common.allow'), onPress: this.requestPermissionCamera }
              : { text: I18n.t('common.OpenSettings'), onPress: Permissions.openSettings },
          ],
        );
      }
    } else {
      this.showImagePickerMethod();
    }
  };

  render() {
    return [
      <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
        <Button
          id="EditProfile.imageButtonWrapper"
          style={{ height: 100, margin: 50 }}
          transparent
          onPress={this.captureImage}
        >
          <Thumbnail
            id="EditProfile.profileImage"
            large
            source={{ uri: this.state.image || defaultProfile }}
          />
        </Button>
      </View>,
      <View style={{ marginBottom: 70, alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: 'white' }}>
          {!this.state.imageAttached ? I18n.t('logIn.upload_photo') : I18n.t('logIn.photo_saved')}
        </Text>
        {!this.state.imageAttached && (
          <Text style={{ fontSize: 16, color: 'white', marginTop: 40 }}>
            {I18n.t('logIn.tap_on_icon')}
          </Text>
        )}
        <Text style={{ fontSize: 14, color: 'white', textAlign: 'center', marginTop: 30 }}>
          {I18n.t('logIn.landscape')}
        </Text>
      </View>,
    ];
  }
}
