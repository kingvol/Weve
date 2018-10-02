import React, { Component } from 'react';
import { Alert, Platform } from 'react-native';
import { View, Text, Thumbnail, Button } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import I18n from 'react-native-i18n';
import Permissions from 'react-native-permissions';

const defaultProfile =
  'data:image/png;base64,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';

export default class SignupImageForm extends Component {
  state = {
    imageAttached: false,
    image: null,
    photoPermission: 'undetermined',
  };

  componentDidMount() {
    Permissions.checkMultiple(['photo']).then((response) => {
      // response is an object mapping type to permission
      this.setState({
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
        this.setDefaultImage();
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
    const { photoPermission } = this.state;
    if (photoPermission !== 'authorized') {
      Alert.alert(
        I18n.t('editProfile.permissions.allowPhoto'),
        I18n.t('editProfile.permissions.descriptionPhoto'),
        [
          {
            text: I18n.t('common.deny'),
            onPress: this.setDefaultImage,
            style: 'cancel',
          },
          Platform.OS === 'android' || photoPermission === 'undetermined'
            ? { text: I18n.t('common.allow'), onPress: this.showImagePickerMethod() }
            : { text: I18n.t('common.OpenSettings'), onPress: Permissions.openSettings },
        ],
      );
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
