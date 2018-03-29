import React, { Component } from 'react';
import { Alert, Keyboard } from 'react-native';
import { Button, Container, Content, FieldInput } from '../../../components/common';
import { connect } from 'react-redux';
import I18n from '../../../locales';
import { backgroundColor, lightTextColor } from '../../../theme';
import { UserActions } from '../../../actions';

const { changePassword } = UserActions;

class ChangePasswordScreen extends Component {
  state = {
    values: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    errors: {
      currentPassword: {
        isError: false,
        error: '',
      },
      newPassword: {
        isError: false,
        error: '',
      },
      confirmPassword: {
        isError: false,
        error: '',
      },
    },
    processing: false,
  };

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  };

  componentWillReceiveProps({ user }) {
    if (!user.isLoading && user.error && this.state.processing) {
      alert(user.error);
      this.switchProcessing();
      return;
    }
    if (!user.isLoading && this.state.processing) {
      Alert.alert(I18n.t('changePassword.success_message'));
      this.switchProcessing();
    }
  }

  onFieldChange = (key, value) => {
    this.setState({
      values: {
        ...this.state.values,
        [key]: value,
      },
      errors: {
        ...this.state.errors,
        [key]: (() => {
          switch (true) {
            case !value.length:
              return {
                isError: true,
                error: I18n.t('validations.required'),
              };
            case key === 'currentPassword' && value.length < 8:
              return {
                isError: true,
                error: I18n.t('validations.password_length'),
              };
            case key === 'newPassword' && value.length < 8:
              return {
                isError: true,
                error: I18n.t('validations.password_length'),
              };
            case key === 'confirmPassword' && this.state.values.newPassword !== value:
              return {
                isError: true,
                error: I18n.t('validations.password_mismatch'),
              };
            case key === 'newPassword' && this.state.values.currentPassword === value:
              return {
                isError: true,
                error: I18n.t('validations.password_matches_old'),
              };
            default:
              return {
                isError: false,
                error: '',
              };
          }
        })(),
      },
    });
  };

  onBlur = (key, value) => {
    if (!value.length) {
      this.setState({
        errors: {
          ...this.state.errors,
          [key]: {
            isError: true,
            error: I18n.t('validations.required'),
          },
        },
      });
    }
  }

  onFormSubmit = () => {
    this.setState({ processing: true });
    this.props.changePassword({ password: this.state.values.newPassword });
  }

  keyboardDidShow = () => {
    this.props.navigator.toggleTabs({
      to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
      animated: false,
    });
  };

  keyboardDidHide = () => {
    this.props.navigator.toggleTabs({
      to: 'shown', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
      animated: false,
    });
  };

  switchProcessing = () => {
    this.setState({ processing: false });
  }

  render() {
    const disabled = this.props.user.loading || !this.state.values.newPassword;
    return (
      <Container id="ChangePassword.container" style={{ backgroundColor }}>
        <Content id="ChangePassword.content" padder keyboardShouldPersistTaps="always">
          <FieldInput
            name="currentPassword"
            placeholder={I18n.t('changePassword.current_password')}
            secureTextEntry
            color={lightTextColor}
            id="ChangePassword.currentPasswordInput"
            onChangeText={text => this.onFieldChange('currentPassword', text)}
            onBlur={() => this.onBlur('currentPassword', this.state.values.currentPassword)}
            isError={this.state.errors.currentPassword.isError}
            error={this.state.errors.currentPassword.error}
          />
          <FieldInput
            name="newPassword"
            placeholder={I18n.t('changePassword.new_password')}
            secureTextEntry
            color={lightTextColor}
            id="ChangePassword.newPasswordInput"
            onChangeText={text => this.onFieldChange('newPassword', text)}
            onBlur={() => this.onBlur('newPassword', this.state.values.newPassword)}
            isError={this.state.errors.newPassword.isError}
            error={this.state.errors.newPassword.error}
          />
          <FieldInput
            name="confirmPassword"
            placeholder={I18n.t('changePassword.confirm_password')}
            secureTextEntry
            color={lightTextColor}
            id="ChangePassword.confirmPasswordInput"
            onChangeText={text => this.onFieldChange('confirmPassword', text)}
            onBlur={() => this.onBlur('confirmPassword', this.state.values.newPassword)}
            isError={this.state.errors.confirmPassword.isError}
            error={this.state.errors.confirmPassword.error}
          />
          <Button
            id="ChangePassword.submitButton"
            style={{ marginTop: 10 }}
            block
            success
            disabled={disabled}
            onPress={this.onFormSubmit}
            loading={this.props.user.loading}
          >
            {I18n.t('common.save')}
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { changePassword })(ChangePasswordScreen);
