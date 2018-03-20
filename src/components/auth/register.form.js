/* eslint-disable global-require */
import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { CheckBox, Left, Icon } from 'native-base';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { contrastColor, primaryFont } from '../../theme';
import { Button, Container, Content, FieldInput, Text } from '../../components/common';

class SignupForm extends Component {
  state = {
    step: 1,
    values: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      category: null,
      image: null,
    },
    isProvider: false,
    isModalVisible: false,
  }

  onCheckboxPress = () => {
    this.setState({
      isProvider: !this.state.isProvider,
    });
  }

  onFieldChange = (key, value) => {
    this.setState({
      values: {
        ...this.state.values,
        [key]: value,
      },
    });
  }

  handleSubmit = () => {
    // const { values } = this.state;
    // const { fullName, password, confirmPassword, email } = values;

    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  }

  /* handleDecline() {
    this.setState({isModalVisible: !this.state.isModalVisible, values: null});
        setTimeout(() => {
            Alert.alert(
                `${I18n.t('eula.error')}`,
                `${I18n.t('eula.error_message')}`,
                [{text: `${I18n.t('common.ok')}`}]
            )
        }, 800)
  } */

  /* handleAccept() {
        this.setState({isModalVisible: !this.state.isModalVisible});
        const {email, password, fullName} = this.state.values;
        const { isProvider, category, image } = this.state;
        this.setState({loading: true});
        const arrFN = fullName.split(' ').map((a) => { return a.charAt(0).toUpperCase() + a.substr(1) });
        const capitalFullName = arrFN.join(' ');


        if (isProvider) {
            this.props.signupProvider(email, password, capitalFullName, image, category, result => {
                this.setState({loading: false});
                const {errorMessage} = result;
                if (errorMessage) {
                    Alert.alert(
                        I18n.t('logIn.create_user_error'),
                        errorMessage,
                        [{text: I18n.t('common.ok')}],
                        {cancelable: false}
                    );
                }
            });
        } else {
            this.props.signupUser(email, password, capitalFullName, result => {
                this.setState({loading: false});
                const {errorMessage} = result;
                if (errorMessage) {
                    Alert.alert(
                        I18n.t('logIn.create_user_error'),
                        errorMessage,
                        [{text: I18n.t('common.ok')}],
                        {cancelable: false}
                    );
                }
            });
        }
  } */

  /* onSubmitForm = (values) => {
        const { isProvider, image } = this.state;
        let { category } = this.state;

        // on Android the Venue category is predefined in UI but not set to state
        if (Platform.OS === 'android' && !category) {
            category = 'Venue';
            this.setState({
                category: 'Venue',
            })
        }

        if (isProvider && !category) {
            alert(I18n.t('logIn.no_category'));
            return;
        }

        if (isProvider && !image) {
            alert(I18n.t('logIn.no_image'));
            return;
        };
        this.setState({isModalVisible: !this.state.isModalVisible, values})
  } */

  renderSignUp = () => {
    const { email, password, confirmPassword } = this.state.values;
    const disabled = this.props.isLoading || !email || !password || !confirmPassword || (
      this.state.step === 2 && !this.state.image
    );

    return (
      <Content
        id="SignUp.content"
        padder
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
      >
        <View id="Signup.backButtonAndTitleWrapper" style={styles.header}>
          <Button id="Signup.backButton" style={{ flex: 1 }} transparent onPress={this.props.onBackPress}>
            <Icon style={{ color: 'white', fontSize: 40 }} name="ios-arrow-back" />
          </Button>
          <Text id="Signup.titleText" style={{ color: contrastColor, fontSize: 25, flex: 1.6, ...primaryFont }}>
            {I18n.t('logIn.sign_up')}
          </Text>
        </View>

        <View id="Signup.formWrapper" style={{ flex: 0, justifyContent: 'flex-start' }}>
          <View style={styles.formWrapper}>

            {this.state.step === 1 && (
            <View>
              <FieldInput
                name="fullName"
                color={contrastColor}
                placeholder={I18n.t('common.fullName')}
                errorColor={contrastColor}
                onChangeText={text => this.onFieldChange('fullName', text)}
                id="SignUp.fullNameInput"
                autoCapitalize="words"
              />
              <FieldInput
                color={contrastColor}
                name="email"
                placeholder={I18n.t('common.email')}
                errorColor={contrastColor}
                onChangeText={text => this.onFieldChange('email', text)}
                id="SignUp.emailInput"
              />
              <FieldInput
                color={contrastColor}
                name="password"
                placeholder={I18n.t('common.password')}
                errorColor={contrastColor}
                secureTextEntry
                onChangeText={text => this.onFieldChange('password', text)}
                id="SignUp.passwordInput"
              />
              <FieldInput
                color={contrastColor}
                name="confirmPassword"
                placeholder={I18n.t('logIn.confirm_password')}
                errorColor={contrastColor}
                secureTextEntry
                onChangeText={text => this.onFieldChange('confirmPassword', text)}
                id="SignUp.confirmPasswordInput"
              />

              <View style={{ flexDirection: 'row' }}>
                <CheckBox
                  checked={this.state.isProvider}
                  onPress={this.onCheckboxPress}
                  color="#f3c200"
                />
                <Left>
                  <Text style={styles.checkBoxText}>{I18n.t('logIn.advertiser')}</Text>
                </Left>
              </View>

            </View>
          )}
            <Button
              id="Signup.submitButton"
              block
              style={styles.registerButton}
              onPress={this.state.isProvider && this.state.step === 1 ? this.onContinuePress : this.handleSubmit}
              spinner={this.props.isLoading}
              disabled={disabled}
            >
              <Text style={styles.registerButtonText}>
                {this.state.isProvider && this.state.step === 1 ? I18n.t('common.continue') : I18n.t('logIn.sign_up')}
              </Text>
            </Button>

            {/* <Eula isModalVisible={this.state.isModalVisible}
                              handleDecline={this.handleDecline.bind(this)}
                              handleAccept={this.handleAccept.bind(this)}
                              id="Signup.EULA"
                      /> */}
          </View>
        </View>
      </Content>
    );
  }

  render() {
    return (
      <Container id="SignUp.container" style={{ backgroundColor: 'red' }}>
        <ImageBackground
          id="SignUp.bg-image"
          resizeMode="cover"
          style={styles.background}
          source={require('../../images/loginBackground.png')}
        >
          {this.renderSignUp()}
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
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
    justifyContent: 'flex-start',
    top: 20,
    flexDirection: 'row',
  },
  registerButton: {
    marginTop: 10,
    backgroundColor: '#f3c200',
  },
  registerButtonText: {
    color: 'red',
  },
  checkBoxText: {
    color: 'white',
    marginLeft: 20,
  },
  categoryText: {
    color: 'white',
    marginTop: 15,
    marginRight: 100,
  },
  formWrapper: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: 'column',
  },
});

export default SignupForm;
