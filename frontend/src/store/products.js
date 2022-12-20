import { jwtFetch } from "./jwt";

const RECEIVE_PRODUCTS = "products/RECEIVE_PRODUCTS";
const RECEIVE_PRODUCT = "products/RECEIVE_PRODUCT";

const receiveProducts = (products) => ({
  type: RECEIVE_PRODUCTS,
  payload: products,
});

export const fetchProductsAsync = () => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/products");
    const data = await res.json();
    const products = data.reduce((prev, curr) => {
      prev[curr._id] = curr;
      return prev;
    }, {});
    return dispatch(receiveProducts(products));
  } catch (err) {
    const res = await err.json();
    if (res.statusCode === 400) {
      return dispatch(receiveErrors(res.errors));
    }
  }
};

const initialState = { entities: null, ids: [], loading: false, loaded: false };

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS: {
      // TODO:
      return {
        ...state,
        loading: false,
        loaded: true,
        entities: action.payload,
        ids: Object.keys(action.payload),
      };
    }
    default:
      return state;
  }
};

const RECEIVE_PRODUCTS_ERRORS = "products/RECEIVE_PRODUCTS_ERRORS";
const CLEAR_PRODUCTS_ERRORS = "products/CLEAR_PRODUCTS_ERRORS";
const receiveErrors = (errors) => ({
  type: RECEIVE_PRODUCTS_ERRORS,
  payload: errors,
});

const nullErrors = null;

export const productsErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS_ERRORS: {
      return action.errors;
    }
    case CLEAR_PRODUCTS_ERRORS: {
      return nullErrors;
    }
    default:
      return state;
  }
};

const selectProductsByCategory = (state) => {};