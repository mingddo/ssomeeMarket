import { SET_CATEGORIES, SET_PRODUCTS, SET_SELECTED_PRODUCT } from '../types';

export const getCategoryAction = (category) => (dispatch) => {
  dispatch({
    type: SET_CATEGORIES,
    payload: category,
  });
};

export const getProductsAction = (products) => (dispatch) => {
  dispatch({
    type: SET_PRODUCTS,
    payload: products,
  });
};

export const selectProductsAction = (id) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_PRODUCT,
    payload: id,
  });
};
