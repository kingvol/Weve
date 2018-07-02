import React, { Component } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import { View, Text, Thumbnail, Button } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import I18n from 'react-native-i18n';

const defaultProfile = 'https://d30y9cdsu7xlg0.cloudfront.net/png/112829-200.png';

export default class SignupImageForm extends Component {
  state = {
    imageAttached: false,
    image: null,
  };

  // async function requestCameraPermission() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       {
  //         'title': 'Cool Photo App Camera Permission',
  //         'message': 'Cool Photo App needs access to your camera ' +
  //                    'so you can take awesome pictures.'
  //       }
  //     )
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("You can use the camera")
  //     } else {
  //       console.log("Camera permission denied")
  //     }
  //   } catch (err) {
  //     console.warn(err)
  //   }
  // }

  // requestCameraPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
  //       title: 'Wevedo Storage Permission',
  //       message: 'Wevedo needs access to your camera',
  //     });
  //     if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('Permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }

  captureImage = () => {
    // if (Platform.OS === 'android') {
    //   try {
    //     await this.requestCameraPermission();
    //   } catch (error) {
    //     return;
    //   }
    // }

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
