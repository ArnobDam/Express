import { combineReducers } from "redux";
import { sessionErrorsReducer } from "./session";

export const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
});
