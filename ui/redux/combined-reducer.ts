import { combineReducers } from 'redux';
import counterReducer from './modules/counter-module';

const combinedReducer = combineReducers({
  counter: counterReducer,
});

export default combinedReducer;
