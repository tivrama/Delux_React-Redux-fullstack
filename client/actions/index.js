import axios from 'axios';
import { toastr, actions as toastrActions } from 'react-redux-toastr';

import { toastrOptions, toastrOptionsDismiss } from './auth';

const API_FOOD = '/api/food/';
const API_CATEGORY = `${API_FOOD}category`;
const API_SUBCATEGORY = `${API_FOOD}subcategory`;
const API_ENTRY = `${API_FOOD}entry`;

// Category
export const ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';
export function addCategoryRequest (category) {

  return dispatch => {
    dispatch(addCategory());
    let token = localStorage.getItem('jwtToken');

    return axios({
      method: 'POST',
      url: API_CATEGORY,
      data: category,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      // Sort the categories
      response.data = response.data.sort(compare);
      dispatch(toastrActions.clean());
      toastr.success('Category added!', `The category ${category.name} was added successfully!`, toastrOptionsDismiss);
      dispatch(addCategorySuccess(response.data));
    })
    .catch(response => {
      // console.error('subcategories POST error:', response);
      dispatch(toastrActions.clean());
      toastr.error('Error', 'There was an error adding a new category. Please try again.', toastrOptions);
    });
  };
}

function addCategory () {
  return {
    type: ADD_CATEGORY_REQUEST,
  };
}

function addCategorySuccess (category) {
  return {
    type: ADD_CATEGORY_SUCCESS,
    payload: category,
  };
}

