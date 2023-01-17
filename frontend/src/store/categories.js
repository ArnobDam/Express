import { jwtFetch } from "./jwt";

const RECEIVE_CATEGORIES = "categories/RECEIVE_CATEGORIES";
const RECEIVE_CATEGORY = "categories/RECEIVE_CATEGORY";

const receiveCategories = (categories) => ({
  type: RECEIVE_CATEGORIES,
  payload: categories,
});

const receiveCategory = (category) => ({
  type: RECEIVE_CATEGORY,
  payload: category,
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
    if (res.statusCode >= 400) {
      return dispatch(receiveErrors(res.errors));
    }
  }
};

export const createCategoryAsync = (newCategory) => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    });
    const data = await res.json();
    return dispatch(receiveCategory(data));
  } catch (err) {
    const res = await err.json();
    if (res.statusCode >= 400) {
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
    case RECEIVE_CATEGORY: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload._id]: action.payload,
        },
        ids: [...Object.keys(state.entities), action.payload._id],
      };
    }
    default:
      return state;
  }
};

const RECEIVE_CATEGORIES_ERRORS = "categories/RECEIVE_CATEGORIES_ERRORS";
const CLEAR_CATEGORIES_ERRORS = "categories/CLEAR_CATEGORIES_ERRORS";
const receiveErrors = (errors) => ({
  type: RECEIVE_CATEGORIES_ERRORS,
  payload: errors,
});
export const clearCategoriesErrors = () => ({
  type: CLEAR_CATEGORIES_ERRORS,
});

const nullErrors = null;

export const categoriesErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES_ERRORS: {
      return { ...state, ...action.payload };
    }
    case CLEAR_CATEGORIES_ERRORS: {
      return nullErrors;
    }
    default:
      return state;
  }
};

export const selectCategoriesList = (state) =>
  Object.values(state.categories.entities);

export const selectCategoriesListForRow = (state) =>
  Object.values(state.categories.entities ?? {})
    .map((category) => ({
      id: category._id,
      title: category.title,
    }))
    .sort(sortAlphaDescending)
    .slice(0, 5);

function sortAlphaDescending(a, b) {
  if (a.title > b.title) return -1;
  if (a.title < b.title) return 1;
  return 0;
}
