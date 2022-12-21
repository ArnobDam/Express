import { jwtFetch } from "./jwt";
import { createSelector } from "reselect";
import { SHOW_ADD_ITEM_TO_CART_MODAL } from "./ui";

const RECEIVE_PRODUCTS = "products/RECEIVE_PRODUCTS";
const RECEIVE_PRODUCT = "products/RECEIVE_PRODUCT";

const receiveProducts = (products) => ({
  type: RECEIVE_PRODUCTS,
  payload: products,
});

const receiveProduct = (product) => ({
  type: RECEIVE_PRODUCT,
  payload: product,
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

export const createProductAsync = (newProduct) => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/products", {
      method: "POST",
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    return dispatch(receiveProduct(data));
  } catch (err) {
    const res = await err.json();
    if (res.statusCode === 400) {
      return dispatch(receiveErrors(res.errors));
    }
  }
};

const initialState = {
  entities: null,
  ids: [],
  loading: false,
  loaded: false,
  current: null,
};

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
    case RECEIVE_PRODUCT: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload._id]: action.payload,
        },
      };
    }
    case SHOW_ADD_ITEM_TO_CART_MODAL: {
      return {
        ...state,
        current: action.payload.product,
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
      return { ...state, ...action.payload };
    }
    case CLEAR_PRODUCTS_ERRORS: {
      return nullErrors;
    }
    default:
      return state;
  }
};

export const selectProductEntities = (state) => state.products?.entities;

export const selectProductsList = createSelector(
  selectProductEntities,
  (products) => Object.values(products ?? {})
);

export const selectProductsByCategory = createSelector(
  selectProductsList,
  (_state, categoryId) => categoryId,
  (products, categoryId) =>
    products.filter((product) => product.category === categoryId)
);

export const selectProductById = createSelector(
  selectProductEntities,
  (_state, productId) => productId,
  (products, productId) => products[productId]
);
