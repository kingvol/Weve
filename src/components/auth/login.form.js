import React, { Component } from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { CardItem, Container, Icon, Item, Input, Label, Title } from 'native-base';
import PhoneInput from 'react-native-phone-input';
import DeviceInfo from 'react-native-device-info';
import I18n from '../../locales';
import { primaryColor, contrastColor, primaryFont } from '../../theme';
import images from '../../images';
import { Button, Center, Text, Logo } from '../../components/common';
import config from '../../../config';
import countries from '../../countryLib/countries';
import { UIActions } from '../../actions';
import vars from '../../env/vars';

const { countryCodeChanged } = UIActions;

const screenHeight = Dimensions.get('window').height;
const { ipUrl } = config;
const userLocaleCountryCode = DeviceInfo.getDeviceCountry();
const countryCode = countries.includes(userLocaleCountryCode) ? userLocaleCountryCode : 'GB';

class LoginForm extends Component {
  constructor() {
    super();
    this.switchSecure = this.switchSecure.bind(this);
    this.state = {
      secureVisible: false,
      phoneNumber: '',
      password: '',
      passwordLabel: '',
      passwordError: false,
      phoneNumberError: false,
      placeholder: '********',
      loadingCountryIP: true,
    };
  }

  componentWillMount() {
    if (this.props.countryCode === '') {
      const p = Promise.race([
        fetch(ipUrl),
        new Promise(((resolve, reject) => {
          setTimeout(() => reject(new Error('request timeout')), 2000);
        })),
      ]);
      p.then(response => response.json())
        .then((responseJson) => {
          const cc = countries.includes(responseJson.country_code)
            ? responseJson.country_code
            : countryCode;
          this.onCountryCodeChange(cc);
          this.setState({
            loadingCountryIP: false,
          });
        });
      p.catch(() => {
        this.onCountryCodeChange(countryCode === 'US' ? 'GB' : countryCode);
        this.setState({
          loadingCountryIP: false,
        });
      });
    } else {
      this.setState({
        loadingCountryIP: false,
      });
    }
  }

  componentDidMount() {
    this.onCountryCodeChange(countryCode);
  }

  onCountryCodeChange = (code) => {
    this.props.countryCodeChanged(code);
  };

  onForgotPress = () => {
    this.props.onForgotPress();
  };

  onFieldChange = (key, value) => {
    this.setState({
      [key]: value,
    });
    this.setState((() => {
      switch (false) {
        case value.length:
          return {
            [`${key}Error`]: true,
            [`${key}Label`]: I18n.t('validations.required'),
          };
        case value.length < 8:
          return {
            [`${key}Error`]: false,
            [`${key}Label`]: '',
          };
        default:
          return {
            [`${key}Error`]: true,
            [`${key}Label`]: I18n.t('validations.password_length'),
          };
      }
    })());
  };

  onBlur(key, value) {
    if (!value.length) {
      this.setState({
        [`${key}Error`]: true,
        [`${key}Label`]: I18n.t('validations.required'),
      });
    }
  }

  onFocus = () => {
    this.setState({ placeholder: '' });
  };

  setPhoneRef = (ref) => {
    this.phoneInput = ref;
  };

  numberPhoneCheck = () => {
    const isValid = this.phoneInput.isValidNumber();
    this.setState({ phoneNumberError: !isValid, phoneNumber: this.phoneInput.getValue() });
    if (isValid) Keyboard.dismiss();
  };

  switchSecure() {
    this.setState({ secureVisible: !this.state.secureVisible });
  }

  handleSubmit = () => {
    const { phoneNumber, password } = this.state;
    this.onCountryCodeChange(this.phoneInput.getISOCode());
    this.props.onSubmitPress(phoneNumber, password);
  };

