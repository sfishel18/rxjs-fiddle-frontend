import { combineReducers } from 'redux';
import codeInputReducer from './modules/code-input-module';

const combinedReducer = combineReducers({
  codeInput: codeInputReducer,
});

export default combinedReducer;
