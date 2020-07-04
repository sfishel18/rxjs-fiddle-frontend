import { Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { StateType } from 'typesafe-actions';
import combinedReducer from './combined-reducer';
import { CodeInputAction } from './modules/code-input-module';
import { ObservableOutputAction } from './modules/observable-output-module';

interface StreamEvent {
  timestamp: number;
  type: string;
  value?: string | number;
}

interface OutputStream {
  name: string;
  id: string;
  events: StreamEvent[];
  pipes: string[];
  inputs: string[];
  isTopLevel: boolean;
}

export type FiddleOutput = OutputStream[];

export interface Services {
  fetchFiddleOutput: (source: string) => Observable<FiddleOutput>;
}

export type CombinedState = StateType<typeof combinedReducer>;

export type CombinedAction = CodeInputAction | ObservableOutputAction;

export type ModuleEpic<T extends CombinedAction> = Epic<CombinedAction, T, CombinedState, Services>;

export const enum AsyncStatus {
  Uninitialized = 'uninitialized',
  InProgress = 'in-progress',
  Complete = 'complete',
  Error = 'error',
}

export interface AsyncValue<T> {
  error: Error | null;
  id: number;
  status: AsyncStatus;
  value: T;
}
