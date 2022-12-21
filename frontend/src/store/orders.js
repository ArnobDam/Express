import { jwtFetch } from "./jwt";

const ADD_ORDER_ITEM = "orders/ADD_ORDER_ITEM";
const COMPLETE_ORDER = "orders/COMPLETE_ORDER";

export const addOrderItem = (orderItem) => ({
  type: ADD_ORDER_ITEM,
  payload: orderItem,
});

export const completeOrder = (order) => ({
  type: COMPLETE_ORDER,
  payload: order,
});

export const createOrderAsync = () => async (dispatch, getState) => {
  const currentOrder = getState().orders.current;
  if (currentOrder.products.length < 1) {
    return;
  }

  let orderItems = [];
  currentOrder.products.forEach((item) => {
    for (let i = 0; i < item.quantity; i++) {
      orderItems.push({ _id: item.id });
    }
  });

  try {
    const res = await jwtFetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: orderItems }),
    });
    const data = await res.json();
    dispatch(completeOrder(data));
  } catch (err) {
    const res = await err.json();
    if (res.statusCode === 400) {
      return dispatch(receiveErrors(res.errors));
    }
  }
};

const initialState = {
  current: {
    products: [],
  },
  history: [],
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_ITEM: {
      return {
        ...state,
        current: {
          ...state.current,
          products: [...state.current.products, action.payload],
        },
      };
    }
    case COMPLETE_ORDER: {
      return {
        ...state,
        current: {
          products: [],
        },
        history: [action.payload, ...state.history],
      };
    }
    default:
      return state;
  }
};

const nullErrors = null;

const RECEIVE_ORDER_ERRORS = "orders/RECEIVE_ORDER_ERRORS";
const CLEAR_ORDERS_ERRORS = "orders/CLEAR_ORDERS_ERRORS";
const receiveErrors = (errors) => ({
  type: RECEIVE_ORDER_ERRORS,
  payload: errors,
});
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
