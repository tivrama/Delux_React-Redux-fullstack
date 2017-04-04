import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Rater from 'react-rater';

import { addEntryRequest } from '../actions';

class AddEntry extends Component {
  constructor (props) {
    super(props);

    this.state = {
      type: '',
      notes: '',
      rating: 0,
      categoryID: this.props.current.category.id,
      subcategoryID: this.props.current.subcategory.id,
      userID: this.props.current.user.id,
    };

    this.onTypeChange = this.onTypeChange.bind(this);
    this.onNotesChange = this.onNotesChange.bind(this);
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

  onNotesChange (event) {
    this.setState({ notes: event.target.value });
  }

  onRating (rating, lastRating) {
    if (lastRating !== undefined) {
      this.setState({ rating: rating });
    }
  }

  onFormSubmit (event) {
    event.preventDefault();

    this.props.addEntryRequest(this.state);
    this.closeModal();
  }

  render () {
    return (
      <div className="modal-form-container">
        <form onSubmit={ this.onFormSubmit }>
          <input
            value={ this.state.type }
            onChange={ this.onTypeChange }
            type="text"
            placeholder="Type"
            ref={ (input) => { this.nameInput = input; } }
            defaultValue="will focus"
          />
          <textarea
            value={ this.state.notes }
            onChange={ this.onNotesChange }
            placeholder="Notes"
          />
          <Rater
            onRate={ this.onRating.bind(this) }
            interactive={ true }
          />
          <button type="submit" className="btn btn-primary">Add Entry</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ addEntryRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEntry);
