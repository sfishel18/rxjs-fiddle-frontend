import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import combinedEpic from './combined-epic';
import combinedReducer from './combined-reducer';
import services from './services';
import { CombinedAction, CombinedState, Services } from './types';

const epicMiddleware = createEpicMiddleware<
  CombinedAction,
  CombinedAction,
  CombinedState,
  Services
>({ dependencies: services });

export default (initialState?: object) => {
  const store = createStore(combinedReducer, initialState, applyMiddleware(epicMiddleware));
  epicMiddleware.run(combinedEpic);
  return store;
};
