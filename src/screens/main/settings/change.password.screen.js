import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Button, Container, Content, FieldInput, Text } from '../../../components/common';
// import {changePassword} from '../Helpers/user'
import I18n from '../../../locales';
import { backgroundColor, lightTextColor } from '../../../theme';

const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

class ChangePasswordScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  onSubmitForm(values) {
    const { currentPassword, newPassword, confirmPassword } = values;
    this.setState({ loading: true });
    changePassword(currentPassword, newPassword, (result) => {
      this.setState({ loading: false });
      const { error } = result;
      if (error) {
        alert(error.message);
      } else {
        Alert.alert(
          I18n.t('changePassword.success'),
          I18n.t('changePassword.success_message'),
          [{ text: `${I18n.t('common.ok')}` }],
          { cancelable: false },
        );
        this.props.navigation.goBack();
      }
    });
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      currentPassword,
      newPassword,
      confirmPassword,
    } = this.props;
    const disabled =
      this.state.loading ||
      pristine ||
      submitting ||
      !currentPassword ||
      !newPassword ||
      !confirmPassword;
    return (
      <Container id="ChangePassword.container" style={{ backgroundColor }}>
        <Content id="ChangePassword.content" padder keyboardShouldPersistTaps="always">
          {/* <Field name="currentPassword"
                           placeholder={I18n.t('changePassword.current_password')}
                           component={FieldInput}
                           secureTextEntry={true}
                           color={lightTextColor}
                           id='ChangePassword.currentPasswordInput'
                    />
                    <Field name="newPassword"
                           placeholder={I18n.t('changePassword.new_password')}
                           component={FieldInput}
                           secureTextEntry={true}
                           color={lightTextColor}
                           id='ChangePassword.newPasswordInput'
                    />
                    <Field name="confirmPassword"
                           placeholder={I18n.t('changePassword.confirm_password')}
                           component={FieldInput}
                           secureTextEntry={true}
                           color={lightTextColor}
                           id='ChangePassword.confirmPasswordInput'
                    />
                    <Button id="ChangePassword.submitButton"
                            style={{marginTop: 10}} block success
                            disabled={disabled}
                            onPress={handleSubmit(this.onSubmitForm.bind(this))}
                            loading={this.state.loading}>
                        {I18n.t('common.save')}
                    </Button> */}
        </Content>
      </Container>
    );
  }
}

export default ChangePasswordScreen;