  render() {
    const {
      containerStyle,
      background,
      header,
      headerText,
      form,
      itemStyle,
      itemPassword,
      item,
      label,
      input,
      inputPhone,
      textForgot,
      loginButton,
      loginButtonText,
      OR,
      or,
      orText,
      register,
      textRegister,
      errorText,
    } = styles;
    const { isLoading, error } = this.props;

    const disabled = !this.state.phoneNumber || !this.state.password;

    const secure = !this.state.secureVisible;

    return (
      <ScrollView>
        <Container containerStyle={containerStyle} id="LoginPage.main-content">
          <ImageBackground resizeMode="cover" style={background} source={images.backGround}>
          {vars.DB_ENV === 'test' && <Text style={{ alignSelf: 'center', paddingTop: 30 }}>DEV</Text>}
            <CardItem style={header} id="LoginPage.logo-container">
            
              <Title style={headerText} id="LoginPage.accountLoginText">
                {I18n.t('logIn.account_login')}
              </Title>
            </CardItem>
            <Logo
              adaptive={false}
              styleContainer={{ marginBottom: screenHeight > 1280 ? 30 : 20 }}
            />
            <View id="LoginPage.form-container" style={form}>
              <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: screenHeight > 600 ? 1.5 : 2 }}
              >
                <View style={itemStyle}>
                  <Label style={label}> {I18n.t('common.phone')} </Label>
                  <Item
                    error={this.state.phoneNumberError}
                    id="LoginPage.phoneNumberInput"
                    style={item}
                  >
                    {this.state.loadingCountryIP ? (
                      <ActivityIndicator size="large" color="#d64635" />
                    ) : (
                      <PhoneInput
                        ref={this.setPhoneRef}
                        initialCountry={this.props.countryCode.toLowerCase()}
                        allowZeroAfterCountryCode={false}
                        onChangePhoneNumber={this.numberPhoneCheck}
                        style={{ flex: 1 }}
                        textStyle={inputPhone}
                      />
                    )}
                    {this.state.phoneNumberError && (
                      <Icon name="close-circle" style={{ color: 'red' }} />
                    )}
                  </Item>
                  {this.state.phoneNumberError && (
                    <Text style={errorText}>{I18n.t('validations.phone_invalid')}</Text>
                  )}
                </View>
                <View style={itemStyle}>
                  <Label style={label}>{I18n.t('common.password')}</Label>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Item
                      error={this.state.passwordError}
                      id="LoginPage.passwordInput"
                      style={itemPassword}
                    >
                      <Input
                        style={input}
                        value={this.state.password}
                        placeholder={this.state.placeholder}
                        placeholderTextColor="white"
                        onChangeText={text => this.onFieldChange('password', text)}
                        onFocus={this.onFocus}
                        onBlur={() => this.onBlur('password', this.state.password)}
                        secureTextEntry={secure}
                      />
                      {this.state.passwordError && (
                        <Icon name="close-circle" style={{ color: 'red' }} />
                      )}
                    </Item>
                    <View
                      style={{
                        alignSelf: 'flex-end',
                        bottom: 2,
                        flex: 0,
                      }}
                    >
                      <TouchableOpacity onPress={this.switchSecure}>
                        <Icon
                          style={{ color: 'white' }}
                          size={24}
                          name={secure ? 'md-eye-off' : 'eye'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={errorText}>{this.state.passwordLabel}</Text>
                </View>
              </KeyboardAvoidingView>
              <View style={{ flex: 2, justifyContent: 'space-between' }}>
                {error && (
                  <View style={styles.errorContainer}>
                    <Text
                      id="LoginPage.errorText"
                      style={{ color: contrastColor, textAlign: 'center' }}
                    >
                      {I18n.t(`backend.${error}`, { defaults: [{ scope: 'chat.error' }] })}
                    </Text>
                  </View>
                )}
                <Button
                  id="LoginPage.forgotPasswordButton"
                  style={{
                    flex: error ? 1 : 2,
                    marginTop: 5,
                    marginBottom: error ? 0 : 5,
                    justifyContent: 'flex-end',
                  }}
                  block
                  transparent
                  onPress={this.onForgotPress}
                >
                  <Text
                    style={Object.assign(
                      { textAlignVertical: error ? 'center' : 'bottom' },
                      textForgot,
                    )}
                  >
                    {I18n.t('logIn.forgot_your_password').toUpperCase()}
                  </Text>
                </Button>
                <Button
                  id="LoginPage.loginButton"
                  block
                  style={Object.assign(loginButton, {
                    flex: error ? 1.2 : 1,
                    marginTop: error ? 10 : 20,
                  })}
                  onPress={this.handleSubmit}
                  disabled={disabled}
                  spinner={isLoading}
                >
                  <Text style={loginButtonText}>{I18n.t('logIn.log_in')}</Text>
                </Button>
                <Center id="LoginPage.dontHaveAnAccountContainer" style={OR}>
                  <View style={or} />
                  <Text style={orText}>{I18n.t('logIn.or')}</Text>
                  <View style={or} />
                </Center>
                <Button
                  id="LoginPage.signUpButton"
                  style={register}
                  block
                  transparent
                  onPress={this.props.onRegisterPress}
                >
                  <Text style={textRegister}>{I18n.t('logIn.register').toUpperCase()}</Text>
                </Button>
              </View>
            </View>
          </ImageBackground>
        </Container>
      </ScrollView>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
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
  },
  header: {
    alignSelf: 'center',
    marginTop:
      screenHeight > 350 ? (Platform.OS === 'ios' ? 30 : 0) : Platform.OS === 'ios' ? 10 : 0,
    backgroundColor: 'transparent',
  },
  headerText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    ...primaryFont,
  },
  form: {
    flex: 2,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingTop: screenHeight > 550 ? 10 : 0,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    borderRadius:10
  },

  item: {
    flex: 1,
    marginTop: 4,
    marginRight: 34,
    marginBottom: 3,
  },
  itemStyle: {
    flex: 1,
    marginTop: 4,
    marginLeft: 10,
    marginRight: 10,
  },
  itemPassword: {
    flex: 1,
    marginTop: 4,
    marginRight: 10,
    paddingBottom: 3,
  },
  label: {
    textAlign: 'left',
    color: '#c2a2a2',
    ...primaryFont,
  },
  input: {
    flex: 1,
    color: contrastColor,
    paddingBottom: 5,
    ...primaryFont,
  },
  inputPhone: {
    flex: 1,
    color: contrastColor,
    fontSize: 17,
    ...primaryFont,
  },
  textForgot: {
    color: contrastColor,
    ...primaryFont,
  },
  loginButton: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#f3c200',
  },
  loginButtonText: {
    color: 'red',
  },
  OR: {
    flex: 0.7,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
  },
  or: {
    flex: 1,
    borderBottomColor: contrastColor,
    borderBottomWidth: 2,
  },
  orText: {
    flex: 1,
    textAlign: 'center',
    bottom: 2,
    color: contrastColor,
    ...primaryFont,
  },
  register: {
    flex: 1,
    bottom: 5,
  },
  textRegister: {
    color: primaryColor,
    ...primaryFont,
  },
  errorContainer: {
    flex: 1,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 10,
    paddingHorizontal: 2,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'yellow',
  },
};

const mapStateToProps = state => ({
  countryCode: state.ui.countryCode,
});

export default connect(mapStateToProps, { countryCodeChanged })(LoginForm);
