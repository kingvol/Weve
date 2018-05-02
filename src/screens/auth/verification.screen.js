import React, { Component } from 'react';
import { ImageBackground, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Container, Icon, View, Form } from 'native-base';
import PhoneInput from 'react-native-phone-input';
import I18n from '../../locales';
import { contrastColor, primaryFont } from '../../theme';
import { Button, Text, FieldInput } from '../../components/common';

import APIs from '../../api';

const { AuthApi } = APIs;
const api = new AuthApi();

class VerificationScreen extends Component {
  state = {
    verificationCode: '',
    enteredCode: '',
    mobileNumber: '',
    showResend: false,
    isLoading: false,
    step: 1,
  }

  onContinuePress = () => {
    const isValid = this.phoneInput.isValidNumber();
    if (!isValid) {
      return;
    }
    const mobileNumber = this.phoneInput.getValue();
    this.setState({
      step: 2,
      isLoading: true,
      mobileNumber,
    });
    this.requestVerification(mobileNumber);
  }

  onBackPress = () => {
    this.props.navigator.pop();
  }

  onTextChange = (key, value) => {
    this.setState({ [key]: value });
  }

  onResendPress = () => {
    this.setState({ showResend: false });
    this.requestVerification();
    Alert.alert('New code successfuly sent');
  }

  requestVerification = async (number) => {
    try {
      await api.checkPhone(number);
      const { code } = await api.requestVerification(number);
      this.setState({
        isLoading: false,
        verificationCode: code,
      });
      this.startResendTimeout();
    } catch ({ message }) {
      this.setState({ isLoading: false });
      Alert.alert(message);
    }
  }

  handleSubmit = () => {
    const { enteredCode, verificationCode, mobileNumber } = this.state;
    console.warn(enteredCode, verificationCode);
    if (enteredCode === verificationCode.toString()) {
      this.props.navigator.push({
        screen: 'wevedo.registerScreen',
        passProps: { phoneNumber: mobileNumber },
        navigatorStyle: {
          navBarHidden: true,
          screenBackgroundColor: 'orange',
        },
      });
    } else {
      Alert.alert('Wrong verification code...');
      this.setState({ enteredCode: '' });
    }
  }

  startResendTimeout = () => {
    setTimeout(() => {
      this.setState({ showResend: true });
    }, 30000);
  }

  render() {
    const disabled = (this.state.step === 2 && this.state.enteredCode.length !== 4);

    return (
      <Container id="Verification.container" style={{ backgroundColor: 'red' }}>
        <ImageBackground
          id="SignUp.bg-image"
          resizeMode="cover"
          style={styles.background}
          source={require('../../images/loginBackground.png')}
        >
          <ScrollView>
            <View id="Signup.backButtonAndTitleWrapper" style={styles.header}>
              <Button
                id="Signup.backButton"
                style={{ flex: 1 }}
                transparent
                onPress={this.onBackPress}
              >
                <Icon style={{ color: 'white', fontSize: 40 }} name="ios-arrow-back" />
              </Button>
              <Text
                id="Verification.titleText"
                style={{ color: contrastColor, fontSize: 25, flex: 1.6, ...primaryFont }}
              >
                Register
              </Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.titleText}>{this.state.step === 1 ? 'Mobile number' : 'Enter verification code'}</Text>
              <Form>
                {this.state.step === 1 ? (
                  <View style={styles.inputConteiner}>
                    <PhoneInput
                      ref={(ref) => { this.phoneInput = ref; }}
                      style={styles.input}
                      textStyle={styles.inputTextStyle}
                    />
                  </View>
                ) : (
                  <View style={styles.inputConteiner}>
                    <FieldInput
                      color="white"
                      name="code"
                      placeholder="      4 digit code       "
                      textAlign="center"
                      id="Verification.codeInput"
                      input={{ value: this.state.enteredCode }}
                      onChangeText={text => this.onTextChange('enteredCode', text)}
                    />
                  </View>
                )}
              </Form>
              {this.state.showResend && (
                <TouchableOpacity style={styles.resend} onPress={this.onResendPress}>
                  <Text style={styles.resendText}>Resend code</Text>
                </TouchableOpacity>
              )}
              <Button
                id="Verification.submitButton"
                block
                style={styles.button}
                onPress={
                  this.state.step === 1
                    ? this.onContinuePress
                    : this.handleSubmit
                }
                spinner={this.state.isLoading}
                disabled={disabled}
              >
                <Text style={styles.buttonText}>
                  {I18n.t('common.continue')}
                </Text>
              </Button>
            </View>
          </ScrollView>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = {
  header: {
    flex: 0.1,
    justifyContent: 'flex-start',
    top: 20,
    flexDirection: 'row',
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
  contentContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 22,
    color: 'white',
  },
  inputConteiner: {
    margin: 50,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    borderColor: 'gray',
  },
  inputTextStyle: {
    fontSize: 18,
    color: 'white',
  },
  button: {
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#f3c200',
  },
  buttonText: {
    color: 'red',
  },
  resend: {
    marginTop: -40,
    marginBottom: 20,
  },
  resendText: {
    color: 'white',
    fontSize: 18,
  },
};


export default VerificationScreen;

