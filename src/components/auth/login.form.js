import React, { Component } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { Card, CardItem, Container, Form, Item, Input, Label, Title } from 'native-base';
import I18n from '../../locales';
import { primaryColor, backgroundColor, contrastColor, primaryFont } from '../../theme';
import images from '../../images';
import { Button, Center, Text } from '../../components/common';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  };

  onSubmitPress = () => {
    /*
    const { onSubmitPress } = this.props;
    const { email, password } = this.state;
      validate data here..
    if (dataValid) {
      onSubmitPress(email, password);
    } */
  };

  onFieldChange = (key, value) => {
    this.setState({
      [key]: value,
    });
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
      formShadow,
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
    /*
      const {
        isLoading,
        error
      } = this.props;
    */
    return (
      <Container style={containerStyle}>
        <ImageBackground resizeMode="cover" style={background} source={images.backGround}>
          <CardItem style={header}>
            <Title style={headerText}>{I18n.t('logIn.account_login')}</Title>
          </CardItem>
          <CardItem style={pic}>
            <View style={logoOuterCircle}>
              <Image source={images.logo} style={logoInnerCircle} />
            </View>
          </CardItem>
          <Form style={form}>
            <Card style={formShadow}>
              <Item floatingLabel style={item}>
                <Label style={label}>{I18n.t('common.email')}</Label>
                <Input
                  style={input}
                  value={this.state.email}
                  onChangeText={text => this.onFieldChange('email', text)}
                  placeholderTextColor={primaryColor}
                  // placeholder="user@gmail.com"
                />
              </Item>
              <Item floatingLabel style={item}>
                <Label style={label}>{I18n.t('common.password')}</Label>
                <Input
                  style={input}
                  value={this.state.password}
                  onChangeText={text => this.onFieldChange('password', text)}
                  placeholderTextColor={primaryColor}
                  // placeholder="password"
                  secureTextEntry
                />
              </Item>
              <Button style={forgot} block transparent>
                <Text uppercase={false} style={textForgot}>
                  {I18n.t('logIn.forgot_your_password')}
                </Text>
              </Button>
              <Button block style={loginButton} onPress={this.onSubmitPress}>
                <Text style={loginButtonText}>{I18n.t('logIn.log_in')}</Text>
              </Button>
              <Center style={OR}>
                <View style={or} />
                <Text style={orText}>{I18n.t('logIn.or')}</Text>
                <View style={or} />
              </Center>
              <Button style={register} block transparent onPress={this.props.onRegisterPress}>
                <Text uppercase={false} style={textRegister}>
                  {I18n.t('logIn.register')}
                </Text>
              </Button>
            </Card>
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
  },
  formShadow: {
    flex: 1,
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
  forgot: {
    flex: 2,
  },
  textForgot: {
    marginTop: 35,
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
};

export default LoginForm;
