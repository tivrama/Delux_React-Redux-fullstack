import React, { Component } from 'react';
import { Link } from 'react-router';

import Footer from './footer';

export default class Welcome extends Component {
  render () {
    return (
      <div className="wrapper">
        <section className="content-wrapper">
            <div className="container">
          <section className="welcome-header">
              <div className="welcome-logo"><img src="./assets/img/logo-white-large.png" alt="logo" title="Gourmand"/></div>
              <div className="welcome-tagline"><h3>Your Personal Tasting Log</h3></div>
              <div className="welcome-links">
                <Link to="/signup" className="welcome-link link-signup">Sign Up</Link>
                <p>Already have an account?</p>
                <Link to="/login" className="welcome-link link-login">Login</Link>
              </div>
          </section>
            </div>
        </section>
        <Footer />
      </div>
    );
  }
}
