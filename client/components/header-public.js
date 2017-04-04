import React, { Component } from 'react';
import { Link } from 'react-router';

export default class HeaderPublic extends Component {
  render () {
    return (
      <nav>
        <div className="container">
          <div
            className="mobile-quick-nav mobile-nav-left"
            onClick={ this.context.router.goBack }
            title="Go back">
            <div className="mobile-chevron chevron-left"></div>
          </div>

          <div className="portal">
            <Link to="/" title="YourApp">Your App</Link>
          </div>

          <div className="mobile-quick-nav mobile-nav-right"></div>
          <ul className="main-nav"></ul>
        </div>
      </nav>
    );
  }
}

HeaderPublic.contextTypes = {
  router: React.PropTypes.object,
}
