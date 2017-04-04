import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { editCategoryRequest, deleteCategoryRequest } from '../actions/index';

class EditEntry extends Component {

  constructor (props) {
    super(props);
    this.state = {
      type: this.props.modalProps.category.name,
      categoryID: this.props.modalProps.category.id,
      userID: this.props.modalProps.user.id,
    };

    this.onTypeChange = this.onTypeChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount () {
    this.nameInput.focus();
  }

  closeModal () {
    this.props.removeModal();
  }

  onTypeChange (event) {
    this.setState({ type: event.target.value });
  }

  onFormSubmit (event) {
    event.preventDefault();

    this.props.editCategoryRequest(this.state);
    this.closeModal();
  }

  // TODO: remove deleted category route from react-router history.
  onDeleteCategory (e) {
    e.preventDefault();

    var confirmDelete = confirm('Are you sure you want to delete this Categoy? It will remove all Sub-Categories and Entries that are listed under it - forever...');
    if (confirmDelete) {
      this.props.deleteCategoryRequest(this.state);
      this.closeModal();
    }
  }

  render () {
    return (
      <div className="modal-form-container">
        <form onSubmit={ this.onFormSubmit }>
          <input
            value={ this.state.type }
            onChange={ this.onTypeChange }
            type="text"
            ref={ (input) => { this.nameInput = input; } }
            defaultValue="will focus"
          />
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <button onClick={ this.onDeleteCategory.bind(this) } className="btn btn-dangerdanger">Delete Category - Careful!!</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ editCategoryRequest, deleteCategoryRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEntry);
