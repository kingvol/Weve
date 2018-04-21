/**
 * @providesModule ForgotPassword
 */
/* eslint-disable global-require */
import React, { Component } from 'react';
import { Alert, ImageBackground, StyleSheet, View } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Button, Container, Content, FieldInput, Text } from '../../components/common';
import { white } from '../../theme/colors';
import APIs from '../../api';

const { AuthApi } = APIs;
const api = new AuthApi();

class ForgotPassword extends Component {
  state = {
    step: 1,
    isLoading: false,
    email: '',
    resetPassword: '',
    resetToken: '',
  };

  onBackPress = () => {
    this.props.navigator.pop();
  };

  onTextChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  }

  requestResetToken = async () => {
    this.setState({ isLoading: true });

    try {
      await api.resetPasswordRequest(this.state.email, this.state.resetPassword);
      this.setState({
        isLoading: false,
        step: 2,
      })
    } catch (error) {
      alert(error);
    }
  }

  checkCode = async () => {
    this.setState({ isLoading: true });

    try {
      await api.checkResetCode(this.state.email, this.state.resetToken);
      this.props.navigator.pop();
      Alert.alert(
        `${I18n.t('resetPassword.success')}`,
        'You can sign in with your new password',
        [{ text: `${I18n.t('common.ok')}` }],
        { cancelable: false }
      );
    } catch (error) {
      alert(error.message);
      this.setState({ isLoading: false });
    }
  }

  onSubmitForm = () => {
    if (this.state.step === 1) {
      this.requestResetToken();
    } else {
      this.checkCode();
    }
  };

  renderForm() {
    return (
      <Container id="ForgotPassword.main-content" style={{ flex: 1 }}>
        {/* <Content id="ForgotPassword.main-content" padder keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}> */}
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
        {this.state.step === 1 ? (
          <View id="ForgotPassword.formWrapper" style={styles.formWrapper}>
          <View id="ForgotPassword.form" style={styles.form}>
            <FieldInput
              color={white}
              name="email"
              placeholder={I18n.t('common.email')}
              id="ForgotPassword.emailInput"
              onChangeText={text => this.onTextChange('email', text)}
            />
            <FieldInput
              color={white}
              name="passowrd"
              secureTextEntry
              placeholder="New password"
              id="ForgotPassword.emailInput"
              onChangeText={text => this.onTextChange('resetPassword', text)}
            />
            <Button
              block
              style={styles.button}
              spinner={this.state.isLoading}
              id="ForgotPassword.resetButton"
              onPress={this.onSubmitForm}
            >
              <Text style={styles.buttonText}>{I18n.t('logIn.reset_password')}</Text>
            </Button>
          </View>
        </View>
        ) : (
          <View id="ForgotPassword.formWrapper" style={styles.formWrapper}>
          <Text style={styles.codeText}>Verification code was sent to {this.state.email}</Text>
          <View id="ForgotPassword.form" style={styles.form}>
            <FieldInput
              color={white}
              name="code"
              placeholder="Enter verification code here"
              id="ForgotPassword.emailInput"
              onChangeText={text => this.onTextChange('resetToken', text)}
            />
            <Button
              block
              style={styles.button}
              spinner={this.state.isLoading}
              id="ForgotPassword.resetButton"
              onPress={this.onSubmitForm}
            >
              <Text style={styles.buttonText}>{I18n.t('logIn.reset_password')}</Text>
            </Button>
          </View>
        </View>
        )}
      </Container>
    );
  }

  render() {
    return (
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    top: 20,
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
  }
});

export default ForgotPassword;
