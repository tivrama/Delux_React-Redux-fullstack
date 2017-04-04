import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { modal } from 'react-redux-modal';

import ForgotPassword from '../containers/forgotpw';

export default class Login extends Component {
  componentDidMount () {
    localStorage.removeItem('gourmandState');
    this._loginEmail.focus();
  }

  componentWillUnmount () {
    if (!localStorage.getItem('jwtToken')) {
      localStorage.removeItem('gourmandState');
    }
  }

  openRequestForm (e) {
    e.preventDefault();

    modal.add(ForgotPassword, {
      title: 'Forgot your password?',
      closeOnOutsideClick: true,
      hideCloseButton: false,
    });
  }

  render () {
    const {fields: { email, password }, handleSubmit, pristine, submitting } = this.props;

    let emailInvalid = (email.touched && email.dirty && email.invalid) || (email.visited && email.dirty && email.invalid);
    let pwInvalid = (password.touched && password.dirty && password.invalid) || (password.visited && password.dirty && password.invalid);

    return (
      <div className="container">
        <div className="content-alt">
          <h2 className="page-title">Welcome!</h2>
          <p className="subheading">Log in below to enter your tastings.</p>
          <div className="form-container">
            <form onSubmit={ handleSubmit(this.props.loginUser) } noValidate>
              <div className={ `form-group ${ emailInvalid ? 'has-error' : ''}` }>
                <label className="control-label" htmlFor="email">Email</label>
                <input type="email" id="email" autoFocus tabIndex="1" placeholder="Enter email" className="form-control" ref={ (i) => this._loginEmail = i } { ...email } />
                <div className={ `help-block ${ emailInvalid ? 'active' : ''}` }>
                  { emailInvalid ? email.error : ''}
                </div>
              </div>

              <div className={ `form-group ${pwInvalid ? 'has-error' : ''}` }>
                <label className="control-label" htmlFor="password">Password</label> (<a href="#" onClick={ this.openRequestForm.bind(this) }>Forgot password?</a>)
                <input type="password" id="password" tabIndex="2" placeholder="Enter password" className="form-control" { ...password } />
                <div className={ `help-block ${ pwInvalid ? 'active' : ''}` }>
                  { pwInvalid ? password.error : '' }
                </div>
              </div>
              <button type="submit" disabled={ email.invalid || password.invalid || pristine || submitting } className="btn btn-primary">Log In</button>
            </form>
          </div>
          <p className="subheading">New to Gourmand? <Link to="/signup">Sign Up</Link></p>
        </div>
      </div>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object,
};
