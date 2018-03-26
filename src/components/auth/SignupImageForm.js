import React, { Component } from 'react';
import { Alert } from 'react-native';
import { View, Text, Thumbnail, Button } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import I18n from '../../locales';
// import { defaultProfile } from '../../constants';

export default class SignupImageForm extends Component {
  constructor() {
    super();
    this.state = {
      imageAttached: false,
      image: null,
    };
  }

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
        this.setState({
          imageAttached: true,
          image: uri,
        });
        this.props.onImageSelect(uri);
      }
    });
  }

  render() {
    return [
      <View key="profileImage" style={{ justifyContent: 'center', flexDirection: 'row' }}>
        <Button
          id="EditProfile.imageButtonWrapper"
          style={{ height: 100, margin: 50 }}
          transparent
          onPress={() => this.captureImage()}
        >
          <Thumbnail
            id="EditProfile.profileImage"
            large
            source={{
              uri: this.state.image,
              // || defaultProfile
            }}
          />
        </Button>
      </View>,
      <View key="upload" style={{ marginBottom: 100, alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: 'white' }}>
          {!this.state.imageAttached ? I18n.t('logIn.upload_photo') : I18n.t('logIn.photo_saved')}
        </Text>
        {!this.state.imageAttached && (
          <Text style={{ fontSize: 16, color: 'white', marginTop: 50 }}>
            {I18n.t('logIn.tap_on_icon')}
          </Text>
        )}
        <Text style={{ fontSize: 14, color: 'white', textAlign: 'center', marginTop: 50 }}>
          {I18n.t('logIn.landscape')}
        </Text>
      </View>,
    ];
  }
}
