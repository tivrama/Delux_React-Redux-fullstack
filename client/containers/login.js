import { reduxForm } from 'redux-form';

import Login from '../components/login.js';
import { loginRequest } from '../actions/auth.js';

//Client side validation
function validate (values) {
  var errors = {};
  var hasErrors = false;

  if (!values.email || values.email.trim() === '') {
    errors.email = 'Email is required!';
    hasErrors = true;
  }

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address!';
    hasErrors = true;
  }

  if (!values.password || values.password.trim() === '') {
    errors.password = 'Password is required!';
    hasErrors = true;
  }

  return hasErrors && errors;
}

function mapDispatchToProps (dispatch) {
  return {
    loginUser: loginRequest,
  };
}

function mapStateToProps (state, ownProps) {
  return {
    user: state.user,
    validateFields: state.validateFields,
  };
}

export default reduxForm({
  form: 'Login',
  fields: ['email', 'password'],
  validate,
}, mapStateToProps, mapDispatchToProps)(Login);
