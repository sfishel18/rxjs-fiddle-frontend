import { ActionType, createStandardAction, getType } from 'typesafe-actions';

const increment = createStandardAction('rxjs-fiddle/counter/INCREMENT')<
  number
>();

const decrement = createStandardAction('rxjs-fiddle/counter/DECREMENT')<
  number
>();

const pushToHistory = createStandardAction(
  'rxjs-fiddle/counter/PUSH_TO_HISTORY',
)<number>();

export const counterActions = { increment, decrement, pushToHistory };

export type CounterAction = ActionType<typeof counterActions>;

interface State {
  readonly value: number;
  readonly history: number[];
}

const defaultState: State = { value: 0, history: [] };

export default (state: State = defaultState, action: CounterAction): State => {
  switch (action.type) {
    case getType(increment):
      return { ...state, value: state.value + action.payload };
    case getType(decrement):
      return { ...state, value: state.value - action.payload };
    case getType(pushToHistory):
      return { ...state, history: [...state.history, action.payload] };
    default:
      return state;
  }
};

const getValue = (state: State) => state.value;
const getHistory = (state: State) => state.history;

export const counterSelectors = { getValue, getHistory };
