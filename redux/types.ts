import { Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { StateType } from 'typesafe-actions';
import combinedReducer from './combined-reducer';
import { CodeInputAction } from './modules/code-input-module';
import { ObservableOutputAction } from './modules/observable-output-module';

interface StreamEvent {
  timestamp: number;
  type: string;
  value: string;
}

interface OutputStream {
  name: string;
  events: StreamEvent[];
}

export type FiddleOutput = OutputStream[];

export interface Services {
  fetchFiddleOutput: (source: string) => Observable<FiddleOutput>;
}

export type CombinedState = StateType<typeof combinedReducer>;

export type CombinedAction = CodeInputAction | ObservableOutputAction;

export type ModuleEpic<T extends CombinedAction> = Epic<CombinedAction, T, CombinedState, Services>;
