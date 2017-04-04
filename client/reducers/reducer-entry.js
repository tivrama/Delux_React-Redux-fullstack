import {
  ADD_ENTRY_REQUEST,
  ADD_ENTRY_SUCCESS,
  EDIT_ENTRY_REQUEST,
  EDIT_ENTRY_SUCCESS,
  EDIT_ENTRY_FAILURE,
  DELETE_ENTRY_REQUEST,
  DELETE_ENTRY_SUCCESS,
  DELETE_ENTRY_FAILURE,
  GET_ENTRIES_REQUEST,
  GET_ENTRIES_SUCCESS,
  SORT_ENTRIES_REQUEST,
 } from '../actions/index';

// const INITIAL_STATE = [];
const INITIAL_STATE = {
  isFetching: false,
  data: [],
  sort: 'A-Z',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ENTRIES_REQUEST:
    // return state;
      return Object.assign({}, state, {
        isFetching: true,
      });

    case GET_ENTRIES_SUCCESS:
    // return action.payload;
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload,
        sort: state.sort,
      });

    case ADD_ENTRY_REQUEST:
    // return action.payload;
      return state;
    // return Object.assign({}, state, {
    //   // data: action.payload
    //   isFetching: true
    // });
    case ADD_ENTRY_SUCCESS:
    // return state;
      return Object.assign({}, state, {
        data: action.payload,
        isFetching: false,
      });

    case EDIT_ENTRY_REQUEST:
      return state;
    case EDIT_ENTRY_SUCCESS:
      return state;
    case EDIT_ENTRY_FAILURE:
      return state;

    case DELETE_ENTRY_REQUEST:
      return state;
    case DELETE_ENTRY_SUCCESS:
      return state;
    case DELETE_ENTRY_FAILURE:
      return state;

    case SORT_ENTRIES_REQUEST:
      return Object.assign({}, state, {
        sort: action.payload,
      });

    default:
      return state;
  }
}
