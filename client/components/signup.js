import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class SignUp extends Component {

  componentWillMount () {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    // console.log("this.props in user component: ", this.props);
    // this.props.resetMe();
    localStorage.removeItem('gourmandState');
  }

  // asyncValidating,

  // <div className="help-block">
  //   {asyncValidating === 'email' ? 'validating..': ''}
  // </div>

  render () {
    const {fields: { email, password, confirmPassword }, handleSubmit, pristine, submitting } = this.props;

    let emailInvalid = (email.touched && email.dirty && email.invalid) || (email.visited && email.dirty && email.invalid);
    let pwInvalid = (password.touched && password.dirty && password.invalid) || (password.visited && password.dirty && password.invalid);
    let pwConfirmInvalid = (confirmPassword.touched && confirmPassword.dirty && confirmPassword.invalid) || (confirmPassword.visited && confirmPassword.dirty && confirmPassword.invalid);

    return (
      <div className="container">
        <div className="content-alt">
          <h2 className="page-title">Get Started</h2>
          <p className="subheading">Sign up and start logging your tastings!</p>
          <div className="form-container">
            <form onSubmit={ handleSubmit(this.props.signUpUser) } noValidate>
              <div className={ `form-group ${emailInvalid ? 'has-error' : ''}` }>
                <label className="control-label" htmlFor="email">Email</label>
                <input type="email" id="email" autoFocus placeholder="Email" className="form-control" { ...email } />
                <div className={ `help-block ${ emailInvalid ? 'active' : ''}` }>
                  { emailInvalid ? email.error : '' }
                </div>
              </div>

              <div className={ `form-group ${pwInvalid ? 'has-error' : ''}` }>
                <label className="control-label" htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter password" className="form-control" { ...password } />
                <div className={ `help-block ${ pwInvalid ? 'active' : ''}` }>
                  { pwInvalid ? password.error : '' }
                </div>
              </div>
              <div className={ `form-group ${pwConfirmInvalid ? 'has-error' : ''}` }>
                <label className="control-label" htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" placeholder="Confirm password" className="form-control" { ...confirmPassword } />
                <div className={ `help-block ${ pwConfirmInvalid ? 'active' : ''}` }>
                  { pwConfirmInvalid ? confirmPassword.error : '' }
                </div>
              </div>
              <button type="submit" disabled={ email.invalid || password.invalid || confirmPassword.invalid || pristine || submitting } className="btn btn-primary">Sign Up</button>
            </form>
          </div>
          <p className="subheading">Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    );
  }
}

SignUp.contextTypes = {
  router: PropTypes.object,
}
