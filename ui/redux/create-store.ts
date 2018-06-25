import combinedReducer from "./combined-reducer";
import { createStore } from "redux";

export default (initialState?: object) =>
  createStore(combinedReducer, initialState);
