import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from '../actions/auth';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {

    case ADD_USER_REQUEST:
      return state;
    case ADD_USER_SUCCESS:
      return action.payload;
    case ADD_USER_FAILURE:
      return state;

    case LOGIN_REQUEST:
      return state;
    case LOGIN_SUCCESS:
      return action.payload;
    case LOGIN_FAILURE:
      return state;

    case LOGOUT_REQUEST:
      return state;
    case LOGOUT_SUCCESS:
      return state;
    case LOGOUT_FAILURE:
      return state;

    case FORGOT_PASSWORD_REQUEST:
      return state;
    case FORGOT_PASSWORD_SUCCESS:
      return action.payload;
    case FORGOT_PASSWORD_FAILURE:
      return state;

    case RESET_PASSWORD_REQUEST:
      return state;
    case RESET_PASSWORD_SUCCESS:
      return action.payload;
    case RESET_PASSWORD_FAILURE:
      return state;

    default:
      return state;
  }
}
