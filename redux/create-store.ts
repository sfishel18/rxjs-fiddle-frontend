import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import combinedEpic from './combined-epic';
import combinedReducer from './combined-reducer';
import { CombinedAction, CombinedState, Services } from './types';

export default (initialState?: CombinedState | undefined, services?: Services) => {
  const epicMiddleware = createEpicMiddleware<
    CombinedAction,
    CombinedAction,
    CombinedState,
    Services
  >({ dependencies: services });

  const store = createStore(combinedReducer, initialState, applyMiddleware(epicMiddleware));
  epicMiddleware.run(combinedEpic);
  return store;
};
