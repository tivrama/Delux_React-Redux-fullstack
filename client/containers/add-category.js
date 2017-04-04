import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addCategoryRequest } from '../actions';

class AddCategory extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      userID: this.props.auth.user._id,
    };

    this.onNameChange = this.onNameChange.bind(this);
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

  onFormSubmit (event) {
    event.preventDefault();
    this.props.addCategoryRequest(this.state);
    this.closeModal();
  }

  render () {
    return (
      <div className="modal-form-container">
        <form onSubmit={ this.onFormSubmit }>
          <input
            value={ this.state.name }
            onChange={ this.onNameChange.bind(this) }
            ref={ (input) => { this.nameInput = input; } }
            type="text"
            placeholder="Name"
            defaultValue="will focus"
          />
          <button type="submit" className="btn btn-primary">Add Category</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ addCategoryRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);
