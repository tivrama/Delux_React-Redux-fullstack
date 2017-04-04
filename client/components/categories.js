import React, { Component } from 'react';
import ReactCSS from 'react-addons-css-transition-group';

import CategoryList from '../containers/category-list';

export default class Category extends Component {
  render () {
    return (
      <ReactCSS component="div" transitionName="fade-in" transitionAppear={ true } transitionAppearTimeout={ 300 } transitionEnterTimeout={ 300 } transitionLeaveTimeout={ 300 }>
        <div className="container">
          <div className="content">
            <h6 className="grid-title">Categories</h6>
            <CategoryList />
          </div>
        </div>
      </ReactCSS>
    );
  }
}
