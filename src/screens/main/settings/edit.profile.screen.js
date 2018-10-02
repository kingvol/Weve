/* eslint-disable no-underscore-dangle, camelcase */
import React, { Component } from 'react';
import { Alert, Keyboard, View, Dimensions, TextInput, Platform, ActivityIndicator } from 'react-native';
import * as Progress from 'react-native-progress';
import Upload from 'react-native-background-upload';
import _ from 'lodash';
import ImagePicker from 'react-native-image-picker';
import { Picker, CheckBox, Left, Button as NBButton, Icon as NBIcon } from 'native-base';
import CountryPicker from 'react-native-country-picker-modal';
import { connect } from 'react-redux';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';
import MultiSelect from 'react-native-multiple-select';
import Permissions from 'react-native-permissions';
import ImageResizer from 'react-native-image-resizer';
import I18n from '../../../locales';
import config from '../../../../config';
import countries from '../../../countryLib/countries';
import countryLib from '../../../countryLib';
import {
  Button,
  Container,
  Content,
  EditProfileField,
  FieldInput,
  Thumbnail,
  Text,
  RadioButton,
} from '../../../components/common';
import { backgroundColor, lightTextColor } from '../../../theme';
import ProfileImage from '../../../components/home/ProfileImage';
import { UserActions } from '../../../actions';
import APIs from '../../../api';

const { CategoryApi } = APIs;
const categoryApi = new CategoryApi();

const { fetchProfile, updateProfile } = UserActions;
const defaultProfile = 'https://d30y9cdsu7xlg0.cloudfront.net/png/112829-200.png';
const userLocaleCountryCode = DeviceInfo.getDeviceCountry();
const countryCode = countries.includes(userLocaleCountryCode) ? userLocaleCountryCode : 'GB';
const regionName = countryLib[`${countryCode}`].provinces[0];
const ucFirst = s => (s.substr(0, 1).toLowerCase() + s.substr(1)).replace(' ', '');

