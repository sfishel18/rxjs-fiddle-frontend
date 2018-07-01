import { Epic } from 'redux-observable';
import { ActionType, createStandardAction, StateType } from 'typesafe-actions';
import combinedReducer from './combined-reducer';
import { CounterAction } from './modules/counter-module';

export interface Services {
  log: (message: string) => void;
}

export type CombinedState = StateType<typeof combinedReducer>;

export type CombinedAction = CounterAction;

export type ModuleEpic<T extends CombinedAction> = Epic<
  CombinedAction,
  T,
  CombinedState,
  Services
>;
