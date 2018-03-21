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

class ForgotPassword extends Component {
  state = {
    email: '',
  };

  onBackPress = () => {
    this.props.navigator.pop();
  };

  onEmailChange = (email) => {
    this.setState({ email });
  };

  onSubmitForm = () => {
    console.warn(this.state.email);
    /* const {email} = values;
        this.setState({loading: true});
        this.props.resetPassword(email, error => {
            this.setState({loading: false});
            if (error) {
                Alert.alert(
                    `${I18n.t('resetPassword.error_title')}`,
                    `${error.error}`,
                    [{text: `${I18n.t('common.ok')}`}],
                    {cancelable: false}
                );
                return
            }

            Alert.alert(
                `${I18n.t('resetPassword.success')}`,
                `${I18n.t('resetPassword.success_message')}`,
                [{text: `${I18n.t('common.ok')}`}],
                {cancelable: false}
            );
            this.props.navigation.goBack()
        })  */
  };

  renderForm() {
    return (
      <Container id="ForgotPassword.main-content" style={{ flex: 1 }}>
        {/* <Content id="ForgotPassword.main-content" padder keyboardShouldPersistTaps="always" contentContainerStyle={{ flex: 1 }}> */}
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
        <View id="ForgotPassword.formWrapper" style={styles.formWrapper}>
          <View id="ForgotPassword.form" style={styles.form}>
            <FieldInput
              color={white}
              name="email"
              placeholder={I18n.t('common.email')}
              id="ForgotPassword.emailInput"
            />
            <Button
              block
              style={styles.button}
              id="ForgotPassword.resetButton"
              onPress={this.onSubmitForm}
            >
              <Text style={styles.buttonText}>{I18n.t('logIn.reset_password')}</Text>
            </Button>
          </View>
        </View>
        {/* </Content> */}
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
});

export default ForgotPassword;
