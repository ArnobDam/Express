import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { sessionReducer } from "./session";
import { errorsReducer } from "./errors";
import { productsReducer } from "./products";
import { categoriesReducer } from "./categories";
import { ordersReducer } from "./orders";
import { uiReducer } from "./ui";

const rootReducer = combineReducers({
  ui: uiReducer,
  session: sessionReducer,
  products: productsReducer,
  categories: categoriesReducer,
  orders: ordersReducer,
  errors: errorsReducer,
});

let enhancer;
const middlewares = [thunk];

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(...middlewares);
} else {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(...middlewares));
}

export const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};
