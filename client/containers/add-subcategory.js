import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addSubcategoryRequest } from '../actions';

class AddSubcategory extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      categoryID: this.props.current.category.id,
    }

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

    this.props.addSubcategoryRequest(this.state);
    this.closeModal();
  }

  render () {
    return (
      <div className="modal-form-container">
        <form onSubmit={ this.onFormSubmit }>
          <input
            value={ this.state.name }
            onChange={ this.onNameChange.bind(this) }
            type="text"
            placeholder="Name"
            ref={ (input) => { this.nameInput = input; } }
            defaultValue="will focus"
          />
          <textarea
            value={ this.state.description }
            onChange={ this.onDescriptionChange }
            placeholder="Description"
          />
          <button type="submit" className="btn btn-primary">Add Variety</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ addSubcategoryRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSubcategory);
