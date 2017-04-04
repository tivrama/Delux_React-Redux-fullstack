import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modal } from 'react-redux-modal';

import { logoutRequest, resetPasswordRequest, resetPasswordRedirect } from '../actions/auth';
import ShowInfo from '../components/show-info';
import IconList from '../components/icon-list';

class Header extends Component {
  componentWillMount () {
    this.state = {
      account: {
        menuActive: false,
      },
    };
  }

  onAccountClick () {
    var activeFlag = this.state.account.menuActive;

    this.setState({
      account: {
        menuActive: !activeFlag,
      },
    });
  }

  closeAccountDropdown () {
    this.setState({
      account: {
        menuActive: false,
      },
    });
  }

  onGetInfo (e) {
    e.preventDefault();

    modal.add(ShowInfo, {
      title: 'Information',
      closeOnOutsideClick: true,
      hideCloseButton: false,
    });
  }

  onIconList (e) {
    e.preventDefault();
    modal.add(IconList, {
      title: 'List Of Icons',
      closeOnOutsideClick: true,
      hideCloseButton: false,
    });
  }

  onChangeEmailClick () {
    // TODO: add modal for change email form
  }

  onResetPasswordRequest () {
    this.props.resetPasswordRedirect(this.props.auth.user._id);
  }

  onLogoutClick () {
    this.props.logoutRequest();
  }

  render () {
    return (
      <nav>
        <div className="container">
          { this.props.routing.locationBeforeTransitions.pathname !== '/u' ? <div
            className="mobile-quick-nav mobile-nav-left"
            onClick={ this.context.router.goBack }
            title="Go back">
            <div className="mobile-chevron chevron-left"></div>
          </div> : <div className="mobile-quick-nav inactive"></div> }

          <div className="portal">
            <Link to="/" title="Gourmand">FoodiePal</Link>
          </div>

          <div className="mobile-quick-nav mobile-nav-right" onClick={ this.onAccountClick.bind(this) }>
            <ul className="mobile-account-nav" tabIndex="5" onBlur={ this.closeAccountDropdown.bind(this) }>
              <li>
                <ul className={ `mobile-account-subnav ${ this.state.account.menuActive ? 'active' : '' }` }>
                  <li onClick={ this.onGetInfo.bind(this) }>Info</li>
                  <li onClick={ this.onIconList.bind(this) }>Show Icon List</li>
                  <li onClick={ this.onResetPasswordRequest.bind(this) }>Change Password</li>
                  <li onClick={ this.onLogoutClick.bind(this) }>Logout</li>
                </ul>
              </li>
            </ul>
          </div>
          <ul className="main-nav"></ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ logoutRequest, resetPasswordRequest, resetPasswordRedirect }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.contextTypes = {
  router: React.PropTypes.object,
};

// <li onClick={ this.onChangeEmailClick.bind(this) }>Change Email</li>