function compare (a,b) {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';
export function getCategoriesRequest (userID) {
  return dispatch => {
    dispatch(getCategories());
    let token = localStorage.getItem('jwtToken');

    return axios({
      method: 'GET',
      url: API_CATEGORY,
      params: {
        userID: userID,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      // Sort the categories
      response.data = response.data.sort(compare);
      dispatch(getCategoriesSuccess(response.data));
    })
    .catch(response => {
      // console.error('categories GET error:', response);
      dispatch(toastrActions.clean());
      toastr.error('Error', 'There was an error retrieving categories. Please try again.', toastrOptions);
    });
  };
}

function getCategories () {
  return {
    type: GET_CATEGORIES_REQUEST,
  };
}

function getCategoriesSuccess (categories) {
  return {
    type: GET_CATEGORIES_SUCCESS,
    payload: categories,
  };
}

export const EDIT_CATEGORY_REQUEST = 'EDIT_CATEGORY_REQUEST';
export const EDIT_CATEGORY_SUCCESS = 'EDIT_CATEGORY_SUCCESS';
export const EDIT_CATEGORY_FAILURE = 'EDIT_CATEGORY_FAILURE';
export function editCategoryRequest (category) {
  return dispatch => {
    dispatch(editCategory(category));
    let token = localStorage.getItem('jwtToken');

    return axios({
      method: 'PUT',
      url: API_CATEGORY,
      data: category,
      contentType: 'application/json',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      // Sort the categories
      response.data = response.data.sort(compare);
      dispatch(toastrActions.clean());
      toastr.success('Category edited!', 'Your category was edited successfully!', toastrOptionsDismiss);
      dispatch(editCategorySuccess(response.data));
      let updateCategory = {
        id: category.categoryID,
        name: category.type,
      };
      dispatch(setCurrentCategory(updateCategory));
    })
    .catch(response => {
      // console.error('error in editCategoryRequest:', response);
      dispatch(toastrActions.clean());
      toastr.error('Error editing new category', 'There was an error editing this category. Please try again.', toastrOptions);
    });
  };
}

function editCategory (category) {
  return {
    type: EDIT_CATEGORY_REQUEST,
    payload: category,
  };
}

function editCategorySuccess (categories) {
  return {
    type: EDIT_CATEGORY_SUCCESS,
    payload: categories,
  };
}

export const DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE';
export function deleteCategoryRequest (category) {
  return dispatch => {
    dispatch(deleteCategory(category));
    let token = localStorage.getItem('jwtToken');

    return axios({
      method: 'DELETE',
      url: API_CATEGORY,
      data: category,
      contentType: 'application/json',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      // var res = JSON.parse(response.config.data);
      // dispatch(toastrActions.clean());
      // toastr.success('Category deleted!', `Your category was deleted successfully!`, toastrOptionsDismiss);
      dispatch(deleteCategorySuccess(response.data));
      let updateCategory = {
        id: 1,
        name: `${category.type} - DELETED`,
      };
      dispatch(setCurrentCategory(updateCategory));
      dispatch(getSubcategoriesSuccess(response.data));
    })
    .catch(response => {
      // console.error('le error in editCategoryRequest:', response);
      dispatch(toastrActions.clean());
      toastr.error('Error deleting new category', 'There was an error deleting this category. Please try again.', toastrOptions);
    });
  };
}

function deleteCategory (category) {
  return {
    type: DELETE_CATEGORY_REQUEST,
    payload: category,
  };
}

function deleteCategorySuccess (categories) {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    payload: categories,
  };
}

// Subcategory
export const ADD_SUBCATEGORY_REQUEST = 'ADD_SUBCATEGORY_REQUEST';
export const ADD_SUBCATEGORY_SUCCESS = 'ADD_SUBCATEGORY_SUCCESS';
export const ADD_SUBCATEGORY_FAILURE = 'ADD_SUBCATEGORY_FAILURE';
export function addSubcategoryRequest (subcategory) {
  return dispatch => {
    dispatch(addSubcategory());
    let token = localStorage.getItem('jwtToken');

    return axios({
      method: 'POST',
      url: API_SUBCATEGORY,
      data: subcategory,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      dispatch(toastrActions.clean());
      toastr.success('Variety added!', `The variety ${subcategory.name} was added successfully!`, toastrOptionsDismiss);
      response.data = response.data.sort(compare);
      dispatch(addSubcategorySuccess(response.data));
    })
    .catch(response => {
      // console.error('subcategories POST error:', response);
      dispatch(toastrActions.clean());
      toastr.error('Error', 'There was an error adding a new variety. Please try again.', toastrOptions);
    });
  };
}

function addSubcategory () {
  return {
    type: ADD_SUBCATEGORY_REQUEST,
  };
}

function addSubcategorySuccess (subcategory) {
  return {
    type: ADD_SUBCATEGORY_SUCCESS,
    payload: subcategory,
  };
}

export const GET_SUBCATEGORIES_REQUEST = 'GET_SUBCATEGORIES_REQUEST';
export const GET_SUBCATEGORIES_SUCCESS = 'GET_SUBCATEGORIES_SUCCESS';
export const GET_SUBCATEGORIES_FAILURE = 'GET_SUBCATEGORIES_FAILURE';
export function getSubcategoriesRequest (categoryID) {
  return dispatch => {
    dispatch(getSubcategories());
    let token = localStorage.getItem('jwtToken');

    return axios({
      method: 'GET',
      url: API_SUBCATEGORY,
      params: {
        categoryID: categoryID,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      response.data = response.data.sort(compare);
      dispatch(getSubcategoriesSuccess(response.data));
    })
    .catch(response => {
      // console.error('subcategories GET error:', response);
      dispatch(toastrActions.clean());
      toastr.error('Error', 'There was an error retrieving varieties. Please try again.', toastrOptions);
    });
  };
}

function getSubcategories () {
  return {
    type: GET_SUBCATEGORIES_REQUEST,
    // payload: subcategories
  };
}

function getSubcategoriesSuccess (subcategories) {
  return {
    type: GET_SUBCATEGORIES_SUCCESS,
    payload: subcategories,
  };
}

export const EDIT_SUBCATEGORY_REQUEST = 'EDIT_SUBCATEGORY_REQUEST';
export const EDIT_SUBCATEGORY_SUCCESS = 'EDIT_SUBCATEGORY_SUCCESS';
export const EDIT_SUBCATEGORY_FAILURE = 'EDIT_SUBCATEGORY_FAILURE';
export function editSubcategoryRequest (subcategory) {
  return dispatch => {
    dispatch(editSubcategory(subcategory));
    let token = localStorage.getItem('jwtToken');

    return axios({
      method: 'PUT',
      url: API_SUBCATEGORY,
      data: subcategory,
      contentType: 'application/json',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      // Sort the categories
      response.data = response.data.sort(compare);
      dispatch(toastrActions.clean());
      toastr.success('Subcategory edited!', 'Your subcategory was edited successfully!', toastrOptionsDismiss);
      dispatch(editSubcategorySuccess(response.data));
      let updateSubcategory = {
        id: subcategory.subcategoryID,
        name: subcategory.name,
        description: subcategory.description,
      };
      dispatch(setCurrentSubcategory(updateSubcategory));
      dispatch(getSubcategoriesSuccess(response.data));
    })
    .catch(response => {
      console.error('error in editSubcategoryRequest:', response);
      dispatch(toastrActions.clean());
      toastr.error('Error editing new subcategory', 'There was an error editing this subcategory. Please try again.', toastrOptions);
    });
  };
}

function editSubcategory (subcategory) {
  return {
    type: EDIT_SUBCATEGORY_REQUEST,
    payload: subcategory,
  };
}

function editSubcategorySuccess (subcategories) {
  return {
    type: EDIT_SUBCATEGORY_SUCCESS,
    payload: subcategories,
  };
}

export const DELETE_SUBCATEGORY_REQUEST = 'DELETE_SUBCATEGORY_REQUEST';
export const DELETE_SUBCATEGORY_SUCCESS = 'DELETE_SUBCATEGORY_SUCCESS';
export const DELETE_SUBCATEGORY_FAILURE = 'DELETE_SUBCATEGORY_FAILURE';
export function deleteSubcategoryRequest (subcategory) {
  return dispatch => {
    dispatch(deleteSubcategory(subcategory));
    let token = localStorage.getItem('jwtToken');

    return axios({
      method: 'DELETE',
      url: API_SUBCATEGORY,
      data: subcategory,
      contentType: 'application/json',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      dispatch(toastrActions.clean());
      // toastr.success('Category deleted!', `Your subcategory was deleted successfully!`, toastrOptionsDismiss);
      dispatch(deleteSubcategorySuccess(response.data));
      let updateSubcategory = {
        id: 1,
        name: `${subcategory.name} - DELETED`,
      };
      dispatch(setCurrentSubcategory(updateSubcategory));
      dispatch(getSubcategoriesSuccess(response.data));
    })
    .catch(response => {
      // console.error('le error in editSubcategoryRequest:', response);
      dispatch(toastrActions.clean());
      toastr.error('Error deleting new subcategory', 'There was an error deleting this subcategory. Please try again.', toastrOptions);
    });
  };
}

function deleteSubcategory (subcategory) {
  return {
    type: DELETE_SUBCATEGORY_REQUEST,
    payload: subcategory,
  };
}

function deleteSubcategorySuccess (subcategories) {
  return {
    type: DELETE_SUBCATEGORY_SUCCESS,
    payload: subcategories,
  };
}

// Entry
export const ADD_ENTRY_REQUEST = 'ADD_ENTRY_REQUEST';
export const ADD_ENTRY_SUCCESS = 'ADD_ENTRY_SUCCESS';
export const ADD_ENTRY_FAILURE = 'ADD_ENTRY_FAILURE';
export function addEntryRequest (entry) {
  if (!entry.notes) {
    entry.notes = 'No notes yet';
  }
  return dispatch => {
    dispatch(addEntry(entry));
    let token = localStorage.getItem('jwtToken');

    return axios({
      method: 'POST',
      url: API_ENTRY,
      data: entry,
      contentType: 'application/json',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      var res = JSON.parse(response.config.data);
      dispatch(toastrActions.clean());
      toastr.success('Entry added!', 'Your entry was saved successfully!', toastrOptionsDismiss);
      dispatch(addEntrySuccess(response.data));
      dispatch(getEntriesRequest(res.subcategoryID));
    })
    .catch(response => {
      // console.error('le error in addEntryRequest:', response);
      dispatch(toastrActions.clean());
      toastr.error('Error adding new entry', 'There was an error posting your newest entry. Please try again.', toastrOptions);
    });
  };
}

function addEntry (entry) {
  return {
    type: ADD_ENTRY_REQUEST,
    payload: entry,
  };
}

function addEntrySuccess (entries) {
  return {
    type: ADD_ENTRY_SUCCESS,
    payload: entries,
  };
}

export const EDIT_ENTRY_REQUEST = 'EDIT_ENTRY_REQUEST';
export const EDIT_ENTRY_SUCCESS = 'EDIT_ENTRY_SUCCESS';
export const EDIT_ENTRY_FAILURE = 'EDIT_ENTRY_FAILURE';
export function editEntryRequest (entry) {
  return dispatch => {
    dispatch(editEntry(entry));
    let token = localStorage.getItem('jwtToken');

    return axios({
      method: 'PUT',
      url: API_ENTRY,
      data: entry,
      contentType: 'application/json',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      var res = JSON.parse(response.config.data);
      dispatch(toastrActions.clean());
      toastr.success('Entry edited!', 'Your entry was edited successfully!', toastrOptionsDismiss);
      dispatch(editEntrySuccess(response.data));
      dispatch(getEntriesRequest(res.subcategoryID));
    })
    .catch(response => {
      // console.error('le error in editEntryRequest:', response);
      dispatch(toastrActions.clean());
      toastr.error('Error editing new entry', 'There was an error editing this entry. Please try again.', toastrOptions);
    });
  };
}

function editEntry (entry) {
  return {
    type: EDIT_ENTRY_REQUEST,
    payload: entry,
  };
}

function editEntrySuccess (entries) {
  return {
    type: EDIT_ENTRY_SUCCESS,
    payload: entries,
  };
}

export const DELETE_ENTRY_REQUEST = 'DELETE_ENTRY_REQUEST';
export const DELETE_ENTRY_SUCCESS = 'DELETE_ENTRY_SUCCESS';
export const DELETE_ENTRY_FAILURE = 'DELETE_ENTRY_FAILURE';
export function deleteEntryRequest (entry) {
  return dispatch => {
    dispatch(deleteEntry(entry));
    let token = localStorage.getItem('jwtToken');

    return axios({
      method: 'DELETE',
      url: API_ENTRY,
      data: entry,
      contentType: 'application/json',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      var res = JSON.parse(response.config.data);
      dispatch(toastrActions.clean());
      toastr.success('Entry deleted!', 'Your entry was deleted successfully!', toastrOptionsDismiss);
      dispatch(deleteEntrySuccess(response.data));
      dispatch(getEntriesRequest(res.subcategoryID));
    })
    .catch(response => {
      // console.error('le error in editEntryRequest:', response);
      dispatch(toastrActions.clean());
      toastr.error('Error deleting new entry', 'There was an error deleting this entry. Please try again.', toastrOptions);
    });
  };
}

function deleteEntry (entry) {
  return {
    type: DELETE_ENTRY_REQUEST,
    payload: entry,
  };
}

function deleteEntrySuccess (entries) {
  return {
    type: DELETE_ENTRY_SUCCESS,
    payload: entries,
  };
}

export const GET_ENTRIES_REQUEST = 'GET_ENTRIES_REQUEST';
export const GET_ENTRIES_SUCCESS = 'GET_ENTRIES_SUCCESS';
export const GET_ENTRIES_FAILURE = 'GET_ENTRIES_FAILURE';

export function getEntriesRequest (subcategory) {
  return dispatch => {
    dispatch(getEntries());
    let token = localStorage.getItem('jwtToken');

    return axios({
      method: 'GET',
      url: API_ENTRY,
      params: {
        subcategoryID: subcategory,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => dispatch(getEntriesSuccess(response.data.reverse())))
    .catch(response => {
      // console.error('le error:', response);
      dispatch(toastrActions.clean());
      toastr.error('Error retrieving entries', 'There was an error retrieving entries. Please try again.', toastrOptions);
    });
  };
}

function getEntries () {
  return {
    type: GET_ENTRIES_REQUEST,
  };
}

function getEntriesSuccess (entries) {
  return {
    type: GET_ENTRIES_SUCCESS,
    payload: entries,
  };
}

export const SORT_ENTRIES_REQUEST = 'SORT_ENTRIES_REQUEST';

export function sortEntry (sortOrderRequest) {
  let current = sortOrderRequest;
  if (current === 'A-Z') {
    current = 'Date';
  } else if (current === 'Date') {
    current = 'Favorites';
  } else {
    current = 'A-Z';
  }
  return dispatch => {
    dispatch(sortEntriesRequest(current));
  };
}

function sortEntriesRequest (currentOrderRequest) {
  return {
    type: SORT_ENTRIES_REQUEST,
    payload: currentOrderRequest,
  };
}

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
export const SET_CURRENT_SUBCATEGORY = 'SET_CURRENT_SUBCATEGORY';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const GET_CURRENT_CATEGORY = 'GET_CURRENT_CATEGORY';
export const GET_CURRENT_SUBCATEGORY = 'GET_CURRENT_SUBCATEGORY';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
export const REMOVE_CURRENT_CATEGORY = 'REMOVE_CURRENT_CATEGORY';
export const REMOVE_CURRENT_SUBCATEGORY = 'REMOVE_CURRENT_SUBCATEGORY';

export function setCurrentUser (user) {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
}

export function setCurrentCategory (category) {
  return {
    type: SET_CURRENT_CATEGORY,
    payload: category,
  };
}

export function setCurrentSubcategory (subcategory) {
  return {
    type: SET_CURRENT_SUBCATEGORY,
    payload: subcategory,
  };
}

export function getCurrentUser () {
  return {
    type: GET_CURRENT_USER,
    // payload: user
  };
}

export function getCurrentCategory () {
  return {
    type: GET_CURRENT_CATEGORY,
    // payload: category
  };
}

export function getCurrentSubcategory () {
  return {
    type: GET_CURRENT_SUBCATEGORY,
    // payload: subcategory
  };
}

export function removeCurrentUser () {
  return {
    type: REMOVE_CURRENT_USER,
    // payload: user
  };
}

export function removeCurrentCategory () {
  return {
    type: REMOVE_CURRENT_CATEGORY,
    // payload: category
  };
}

export function removeCurrentSubcategory () {
  return {
    type: REMOVE_CURRENT_SUBCATEGORY,
    // payload: subcategory
  };
}
