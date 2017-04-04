import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { editSubcategoryRequest, deleteSubcategoryRequest, getSubcategoriesRequest } from '../actions/index';

class EditSubcategory extends Component {

  constructor (props) {
    super(props);
    this.state = {
      name: this.props.modalProps.subcategory.name,
      description: this.props.modalProps.subcategory.description,
      subcategoryID: this.props.modalProps.subcategory.id,
      categoryID: this.props.modalProps.category.id,
      userID: this.props.modalProps.user.id,
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount () {
    this.nameInput.focus();
  }

  closeModal () {
    this.props.removeModal();
  }

  onNameChange (event) {
    this.setState({ name: event.target.value });
  }

  onDescriptionChange (event) {
    this.setState({ description: event.target.value });
  }

  onFormSubmit (event) {
    event.preventDefault();

    this.props.editSubcategoryRequest(this.state);
    this.closeModal();
  }

  onDeleteSubcategory (e) {
    e.preventDefault();

    var confirmDelete = confirm('Are you sure you want to delete this Subcategoy? It will remove all Entries that are listed under it - forever...');
    if (confirmDelete) {
      this.props.deleteSubcategoryRequest(this.state);
      this.closeModal();
    }
  }

  render () {
    return (
      <div className="modal-form-container">
        <form onSubmit={ this.onFormSubmit }>
          <input
            value={ this.state.name }
            onChange={ this.onNameChange }
            type="text"
            ref={ (input) => { this.nameInput = input; } }
            defaultValue="will focus"
          />
          <textarea
            value={ this.state.description }
            onChange={ this.onDescriptionChange }
          />
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <button onClick={ this.onDeleteSubcategory.bind(this) } className="btn btn-dangerdanger">Delete Subcategory - Careful!!</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ editSubcategoryRequest, deleteSubcategoryRequest, getSubcategoriesRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSubcategory);
