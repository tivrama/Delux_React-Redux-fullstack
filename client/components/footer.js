import React, { Component } from 'react';

export default class Footer extends Component {
  render () {
    return (
      <footer>
        <div className="container">
          <div className="footer-content">
            <p>2017 Your App. <a href="your@gmail.com">Contact Us</a></p>
            <p>Built by <a href="https://github.com/tivrama" target="_blank">You</a></p>
          </div>
        </div>
      </footer>
    );
  }
}
