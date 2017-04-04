import React, { Component } from 'react';

import HeaderPublic from './header-public.js';
import Footer from './footer';

export default class Public extends Component {
  render () {
    return (
      <div className="wrapper">
        <div className="content-wrapper">
          <HeaderPublic />
          { this.props.children }
        </div>
      <Footer />
      </div>
    );
  }
}
