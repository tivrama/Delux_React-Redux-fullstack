import React, { Component, PropTypes } from 'react';

export default class ResetPassword extends Component {

  componentWillMount () {
    // when the component loads, send the userID that's contained in the URL as a query parameter to the global variable in the auth actions
    this.props.sendUserID(location.search.slice(1));
  }

  render () {
    const {fields: { email, password, confirmPassword }, handleSubmit, submitting } = this.props;

    return (
      <div className="container">
        <div className="content-alt">
          <h2 className="page-title">Reset Password</h2>
          <p className="subheading">Enter your information below to reset your password.</p>
          <div className="form-container">
            <form onSubmit={ handleSubmit(this.props.resetPassword) } noValidate>
              <div className={ `form-group ${email.touched && email.invalid ? 'has-error' : ''}` }>
                <label className="control-label" htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter email" className="form-control" { ...email } />
                <div className={ `help-block ${ email.touched && email.invalid ? 'active' : ''}` }>
                  {email.touched ? email.error : ''}
                </div>
              </div>

              <div className={ `form-group ${password.touched && password.invalid ? 'has-error' : ''}` }>
                <label className="control-label" htmlFor="password">New Password</label>
                <input type="password" id="password" placeholder="Enter new password" className="form-control" { ...password } />
                <div className={ `help-block ${ password.touched && password.invalid ? 'active' : ''}` }>
                  {password.touched ? password.error : ''}
                </div>
              </div>
              <div className={ `form-group ${confirmPassword.touched && confirmPassword.invalid ? 'has-error' : ''}` }>
                <label className="control-label" htmlFor="confirm-password">Confirm New Password</label>
                <input type="password" id="confirm-password" placeholder="Confirm new password" className="form-control" { ...confirmPassword } />
                <div className={ `help-block ${ confirmPassword.touched && confirmPassword.invalid ? 'active' : ''}` }>
                  {confirmPassword.touched ? confirmPassword.error : ''}
                </div>
              </div>
              <button type="submit" disabled={ email.invalid || password.invalid || confirmPassword.invalid || submitting } className="btn btn-primary">Reset Password</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.contextTypes = {
  router: PropTypes.object,
}
