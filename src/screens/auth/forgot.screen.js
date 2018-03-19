import React, { Component } from 'react';
import { ImageBackground, Alert } from 'react-native';
import { Card, Container, Header, Content, Form, Item, Input, Title } from 'native-base';

import I18n from '../../locales';
import { primaryColor, backgroundColor, contrastColor, primaryFont } from '../../theme';
import images from '../../images';
import {
  Button,
  Text
} from '../../components/common';

class ForgotPassword extends Component {
  state = {
    email: '',
  }

  onBackPress = () => {
    this.props.navigator.pop();
  }

  onSubmitPress = () => {
    if (!this.state.email) {
      // Alert here..
    }
  }

  render() {
    const {
      containerStyle,
      background,
      header,
      headerText,
      form,
      formShadow,
      input,
    } = styles;
    return (
      <Container style={containerStyle}>
        <ImageBackground resizeMode="cover" style={background} source={images.backGround}>
          <Header style={header}>
            <Title style={headerText}>{I18n.t('logIn.forgot_your_password')}</Title>
          </Header>
          <Content style={containerStyle}>
            <Form style={form}>
              <Card style={formShadow}>
                <Item>
                  <Input
                    style={input}
                    placeholderTextColor={contrastColor}
                    placeholder={I18n.t('common.email')}
                  />
                </Item>
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
  form: {
    flex: 2,
  },
  formShadow: {
    flex: 1,
    height: 350,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  input: {
    color: contrastColor,
  },
  forgotButton: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#f3c200',
  },
  forgotButtonText: {
    color: 'red',
  },
};

export default ForgotPassword;
