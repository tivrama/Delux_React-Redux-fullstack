import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modal } from 'react-redux-modal';
import TimeAgo from 'react-timeago';

import {
  getCurrentSubcategory,
  getEntriesRequest,
} from '../actions';

import EditEntry from './edit-entry';

class EntryList extends Component {
  componentWillMount () {
    this.props.getEntriesRequest(this.props.current.subcategory.id, this.props.entries.sort);
  }

  renderRating (rating) {
    var ratingStars = [];

    for (var i = 0; i < 5; i++) {
      if (rating > 0) {
        ratingStars.push('is-active');
      } else {
        ratingStars.push('');
      }
      rating--;
    }

    return ratingStars.map((active, i) => {
      return (
        <a className={ (active !== '') ? 'read-only is-active' : 'read-only' } key={ i }>★</a>
      );
    });
  }

  renderDate (timestamp) {
    var newTimestamp = new Date(timestamp);

    return newTimestamp;
  }

  openEntryEdit (e, entry) {
    e.preventDefault();

    modal.add(EditEntry, {
      modalProps: entry,
      title: 'Edit Entry',
      closeOnOutsideClick: true,
      hideCloseButton: false,
    });
  }

  compareName (a,b) {
    if (a.type < b.type)
      return -1;
    if (a.type > b.type)
      return 1;
    return 0;
  }

  compareDate (a,b) {
    if (a.createdAt < b.createdAt)
      return -1;
    if (a.createdAt > b.createdAt)
      return 1;
    return 0;
  }

  compareRating (a,b) { // Note: sorting in reverse order to put highest rating on top
    if (a.rating > b.rating)
      return -1;
    if (a.rating < b.rating)
      return 1;
    return 0;
  }

  renderEntries () {
    let entries = this.props.entries.data;
    let sort = this.props.entries.sort;
    if (sort === 'A-Z') {
      entries = entries.sort(this.compareName);
    } else if (sort === 'Date') {
      entries = entries.sort(this.compareDate);
    } else {
      entries = entries.sort(this.compareRating);
    }

    return entries.map((entry) => {
      return (
        <li key={ entry._id } className="entry-listing">
          <div className="entry-listing-container">
            <div className="entry-listing-header">
              <h6 className="entry-listing-title">{ entry.type }</h6>
              <div className="entry-listing-timestamp">
                <TimeAgo date={ this.renderDate(entry.createdAt) } minPeriod={ 5 } title={ entry.createdAt } />
              </div>
            </div>
            <div className="entry-listing-content">
              <div className="entry-listing-rating react-rater">
                { this.renderRating(entry.rating) }
              </div>
              <p className="entry-listing-notes">{ entry.notes }</p>
              <button onClick={ (e) => this.openEntryEdit(e, entry) } className="btn btn-warn">Change Entry</button>
            </div>
          </div>
        </li>
      );
    });
  }

  renderAddNewBlock () {
    return (
      <div className="add-new-block">
        <h4>Nothing here yet!</h4>
        <p>Looks like you haven't logged any entries for { this.props.current.subcategory.name }.</p>
      </div>
    );
  }

  render () {
    return (
      <ul className="entry-list">
        { !this.props.entries.isFetching ? this.renderEntries() : <div className="spinner"></div> }
        { !this.props.entries.isFetching && !this.props.entries.data.length ? this.renderAddNewBlock() : '' }
      </ul>
    );
  }
}

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    getCurrentSubcategory,
    getEntriesRequest,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryList);
