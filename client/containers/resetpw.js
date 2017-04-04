import { reduxForm } from 'redux-form';

import ResetPassword from '../components/resetpw.js';
import { setUserID, resetPasswordRequest } from '../actions/auth.js';

//Client side validation
function validate (values) {
  var errors = {};
  var hasErrors = false;

  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter email';
    hasErrors = true;
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
    hasErrors = true;
  }
  if (!values.confirmPassword || values.confirmPassword.trim() === '') {
    errors.confirmPassword = 'Re-enter password';
    hasErrors = true;
  }

  if (values.confirmPassword && values.confirmPassword.trim() !== '' && values.password && values.password.trim() !== '' && values.password !== values.confirmPassword) {
    errors.password = 'Password And Re-entered Password don\'t match';
    errors.password = 'Password And Re-entered Password don\'t match';
    hasErrors = true;
  }

  return hasErrors && errors;
}

function mapDispatchToProps (dispatch) {
  return {
    resetPassword: resetPasswordRequest,
    sendUserID: setUserID,
  };
}

function mapStateToProps (state, ownProps) {
  return {
    user: state.user,
    validateFields: state.validateFields,
  };
}

export default reduxForm({
  form: 'ResetPassword',
  fields: ['email', 'password', 'confirmPassword'],
  validate,
}, mapStateToProps, mapDispatchToProps)(ResetPassword);
