import { ActionType, createStandardAction, getType } from 'typesafe-actions';

type Output = any[];

const request = createStandardAction('rxjs-fiddle/observable-output/REQUEST')();
const receiveSuccess = createStandardAction('rxjs-fiddle/observable-output/RECEIVE_SUCCESS')<
  Output
>();
const receiveError = createStandardAction('rxjs-fiddle/observable-output/RECEIVE_ERROR')<string>();

export const observableOutputActions = { request, receiveSuccess, receiveError };

export type ObservableOutputAction = ActionType<typeof observableOutputActions>;

interface State {
  readonly error: string | null;
  readonly loading: boolean;
  readonly output: Output;
}

const defaultState: State = {
  error: null,
  loading: false,
  output: [],
};

export default (state: State = defaultState, action: ObservableOutputAction): State => {
  switch (action.type) {
    case getType(request):
      return { ...state, loading: true };
    case getType(receiveSuccess):
      return { ...state, output: action.payload, loading: false };
    case getType(receiveError):
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const getOutput = (state: State) => state.output;

export const observableOutputSelectors = { getOutput };
