import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modal } from 'react-redux-modal';

import { iconList } from '../assets/img/icon-catalogue';
import {
  getCurrentUser,
  getCategoriesRequest,
  setCurrentCategory,
} from '../actions';

import AddCategory from './add-category';

class CategoryList extends Component {
  componentWillMount () {
    this.props.getCategoriesRequest(this.props.current.user.id);
  }

  setCategory (category) {
    this.props.setCurrentCategory(category);
  }

  renderCategories () {

    const categories = this.props.categories;
    if (!categories.length) {
      return;
    }

    return categories.map((category) => {
      let categoryClassName = category.name.replace(/(\s+?)/g,'-').toLowerCase();
      if (categoryClassName[categoryClassName.length-1] === 's') {
        categoryClassName = categoryClassName.substring(0, categoryClassName.length - 1);
      }

      if (iconList.indexOf(categoryClassName) === -1) {
        categoryClassName = 'default';
      }

      let categoryInfo = {
        id: category._id,
        name: category.name,
      };

      return (
        <li key={ category._id } className="grid-links-block">
          <Link
            to={ `u/${ category.name }` }
            onClick={ () => this.setCategory(categoryInfo) }>
            <div className="grid-link-container">
              <div className={ `grid-link-icon grid-link-icon-${ categoryClassName }` }></div>
              <span className="grid-link-name">{ category.name }</span>
            </div>
          </Link>
        </li>
      );
    });
  }

  openEntryForm (e) {
    e.preventDefault();

    modal.add(AddCategory, {
      title: 'Add New Category',
      closeOnOutsideClick: true,
      hideCloseButton: false,
    });
  }

  renderAddNewButtonGrid () {
    return (
      <li key="add-subcategory" className="grid-links-block">
        <Link to="#" onClick={ this.openEntryForm.bind(this) }>
          <div className="grid-link-container">
            <div className="grid-link-icon">+</div>
            <span className="grid-link-name">Add New</span>
          </div>
        </Link>
      </li>
    );
  }

  render () {
    return (
      <div className="grid-container">
        <ul className="grid-links">
          { !this.props.categories.isFetching ? this.renderCategories() : <div className="spinner"></div> }
          { !this.props.categories.isFetching ? this.renderAddNewButtonGrid() : '' }
        </ul>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    getCurrentUser,
    getCategoriesRequest,
    setCurrentCategory,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
