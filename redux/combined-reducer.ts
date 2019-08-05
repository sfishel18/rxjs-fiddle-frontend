import { combineReducers } from 'redux';
import codeInputReducer from './modules/code-input-module';
import observableOutputReducer from './modules/observable-output-module';

const combinedReducer = combineReducers({
  codeInput: codeInputReducer,
  observableOutput: observableOutputReducer,
});

export default combinedReducer;
