import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import counterReducer from "./modules/counter-module";

const combinedReducer = combineReducers({
  counter: counterReducer
});

export type CombinedState = StateType<typeof combinedReducer>;

export default combinedReducer;
