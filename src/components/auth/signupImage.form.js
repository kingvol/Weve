import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { View, Text, Thumbnail, Button } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import I18n from 'react-native-i18n';
import Permissions from 'react-native-permissions';

const defaultProfile = 'https://d30y9cdsu7xlg0.cloudfront.net/png/112829-200.png';

export default class SignupImageForm extends Component {
  state = {
    imageAttached: false,
    image: null,
  };

  setDefaultImage = () => {
    this.setState({
      imageAttached: true,
      image: defaultProfile,
    });
    this.props.onImageSelect(defaultProfile, this.props.handleSubmit);
  };

  skipImageUpload = () => {
    this.setDefaultImage();
  }

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
    Permissions.check('photo').then((response) => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      if (response === 'denied' || response === 'restricted') {
        this.setDefaultImage();
      } else {
        Permissions.request('photo').then((resp) => {
          // Returns once the user has chosen to 'allow' or to 'not allow' access
          if (resp === 'authorized') {
            this.showImagePickerMethod();
          } else {
            this.setDefaultImage();
          }
        });
      }
    });
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
      <View style={styles.skipButton}>
        {!this.state.imageAttached ? (
          <TouchableWithoutFeedback onPress={this.skipImageUpload}>
            <Text style={{ color: 'yellow' }}>{I18n.t('logIn.add_photo_later')}</Text>
          </TouchableWithoutFeedback>
        ) : null}
      </View>,
    ];
  }
}

const styles = {
  skipButton: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    margin: 25,
  },
};
