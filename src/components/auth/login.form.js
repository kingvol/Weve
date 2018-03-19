import React, { Component } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { CardItem, Container, Form, Item, Input, Label, Title } from 'native-base';
import I18n from '../../locales';
import { primaryColor, backgroundColor, contrastColor, primaryFont } from '../../theme';
import images from '../../images';
import { Button, Center, Text } from '../../components/common';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  };

  onForgotPress = () => {
    this.props.onForgotPress();
  };

  onFieldChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

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
      forgot,
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

    const disabled = (!this.state.email || !this.state.password);

    return (
      <Container containerStyle={containerStyle} id="LoginPage.main-content">
        <ImageBackground resizeMode="cover" style={background} source={images.backGround}>
          <CardItem style={header} id="LoginPage.logo-container">
            <Title style={headerText} id="LoginPage.accountLoginText">
              {I18n.t('logIn.account_login')}
            </Title>
          </CardItem>
          <CardItem style={pic} id="LoginPage.logoWrapper">
            <View style={logoOuterCircle} id="LoginPage.logoOuterCirlcle">
              <Image id="LoginPage.logo" source={images.logo} style={logoInnerCircle} />
            </View>
          </CardItem>
          <Form id="LoginPage.form-container" style={form}>
            <Item id="LoginPage.emailInput" floatingLabel style={item}>
              <Label style={label}>{I18n.t('common.email')}</Label>
              <Input
                style={input}
                value={this.state.email}
                onChangeText={text => this.onFieldChange('email', text)}
              />
            </Item>
            <Item id="LoginPage.passwordInput" floatingLabel style={item}>
              <Label style={label}>{I18n.t('common.password')}</Label>
              <Input
                style={input}
                value={this.state.password}
                onChangeText={text => this.onFieldChange('password', text)}
                secureTextEntry
              />
            </Item>
            {error && (
              <View style={styles.errorContainer}>
                <Text id="LoginPage.errorText" style={{ color: contrastColor, textAlign: 'center' }}>
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
              <Text style={Object.assign({ marginTop: error ? 0 : 35 }, textForgot)}>{I18n.t('logIn.forgot_your_password').toUpperCase()}</Text>
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
              <Text uppercase={false} style={textRegister}>
                {I18n.t('logIn.register').toUpperCase()}
              </Text>
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
    color: contrastColor,
    ...primaryFont,
  },
  input: {
    flex: 1,
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
