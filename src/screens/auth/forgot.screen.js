/**
 * @providesModule ForgotPassword
 */
/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
  Platform,
  BackHandler,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import { Icon } from 'native-base';
import I18n from 'react-native-i18n';
import { Button, Container, FieldInput, Text, Logo } from '../../components/common';
import { white } from '../../theme/colors';
import { startSingleScreenApp } from '../../../index';
import APIs from '../../api';

const RESET_TOKEN_LENGTH = 4;

const { AuthApi } = APIs;
const api = new AuthApi();

class ForgotPassword extends Component {
  state = {
    step: 1,
    isLoading: false,
    phone: '',
    resetPassword: '',
    resetToken: '',
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    if (Platform.OS === 'android') {
      startSingleScreenApp();
    } else {
      this.props.navigator.resetTo({
        screen: 'wevedo.loginScreen',
        navigatorStyle: {
          navBarHidden: true,
          screenBackgroundColor: 'orange',
        },
      });
    }
    return true;
  };

  onTextChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  onSubmitForm = async () => {
    await Keychain.resetGenericPassword();
    if (this.state.step === 1) {
      this.requestResetToken();
    } else {
      this.checkCode();
    }
  };

  numberPhoneCheck = (phone) => {
    if (phone.match(/[*+*][0-9]*[*+*]/) !== null) {
      if (phone.match(/\+$/)) {
        phone = phone.replace(/\+$/, '');
      } else {
        phone = phone.replace(/[+]/, '');
      }
    } else if (phone.match(/[0-9]*[*+*]/) !== null) {
      phone = phone.replace(/[^\d+]/g, '');
    }
    this.onTextChange('phone', phone.replace(/[^\d+]/g, ''));
  };

  requestResetToken = async () => {
    this.setState({ isLoading: true });

    try {
      await api.resetPasswordRequest(this.state.phone, this.state.resetPassword);
      this.setState({
        isLoading: false,
        step: 2,
      });
    } catch ({ message }) {
      alert(I18n.t(`backend.${message}`, { defaults: [{ scope: 'chat.error' }] }));
    }
  };

  checkCode = async () => {
    this.setState({ isLoading: true });

    try {
      await api.checkResetCode(this.state.phone, this.state.resetToken);
      this.props.navigator.pop();
      Alert.alert(
        `${I18n.t('resetPassword.success')}`,
        `${I18n.t('resetPassword.can_signin')}`,
        [{ text: `${I18n.t('common.ok')}` }],
        { cancelable: false },
      );
    } catch (error) {
      alert(I18n.t(`backend.${error.message}`, { defaults: [{ scope: 'chat.error' }] }));
      this.setState({ isLoading: false });
    }
  };

  renderForm() {
    const { phone, resetPassword, resetToken } = this.state;
    return (
      <View id="ForgotPassword.main-content" style={{ flex: 1 }}>
        <View style={styles.headerWrapper}>
          <Button
            id="ForgotPassword.backButton"
            style={{ flex: 1 }}
            transparent
            onPress={this.onBackPress}
          >
            <Icon style={{ color: white, fontSize: 40 }} name="ios-arrow-back" />
          </Button>
          <Text style={styles.headerText}>{I18n.t('logIn.forgot_password_title')}</Text>
        </View>
        <Logo adaptive styleContainer={{ marginTop: -60 }} />
        {this.state.step === 1 ? (
          <View id="ForgotPassword.formWrapper" style={styles.formWrapper}>
            <View id="ForgotPassword.form" style={styles.form}>
              <FieldInput
                color={white}
                name="phone"
                placeholder={I18n.t('common.phone')}
                id="ForgotPassword.phoneInput"
                onChangeText={text => this.numberPhoneCheck(text)}
                value={this.state.phone}
                keyboardType="phone-pad"
              />
              <FieldInput
                color={white}
                name="password"
                secureTextEntry
                placeholder={I18n.t('changePassword.new_password')}
                id="ForgotPassword.passwordInput"
                onChangeText={text => this.onTextChange('resetPassword', text)}
              />
              {phone && resetPassword && resetPassword.length >= 6 ? (
                <Button
                  block
                  style={styles.button}
                  disabled={!this.state.phone || !this.state.resetPassword}
                  spinner={this.state.isLoading}
                  id="ForgotPassword.resetButton"
                  onPress={this.onSubmitForm}
                >
                  <Text style={styles.buttonText}>{I18n.t('logIn.reset_password')}</Text>
                </Button>
              ) : null}
            </View>
          </View>
        ) : (
          <View id="ForgotPassword.formWrapper" style={styles.formWrapper}>
            <Text style={styles.codeText}>
              {I18n.t('resetPassword.verification_code_send')} {this.state.phone}
            </Text>
            <View id="ForgotPassword.form" style={styles.form}>
              <FieldInput
                color={white}
                name="code"
                placeholder="Enter verification code here"
                id="ForgotPassword.codeInput"
                onChangeText={text => this.onTextChange('resetToken', text)}
              />
              {resetToken.length === RESET_TOKEN_LENGTH ? (
                <Button
                  block
                  style={styles.button}
                  spinner={this.state.isLoading}
                  id="ForgotPassword.resetButton"
                  onPress={this.onSubmitForm}
                >
                  <Text style={styles.buttonText}>{I18n.t('logIn.reset_password')}</Text>
                </Button>
              ) : null}
            </View>
          </View>
        )}
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <Container id="ForgotPassword.container" style={styles.container}>
          <ImageBackground
            id="ForgotPassword.bg-image"
            resizeMode="cover"
            style={styles.background}
            source={require('../../images/loginBackground.png')}
          >
            {this.renderForm()}
          </ImageBackground>
        </Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3c200',
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
  headerWrapper: {
    justifyContent: 'flex-start',
    top: Platform.OS === 'ios' ? 35 : 20,
    flex: 1,
    flexDirection: 'row',
  },
  headerText: {
    color: white,
    fontSize: 25,
    flex: 3,
  },
  formWrapper: {
    flex: 3,
    justifyContent: 'flex-start',
  },
  form: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'column',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#f3c200',
  },
  buttonText: {
    color: 'red',
    fontWeight: 'bold',
  },
  codeText: {
    margin: 10,
    marginBottom: 50,
    alignSelf: 'center',
    color: 'white',
  },
});

export default ForgotPassword;
