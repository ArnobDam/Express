import { jwtFetch } from "./jwt";
import { createSelector } from "reselect";
import {
  EDIT_PRODUCT_MODAL,
  SHOW_ADD_ITEM_TO_CART_MODAL,
  // SHOW_ADD_NEW_ITEM_MODAL,
} from "./ui";

const RECEIVE_PRODUCTS = "products/RECEIVE_PRODUCTS";
const RECEIVE_PRODUCT = "products/RECEIVE_PRODUCT";
const REMOVE_PRODUCT = "products/REMOVE_PRODUCT";
const CLEAR_CURRENT = "products/CLEAR_CURRENT";

const receiveProducts = (products) => ({
  type: RECEIVE_PRODUCTS,
  payload: products,
});

const receiveProduct = (product) => ({
  type: RECEIVE_PRODUCT,
  payload: product,
});

const removeProduct = (productId) => ({
  type: REMOVE_PRODUCT,
  payload: productId,
});

export const clearCurrent = () => ({
  type: CLEAR_CURRENT,
});

export const fetchProductsAsync = () => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/products");
    const data = await res.json();
    const productsWithDefaultImages = data.map((product) => {
      if (product.imageUrl) {
        return product;
      }
      return {
        ...product,
        imageUrl: "/img/placeholder.jpg",
      };
    });
    const products = productsWithDefaultImages.reduce((prev, curr) => {
      prev[curr._id] = curr;
      return prev;
    }, {});

    return dispatch(receiveProducts(products));
  } catch (err) {
    const res = await err.json();
    if (res.statusCode >= 400) {
      return dispatch(receiveErrors(res.errors));
    }
  }
};

export const createProductAsync = (newProduct) => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/products", {
      method: "POST",
      body: newProduct,
    });
    const data = await res.json();
    const product = {
      ...data,
      imageUrl: data.imageUrl ? data.imageUrl : "/img/placeholder.jpg",
    };
    dispatch(receiveProduct(product));
    return res;
  } catch (err) {
    const res = await err.json();
    if (res.statusCode >= 400) {
      dispatch(receiveErrors(res.errors));
      return res;
    }
  }
};

export const updateProductAsync = (updatedProduct) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/products/${updatedProduct._id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    dispatch(receiveProduct(data));
    return res;
  } catch (err) {
    const res = await err.json();
    if (res.statusCode >= 400) {
      dispatch(receiveErrors(res.errors));
      return res;
    }
  }
};

export const removeProductAsync = (productId) => async (dispatch) => {
  try {
    await jwtFetch(`/api/products/${productId}`, {
      method: "DELETE",
    });
    return dispatch(removeProduct(productId));
  } catch (err) {
    const res = await err.json();
    if (res.statusCode >= 400) {
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
        current: action.payload,
      };
    }
    case REMOVE_PRODUCT: {
      const newEntities = { ...state, entities: { ...state.entities } };
      delete newEntities.entities[action.payload];
      return newEntities;
    }
    case EDIT_PRODUCT_MODAL: {
      return {
        ...state,
        current: action.payload,
      };
    }
    case CLEAR_CURRENT: {
      return {
        ...state,
        current: null,
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
export const clearProductsErrors = () => ({
  type: CLEAR_PRODUCTS_ERRORS,
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

export const selectCurrentProduct = (state) => state.products.current;
