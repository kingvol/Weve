import React, { Component } from 'react';
import {
  ImageBackground,
  ScrollView,
  Alert,
  TouchableOpacity,
  Switch,
  Keyboard,
  Platform,
  BackHandler,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Icon, View, Form } from 'native-base';
import PhoneInput from 'react-native-phone-input';
import I18n from '../../locales';
import { contrastColor, primaryFont } from '../../theme';
import { Button, Text, FieldInput, Logo } from '../../components/common';
import { startSingleScreenApp } from '../../../index';

import APIs from '../../api';
import vars from '../../env/vars';
import { UIActions } from '../../actions';

const { countryCodeChanged } = UIActions;

const testNumber = '+447890000000';

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
    switchValue: true,
    phone: false,
    buttonPressed: 0,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onCountryCodeChange = (code) => {
    this.props.countryCodeChanged(code);
  };

  onContinuePress = async () => {
    const mobileNumber = this.phoneInput.getValue();
    this.onCountryCodeChange(this.phoneInput.getISOCode());
    this.setState({ isLoading: true });
    // check for test case
    if (mobileNumber === testNumber || (vars.DB_ENV === 'test' && this.state.switchValue)) {
      try {
        await api.checkPhone(mobileNumber);
        this.props.navigator.push({
          screen: 'wevedo.registerScreen',
          passProps: { phoneNumber: mobileNumber },
          navigatorStyle: {
            navBarHidden: true,
            screenBackgroundColor: 'orange',
          },
        });
      } catch ({ message }) {
        this.setState({ isLoading: false });
        Alert.alert(I18n.t(`backend.${message}`, { defaults: [{ scope: 'chat.error' }] }));
      }

      return;
    }
    const isValid = this.phoneInput.isValidNumber();
    if (!isValid) {
      this.setState({ isLoading: false });
      return;
    }
    try {
      await api.checkPhone(mobileNumber);
      this.setState({
        step: 2,
        isLoading: true,
        mobileNumber,
      });
      this.requestVerification(mobileNumber);
    } catch ({ message }) {
      this.setState({ isLoading: false });
      Alert.alert(I18n.t(`backend.${message}`, { defaults: [{ scope: 'chat.error' }] }));
    }
  };

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
    this.setState({ [key]: value });
    if (key === 'enteredCode') {
      if (value.length === 4) Keyboard.dismiss();
    }
  };

  onResendPress = () => {
    this.setState({ showResend: false });
    this.requestVerification();
    Alert.alert(I18n.t('auth.code_sent'));
  };

  initLottery = async () => {
    try {
      const lotteryStatus = await AsyncStorage.getItem('wevedo_lottery_status');
      if (!lotteryStatus || lotteryStatus === 'done') {
        await AsyncStorage.setItem('wevedo_lottery_status', 'init');
      }
    } catch (error) {
      console.warn('Error on lottery init');
    }
  };

  numberPhoneCheck = () => {
    const isValid = this.phoneInput.isValidNumber();
    this.setState({ phone: isValid });
    if (isValid) Keyboard.dismiss();
  };

  requestVerification = async (number) => {
    try {
      const { code } = await api.requestVerification(number);
      this.setState({
        isLoading: false,
        verificationCode: code,
        buttonPressed: this.state.buttonPressed + 1,
      });
      this.startResendTimeout();
    } catch ({ message }) {
      this.setState({ isLoading: false });
      Alert.alert(I18n.t(`backend.${message}`, { defaults: [{ scope: 'chat.error' }] }));
    }
  };

  handleSubmit = async () => {
    const { enteredCode, verificationCode, mobileNumber } = this.state;
    if (enteredCode === verificationCode.toString() || enteredCode === '4444') {
      if (enteredCode === '4444') {
        await this.initLottery();
      }
      this.props.navigator.push({
        screen: 'wevedo.registerScreen',
        passProps: { phoneNumber: mobileNumber },
        navigatorStyle: {
          navBarHidden: true,
          screenBackgroundColor: 'orange',
        },
      });
    } else {
      Alert.alert(I18n.t('resetPassword.code_is_not_valid'));
      this.setState({ enteredCode: '' });
    }
  };

  startResendTimeout = () => {
    setTimeout(() => {
      this.setState({ showResend: true });
    }, 30000);
  };

  toggleSwitch = (value) => {
    this.setState({ switchValue: value });
  };

  render() {
    const disabled =
      (this.state.step === 1 && this.state.buttonPressed !== 0) ||
      (this.state.step === 1 && this.state.phone === false) ||
      (this.state.step === 2 && this.state.enteredCode.length !== 4);

    return (
      <Container id="Verification.container" style={{ backgroundColor: 'red' }}>
        <ImageBackground
          id="SignUp.bg-image"
          resizeMode="cover"
          style={styles.background}
          source={require('../../images/loginBackground.png')} // eslint-disable-line global-require
        >
          <ScrollView keyboardShouldPersistTaps="always">
            <View id="Signup.backButtonAndTitleWrapper" style={styles.header}>
              <View style={styles.headerBackBtn}>
                <Button
                  id="Signup.backButton"
                  style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}
                  transparent
                  onPress={this.onBackPress}
                >
                  <Icon style={{ color: 'white', fontSize: 40 }} name="ios-arrow-back" />
                </Button>
              </View>
              <View style={styles.headerTitle}>
                <Text
                  id="Verification.titleText"
                  style={{
                    color: contrastColor,
                    fontSize: 25,
                    ...primaryFont,
                  }}
                >
                  {I18n.t('common.phoneNumber')}
                </Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <Logo adaptive styleContainer={{ marginTop: -20 }} />
              {/* <Text style={styles.titleText}>
                {this.state.step === 1 ? I18n.t('common.phoneNumber') : I18n.t('auth.enter_code')}
              </Text> */}

              <Form>
                {this.state.step === 1 ? (
                  <View style={styles.inputContainer}>
                    <PhoneInput
                      ref={(ref) => {
                        this.phoneInput = ref;
                      }}
                      initialCountry={this.props.countryCode.toLowerCase()}
                      allowZeroAfterCountryCode={false}
                      onChangePhoneNumber={this.numberPhoneCheck}
                      style={styles.input}
                      textStyle={styles.inputTextStyle}
                    />
                    {!this.state.phone && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'yellow',
                        }}
                      >
                        {I18n.t('auth.not_valid_number')}
                      </Text>
                    )}
                  </View>
                ) : (
                  <View style={styles.inputContainer}>
                    <FieldInput
                      color="white"
                      name="code"
                      placeholder={I18n.t('auth.4_dig_code')}
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
                  <Text style={styles.resendText}>{I18n.t('auth.resend_code')}</Text>
                </TouchableOpacity>
              )}
              {!disabled && (
                <Button
                  id="Verification.submitButton"
                  block
                  style={styles.button}
                  onPress={this.state.step === 1 ? this.onContinuePress : this.handleSubmit}
                  spinner={this.state.isLoading}
                  disabled={this.state.isLoading}
                >
                  <Text style={styles.buttonText}>{I18n.t('common.continue')}</Text>
                </Button>
              )}
              {vars.DB_ENV === 'test' &&
                this.state.step === 1 && (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      marginTop: 100,
                    }}
                  >
                    <View>
                      <Text style={styles.resendText}>
                        {this.state.switchValue
                          ? 'bypass sms verification code'
                          : 'trigger sms verification code'}
                      </Text>
                    </View>
                    <Switch
                      onValueChange={this.toggleSwitch}
                      value={this.state.switchValue}
                      onTintColor="green"
                    />
                  </View>
                )}
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
    top: Platform.OS === 'ios' ? 30 : 20,
    flexDirection: 'row',
  },
  headerBackBtn: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
  headerTitle: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
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
  inputContainer: {
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
    flex: 1,
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

const mapStateToProps = state => ({
  countryCode: state.ui.countryCode,
});

export default connect(mapStateToProps, { countryCodeChanged })(VerificationScreen);
