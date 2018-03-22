import I18n from '../locales';

export function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = `${I18n.t('validations.required')}`;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = `${I18n.t('validations.email_invalid')}`;
  }

  if (!values.password) {
    errors.password = `${I18n.t('validations.required')}`;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = `${I18n.t('validations.required')}`;
  }

  if (values.password && values.password.length < 8) {
    errors.password = `${I18n.t('validations.password_length')}`;
  }

  if (values.confirmPassword && values.password !== values.confirmPassword) {
    errors.confirmPassword = `${I18n.t('validations.password_mismatch')}`;
  }

  return errors;
}
