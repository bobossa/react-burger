import { combineReducers } from "redux";
import { orderReducer } from "./order";
import { modalReducer } from "./modal";
import { ingredientReducer } from "./ingredient";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  ingredientReducer: ingredientReducer,
  orderReducer: orderReducer,
  modalReducer: modalReducer,
  userReducer: userReducer,
});
