import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSS from 'react-addons-css-transition-group';
import { modal } from 'react-redux-modal';

import SubcategoryList from './subcategory-list';
import EditCategory from './edit-category';

class Subcategory extends Component {

  openCategoryEdit (e, category) {
    e.preventDefault();

    modal.add(EditCategory, {
      modalProps: category,
      title: 'Edit Category',
      closeOnOutsideClick: true,
      hideCloseButton: false,
    });
  }

  componentDidUpdate () {
    window.scrollTo(0,0);
  }

  render () {

    if (this.props.current.category.id === 1) {
      return (
      <ReactCSS component="div" transitionName="fade-in" transitionAppear={ true } transitionAppearTimeout={ 300 } transitionEnterTimeout={ 300 } transitionLeaveTimeout={ 300 }>
        <div className="container">
          <div className="content">
            <h6 className="grid-title">{this.props.current.category.name}</h6>
          </div>
        </div>
      </ReactCSS>
      );
    }

    return (
      <ReactCSS component="div" transitionName="fade-in" transitionAppear={ true } transitionAppearTimeout={ 300 } transitionEnterTimeout={ 300 } transitionLeaveTimeout={ 300 }>
      <div className="container">
        <div className="content">
          <h6 className="grid-title">{ this.props.current.category.name } <span className="breadcrumbs-separator">&rsaquo;</span> Varieties
            <button className="btn-edit" onClick={ (e) => this.openCategoryEdit(e, this.props.current) }>Edit {this.props.current.category.name}</button>
          </h6>
          <SubcategoryList />
        </div>
      </div>
      </ReactCSS>
    );
  }
}

function mapStateToProps (state) {
  return state;
}

export default connect(mapStateToProps)(Subcategory);
