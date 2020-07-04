import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import combinedEpic from './combined-epic';
import combinedReducer from './combined-reducer';
import { CombinedAction, CombinedState, Services } from './types';

// tslint:disable-next-line: no-any
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (initialState?: CombinedState | undefined, services?: Services) => {
  const epicMiddleware = createEpicMiddleware<
    CombinedAction,
    CombinedAction,
    CombinedState,
    Services
  >({ dependencies: services });

  const store = createStore(combinedReducer, initialState, composeEnhancers(applyMiddleware(epicMiddleware)));
  epicMiddleware.run(combinedEpic);
  return store;
};
