import { Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { StateType } from 'typesafe-actions';
import combinedReducer from './combined-reducer';
import { CodeInputAction } from './modules/code-input-module';
import { ObservableOutputAction } from './modules/observable-output-module';

export interface Services {
  fetchFiddleOutput: (source: string) => Observable<any>;
}

export type CombinedState = StateType<typeof combinedReducer>;

export type CombinedAction = CodeInputAction | ObservableOutputAction;

export type ModuleEpic<T extends CombinedAction> = Epic<CombinedAction, T, CombinedState, Services>;
