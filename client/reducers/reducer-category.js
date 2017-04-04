import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
  EDIT_CATEGORY_REQUEST,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,

} from '../actions';

// import INITIAL_STATE from '../initialstate';

// Subcategory initial state
// const INITIAL_STATE = [{
//   id: 'S1',
//   name: 'brie',
//   ancestors: {
//     user: 1,
//     category: 'C1'
//   },
//   parent: 'C1'
// }]
const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_CATEGORY_REQUEST:
      return state;
    case ADD_CATEGORY_SUCCESS:
      return action.payload;
    case ADD_CATEGORY_FAILURE:
      return state;

    case EDIT_CATEGORY_REQUEST:
      return state;
    case EDIT_CATEGORY_SUCCESS:
      return action.payload;
    case EDIT_CATEGORY_FAILURE:
      return state;

    case DELETE_CATEGORY_REQUEST:
      return state;
    case DELETE_CATEGORY_SUCCESS:
      return action.payload;
    case DELETE_CATEGORY_FAILURE:
      return state;

    case GET_CATEGORIES_REQUEST:
      return state;
    case GET_CATEGORIES_SUCCESS:
      return action.payload;
    case GET_CATEGORIES_FAILURE:
      return state;
    default:
      return state;
  }
}
