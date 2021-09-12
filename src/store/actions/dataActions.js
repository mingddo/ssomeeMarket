import {
  SET_CATEGORIES,
  SET_PRODUCTS,
  SET_SELECTED_PRODUCT,
  SET_CART,
  CLEAR_CART,
} from '../types';

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

export const setCartAction = (item) => (dispatch) => {
  dispatch({
    type: SET_CART,
    payload: item,
  });
};

export const clearCartAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });
};
