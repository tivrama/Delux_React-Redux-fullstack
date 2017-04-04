import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modal } from 'react-redux-modal';
import ReactCSS from 'react-addons-css-transition-group';

import { getCurrentSubcategory, sortEntry } from '../actions/index';

import AddEntry from './add-entry';
import EntryList from './entry-list';
import EditSubcategory from './edit-subcategory';

class Detail extends Component {

  componentDidUpdate () {
    window.scrollTo(0,0);
  }

  openEntryForm (subcategory) {
    modal.add(AddEntry, {
      title: 'Add Entry',
      closeOnOutsideClick: true,
      hideCloseButton: false,
    });
  }

  openSubcategoryEdit (e, subcategory) {
    e.preventDefault();

    modal.add(EditSubcategory, {
      modalProps: subcategory,
      title: 'Edit Subcategory',
      closeOnOutsideClick: true,
      hideCloseButton: false,
    });
  }

  sortToggle () {
    this.props.sortEntry(this.props.entries.sort);
  }

  render () {
    const subcategory = this.props.current.subcategory;

    if (subcategory.id === 1) {
      return (
      <ReactCSS component="div" transitionName="fade-in" transitionAppear={ true } transitionAppearTimeout={ 300 } transitionEnterTimeout={ 300 } transitionLeaveTimeout={ 300 }>
        <div className="container">
          <div className="content">
            <h6 className="grid-title">{ this.props.current.category.name } <span className="breadcrumbs-separator">&rsaquo;</span> { subcategory.name }
            </h6>
          </div>
        </div>
      </ReactCSS>
      );
    }

    return (
      <ReactCSS component="div" transitionName="fade-in" transitionAppear={ true } transitionAppearTimeout={ 300 } transitionEnterTimeout={ 300 } transitionLeaveTimeout={ 300 }>
        <div className="container">
          <div className="content">
            <h6 className="grid-title">{ this.props.current.category.name } <span className="breadcrumbs-separator">&rsaquo;</span> { subcategory.name }
              <button className="btn-edit" onClick={ (e) => this.openSubcategoryEdit(e, this.props.current) }>Edit {subcategory.name}</button>
            </h6>
            <div className="detail-header">
              <h1 className="detail-header-title">{ subcategory.name }</h1>
              <p>{ subcategory.description }</p>
              <button onClick={ this.openEntryForm.bind(this) } className="btn btn-primary">Add New Entry</button>
            </div>

            <button className="btn-edit" onClick={ this.sortToggle.bind(this) }>Sorting by {this.props.entries.sort}</button>
            <h5>Your History:</h5>

            <EntryList />
          </div>
        </div>
      </ReactCSS>
    );
  }
}

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getCurrentSubcategory, sortEntry }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
