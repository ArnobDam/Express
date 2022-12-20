import { jwtFetch } from "./jwt";

const RECEIVE_CATEGORIES = "categories/RECEIVE_CATEGORIES";

const receiveCategories = (products) => ({
  type: RECEIVE_CATEGORIES,
  payload: products,
});

export const fetchCategoriesAsync = () => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/categories");
    const data = await res.json();
    const products = data.reduce((prev, curr) => {
      prev[curr._id] = curr;
      return prev;
    }, {});
    return dispatch(receiveCategories(products));
  } catch (err) {
    const res = await err.json();
    if (res.statusCode === 400) {
      return dispatch(receiveErrors(res.errors));
    }
  }
};

const initialState = {
  entities: {},
  ids: [],
};

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES: {
      return {
        ...state,
        entities: action.payload,
        ids: Object.keys(action.payload),
      };
    }
    default:
      return state;
  }
};

const RECEIVE_CATEGORIES_ERRORS = "products/RECEIVE_CATEGORIES_ERRORS";
const CLEAR_CATEGORIES_ERRORS = "products/CLEAR_CATEGORIES_ERRORS";
const receiveErrors = (errors) => ({
  type: RECEIVE_CATEGORIES_ERRORS,
  payload: errors,
});

const nullErrors = null;

export const categoriesErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES_ERRORS: {
      return action.errors;
    }
    case CLEAR_CATEGORIES_ERRORS: {
      return nullErrors;
    }
    default:
      return state;
  }
};
