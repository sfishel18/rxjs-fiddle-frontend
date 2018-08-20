import { Epic } from 'redux-observable';
import { StateType } from 'typesafe-actions';
import combinedReducer from './combined-reducer';
import { CodeInputAction } from './modules/code-input-module';

export interface Services {
  log: (message: string) => void;
}

export type CombinedState = StateType<typeof combinedReducer>;

export type CombinedAction = CodeInputAction;

export type ModuleEpic<T extends CombinedAction> = Epic<CombinedAction, T, CombinedState, Services>;
