import {
  SET_CURRENT_USER,
  SET_CURRENT_CATEGORY,
  SET_CURRENT_SUBCATEGORY,
  GET_CURRENT_USER,
  GET_CURRENT_CATEGORY,
  GET_CURRENT_SUBCATEGORY,
  REMOVE_CURRENT_USER,
  REMOVE_CURRENT_CATEGORY,
  REMOVE_CURRENT_SUBCATEGORY,
 } from '../actions';

const INITIAL_STATE = {
  user: {
    id: '',
    name: '',
  },
  category: {
    id: '',
    name: '',
  },
  subcategory: {
    id: '',
    name: '',
    description: '',
  },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return Object.assign({}, state, {
        user: {
          id: action.payload._id,
          name: action.payload.email,
        },
      });

    case SET_CURRENT_CATEGORY:
      return Object.assign({}, state, {
        category: action.payload,
      });

    case SET_CURRENT_SUBCATEGORY:
      return Object.assign({}, state, {
        subcategory: action.payload,
        data: action.payload,
      });

    case GET_CURRENT_USER:
      return state;

    case GET_CURRENT_CATEGORY:
      return state;

    case GET_CURRENT_SUBCATEGORY:
      return state;

    case REMOVE_CURRENT_USER:
      return Object.assign({}, state, {
        user: '',
      });

    case REMOVE_CURRENT_CATEGORY:
      return Object.assign({}, state, {
        category: '',
      });

    case REMOVE_CURRENT_SUBCATEGORY:
      return Object.assign({}, state, {
        subcategory: '',
      });

    default:
      return state;
  }
}
