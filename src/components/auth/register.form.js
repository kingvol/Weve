/* eslint-disable global-require, max-len */
import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { Icon, Picker, CardItem, Title } from 'native-base';
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import CountryPicker from 'react-native-country-picker-modal';
import MultiSelect from 'react-native-multiple-select';
import { contrastColor, primaryFont } from '../../theme';
import { Button, Container, FieldInput, Text, Logo } from '../../components/common';
import SignupImageForm from './signupImage.form';
import Eula from './EULA';
import countries from '../../countryLib/countries';
import countryLib from '../../countryLib';
import images from '../../images';

import APIs from '../../api';

const { AuthApi, CategoryApi } = APIs;
const categoryApi = new CategoryApi();
const api = new AuthApi();
const ucFirst = s => (s.substr(0, 1).toLowerCase() + s.substr(1)).replace(' ', '');
const ITEM_WIDTH = Dimensions.get('window').width;

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.onRegionSelect = this.onRegionSelect.bind(this);
    const userLocaleCountryCode = DeviceInfo.getDeviceCountry();
    const countryCode = countries.includes(userLocaleCountryCode) ? userLocaleCountryCode : 'GB';
    const regionName = countryLib[`${countryCode}`].provinces[0];
    this.state = {
      step: 1,
      values: {
        fullName: '',
        password: '',
        confirmPassword: '',
        category: null,
        image: null,
        countryCode,
        regionName,
      },
      errors: {
        fullName: {
          isError: false,
          error: '',
        },
        password: {
          isError: false,
          error: '',
        },
        confirmPassword: {
          isError: false,
          error: '',
        },
      },
      categories: [],
      loading: false,
      isProvider: false,
      isModalVisible: false,
      modalForCategoryVisible: false,
      modalForUserProfileVisible: true,
    };
  }

  async componentWillMount() {
    try {
      const categoriesFromServer = await categoryApi.fetchCategoriesList();
      const categories = categoriesFromServer.map((e) => {
        delete e.__v;
        e.name = this.localiseCategory(ucFirst(e.name));
        return e;
      });
      this.setState({
        categories,
        values: {
          ...this.state.values,
          category: [categories[0]._id], // Predefine 'Venue category'
        },
      });
    } catch ({ message }) {
      alert(I18n.t(`backend.${message}`, { defaults: [{ scope: 'chat.error' }] }));
    }
    const url = 'http://api.ipstack.com/check?access_key=e1a9033da20c96cf61c52598eb00cfb9&format=1';
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

  onSupplierPress = (bool) => {
    this.setState({
      isProvider: bool,
      modalForUserProfileVisible: false,
    });
  };

  onBackPress = () => {
    this.setState({
      modalForUserProfileVisible: true,
    });
  }

  onContinuePress = () => {
    this.setState({
      step: 2,
    });
  };

  onCategorySelect = (category) => {
    this.setState({
      values: {
        ...this.state.values,
        category,
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

  onImageSelect = (image, cb = () => {}) => {
    this.setState({
      values: {
        ...this.state.values,
        image,
      },
    }, cb);
  };

  onFieldChange = (key, value) => {
    this.setState({
      values: {
        ...this.state.values,
        [key]: value,
      },
      errors: {
        ...this.state.errors,
        [key]: (() => {
          switch (true) {
            case !value.length:
              return {
                isError: true,
                error: I18n.t('validations.required'),
              };
            case key === 'password' && value.length < 8:
              return {
                isError: true,
                error: I18n.t('validations.password_length'),
              };
            case key === 'confirmPassword' && this.state.values.password !== value:
              return {
                isError: true,
                error: I18n.t('validations.password_mismatch'),
              };
            default:
              return {
                isError: false,
                error: '',
              };
          }
        })(),
      },
    });
  };

  onBlur(key, value) {
    if (!value.length) {
      this.setState({
        errors: {
          ...this.state.errors,
          [key]: {
            isError: true,
            error: I18n.t('validations.required'),
          },
        },
      });
    }
  }

  setModalForCategoryVisible = (visible) => {
    this.setState({ modalForCategoryVisible: visible });
  };

  handleSubmit = async () => {
    this.setState({
      loading: false,
      isModalVisible: !this.state.isModalVisible,
    });
  };

  handleDecline = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
    setTimeout(() => {
      Alert.alert(`${I18n.t('eula.error')}`, `${I18n.t('eula.error_message')}`, [
        { text: `${I18n.t('common.ok')}` },
      ]);
    }, 800);
  };

  localiseCategory = name => I18n.t(`categories.${name}`);

  handleAccept = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    const { password, fullName, countryCode, regionName } = this.state.values;
    const arrFN = fullName.split(' ').map(a => a.charAt(0).toUpperCase() + a.substr(1));
    const capitalFullName = arrFN.join(' ');

    if (this.state.isProvider) {
      const { image, category } = this.state.values;
      this.props.onProviderFormSubmit(
        password,
        capitalFullName,
        image,
        category,
        countryCode,
        regionName,
      );
    } else {
      this.props.onFormSubmit(password, capitalFullName, countryCode, regionName);
    }
  };

  renderSignUp = () => {
    const { password, confirmPassword } = this.state.values;
    const disabled =
      this.props.isLoading ||
      this.state.loading ||
      !password ||
      !confirmPassword ||
      (this.state.step === 2 && !this.state.values.image);

    const {
      background,
      headerModal,
      headerModalText,
      registerButton,
      registerButtonText,
    } = styles;

    const choosenCategoriesArray = this.state.categories.filter(item => this.state.values.category.includes(item._id));
    const firstCategory = choosenCategoriesArray[0];
    const firstCategoryName = (firstCategory
      ? choosenCategoriesArray.length > 1
        ? `${firstCategory.name}..`
        : firstCategory.name
      : '');


      return (
        <ScrollView id="SignUp.content" contentContainerStyle={{ justifyContent: 'center' }}>
          <Modal
            transparent={false}
            visible={this.state.modalForUserProfileVisible}
            onRequestClose={() => this.props.onBackPress()}
          >
            <ImageBackground resizeMode="cover" style={background} source={images.backGround}>
              <Logo styleContainer={{ marginTop: 60 }} />
              <CardItem style={headerModal} id="RegisterPage.logo-container">
                <Title style={headerModalText} id="RegisterPage.accountLoginText">
                  {I18n.t('logIn.account_type')}
                </Title>
              </CardItem>
              <View style={{ flex: 2, marginLeft: 50, marginRight: 50 }}>
                <Button
                  id="User.submitButton"
                  block
                  style={registerButton}
                  onPress={() => this.onSupplierPress(false)}
                >
                  <Text style={[registerButtonText, { fontSize: ITEM_WIDTH / 26 }]}>{I18n.t('logIn.user')}</Text>
                </Button>
                <View style={{ marginTop: 25 }}>
                  <Button
                    id="User.submitButton"
                    block
                    style={registerButton}
                    onPress={() => this.onSupplierPress(true)}
                  >
                    <Text style={[registerButtonText, { fontSize: ITEM_WIDTH / 26 }]}>{I18n.t('logIn.supplier')}</Text>
                  </Button>
                </View>
              </View>
            </ImageBackground>
          </Modal>
          <View id="Signup.backButtonAndTitleWrapper" style={styles.header}>
            <Button
              id="Signup.backButton"
              style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}
              transparent
              onPress={this.onBackPress}
            >
              <Icon style={{ color: 'white', fontSize: 40 }} name="ios-arrow-back" />
            </Button>
            <View style={{ flex: 1.7, justifyContent: 'center', alignSelf: 'center' }}>
              <Text
                id="Signup.titleText"
                style={{ color: contrastColor, fontSize: 25, ...primaryFont }}
              >
                {I18n.t('logIn.sign_up')}
              </Text>
            </View>
          </View>
          <Logo />

          <View
            id="Signup.formWrapper"
            style={{ flex: 3, justifyContent: 'flex-start' }}
          >
            <View style={styles.formWrapper}>
              {this.state.step === 1 && (
                <View>
                  <FieldInput
                    name="fullName"
                    color={contrastColor}
                    placeholder={I18n.t(this.state.isProvider ? 'common.businessName' : 'common.fullName')}
                    errorColor={contrastColor}
                    input={{ maxLength: 50 }}
                    onChangeText={text => this.onFieldChange('fullName', text)}
                    onBlur={() => this.onBlur('fullName', this.state.values.fullName)}
                    id="SignUp.fullNameInput"
                    autoCapitalize="words"
                    isError={this.state.errors.fullName.isError}
                    error={this.state.errors.fullName.error}
                  />
                  <FieldInput
                    color={contrastColor}
                    name="password"
                    placeholder={I18n.t('common.password')}
                    errorColor={contrastColor}
                    secureTextEntry
                    onChangeText={text => this.onFieldChange('password', text)}
                    onBlur={() => this.onBlur('password', this.state.values.password)}
                    id="SignUp.passwordInput"
                    isError={this.state.errors.password.isError}
                    error={this.state.errors.password.error}
                  />
                  <FieldInput
                    color={contrastColor}
                    name="confirmPassword"
                    placeholder={I18n.t('logIn.confirm_password')}
                    errorColor={contrastColor}
                    secureTextEntry
                    onChangeText={text => this.onFieldChange('confirmPassword', text)}
                    onBlur={() => this.onBlur('confirmPassword', this.state.values.confirmPassword)}
                    id="SignUp.confirmPasswordInput"
                    isError={this.state.errors.confirmPassword.isError}
                    error={this.state.errors.confirmPassword.error}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      marginTop: 10,
                      marginBottom: 30,
                      alignItems: 'center',
                      borderColor: 'white',
                      borderBottomWidth: 1,
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={{ flex: 3, color: 'white' }}>
                      {`${I18n.t('editProfile.country')} / ${I18n.t('editProfile.region')}`}
                    </Text>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
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
                    <View style={{ flex: 3, alignSelf: 'flex-end' }}>
                      <Picker
                        mode="dropdown"
                        style={{ color: 'white', flex: 1 }}
                        placeholder={I18n.t('logIn.select_category')}
                        selectedValue={this.state.values.regionName}
                        onValueChange={this.onRegionSelect}
                        placeholderTextColor="white"
                        placeholderStyle={{ color: 'white' }}
                        textStyle={{ color: 'white' }}
                      >
                        {countryLib[`${this.state.values.countryCode}`].provinces.map(item => (
                          <Picker.Item label={item} value={item} key={item} />
                      ))}
                      </Picker>
                    </View>
                  </View>

                  {this.state.isProvider &&
                    this.state.step === 1 && (
                      <View>
                        <Modal
                          animationType="fade"
                          transparent={false}
                          visible={this.state.modalForCategoryVisible}
                          onRequestClose={() =>
                            this.setModalForCategoryVisible(!this.state.modalForCategoryVisible)
                          }
                        >
                          <View style={{ margin: 22 }}>
                            <View>
                              <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                  <MultiSelect
                                    // hideTags
                                    items={this.state.categories}
                                    uniqueKey="_id"
                                    ref={(component) => {
                                      this.multiSelect = component;
                                    }}
                                    onSelectedItemsChange={this.onCategorySelect}
                                    selectedItems={this.state.values.category}
                                    selectText={I18n.t('common.category')}
                                    searchInputPlaceholderText={`${I18n.t('common.category')}...`}
                                    fontSize={16}
                                    tagRemoveIconColor="#d64635"
                                    tagBorderColor="#f3c200"
                                    tagTextColor="grey"
                                    itemTextColor="#000"
                                    displayKey="name"
                                    autoFocusInput={false}
                                    submitButtonColor="#f3c200"
                                    submitButtonText={I18n.t('common.ok')}
                                    hideSubmitButton
                                  />
                                </View>
                              </View>
                              <Button
                                id="CategoryForProfile.subbmitButton"
                                block
                                success
                                onPress={() =>
                                  this.setModalForCategoryVisible(!this.state.modalForCategoryVisible)
                                }
                              >
                                {I18n.t('common.ok')}
                              </Button>
                            </View>
                          </View>
                        </Modal>
                        <View style={{ flexDirection: 'row', flex: 1, marginBottom: 10, marginTop: 8 }}>
                          <Text style={{ color: 'white', alignSelf: 'flex-start', flex: 4.5 }}>
                            {I18n.t('common.category')}
                          </Text>
                          <View style={{ alignSelf: 'flex-start', flex: 3 }}>
                            <TouchableOpacity
                              style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}
                              onPress={() => this.setModalForCategoryVisible(true)}
                            >
                              <Text style={{ color: 'white', alignSelf: 'flex-start' }}>
                                {firstCategoryName}
                              </Text>
                              <Icon
                                style={{
                                color: '#5c251c',
                                alignSelf: 'flex-start',
                                textAlignVertical: 'bottom',
                                fontSize: 20,
                                }}
                                name="md-arrow-dropdown"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>


                    )}
                </View>
              )}

              {this.state.isProvider &&
                this.state.step === 1 && (
                  <View style={{ alignItems: 'center', borderTopColor: 'white', borderTopWidth: 1 }}>
                    <Text note style={{ color: 'white', margin: 10, marginBottom: 0 }}>
                      {I18n.t('logIn.account_activation')}
                    </Text>
                  </View>
                )}

              {this.state.isProvider &&
                this.state.step === 2 && (
                  <SignupImageForm key="imfs" onImageSelect={this.onImageSelect} />
                )}

              {!disabled && (!this.props.isLoading || !this.state.loading) ? (
                <Button
                  id="Signup.submitButton"
                  block
                  style={styles.registerButton}
                  onPress={
                    this.state.isProvider && this.state.step === 1
                    ? this.onContinuePress
                      : this.handleSubmit
                  }
                  spinner={this.props.isLoading || this.state.loading}
                  disabled={disabled}
                >
                  <Text style={styles.registerButtonText}>
                    {this.state.isProvider && this.state.step === 1
                      ? I18n.t('common.continue')
                      : I18n.t('logIn.sign_up')}
                  </Text>
                </Button>
              ) : null}

              <Eula
                isModalVisible={this.state.isModalVisible}
                handleDecline={this.handleDecline}
                handleAccept={this.handleAccept}
                id="Signup.EULA"
              />
            </View>
          </View>
        </ScrollView>
      );
  };

  render() {
    return (
      <Container id="SignUp.container" style={{ backgroundColor: 'red' }}>
        <ImageBackground
          id="SignUp.bg-image"
          resizeMode="cover"
          style={styles.background}
          source={images.backGround}
        >
          {this.renderSignUp()}
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: null,
    width: null,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    padding:15,
  },
  header: {
    flex: 1,
    justifyContent: 'space-around',
    top: 20,
    flexDirection: 'row',
  },
  headerModal: {
    alignSelf: 'center',
    flex: 0.7,
    backgroundColor: 'transparent',
  },
  headerModalText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    ...primaryFont,
  },
  registerButton: {
    marginTop: 10,
    backgroundColor: '#f3c200',
  },
  registerButtonText: {
    color: 'red',
  },
  checkBoxText: {
    color: 'white',
    marginLeft: 20,
  },
  categoryText: {
    color: 'white',
    marginTop: 15,
    marginRight: 100,
  },
  formWrapper: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    paddingTop: 15,
    paddingBottom: 10,
    flexDirection: 'column',
    borderRadius:10
  },
});

export default SignupForm;
