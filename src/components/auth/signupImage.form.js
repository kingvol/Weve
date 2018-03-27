import React, { Component } from 'react';
import { Alert } from 'react-native';
import { View, Text, Thumbnail, Button } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import I18n from 'react-native-i18n';

const defaultProfile = 'https://d30y9cdsu7xlg0.cloudfront.net/png/112829-200.png'

export default class SignupImageForm extends Component {
  state = {
    imageAttached: false,
    image: null,
  };

  captureImage = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          imageAttached: true,
          image: source.uri,
        });
        this.props.onImageSelect(source.uri);
      }
    });
  }


  render() {
    return [
      <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
        <Button id="EditProfile.imageButtonWrapper" style={{ height: 100, margin: 50 }} transparent onPress={this.captureImage}>
          <Thumbnail id="EditProfile.profileImage" large source={{ uri: this.state.image || defaultProfile }} />
        </Button>
      </View>,
      <View style={{ marginBottom: 70, alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: 'white' }}>{!this.state.imageAttached ? I18n.t('logIn.upload_photo') : I18n.t('logIn.photo_saved')}</Text>
        {!this.state.imageAttached && <Text style={{ fontSize: 16, color: 'white', marginTop: 40 }}>{I18n.t('logIn.tap_on_icon')}</Text>}
        <Text style={{ fontSize: 14, color: 'white', textAlign: 'center', marginTop: 30 }}>{I18n.t('logIn.landscape')}</Text>
      </View>,
    ];
  }
}