import {
  SET_CATEGORIES,
  SET_PRODUCTS,
  SET_SELECTED_PRODUCT,
  SET_CART,
  CLEAR_CART,
} from '../types';

const initialState = {
  categorys: [],
  products: [],
  selected: null,
  cart: [],
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
        products: state.products.concat(action.payload),
      };
    case SET_SELECTED_PRODUCT:
      return {
        ...state,
        selected: action.payload,
      };
    case SET_CART:
      let idx = state.cart.findIndex(
        (item) => item.prefix === action.payload.prefix,
      );
      if (idx === -1) {
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              prefix: action.payload.prefix,
              detail: action.payload,
              count: 1,
            },
          ],
        };
      } else {
        let temp = [...state.cart];
        temp.splice(idx, 1, {
          prefix: action.payload.prefix,
          detail: action.payload,
          count: state.cart[idx].count + 1,
        });
        return {
          ...state,
          cart: temp,
        };
      }
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
}
