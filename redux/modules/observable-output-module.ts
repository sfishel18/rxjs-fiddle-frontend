import { ActionType, createStandardAction, getType } from 'typesafe-actions';
import { AsyncStatus, AsyncValue, FiddleOutput } from '../types';

type Output = FiddleOutput;

const request = createStandardAction('rxjs-fiddle/observable-output/REQUEST')();
const receiveSuccess = createStandardAction('rxjs-fiddle/observable-output/RECEIVE_SUCCESS')<
  Output
>();
const receiveError = createStandardAction('rxjs-fiddle/observable-output/RECEIVE_ERROR')<string>();

export const observableOutputActions = { request, receiveSuccess, receiveError };

export type ObservableOutputAction = ActionType<typeof observableOutputActions>;

interface State {
  readonly output: AsyncValue<Output>;
}

const defaultState: State = {
  output: {
    error: null,
    id: 0,
    status: AsyncStatus.Uninitialized,
    value: [],
  },
};

export default (state: State = defaultState, action: ObservableOutputAction): State => {
  switch (action.type) {
    case getType(request):
      return { ...state, output: {
        ...defaultState.output,
        id: state.output.id + 1,
        status: AsyncStatus.InProgress,
      },
    };
    case getType(receiveSuccess):
      return { ...state, output: {
        ...defaultState.output,
        id: state.output.id,
        status: AsyncStatus.Complete,
        value: action.payload,
      },
    };
    case getType(receiveError):
      return { ...state,
        output: {
          ...defaultState.output,
          error: new Error(action.payload),
          id: state.output.id,
          status: AsyncStatus.Error,
        },
      };
    default:
      return state;
  }
};

const getOutput = (state: State) => state.output;

export const observableOutputSelectors = { getOutput };
