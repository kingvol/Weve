import React, { Component } from 'react';
import { Image, ImageBackground, Keyboard, View } from 'react-native';
import { Card, CardItem, Container, Header, Content, Form, Item, Input, Title } from 'native-base';
import I18n from '../../locales';
// import { loginUser } from '../../actions/auth.actions';
import { primaryColor, backgroundColor, contrastColor, primaryFont } from '../../theme';
import images from '../../images';
import {
  Button,
  //   Container,
  //   Content,
  //   Form,
  //   Header,
  //   Input,
  //   Item,
  Text,
} from '../../components/common';

class LoginForm extends Component {
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
      input,
      loginButton,
      loginButtonText,
      OR,
      or,
      orText,
      register,
      textRegister,
    } = styles;
    return (
      <Container style={containerStyle}>
        <ImageBackground resizeMode="cover" style={background} source={images.backGround}>
          <Header style={header}>
            <Title style={headerText}>{I18n.t('logIn.account_login')}</Title>
          </Header>
          <Content style={containerStyle}>
            <CardItem style={pic}>
              <View style={logoOuterCircle}>
                <Image source={images.logo} style={logoInnerCircle} />
              </View>
            </CardItem>
            <Form style={form}>
              <Card style={formShadow}>
                <Item>
                  <Input
                    style={input}
                    placeholderTextColor={contrastColor}
                    placeholder={I18n.t('common.email')}
                  />
                </Item>
                <Item last>
                  <Input
                    style={input}
                    placeholderTextColor={contrastColor}
                    placeholder={I18n.t('common.password')}
                    secureTextEntry
                  />
                </Item>
                <Title style={{ textAlignVertical: 'center' }}>
                  {I18n.t('logIn.forgot_your_password')}
                </Title>
                <Button block style={loginButton}>
                  <Text style={loginButtonText}>{I18n.t('logIn.log_in')}</Text>
                </Button>
                <View style={OR}>
                  <View style={or} />
                  <Text style={orText}>{I18n.t('logIn.or')}</Text>
                  <View style={or} />
                </View>
                <View style={register}>
                  <Button block transparent>
                    <Text uppercase={false} style={textRegister}>
                      {I18n.t('logIn.register')}
                    </Text>
                  </Button>
                </View>
              </Card>
            </Form>
          </Content>
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
    backgroundColor: 'transparent',
  },
  headerText: {
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 25,
    ...primaryFont,
  },
  pic: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  form: {
    flex: 2,
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
  formShadow: {
    flex: 1,
    height: 350,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  input: {
    color: contrastColor,
  },
  loginButton: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#f3c200',
  },
  loginButtonText: {
    color: 'red',
  },
  OR: {
    flex: 0,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
    flex: 0,
    bottom: 5,
  },
  textRegister: {
    color: primaryColor,
    ...primaryFont,
  },
};

export default LoginForm;
