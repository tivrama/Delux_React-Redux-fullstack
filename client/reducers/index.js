import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as ModalReducer } from 'react-redux-modal';
import { reducer as toastrReducer } from 'react-redux-toastr';

import Current from './reducer-current';
import Categories from './reducer-category';
import Subcategories from './reducer-subcategory';
import Entry from './reducer-entry';
import Auth from './reducer-auth';

export default combineReducers({
  current: Current,
  modals: ModalReducer,
  categories: Categories,
  subcategories: Subcategories,
  entries: Entry,
  auth: Auth,
  form: formReducer,
  routing: routerReducer,
  toastr: toastrReducer,
});
