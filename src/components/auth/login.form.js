import React, { Component } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { CardItem, Container, Form, Icon, Item, Input, Label, Title } from 'native-base';
import I18n from '../../locales';
import {
  primaryColor,
  backgroundColor,
  contrastColor,
  // lightTextColor,
  primaryFont,
} from '../../theme';
import images from '../../images';
import { Button, Center, Text } from '../../components/common';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordSuccess: false,
      passwordLabel: I18n.t('common.password'),
      passwordError: false,
      emailSuccess: false,
      emailLabel: I18n.t('common.email'),
      emailError: false,
    };
  }

  onForgotPress = () => {
    this.props.onForgotPress();
  };

  onFieldChange = (key, value) => {
    this.setState({
      [key]: value,
    });
    if (key === 'password') {
      if (!value.length) {
        this.setState({
          passwordSuccess: false,
          passwordError: true,
          passwordLabel: I18n.t('validations.required'),
        });
      } else if (value.length >= 8) {
        this.setState({
          passwordSuccess: true,
          passwordError: false,
          passwordLabel: I18n.t('common.password'),
        });
      } else {
        this.setState({
          passwordSuccess: false,
          passwordError: true,
          passwordLabel: I18n.t('validations.password_length'),
        });
      }
    } else if (key === 'email') {
      if (!value.length) {
        this.setState({
          emailSuccess: false,
          emailError: true,
          emailLabel: I18n.t('validations.required'),
        });
      } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        this.setState({
          emailSuccess: true,
          emailError: false,
          emailLabel: I18n.t('common.email'),
        });
      } else {
        this.setState({
          emailSuccess: false,
          emailError: true,
          emailLabel: I18n.t('validations.email_invalid'),
        });
      }
    }
  };

  onBlur(key, value) {
    if (key === 'password' && !value.length) {
      this.setState({
        passwordSuccess: false,
        passwordError: true,
        passwordLabel: I18n.t('validations.required'),
      });
    } else if (key === 'email' && !value.length) {
      this.setState({
        emailSuccess: false,
        emailError: true,
        emailLabel: I18n.t('validations.required'),
      });
    }
  }

  handleSubmit = () => {
    const { email, password } = this.state;
    this.props.onSubmitPress(email, password);
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
      item,
      label,
      input,
      // forgot,
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

    const disabled = !this.state.email || !this.state.password;

    return (
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
            <Item
              success={this.state.emailSuccess}
              error={this.state.emailError}
              id="LoginPage.emailInput"
              floatingLabel
              style={item}
            >
              <Label style={label}>{this.state.emailLabel}</Label>
              <Input
                style={input}
                autoCapitalize="none"
                value={this.state.email}
                onChangeText={text => this.onFieldChange('email', text)}
                onBlur={() => this.onBlur('email', this.state.email)}
              />
              {this.state.emailError && <Icon name="close-circle" />}
              {this.state.emailSuccess && <Icon name="ios-checkmark-circle" />}
            </Item>
            <Item
              success={this.state.passwordSuccess}
              error={this.state.passwordError}
              id="LoginPage.passwordInput"
              floatingLabel
              style={item}
            >
              <Label style={label}>{this.state.passwordLabel}</Label>
              <Input
                style={input}
                value={this.state.password}
                onChangeText={text => this.onFieldChange('password', text)}
                // onFocus={this.onFocus('password', this.state.password)}
                onBlur={() => this.onBlur('password', this.state.password)}
                secureTextEntry
              />
              {this.state.passwordError && <Icon name="close-circle" />}
              {this.state.passwordSuccess && <Icon name="ios-checkmark-circle" />}
            </Item>
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
    flex: 2,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
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
