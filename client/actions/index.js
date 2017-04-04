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


export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const GET_CURRENT_CATEGORY = 'GET_CURRENT_CATEGORY';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
export const REMOVE_CURRENT_CATEGORY = 'REMOVE_CURRENT_CATEGORY';

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

