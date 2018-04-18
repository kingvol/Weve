import React, { Component } from 'react';
import { Alert, Keyboard, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Picker } from 'native-base';
import CountryPicker from 'react-native-country-picker-modal';
import { connect } from 'react-redux';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';
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
} from '../../../components/common';
import { backgroundColor, lightTextColor } from '../../../theme';
import { UserActions } from '../../../actions';

const { fetchProfile, updateProfile } = UserActions;
const defaultProfile = 'https://d30y9cdsu7xlg0.cloudfront.net/png/112829-200.png';
const userLocaleCountryCode = DeviceInfo.getDeviceCountry();
const countryCode = countries.includes(userLocaleCountryCode) ? userLocaleCountryCode : 'GB';
const regionName = countryLib[`${countryCode}`].provinces[0];

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.onRegionSelect = this.onRegionSelect.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      values: {
        firstName: this.props.user.profile.firstName || '',
        lastName: this.props.user.profile.lastName || '',
        phoneNumber: this.props.user.profile.phoneNumber || '',
        email: this.props.user.profile.email || '',
        profileImageURL: this.props.user.profile.profileImageURL || '',
        countryCode,
        regionName,
      },
      loading: false,
      imageUploading: false,
    };
  }

  async componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
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
              // regionName: countryLib[`${this.state.values.countryCode}`].provinces.find(item => (item.substr(0, 2) === responseJson.region_name.substr(0, 2) ? item : null)),
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
  }

  componentWillReceiveProps({ user }) {
    if (!user.isLoading && user.error && this.state.loading) {
      Alert.alert(user.error);
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
    }
  }

  onFieldChange = (key, value) => {
    this.setState({
      values: {
        ...this.state.values,
        [key]: value,
      },
    });
  };

  onRegionSelect(region) {
    this.setState({
      values: {
        ...this.state.values,
        regionName: region,
      },
    });
  }

  onSubmitForm = async () => {
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
        Alert.alert(message);
        this.setState({ imageUploading: false });
      }
    }
    this.props.updateProfile(this.state.values);
    this.setState({ loading: true });
  };

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

  updateProfile = () => {
    this.props.fetchProfile('me');
    this.setState({ loading: false });
  };

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
        this.setState({
          values: {
            ...this.state.values,
            profileImageURL: uri,
          },
        });
      }
    });
  };

  render() {
    const { firstName, lastName, phoneNumber, email } = this.state.values;

    return (
      <Container id="EditProfile.container" style={{ backgroundColor }}>
        <SpinnerOverlay
          visible={this.state.imageUploading}
          textContent={I18n.t('common.loading')}
          textStyle={{ color: '#FFF' }}
        />
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
                  uri:
                    this.state.values.profileImageURL ||
                    this.props.user.profile.profileImageURL ||
                    defaultProfile,
                }}
              />
              {!this.state.values.profileImageURL && !this.props.user.profile.profileImageURL ? (
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
                      color: 'grey',
                    }}
                    size={20}
                    name="plus"
                  />
                </View>
              ) : null}
            </Button>
          </View>
          <FieldInput
            name="firstName"
            input={{ value: firstName }}
            placeholder={I18n.t('editProfile.first_name')}
            color={lightTextColor}
            onChangeText={value => this.onFieldChange('firstName', value)}
            component={EditProfileField}
            id="EditProfile.firtsNameInput"
            autoCapitalize="words"
          />
          <FieldInput
            name="lastName"
            input={{ value: lastName }}
            placeholder={I18n.t('editProfile.last_name')}
            color={lightTextColor}
            onChangeText={value => this.onFieldChange('lastName', value)}
            component={EditProfileField}
            id="EditProfile.lastNameInput"
            autoCapitalize="words"
          />
          <FieldInput
            name="phone"
            input={{ value: phoneNumber.toString() }}
            placeholder={I18n.t('editProfile.phone_number')}
            onChangeText={value => this.onFieldChange('phoneNumber', value)}
            color={lightTextColor}
            component={EditProfileField}
            id="EditProfile.phoneNumberInput"
          />
          <FieldInput
            name="email"
            input={{ value: email }}
            placeholder={I18n.t('common.email')}
            onChangeText={value => this.onFieldChange('email', value)}
            color={lightTextColor}
            disabled
            component={EditProfileField}
            id="EditProfile.emailInput"
          />
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              marginTop: 10,
              marginBottom: 30,
              alignItems: 'center',
              borderColor: lightTextColor,
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ flex: 3, color: lightTextColor }}>
              {`${I18n.t('editProfile.country')} / ${I18n.t('editProfile.region')}`}
            </Text>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <CountryPicker
                onChange={(value) => {
                  this.setState({
                    values: {
                      ...this.state.values,
                      countryCode: value.cca2,
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
            <Picker
              mode="dropdown"
              style={{ flex: 3, alignItems: 'flex-end' }}
              itemTextStyle={{ color: lightTextColor }}
              placeholder={I18n.t('logIn.select_category')}
              selectedValue={this.state.values.regionName}
              onValueChange={this.onRegionSelect}
              placeholderTextColor={lightTextColor}
              placeholderStyle={{ color: lightTextColor }}
              textStyle={{ color: lightTextColor }}
            >
              {countryLib[`${this.state.values.countryCode}`].provinces.map(item => (
                <Picker.Item label={item} value={item} key={item} />
              ))}
            </Picker>
          </View>
          <Button
            id="EditProfile.subbmitButton"
            block
            success
            disabled={this.state.loading}
            onPress={this.onSubmitForm}
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

export default connect(mapStateToProps, { fetchProfile, updateProfile })(EditProfileScreen);
