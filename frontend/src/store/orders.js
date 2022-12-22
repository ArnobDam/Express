import { createSelector } from "reselect";
import { jwtFetch } from "./jwt";

const TAX_RATE = 8.875;
const DISCOUNT_RATE = 0.1;

const ADD_ORDER_ITEM = "orders/ADD_ORDER_ITEM";
const COMPLETE_ORDER = "orders/COMPLETE_ORDER";
const INCREMENT_QUANTITY = "orders/INCREMENT_QUANTITY";
const DECREMENT_QUANTITY = "orders/DECREMENT_QUANTITY";
const REMOVE_ITEM_FROM_CART = "orders/REMOVE_ITEM_FROM_CART";
const INCREMENT_ORDER_NUMBER = "orders/INCREMEMNT_ORDER_NUMBER";

export const addOrderItem = (orderItem) => ({
  type: ADD_ORDER_ITEM,
  payload: orderItem,
});

export const completeOrder = (order) => ({
  type: COMPLETE_ORDER,
  payload: order,
});

export const incrementQuantity = (itemId) => ({
  type: INCREMENT_QUANTITY,
  payload: itemId,
});

export const decrementQuantity = (itemId) => ({
  type: DECREMENT_QUANTITY,
  payload: itemId,
});

export const removeItemFromCart = (itemId) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: itemId,
});

export const incrementOrderNumber = () => ({
  type: INCREMENT_ORDER_NUMBER,
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
    dispatch(incrementOrderNumber());
    localStorage.setItem("orderNumber", getState().orders.orderNumber);
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
  orderNumber: parseInt(localStorage.getItem("orderNumber"), 10) ?? 1,
  tax: TAX_RATE,
  history: [],
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_ITEM: {
      // Increment if item already exists in cart
      if (
        state.current.products.find((item) => item.id === action.payload.id)
      ) {
        return {
          ...state,
          current: {
            ...state.current,
            products: state.current.products.map((item) => {
              if (item.id === action.payload.id) {
                return {
                  ...item,
                  quantity: item.quantity + action.payload.quantity,
                  totalPrice:
                    item.totalPrice * (action.payload.quantity + item.quantity),
                };
              }
              return item;
            }),
          },
        };
      }

      // Add item to cart if not already in cart
      return {
        ...state,
        current: {
          ...state.current,
          products: [...state.current.products, action.payload],
        },
      };
    }
    case INCREMENT_QUANTITY: {
      return {
        ...state,
        current: {
          ...state.current,
          products: state.current.products.map((item) =>
            item.id === action.payload
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        },
      };
    }
    case DECREMENT_QUANTITY: {
      return {
        ...state,
        current: {
          ...state.current,
          products: state.current.products
            .map((item) => {
              if (item.quantity <= 1) {
                return null;
              } else if (item.id === action.payload) {
                return { ...item, quantity: item.quantity - 1 };
              } else {
                return item;
              }
            })
            .filter(Boolean),
        },
      };
    }
    case REMOVE_ITEM_FROM_CART: {
      return {
        ...state,
        current: {
          ...state.current,
          products: state.current.products.filter(
            (item) => item.id !== action.payload
          ),
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
    case INCREMENT_ORDER_NUMBER: {
      return {
        ...state,
        orderNumber: state.orderNumber + 1,
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

export const selectCurrentCartItems = (state) => state.orders.current.products;
export const selectCurrentCartItemsExpanded = createSelector(
  selectCurrentCartItems,
  (state) => state.products?.entities,
  (cartItems, products) =>
    cartItems.map((item) => ({ ...item, ...products[item.id] }))
);
export const selectCurrentOrderNumber = (state) => state.orders.orderNumber;
export const selectSubTotal = (state) =>
  state.orders.current.products.reduce(
    (prev, curr) => prev + curr.totalPrice,
    0
  );
export const selectSalesTax = createSelector(
  selectSubTotal,
  (subTotal) => (subTotal / 100) * TAX_RATE
);
export const selectDiscountAmount = createSelector(
  selectSubTotal,
  (subTotal) => subTotal * DISCOUNT_RATE
);

export const selectTotalWithTax = (state) => {};
