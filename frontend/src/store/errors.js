import { combineReducers } from "redux";
import { categoriesErrorsReducer } from "./categories";
import { productsErrorsReducer } from "./products";
import { sessionErrorsReducer } from "./session";

export const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  products: productsErrorsReducer,
  categories: categoriesErrorsReducer,
});
