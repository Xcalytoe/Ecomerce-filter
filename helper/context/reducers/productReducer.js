import {
  FILTER_LOADING,
  FILTER_SUCCESS,
  FILTER_ERROR,
  FILTER_SUCCESS_PREV,
} from "../actionsType/actiontypes";
export const initialProduct = {
  loading: false,
  products: [],
  prevProducts: [],
  error: null,
};
export const product = (state = initialProduct, action) => {
  const { type, payload } = action;
  switch (type) {
    case FILTER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: payload,
      };
    case FILTER_SUCCESS_PREV:
      return {
        ...state,
        loading: false,
        error: null,
        prevProducts: payload,
      };
    case FILTER_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
