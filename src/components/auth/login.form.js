import React, { Component } from 'react';
import { Image, ImageBackground, TouchableOpacity, View, ScrollView } from 'react-native';
import { CardItem, Container, Form, Icon, Item, Input, Label, Title } from 'native-base';
import I18n from '../../locales';
import { primaryColor, backgroundColor, contrastColor, primaryFont } from '../../theme';
import images from '../../images';
import { Button, Center, Text } from '../../components/common';

class LoginForm extends Component {
  constructor() {
    super();
    this.switchSecure = this.switchSecure.bind(this);
    this.state = {
      secureVisible: false,
      phoneNumber: '',
      password: '',
      passwordLabel: I18n.t('common.password'),
      passwordError: false,
      phoneNumberLabel: I18n.t('common.phone'),
      phoneNumberError: false,
    };
  }

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
        case key === 'password'
          ? value.length < 8
          : !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value):
          return {
            [`${key}Error`]: false,
            [`${key}Label`]: I18n.t(`common.${key}`),
          };
        default:
          return {
            [`${key}Error`]: true,
            [`${key}Label`]:
                key === 'password'
                  ? I18n.t('validations.password_length')
                  : I18n.t('validations.phone_invalid'),
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

  switchSecure() {
    this.setState({ secureVisible: !this.state.secureVisible });
  }

  handleSubmit = () => {
    const { phoneNumber, password } = this.state;
    this.props.onSubmitPress(phoneNumber, password);
  };

  render() {
    const {
      containerStyle,
      background,
      header,
      headerText,
      pic,
      form,
      logoOuterCircle,
      logoInnerCircle,
      itemStyle,
      itemPassword,
      item,
      label,
      input,
      textForgot,
      loginButton,
      loginButtonText,
      OR,
      or,
      orText,
      register,
      textRegister,
    } = styles;
    const { isLoading, error } = this.props;

    const disabled = !this.state.phoneNumber || !this.state.password;

    const secure = !this.state.secureVisible;

    return (
      <ScrollView>
        <Container containerStyle={containerStyle} id="LoginPage.main-content">
          <ImageBackground resizeMode="cover" style={background} source={images.backGround}>
            <CardItem style={header} id="LoginPage.logo-container">
              <Title style={headerText} id="LoginPage.accountLoginText">
                {I18n.t('logIn.account_login')}
              </Title>
            </CardItem>
            <CardItem style={pic} id="LoginPage.logoWrapper">
              <View style={logoOuterCircle} id="LoginPage.logoOuterCircle">
                <Image id="LoginPage.logo" source={images.logo} style={logoInnerCircle} />
              </View>
            </CardItem>
            <Form id="LoginPage.form-container" style={form}>
              <View style={itemStyle}>
                <Item
                  error={this.state.phoneNumberError}
                  id="LoginPage.phoneNumberInput"
                  floatingLabel
                  style={item}
                >
                  <Label style={label}>{I18n.t('common.phone')}</Label>
                  <Input
                    style={input}
                    autoCapitalize="none"
                    keyboardType="phone-pad"
                    autoCorrect={false}
                    value={this.state.phoneNumber}
                    onChangeText={text => this.onFieldChange('phoneNumber', text)}
                    onBlur={() => this.onBlur('phoneNumber', this.state.phoneNumber)}
                  />
                  {this.state.phoneNumberError && <Icon name="close-circle" style={{ color: 'red' }} />}
                </Item>
                <View />
              </View>
              {/* <Text style={{ fontSize: 12, paddingHorizontal: 2 }}>{this.state.phoneNumberLabel}</Text> */}
              <View style={itemStyle}>
                <Item
                  error={this.state.passwordError}
                  id="LoginPage.passwordInput"
                  floatingLabel
                  style={itemPassword}
                >
                  <Label style={label}>{this.state.passwordLabel}</Label>
                  <Input
                    style={input}
                    value={this.state.password}
                    onChangeText={text => this.onFieldChange('password', text)}
                    // onFocus={this.onFocus('password', this.state.password)}
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
              {error && (
                <View style={styles.errorContainer}>
                  <Text
                    id="LoginPage.errorText"
                    style={{ color: contrastColor, textAlign: 'center' }}
                  >
                    {error}
                  </Text>
                </View>
              )}
              <Button
                id="LoginPage.forgotPasswordButton"
                style={{ flex: error ? 1 : 2 }}
                block
                transparent
                onPress={this.onForgotPress}
              >
                <Text style={Object.assign({ marginTop: error ? 0 : 35 }, textForgot)}>
                  {I18n.t('logIn.forgot_your_password').toUpperCase()}
                </Text>
              </Button>
              <Button
                id="LoginPage.loginButton"
                block
                style={loginButton}
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
            </Form>
          </ImageBackground>
        </Container>
      </ScrollView>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
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
    flex: 0.3,
    backgroundColor: 'transparent',
  },
  headerText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    ...primaryFont,
  },
  pic: {
    flex: 0.8,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },

  logoOuterCircle: {
    borderRadius: 40,
    width: 80,
    height: 80,
    backgroundColor,
    // top: 30,
  },
  logoInnerCircle: {
    borderRadius: 37,
    width: 74,
    height: 74,
    margin: 3,
  },
  form: {
    flex: 2.5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },

  item: {
    flex: 1,
    // marginTop: 15,
    // marginLeft: 20,
    marginRight: 34,
  },
  itemStyle: {
    flexDirection: 'row',
    flex: 2,
    marginLeft: 10,
    marginRight: 10,
  },
  itemPassword: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    flex: 1,
    textAlign: 'left',
    marginLeft: 10,
    color: contrastColor,
    ...primaryFont,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: contrastColor,
    ...primaryFont,
  },
  textForgot: {
    color: contrastColor,
    ...primaryFont,
  },
  loginButton: {
    flex: 1,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#f3c200',
  },
  loginButtonText: {
    color: 'red',
  },
  OR: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    // alignItems: 'center',
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
    marginTop: 30,
  },
};

export default LoginForm;
