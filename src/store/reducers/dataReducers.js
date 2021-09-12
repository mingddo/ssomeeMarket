import { SET_CATEGORIES, SET_PRODUCTS, SET_SELECTED_PRODUCT } from '../types';

const initialState = {
  categorys: [],
  products: [],
  selected: null,
};

export default function dataReducers(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categorys: action.payload,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case SET_SELECTED_PRODUCT:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
}