const ITEM_WIDTH = Dimensions.get('window').width;
const maxLength = 5000;

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.onRegionSelect = this.onRegionSelect.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    const user = Object.assign({}, this.props.user);
    if (!user.profile.providerImages) { user.profile.providerImages = {}; }
    this.state = {
      values: {
        firstName: this.props.user.profile.firstName || '',
        lastName: this.props.user.profile.lastName || '',
        fullName: this.props.user.profile.fullName || '',
        profileImageURL: this.props.user.profile.profileImageURL || undefined,
        profileVideoURL: this.props.user.profile.profileVideoURL || '',
        providerImages: user.profile.providerImages ? {
          0: user.profile.providerImages[0] || undefined,
          1: user.profile.providerImages[1] || undefined,
          2: user.profile.providerImages[2] || undefined,
          3: user.profile.providerImages[3] || undefined,
          4: user.profile.providerImages[4] || undefined,
        } : undefined,
        countryCode,
        regionName,
        isProvider: this.props.user.profile.isProvider,
        categories: this.props.user.profile.categories,
        bio: this.props.user.profile.bio || '',
        descriptionLength: this.props.user.profile.bio ? maxLength - this.props.user.profile.bio.length : maxLength,
        allowPhoneCalls: this.props.user.profile.allowPhoneCalls === undefined ? true :
          this.props.user.profile.allowPhoneCalls,
        chatEnabled: this.props.user.profile.chatEnabled === undefined ? true :
          this.props.user.profile.chatEnabled,
      },
      fullName: this.props.user.profile.fullName || `${this.props.user.profile.firstName} ${this.props.user.profile.lastName}`,
      loading: false,
      imageUploading: false,
      categories: [],
      profileIconColor: 'green',
      isDataModified: false,
      photoPermission: 'undetermined',
      /* Video upload */
      isVideoUploading: false,
      videoUploadProgress: 0,
      uploadId: '',
    };
  }

  async componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    try {
      const categoriesFromServer = await categoryApi.fetchCategoriesList();
      const categories = categoriesFromServer.map((e) => {
        delete e.__v;
        e.name = this.localiseCategory(ucFirst(e.name));
        return e;
      });
      if (!this.props.user.profile.isProvider) {
        this.setState({
          categories,
          values: {
            ...this.state.values,
            categories: [categories[0]._id], // Predefine 'Venue category'
          },
        });
      } else {
        this.setState({
          categories,
        });
      }
    } catch ({ message }) {
      alert(I18n.t(`backend.${message}`, { defaults: [{ scope: 'chat.error' }] }));
    }

    if (this.props.user.profile.countryCode && this.props.user.profile.regionName) {
      this.setState({
        values: {
          ...this.state.values,
          countryCode: this.props.user.profile.countryCode,
          regionName: this.props.user.profile.regionName,
        },
      });
    } else {
      const url =
        'http://api.ipstack.com/check?access_key=e1a9033da20c96cf61c52598eb00cfb9&format=1';
      await fetch(url)
        .then(response => response.json())
        .then((responseJson) => {
          this.setState({
            values: {
              ...this.state.values,
              countryCode: countries.includes(responseJson.country_code)
                ? responseJson.country_code
                : countries.includes(DeviceInfo.getDeviceCountry())
                  ? DeviceInfo.getDeviceCountry()
                  : 'GB',
              regionName: responseJson.region_name,
            },
          });
        });
      this.setState({
        values: {
          ...this.state.values,
          regionName: countryLib[`${this.state.values.countryCode}`].provinces.find(item => (item.substr(0, 2) === this.state.values.regionName.substr(0, 2) ? item : null)),
        },
      });
    }
  }

  componentDidMount() {
    if (!this.props.user.profile._id) {
      this.props.fetchProfile('me');
    }
    Permissions.checkMultiple(['photo']).then((response) => {
      // response is an object mapping type to permission
      this.setState({
        photoPermission: response.photo,
      });
    });
  }

  componentWillReceiveProps({ user }) {
    if (!user.isLoading && user.error && this.state.loading) {
      return;
    }
    if (!user.isLoading && this.state.loading) {
      this.updateProfile();
      this.props.navigator.pop();
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'fade',
      });
    } else if (event.id === 'save') {
      this.onSubmitForm();
    }
  }

  onFullNameChange = (value) => {
    this.dataModified();
    this.setState({ fullName: value });
    let firstName;
    let lastName;
    if (value.includes(' ')) {
      const arrFN = value.split(' ').map(a => a.charAt(0).toUpperCase() + a.substr(1));
      firstName = arrFN.shift() || '';
      lastName = arrFN.join(' ') || '';
    } else {
      firstName = value || '';
      lastName = '';
    }
    this.setState({
      values: {
        ...this.state.values,
        fullName: value,
        firstName: firstName || '',
        lastName: lastName || '',
      },
    });
  };

  onFieldChange = (key, value) => {
    this.dataModified();
    this.setState({
      values: {
        ...this.state.values,
        [key]: value,
      },
    });
  };

  onRegionSelect(region) {
    this.dataModified();
    this.setState({
      values: {
        ...this.state.values,
        regionName: region,
      },
    });
  }

  onSubmitForm = async () => {
    /* Update profile image */
    if (this.state.values.profileImageURL !== this.props.user.profile.profileImageURL) {
      try {
        this.setState({ imageUploading: true });
        const { secure_url } = await this.uploadProfileImage(this.state.values.profileImageURL);
        this.setState({
          values: {
            ...this.state.values,
            profileImageURL: secure_url,
          },
          imageUploading: false,
        });
      } catch ({ message }) {
        Alert.alert(I18n.t(`backend.${message}`, { defaults: [{ scope: 'chat.error' }] }));
        this.setState({ imageUploading: false });
      }
    }

    const { user } = this.props;
    const values = Object.assign({}, this.state.values);

    if (!_.isEqual(user.profile.providerImages, values.providerImages)) {
      await Promise.all(Object.keys(values.providerImages).map(async (index) => {
        if (user.profile.providerImages[index] !== values.providerImages[index] && values.providerImages[index]) {
          try {
            this.setState({ imageUploading: true });
            const { secure_url } = await this.uploadProfileImage(values.providerImages[index]);
            values.providerImages[index] = secure_url;
            this.setState({ values });
            this.setState({ imageUploading: false });
          } catch ({ message }) {
            Alert.alert(I18n.t(`backend.${message}`, { defaults: [{ scope: 'chat.error' }] }));
            this.setState({ imageUploading: false });
          }
        }
      }));
      this.setState({ imageUploading: false });
    }

    if (!this.state.values.profileImageURL && this.state.values.isProvider) {
      Alert.alert(
        I18n.t('logIn.upload_photo'), '',
        [{
          text: `${I18n.t('common.ok')}`,
          onPress: this.newScrollMethod,
        }], {
          cancelable: false,
        },
      );
    } else {
      this.props.updateProfile(this.state.values);
      this.setState({ loading: true });
    }
  };

  onCheckboxPress = () => {
    this.dataModified();
    if (!this.state.values.isProvider) {
      this.setState({
        values: {
          ...this.state.values,
          isProvider: !this.state.values.isProvider,
          categories: [this.state.categories[0]._id],
        },
      });
    } else {
      this.setState({
        values: {
          ...this.state.values,
          isProvider: !this.state.values.isProvider,
          categories: [],
        },
      });
    }
  };

  onCategorySelect = (categories) => {
    this.dataModified();
    this.setState({
      values: {
        ...this.state.values,
        categories,
      },
    });
  };

  onVideoUploadPress = () => {
    /* Open video picker */
    const options = {
      mediaType: 'video',
      noData: true,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.launchImageLibrary(options, ({ error, uri }) => {
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
        this.startVideoUpload(uri);
      }
    });
  }

  onRemoveVideoPress = () => {
    this.setState({
      values: {
        ...this.state.values,
        profileVideoURL: '',
      },
    }, this.dataModified);
  }

  setMultiSelectRef = (ref) => {
    this.multiSelect = ref;
  }

  setScrollRef = (ref) => {
    this.scroll = ref;
  }

  setDefaultImage = () => {
    this.setState({
      values: {
        ...this.state.values,
        profileImageURL: defaultProfile,
      },
    });
  };

  setSaveButton = () => {
    Promise.all([
      Icon.getImageSource('check', 22, '#ffffff'),
    ]).then((sources) => {
      this.props.navigator.setButtons({
        rightButtons: [
          {
            icon: sources[0],
            id: 'save',
          },
        ],
        animated: true,
      });
    });
  }

  newScrollMethod = () => {
    this.scroll._root.scrollToPosition(0, 0);
    this.setState({ profileIconColor: '#d64635' });
  }

  updateProfile = () => {
    this.props.fetchProfile('me');
    this.setState({ loading: false });
  };

  toggleSwitchPhone = () => {
    setTimeout(() => {
      this.dataModified();
      this.setState({
        values: {
          ...this.state.values,
          allowPhoneCalls: !this.state.values.allowPhoneCalls,
        },
      });
    }, 600);
  };

  toggleSwitchChat = () => {
    setTimeout(() => {
      this.dataModified();
      this.setState({
        values: {
          ...this.state.values,
          chatEnabled: !this.state.values.chatEnabled,
        },
      });
    }, 600);
  };

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

  localiseCategory = name => I18n.t(`categories.${name}`);

  uploadProfileImage = (uri) => {
    const { cloudinary: { apiKey, cloud } } = config;
    const timestamp = Date.now().toString();
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloud}/image/upload?upload_preset=profileImg&secure=true`;

    const formdata = new FormData();
    formdata.append('file', { uri, type: 'image/png', name: 'image.png' });
    formdata.append('timestamp', timestamp);
    formdata.append('api_key', apiKey);

    return fetch(uploadUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formdata,
    }).then(raw => raw.json());
  };

  requestPermissionPhoto = () => {
    Permissions.request('photo').then((response) => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      if (response !== 'authorized') {
        this.setDefaultImage();
      }
      this.setState({ photoPermission: response });
    });
  };

  showImagePickerMethod = () => {
    this.dataModified();
    const options = {
      title: I18n.t('editProfile.select_avatar'),
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      const { error, uri: imgUri } = response;
      if (error) {
        Alert.alert(
          I18n.t('editProfile.avatar_error'),
          `${error}`,
          [{ text: `${I18n.t('common.ok')}` }],
          { cancelable: false },
        );
        return;
      }

      if (imgUri) {
        ImageResizer.createResizedImage(imgUri, 1400, 1200, 'JPEG', 50).then(({ uri }) => {
          this.setState({
            values: {
              ...this.state.values,
              profileImageURL: uri,
            },
          });
        });
      }
    });
  };

  captureImage = () => {
    this.showImagePickerMethod();
  };

  captureProviderImage = async (index) => {
    this.dataModified();
    const options = {
      title: I18n.t('editProfile.select_avatar'),
      quality: 0.5,
      noData: true,
      storageOptions: {
        skipBackup: true,
      },
    };

    const imgObj = Object.assign({}, this.state.values.providerImages);

    if (!imgObj[index]) {
      ImagePicker.showImagePicker(options, (response) => {
        const { error, uri: imgUri } = response;
        if (error) {
          Alert.alert(
            I18n.t('editProfile.avatar_error'),
            `${error}`,
            [{ text: `${I18n.t('common.ok')}` }],
            { cancelable: false },
          );
          return;
        }

        if (imgUri) {
          ImageResizer.createResizedImage(imgUri, 1400, 1200, 'JPEG', 50).then(({ uri }) => {
            imgObj[index] = uri;
            this.setState({
              values: {
                ...this.state.values,
                providerImages: imgObj,
              },
            });
          });
        }
      });
    } else {
      imgObj[index] = undefined;
      this.setState({
        values: {
          ...this.state.values,
          providerImages: imgObj,
        },
      });
    }
  };

  profileDescriptionMethod = (value) => {
    this.dataModified();
    this.setState({
      values: {
        ...this.state.values,
        descriptionLength: maxLength - value.length,
        bio: value,
      },
    });
  }

  dataModified = () => {
    if (!this.state.isDataModified) {
      this.setState({ isDataModified: true });
      this.setSaveButton();
    }
  }

  startVideoUpload = (path) => {
    const { cloudinary: { apiKey, cloud } } = config;
    const timestamp = Date.now().toString();

    const options = {
      url: `https://api.cloudinary.com/v1_1/${cloud}/video/upload?secure=true&upload_preset=profileImg`,
      path,
      method: 'POST',
      type: 'multipart',
      field: 'file',
      parameters: {
        timestamp,
        api_key: apiKey,
      },
      // Below are options only supported on Android
      notification: {
        enabled: false,
      },
    };

    Upload.startUpload(options).then((uploadId) => {
      this.setState({ isVideoUploading: true, uploadId });

      Upload.addListener('progress', uploadId, (data) => {
        this.setState({ videoUploadProgress: this.state.isVideoUploading ? data.progress : 0 });
        console.log(`Progress: ${data.progress}%`);
      });

      Upload.addListener('error', uploadId, (data) => {
        console.log(`Error: ${data.error}%`);
      });

      Upload.addListener('cancelled', uploadId, () => {
        console.log('Cancelled!');
      });

      Upload.addListener('completed', uploadId, ({ responseBody }) => { // typeof responseBody === string
        const body = JSON.parse(responseBody);
        this.setState({
          isVideoUploading: false,
          videoUploadProgress: 100,
          values: {
            ...this.state.values,
            profileVideoURL: body.secure_url,
          },
        }, this.dataModified);
      });
    }).catch((err) => {
      console.warn('Upload error!', err);
    });
  }

  cancelVideoUpload = () => {
    const { uploadId } = this.state;
    Upload.cancelUpload(uploadId);
    this.setState({
      uploadId: '',
      isVideoUploading: false,
      videoUploadProgress: 0,
    });
  }

  renderVideoStatus = () => {
    const { isVideoUploading, videoUploadProgress } = this.state;

    if (!isVideoUploading && !videoUploadProgress && this.state.values.profileVideoURL) {
      return (
        <View style={styles.videoButtonsContainer}>
          {/* <Text style={{ marginRight: 5 }}>{I18n.t('editProfile.video_uploaded')}</Text> */}
          <NBButton
            warning
            rounded
            onPress={this.onVideoUploadPress}
            style={{ margin: 5 }}
          >
            <Text
              style={{ fontSize: 0.35 * ITEM_WIDTH / I18n.t('editProfile.new_video').length }}
            >{I18n.t('editProfile.new_video')}
            </Text>
          </NBButton>
          <NBButton
            danger
            rounded
            onPress={this.onRemoveVideoPress}
            style={{ margin: 5 }}
          >
            <Text
              style={{ fontSize: 0.35 * ITEM_WIDTH / I18n.t('editProfile.new_video').length }}
            >{I18n.t('editProfile.remove_video')}
            </Text>
          </NBButton>
        </View>
      );
    }

    if (!isVideoUploading && !videoUploadProgress) {
      return (
        <Button onPress={this.onVideoUploadPress}>
          <Text>{I18n.t('editProfile.upload_a_video')}</Text>
        </Button>
      );
    }

    if (!isVideoUploading && videoUploadProgress === 100) {
      return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <NBIcon name="md-checkmark" style={{ paddingRight: 15, fontSize: 35, color: 'green' }} />
          <Text style={{ marginBottom: 20, color: 'green', marginTop: 5 }}>
            {I18n.t('editProfile.uploading_completed')}
          </Text>
        </View>
      );
    }

    return [
      <View key="addVideoProgress" style={{ marginBottom: 20 }}>
        <Progress.Circle size={80} progress={videoUploadProgress / 100} showsText />
      </View>,
      <Button key="cancelUpload" onPress={this.cancelVideoUpload}>
        <Text>{I18n.t('menu.homeTab.booking.cancel')}</Text>
      </Button>,
    ];
  }

  render() {
    const { photoPermission } = this.state;
    const { checkBoxText, categoryText, styleDescription } = styles;
    const { isProvider } = this.props.user.profile;

    return !this.state.loading ? (
      <Container id="EditProfile.container" style={{ backgroundColor }}>
        <SpinnerOverlay
          visible={this.state.imageUploading}
          textContent={I18n.t('common.loading')}
          textStyle={{ color: '#FFF' }}
        />
        <Content
          id="EditProfile.content"
          padder
          keyboardShouldPersistTaps="always"
          ref={this.setScrollRef}
        >
          { isProvider && photoPermission === 'authorized' ? (
            <View style={{ justifyContent: 'space-between' }}>
               <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                 <ProfileImage
                   id="EditProfile.imageWrapper1"
                   onPress={this.captureImage}
                   source={{
                        uri:
                          this.state.values.profileImageURL ||
                          this.props.user.profile.profileImageURL,
                      }}
                   hasImage={this.state.values.profileImageURL}
                   size={2 / 3}
                   styleContainer={{ marginRight: (ITEM_WIDTH / 20) - 2 }}
                 />

                 <View style={{ justifyContent: 'flex-start' }}>

                   <ProfileImage
                     id="EditProfile.imageWrapper2"
                     onPress={() => this.captureProviderImage(0)}
                     source={{ uri: this.state.values.providerImages[0] }}
                     hasImage={!!this.state.values.providerImages[0]}
                     size={1 / 3}
                     styleContainer={{ marginBottom: ITEM_WIDTH / 20 }}
                   />

                   <ProfileImage
                     id="EditProfile.imageWrapper3"
                     onPress={() => this.captureProviderImage(1)}
                     source={{ uri: this.state.values.providerImages[1] }}
                     hasImage={!!this.state.values.providerImages[1]}
                     size={1 / 3}
                   />
                 </View>
               </View>
               <View style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginTop: ITEM_WIDTH / 20,
                  marginBottom: ITEM_WIDTH / 20,
                }}
               >

                 <ProfileImage
                   id="EditProfile.imageWrapper6"
                   onPress={() => this.captureProviderImage(4)}
                   source={{ uri: this.state.values.providerImages[4] }}
                   hasImage={!!this.state.values.providerImages[4]}
                   size={1 / 3}
                   styleContainer={{ marginRight: ITEM_WIDTH / 20 }}
                 />

                 <ProfileImage
                   id="EditProfile.imageWrapper5"
                   onPress={() => this.captureProviderImage(3)}
                   source={{ uri: this.state.values.providerImages[3] }}
                   hasImage={!!this.state.values.providerImages[3]}
                   size={1 / 3}
                   styleContainer={{ marginRight: (ITEM_WIDTH / 20) - 2 }}
                 />

                 <ProfileImage
                   id="EditProfile.imageWrapper4"
                   onPress={() => this.captureProviderImage(2)}
                   source={{ uri: this.state.values.providerImages[2] }}
                   hasImage={!!this.state.values.providerImages[2]}
                   size={1 / 3}
                 />

               </View>
             </View>

          ) : (
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
                  uri:
                    this.state.values.profileImageURL ||
                    this.props.user.profile.profileImageURL ||
                    defaultProfile,
                }}
                />
                {!this.state.values.profileImageURL || photoPermission !== 'authorized' ? (
             <View
               style={{
                flex: 0,
                bottom: 13,
                paddingLeft: 40,
                position: 'absolute',
              }}
             >
               <Icon
                 style={{
                      color: this.state.profileIconColor,
                      backgroundColor: 'white',
                      borderRadius: 12,
                      paddingTop: 0.8,
                      paddingBottom: 0.8,
                      paddingLeft: 3.3,
                      paddingRight: 3.3,
                    }}
                 size={20}
                 name="plus"
               />
             </View>
              ) : null}
              </Button>
            </View>
          )}
          <FieldInput
            name="fullName"
            input={{ value: this.state.fullName, maxLength: 50 }}
            placeholder={I18n.t('common.fullName')}
            color={lightTextColor}
            onChangeText={value => this.onFullNameChange(value)}
            component={EditProfileField}
            id="EditProfile.fullNameInput"
            autoCapitalize="words"
          />

          {isProvider && (
          <View style={{
            borderColor: lightTextColor,
            borderBottomWidth: 1,
            flexDirection: 'row',
            paddingBottom: 10,
            justifyContent: 'space-between',
            }}
          >
            <Text style={{ flex: 3, color: lightTextColor }}>
              {this.state.values.allowPhoneCalls ?
                  I18n.t('editProfile.CallOn') : I18n.t('editProfile.CallOff') }
            </Text>
            <RadioButton
              onAnimationPress={this.toggleSwitchPhone}
              enabled={this.state.values.allowPhoneCalls}
              styleContainer={{
                marginTop: -8,
                marginBottom: -8,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            />
          </View>
            )}

          {isProvider && (
          <View style={{
            marginTop: 15,
            borderColor: lightTextColor,
            borderBottomWidth: 1,
            flexDirection: 'row',
            paddingBottom: 10,
            justifyContent: 'space-between',
             }}
          >
            <Text style={{ flex: 3, color: lightTextColor }}>
              {this.state.values.chatEnabled ?
                  I18n.t('editProfile.ChatOn') : I18n.t('editProfile.ChatOff') }
            </Text>
            <RadioButton
              onAnimationPress={this.toggleSwitchChat}
              enabled={this.state.values.chatEnabled}
              styleContainer={{
                marginTop: -8,
                marginBottom: -8,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            />
          </View>
          )}

          <View
            style={{
              marginTop: 5,
              borderColor: lightTextColor,
              borderBottomWidth: 1,
              flexDirection: 'row',
              paddingBottom: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ flex: 3, color: lightTextColor }}>
              {I18n.t('editProfile.country')}
            </Text>
            <View style={{ marginRight: 8, marginTop: -10 }}>
              <CountryPicker
                onChange={(value) => {
                  this.setState({
                    values: {
                      ...this.state.values,
                      countryCode: value.cca2,
                      regionName: countryLib[`${value.cca2}`].provinces[0],
                    },
                  });
                }}
                cca2={this.state.values.countryCode}
                excludeCountries={[
                  'AD',
                  'AQ',
                  'BV',
                  'VG',
                  'CW',
                  'XK',
                  'ME',
                  'PS',
                  'BL',
                  'MF',
                  'RS',
                  'SX',
                  'TC',
                  'UM',
                  'VI',
                  'VA',
                  'AX',
                ]}
                translation={I18n.t('editProfile.countryLang')}
                closeable
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 30,
              alignItems: 'center',
              borderColor: lightTextColor,
              borderBottomWidth: 1,
              justifyContent: 'space-between',
              height: Platform.OS === 'ios' && this.state.values.regionName.length > 30 ?
                Platform.OS === 'ios' && this.state.values.regionName.length > 50 ? 75 : 50
                : undefined,
            }}
          >
            <Text style={{ flex: 1, color: lightTextColor }}>
              {I18n.t('editProfile.region')}          
            </Text>

            <View
              style={{ flex: 4, marginLeft: 20, marginRight: 8, alignItems: Platform.OS === 'ios' ? 'flex-end' : undefined }}
            >
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="angle-down" style={{ color: lightTextColor }} />}
                style={Platform.OS === 'android' ?
                  { flex: 1, color: lightTextColor, alignItems: 'flex-end' } :
                  { alignItems: 'center' }}
                itemTextStyle={{ color: lightTextColor }}
                placeholder={I18n.t('logIn.select_category')}
                selectedValue={this.state.values.regionName}
                onValueChange={this.onRegionSelect}
                placeholderTextColor={lightTextColor}
                placeholderStyle={{ color: lightTextColor }}
                textStyle={{ color: lightTextColor, textAlign: Platform.OS === 'ios' ? 'center' : 'right' }}
              >
                {countryLib[`${this.state.values.countryCode}`].provinces.map(item => (
                  <Picker.Item label={item} value={item} key={item} />
              ))}
              </Picker>
            </View>
          </View>
          { !isProvider && (
          <View style={{ marginLeft: -10, marginBottom: 10, flexDirection: 'row' }}>
            <CheckBox
              checked={this.state.values.isProvider}
              onPress={this.onCheckboxPress}
              color="#d64635"
            />
            <Left>
              <Text style={checkBoxText}>{I18n.t('logIn.advertiser')}</Text>
            </Left>
          </View>)}
          {this.state.values.isProvider && (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: lightTextColor, marginBottom: 7 }}>
                { I18n.t('editProfile.description') }
              </Text>
              <View style={{ height: 140, flex: 1 }}>
                <TextInput
                  onChangeText={value => this.profileDescriptionMethod(value)}
                  value={this.state.values.bio}
                  style={styleDescription}
                  maxLength={maxLength}
                  underlineColorAndroid="transparent"
                  placeholder={`5000 ${I18n.t('editProfile.symbols')}`}
                  multiline
                />
                <Text style={{ fontSize: 10, color: 'lightgrey', textAlign: 'right' }}>
                  {this.state.values.descriptionLength}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <MultiSelect
                       // hideTags
                  items={this.state.categories}
                  uniqueKey="_id"
                  ref={this.setMultiselectRef}
                  onSelectedItemsChange={this.onCategorySelect}
                  selectedItems={this.state.values.categories}
                  selectText={I18n.t('common.category')}
                  searchInputPlaceholderText={`${I18n.t('common.category')}...`}
                  fontSize={16}
                  tagRemoveIconColor="#d64635"
                  tagBorderColor="#f3c200"
                  tagTextColor={lightTextColor}
                  selectedItemTextColor={lightTextColor}
                  selectedItemIconColor={lightTextColor}
                  itemTextColor="#000"
                  displayKey="name"
                  searchInputStyle={{ color: lightTextColor }}
                  autoFocusInput={false}
                  submitButtonColor="#d64635"
                  submitButtonText={I18n.t('common.ok')}
                  hideSubmitButton
                />
              </View>
            </View>
            {this.state.values.isProvider && !this.props.user.profile.isProvider && (
            <Text style={categoryText}>
              {I18n.t('logIn.account_activation')}
            </Text>
            )}
            <View style={styles.videoField}>
              {this.renderVideoStatus()}
            </View>
          </View>
          )}
        </Content>
      </Container>
    ) : (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#d64635" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { fetchProfile, updateProfile })(EditProfileScreen);

const styles = {
  checkBoxText: {
    color: lightTextColor,
    marginLeft: 20,
  },
  categoryText: {
    textAlign: 'center',
    color: lightTextColor,
    margin: 5,
    fontSize: 12,
  },
  styleDescription: {
    height: 120,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 7,
    borderRadius: 3,
    textAlignVertical: 'top',
    color: '#4d5460',
  },
  videoField: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
