import { jwtFetch } from "./jwt";

const ADD_ORDER_ITEM = "orders/ADD_ORDER_ITEM";

export const addOrderItem = (orderItem) => ({
  type: ADD_ORDER_ITEM,
  payload: orderItem,
});

const initialState = {
  items: [],
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_ITEM: {
      return { ...state, items: [...state.items, action.payload] };
    }
    default:
      return state;
  }
};

const RECEIVE_ORDER_ERRORS = "orders/RECEIVE_ORDER_ERRORS";
const CLEAR_ORDERS_ERRORS = "orders/CLEAR_ORDERS_ERRORS";
const receiveErrors = (errors) => ({
  type: RECEIVE_ORDER_ERRORS,
  payload: errors,
});

const nullErrors = null;

export const ordersErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_ORDER_ERRORS: {
      return { ...state, ...action.payload };
    }
    case CLEAR_ORDERS_ERRORS: {
      return nullErrors;
    }
    default:
      return state;
  }
};
