import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modal } from 'react-redux-modal';

import { iconList } from '../assets/img/icon-catalogue';
import {
  getCurrentCategory,
  getSubcategoriesRequest,
  setCurrentSubcategory,
} from '../actions';

import AddSubcategory from './add-subcategory';

class SubcategoryList extends Component {
  componentWillMount () {
    this.props.getSubcategoriesRequest(this.props.current.category.id);
  }

  setSubcategory (subcategory) {
    this.props.setCurrentSubcategory(subcategory);
  }

  openEntryForm (e) {
    e.preventDefault();

    modal.add(AddSubcategory, {
      title: 'Add New Variety',
      closeOnOutsideClick: true,
      hideCloseButton: false,
    });
  }

  renderSubcategories () {
    if (this.props.current.category.id === 1) {
      return (
        <div></div>
      );
    }

    const category = this.props.current.category.name;
    const subcategories = this.props.subcategories.data;

    let categoryClassName = category.replace(/(\s+?)/g,'-').toLowerCase();
    if (categoryClassName[categoryClassName.length-1] === 's') {
      categoryClassName = categoryClassName.substring(0, categoryClassName.length - 1);
    }

    return subcategories.map((subcategory) => {
      let subcategoryInfo = {
        id: subcategory._id,
        name: subcategory.name,
        description: subcategory.description,
      };
      let subcategoryName = subcategory.name.replace(/(\s+?)/g,'-').toLowerCase();
      if (subcategoryName[subcategoryName.length-1] === 's') {
        subcategoryName = subcategoryName.substring(0, subcategoryName.length - 1);
      }
      let thisClassName = '';
      if (iconList.indexOf(subcategoryName) !== -1) {
        thisClassName = subcategoryName;
      } else {
        thisClassName = categoryClassName;
      }
      if (iconList.indexOf(thisClassName) === -1) {
        thisClassName = 'default';
      }

      return (
        <li key={ subcategory._id } className="grid-links-block">
          <Link
            to={ `/u/${ category }/${ subcategory.name }` }
            onClick={ () => this.setSubcategory(subcategoryInfo) }>
            <div className="grid-link-container">
              <div className={ `grid-link-icon grid-link-icon-${ thisClassName }` }></div>
              <span className="grid-link-name">{ subcategory.name }</span>
            </div>
          </Link>
        </li>
      );
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

  renderAddNewBlock () {
    if (this.props.current.category.id === 1) {
      return (
        <div></div>
      );
    }

    let categoryName = this.props.current.category.name.toLowerCase();

    return (
      <div className="add-new-block">
        <h4>Got some { categoryName } to try?</h4>
        <p>You haven't added any types of { categoryName }.</p>
        <Link to="#" onClick={ this.openEntryForm.bind(this) }>
          <button className="btn btn-primary">Add New Variety</button>

        </Link>
      </div>
    );
  }

  render () {
    return (
      <div className="grid-container">
        <ul className="grid-links">
          { !this.props.subcategories.isFetching ? this.renderSubcategories() : <div className="spinner"></div> }
          { !this.props.subcategories.isFetching && this.props.subcategories.data.length ? this.renderAddNewButtonGrid() : '' }
        </ul>
        { !this.props.subcategories.isFetching && !this.props.subcategories.data.length ? this.renderAddNewBlock() : '' }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    getCurrentCategory,
    getSubcategoriesRequest,
    setCurrentSubcategory,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubcategoryList);
