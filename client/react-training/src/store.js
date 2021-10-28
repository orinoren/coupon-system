import { createStore, applyMiddleware } from "redux";
import allReducers from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export const myStore = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
