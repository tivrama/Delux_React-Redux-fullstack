import {
  GET_SUBCATEGORIES_REQUEST,
  GET_SUBCATEGORIES_SUCCESS,
  GET_SUBCATEGORIES_FAILURE,
  EDIT_SUBCATEGORY_REQUEST,
  EDIT_SUBCATEGORY_SUCCESS,
  EDIT_SUBCATEGORY_FAILURE,
  DELETE_SUBCATEGORY_REQUEST,
  DELETE_SUBCATEGORY_SUCCESS,
  DELETE_SUBCATEGORY_FAILURE,
  ADD_SUBCATEGORY_REQUEST,
  ADD_SUBCATEGORY_SUCCESS,
} from '../actions';

// const INITIAL_STATE = [];
const INITIAL_STATE = {
  isFetching: false,
  data: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_SUBCATEGORIES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_SUBCATEGORIES_SUCCESS:
    // return action.payload;
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload,
      });
    case GET_SUBCATEGORIES_FAILURE:
      return state;

    case EDIT_SUBCATEGORY_REQUEST:
      return action.payload;
    case EDIT_SUBCATEGORY_SUCCESS:
      return action.payload;
    case EDIT_SUBCATEGORY_FAILURE:
      return state;

    case DELETE_SUBCATEGORY_REQUEST:
      return action.payload;
    case DELETE_SUBCATEGORY_SUCCESS:
      return action.payload;
    case DELETE_SUBCATEGORY_FAILURE:
      return state;

    case ADD_SUBCATEGORY_REQUEST:
      return state;
    case ADD_SUBCATEGORY_SUCCESS:
    // return action.payload;
      return Object.assign({}, state, {
        data: action.payload,
      });
    default:
      return state;
  }
}
